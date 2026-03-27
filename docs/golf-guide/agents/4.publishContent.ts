#!/usr/bin/env tsx
/**
 * 4.publishContent.ts
 *
 * Stage 4 of the golf guide pipeline.
 * Converts an approved article from content/3.approved/ into a TypeScript
 * data object and appends it to the correct /data/*.ts file.
 *
 * This script is run by Claude on your behalf after you approve an article.
 * It contains NO AI calls — it is a pure mechanical formatter.
 *
 * Usage (Claude runs this for you):
 *   npx tsx docs/golf-guide/agents/4.publishContent.ts <slug>
 */

import * as fs from 'fs'
import * as path from 'path'

const GUIDE_ROOT = path.join(__dirname, '..')
const APPROVED_DIR = path.join(GUIDE_ROOT, 'content', '3.approved')
const REPO_ROOT = path.join(__dirname, '..', '..', '..')
const DATA_DIR = path.join(REPO_ROOT, 'data')

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: npx tsx docs/golf-guide/agents/4.publishContent.ts <slug>')
  process.exit(1)
}

// ── Page type → data file ─────────────────────────────────────────────────

const PAGE_TYPE_TO_FILE: Record<string, string> = {
  explainer: 'explainer-pages.ts',
  faq: 'faq-pages.ts',
  price_guide: 'price-guide-pages.ts',
}

const PAGE_TYPE_TO_ID_PREFIX: Record<string, string> = {
  explainer: 'exp',
  faq: 'faq',
  price_guide: 'price',
}

// ── Frontmatter parser ────────────────────────────────────────────────────

function parseFrontmatter(text: string): Record<string, string> {
  const match = text.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()
    if (key) fm[key] = value
  }
  return fm
}

function stripFrontmatter(text: string): string {
  return text.replace(/^---\n[\s\S]*?\n---\n?/, '').trim()
}

// ── ID generator ──────────────────────────────────────────────────────────

function getNextId(dataFilePath: string, prefix: string): string {
  if (!fs.existsSync(dataFilePath)) return `${prefix}-1`
  const content = fs.readFileSync(dataFilePath, 'utf-8')
  const matches = [...content.matchAll(new RegExp(`'${prefix}-(\\d+)'`, 'g'))]
  if (!matches.length) return `${prefix}-1`
  const max = Math.max(...matches.map((m) => parseInt(m[1])))
  return `${prefix}-${max + 1}`
}

// ── Helpers ───────────────────────────────────────────────────────────────

