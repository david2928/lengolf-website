#!/usr/bin/env tsx
/**
 * Sync / verify data/blog-translated-slugs.ts against the Supabase DB.
 *
 * The registry lib/translated-routes.ts is bundled into the edge middleware and
 * therefore cannot query the DB. It reads data/blog-translated-slugs.ts, a
 * committed mirror of the per-locale PUBLISHED blog translations
 * (public.blog_post_translations joined to published public.blog_posts). This
 * script keeps that mirror honest:
 *
 *   npx tsx scripts/sync-blog-translated-slugs.ts          # rewrite the data file from the DB
 *   npx tsx scripts/sync-blog-translated-slugs.ts --check  # CI: fail if the file drifts from the DB
 *
 * Env: reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY. These are
 * loaded from .env.local if present (only for keys not already in the
 * environment), so CI can inject them as secrets instead. The service-role key
 * is used the same way lib/supabase/client.ts uses it — this is a trusted,
 * server-side maintenance script, never shipped to the browser.
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { BLOG_TRANSLATED_SLUGS } from '../data/blog-translated-slugs';

const LOCALES = ['th', 'ko', 'ja', 'zh'] as const;
type Locale = (typeof LOCALES)[number];

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-translated-slugs.ts');

const FILE_HEADER = `/**
 * Per-locale list of blog slugs that have a PUBLISHED translation.
 *
 * This mirrors \`public.blog_post_translations\` (joined to published
 * \`blog_posts\`) in the Supabase DB. It exists because lib/translated-routes.ts
 * — which is bundled into the edge middleware — needs a slug-accurate answer to
 * "does /blog/<slug> have a <locale> translation?" without importing the DB.
 *
 * This is a PLAIN data module — deliberately NOT \`import 'server-only'\` and it
 * does NOT import the Supabase client — because lib/translated-routes.ts imports
 * it and that module runs in the edge middleware. Keep it dependency-free, the
 * same way data/golf-courses-i18n.ts stays a plain module for the smoke-test
 * cross-check.
 *
 * DO NOT hand-edit the slug lists. Regenerate from the DB with:
 *   npx tsx scripts/sync-blog-translated-slugs.ts
 * The CI check \`npm run validate:blog-slugs\` asserts this file matches the DB
 * and fails the build if they drift.
 */`;

/** Load KEY=VALUE lines from .env.local into process.env (only if unset). */
function loadDotEnvLocal(): void {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (process.env[key] !== undefined) continue;
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

/** Fetch the per-locale sorted slug lists from the DB. */
async function fetchFromDb(): Promise<Record<Locale, string[]>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (set them in .env.local or the environment).',
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const [{ data: posts, error: postsErr }, { data: translations, error: trErr }] =
    await Promise.all([
      supabase.from('blog_posts').select('id, slug').eq('status', 'published'),
      supabase.from('blog_post_translations').select('post_id, locale'),
    ]);

  if (postsErr) throw new Error(`blog_posts query failed: ${postsErr.message}`);
  if (trErr) throw new Error(`blog_post_translations query failed: ${trErr.message}`);

  const slugById = new Map<string, string>(
    (posts ?? []).map((p) => [p.id as string, p.slug as string]),
  );

  const result: Record<Locale, string[]> = { th: [], ko: [], ja: [], zh: [] };
  const seen: Record<Locale, Set<string>> = {
    th: new Set(),
    ko: new Set(),
    ja: new Set(),
    zh: new Set(),
  };

  for (const tr of translations ?? []) {
    const locale = tr.locale as string;
    if (!(LOCALES as readonly string[]).includes(locale)) continue;
    const slug = slugById.get(tr.post_id as string);
    // Only published posts are in slugById, so untranslated/draft rows are skipped.
    if (!slug) continue;
    const l = locale as Locale;
    if (seen[l].has(slug)) continue;
    // Guard the generated-TS interpolation: slugs are kebab-case ASCII by
    // convention; anything else (quote, newline, unicode) would render an
    // invalid or injected data file. Fail loudly instead.
    if (!/^[a-z0-9-]+$/.test(slug)) {
      throw new Error(
        `Refusing to render non-kebab-case slug ${JSON.stringify(slug)} (locale ${l}) into data/blog-translated-slugs.ts`,
      );
    }
    seen[l].add(slug);
    result[l].push(slug);
  }

  for (const l of LOCALES) result[l].sort();
  return result;
}

/** Render the data file content for a given per-locale slug map. */
function renderDataFile(slugs: Record<Locale, string[]>): string {
  const renderList = (list: string[]): string => {
    if (list.length === 0) return '[]';
    const items = list.map((s) => `    '${s}',`).join('\n');
    return `[\n${items}\n  ]`;
  };

  const body = LOCALES.map((l) => `  ${l}: ${renderList(slugs[l])},`).join('\n');

  return `${FILE_HEADER}
export const BLOG_TRANSLATED_SLUGS: Record<'th' | 'ko' | 'ja' | 'zh', readonly string[]> = {
${body}
}
`;
}

/** Stable comparison key for a per-locale slug map. */
function normalize(slugs: Record<Locale, readonly string[]>): Record<Locale, string[]> {
  const out = {} as Record<Locale, string[]>;
  for (const l of LOCALES) out[l] = [...slugs[l]].sort();
  return out;
}

function diffLocale(locale: Locale, db: string[], file: string[]): string[] {
  const dbSet = new Set(db);
  const fileSet = new Set(file);
  const onlyInDb = db.filter((s) => !fileSet.has(s));
  const onlyInFile = file.filter((s) => !dbSet.has(s));
  const lines: string[] = [];
  for (const s of onlyInDb) lines.push(`    [${locale}] in DB but missing from file: ${s}`);
  for (const s of onlyInFile) lines.push(`    [${locale}] in file but not in DB:   ${s}`);
  return lines;
}

async function main() {
  loadDotEnvLocal();
  const check = process.argv.includes('--check');
  const db = await fetchFromDb();

  if (check) {
    const fileSlugs = normalize(BLOG_TRANSLATED_SLUGS);
    const dbSlugs = normalize(db);
    const diffs: string[] = [];
    for (const l of LOCALES) {
      diffs.push(...diffLocale(l, dbSlugs[l], fileSlugs[l]));
    }
    if (diffs.length === 0) {
      console.log(
        '✅ validate:blog-slugs: data/blog-translated-slugs.ts matches the DB.',
      );
      process.exit(0);
    }
    console.error(
      '❌ validate:blog-slugs: data/blog-translated-slugs.ts is out of sync with the DB:\n',
    );
    console.error(diffs.join('\n'));
    console.error(
      '\nFix: regenerate the file from the DB:\n  npx tsx scripts/sync-blog-translated-slugs.ts',
    );
    process.exit(1);
  }

  const content = renderDataFile(db);
  fs.writeFileSync(DATA_FILE, content, 'utf8');
  const total = LOCALES.reduce((n, l) => n + db[l].length, 0);
  console.log(
    `✅ Wrote data/blog-translated-slugs.ts (${total} translated slug(s) across ${LOCALES.length} locales).`,
  );
}

main().catch((e: unknown) => {
  const err = e as { message?: string };
  console.error('Error:', err.message ?? e);
  process.exit(1);
});