function escapeForTs(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

function parseRelatedSlugs(raw: string): string[] {
  if (!raw) return []
  return raw
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}

function splitIntoSections(body: string): { heading: string; body: string }[] {
  const sections: { heading: string; body: string }[] = []
  const parts = body.split(/^## /m).filter(Boolean)
  for (const part of parts) {
    const newlineIdx = part.indexOf('\n')
    if (newlineIdx === -1) continue
    const heading = part.slice(0, newlineIdx).trim()
    const content = part.slice(newlineIdx + 1).trim()
    if (heading && content) sections.push({ heading, body: content })
  }
  return sections
}

function extractKeyTakeaways(body: string): string[] {
  const takeawayMatch = body.match(
    /## (?:Key Takeaways?|Summary|In Summary)[^\n]*\n([\s\S]*?)(?=\n##|$)/i
  )
  if (takeawayMatch) {
    return takeawayMatch[1]
      .split('\n')
      .filter((l) => l.trim().startsWith('-') || l.trim().startsWith('*'))
      .map((l) => l.replace(/^[-*]\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 5)
  }
  const bullets = body.match(/^[-*] .+/gm) || []
  return bullets.slice(0, 3).map((b) => b.replace(/^[-*] /, ''))
}

// ── TS object builders ────────────────────────────────────────────────────

function buildExplainerObject(fm: Record<string, string>, body: string, id: string): string {
  const sections = splitIntoSections(body)
  const introMatch = body.match(/^([\s\S]*?)(?=\n## )/s)
  const intro = introMatch ? introMatch[1].trim() : body.split('\n\n')[0]
  const keyTakeaways = extractKeyTakeaways(body)
  const relatedSlugs = parseRelatedSlugs(fm.related_slugs || '')

  const sectionsTs = sections
    .map(
      (s) =>
        `        {\n          heading: \`${escapeForTs(s.heading)}\`,\n          body: \`${escapeForTs(s.body)}\`,\n        }`
    )
    .join(',\n')

  return `  {
    id: '${id}',
    page_type: 'explainer',
    slug: '${fm.slug || slug}',
    title: \`${escapeForTs(fm.title || '')}\`,
    meta_description: \`${escapeForTs(fm.meta_description || '')}\`,
    featured_image: null,
    schema_markup: null,
    status: 'published',
    category: '${fm.category || 'general'}',
    locale: 'en',
    related_slugs: [${relatedSlugs.map((s) => `'${s}'`).join(', ')}],
    created_at: now,
    updated_at: now,
    content: {
      intro: \`${escapeForTs(intro)}\`,
      sections: [
${sectionsTs}
      ],
      key_takeaways: [${keyTakeaways.map((t) => `\`${escapeForTs(t)}\``).join(', ')}],
      related_services: ['/golf', '/golf-club-rental', '/golf-in-thailand-guide'],
      comparison_table: [],
    },
  }`
}

function buildFaqObject(fm: Record<string, string>, body: string, id: string): string {
  const paragraphs = body.split('\n\n').filter(Boolean)
  const answerIntro = paragraphs[0] || ''
  const answerBody = paragraphs.slice(1).join('\n\n')
  const relatedSlugs = parseRelatedSlugs(fm.related_slugs || '')
  const faqSlugs = relatedSlugs.filter((s) => s.startsWith('/faq/'))
  const serviceSlugs = relatedSlugs.filter((s) => !s.startsWith('/faq/'))

  const relatedQuestionsTs = faqSlugs
    .map((s) => {
      const q = s.replace('/faq/', '').replace(/-/g, ' ')
      return `      { slug: '${s.replace('/faq/', '')}', question: '${q}?' }`
    })
    .join(',\n')

  return `  {
    id: '${id}',
    page_type: 'faq',
    slug: '${fm.slug || slug}',
    title: \`${escapeForTs(fm.title || '')}\`,
    meta_description: \`${escapeForTs(fm.meta_description || '')}\`,
    featured_image: null,
    schema_markup: null,
    status: 'published',
    category: '${fm.category || 'general'}',
    locale: 'en',
    related_slugs: [${relatedSlugs.map((s) => `'${s}'`).join(', ')}],
    created_at: now,
    updated_at: now,
    content: {
      answer_intro: \`${escapeForTs(answerIntro)}\`,
      answer_body: \`${escapeForTs(answerBody)}\`,
      related_questions: [
${relatedQuestionsTs}
      ],
      related_service_pages: [${serviceSlugs.map((s) => `'${s}'`).join(', ')}],
    },
  }`
}

function buildPriceGuideObject(fm: Record<string, string>, body: string, id: string): string {
  const sections = splitIntoSections(body)
  const introMatch = body.match(/^([\s\S]*?)(?=\n## )/s)
  const intro = introMatch ? introMatch[1].trim() : body.split('\n\n')[0]
  const relatedSlugs = parseRelatedSlugs(fm.related_slugs || '')

  const sectionsTs = sections
    .map(
      (s) =>
        `        { heading: \`${escapeForTs(s.heading)}\`, body: \`${escapeForTs(s.body)}\` }`
    )
    .join(',\n')

  return `  {
    id: '${id}',
    page_type: 'price_guide',
    slug: '${fm.slug || slug}',
    title: \`${escapeForTs(fm.title || '')}\`,
    meta_description: \`${escapeForTs(fm.meta_description || '')}\`,
    featured_image: null,
    schema_markup: null,
    status: 'published',
    category: '${fm.category || 'pricing'}',
    locale: 'en',
    related_slugs: [${relatedSlugs.map((s) => `'${s}'`).join(', ')}],
    created_at: now,
    updated_at: now,
    content: {
      intro: \`${escapeForTs(intro)}\`,
      price_breakdown: [],
      comparison_with_alternatives: '',
      value_proposition: '',
      last_verified: 'March 2026',
      sections: [
${sectionsTs}
      ],
    },
  }`
}

// ── Append to data file ───────────────────────────────────────────────────

function appendToDataFile(dataFilePath: string, tsEntry: string): void {
  const content = fs.readFileSync(dataFilePath, 'utf-8')
  const lastBracket = content.lastIndexOf(']')
  if (lastBracket === -1) throw new Error(`Cannot find array end in ${dataFilePath}`)
  const newContent =
    content.slice(0, lastBracket) +
    `\n  // ─── Golf Guide: ${slug} ───\n${tsEntry},\n` +
    content.slice(lastBracket)
  fs.writeFileSync(dataFilePath, newContent, 'utf-8')
}

// ── Main ──────────────────────────────────────────────────────────────────

function main() {
  const approvedPath = path.join(APPROVED_DIR, `${slug}.md`)

  if (!fs.existsSync(approvedPath)) {
    console.error(`\n❌  No approved article found at content/3.approved/${slug}.md`)
    console.error(`    Ask Claude to approve it first.`)
    process.exit(1)
  }

  const raw = fs.readFileSync(approvedPath, 'utf-8')
  const fm = parseFrontmatter(raw)
  const body = stripFrontmatter(raw)
  const pageType = fm.page_type || 'explainer'

  const dataFile = PAGE_TYPE_TO_FILE[pageType]
  if (!dataFile) {
    console.error(`❌  Unknown page_type "${pageType}". Valid: ${Object.keys(PAGE_TYPE_TO_FILE).join(', ')}`)
    process.exit(1)
  }

  const dataFilePath = path.join(DATA_DIR, dataFile)
  if (!fs.existsSync(dataFilePath)) {
    console.error(`❌  Data file not found: data/${dataFile}`)
    process.exit(1)
  }

  const prefix = PAGE_TYPE_TO_ID_PREFIX[pageType]
  const id = getNextId(dataFilePath, prefix)

  console.log(`\n📦 Publishing: ${slug}`)
  console.log(`   page_type : ${pageType}`)
  console.log(`   target    : data/${dataFile}`)
  console.log(`   id        : ${id}`)

  let tsEntry: string
  if (pageType === 'faq') tsEntry = buildFaqObject(fm, body, id)
  else if (pageType === 'price_guide') tsEntry = buildPriceGuideObject(fm, body, id)
  else tsEntry = buildExplainerObject(fm, body, id)

  appendToDataFile(dataFilePath, tsEntry)

  console.log(`\n✅  Done! Entry appended to data/${dataFile}`)
  console.log(
    `    Page will be live at: /${pageType === 'faq' ? 'faq' : 'guide'}/${fm.slug || slug}/`
  )
  console.log(`\n    Run \`npm run build\` to check for TypeScript errors.`)
}

main()
