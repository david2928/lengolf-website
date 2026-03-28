#!/usr/bin/env tsx

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const CREDENTIALS_PATH = path.join(process.cwd(), 'search-console-access-487306-dbcd7b7eecec.json');

async function fetch404Errors() {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // Initialize auth
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const authClient = await auth.getClient();
    const searchConsole = google.searchconsole({ version: 'v1', auth: authClient as any });

    console.log('🔍 Fetching 404 errors from Google Search Console...\n');

    const siteUrl = 'sc-domain:len.golf';

    // Fetch index status
    console.log('📊 Checking index coverage status...\n');

    // Note: The Search Console API doesn't provide direct access to 404 errors
    // You need to manually export them from the GSC interface under:
    // Coverage > Excluded > Not found (404)

    // What we CAN do is analyze URLs from search data and inspect them
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    console.log(`📅 Fetching URLs from ${startDate} to ${endDate}`);

    // Get all pages with low or zero clicks (potential 404s)
    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 25000,
        type: 'web',
      },
    });

    if (response.data.rows && response.data.rows.length > 0) {
      console.log(`\n📈 Found ${response.data.rows.length} pages with impressions\n`);

      // Find pages with high impressions but zero clicks (likely broken)
      const suspiciousPages = response.data.rows
        .filter(row => {
          const impressions = row.impressions || 0;
          const clicks = row.clicks || 0;
          const ctr = clicks / impressions;
          return impressions > 10 && ctr < 0.005; // Less than 0.5% CTR
        })
        .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
        .slice(0, 50);

      if (suspiciousPages.length > 0) {
        console.log('⚠️  Suspicious pages (high impressions, very low CTR):');
        console.log('─'.repeat(80));
        suspiciousPages.forEach((row, idx) => {
          const page = row.keys?.[0] || 'Unknown';
          const clicks = row.clicks || 0;
          const impressions = row.impressions || 0;
          const ctr = ((clicks / impressions) * 100).toFixed(2);
          console.log(`${idx + 1}. ${page}`);
          console.log(`   Clicks: ${clicks} | Impressions: ${impressions} | CTR: ${ctr}%`);
        });

        // Save to file
        const outputPath = path.join(process.cwd(), 'docs', 'gsc-suspicious-urls.json');
        fs.writeFileSync(outputPath, JSON.stringify(suspiciousPages, null, 2));
        console.log(`\n💾 Saved suspicious URLs to: ${outputPath}`);
      }

      // Find pages with no clicks at all but some impressions
      const noClickPages = response.data.rows
        .filter(row => {
          const impressions = row.impressions || 0;
          const clicks = row.clicks || 0;
          return impressions > 5 && clicks === 0;
        })
        .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
        .slice(0, 50);

      if (noClickPages.length > 0) {
        console.log('\n\n❌ Pages with impressions but ZERO clicks:');
        console.log('─'.repeat(80));
        noClickPages.forEach((row, idx) => {
          const page = row.keys?.[0] || 'Unknown';
          const impressions = row.impressions || 0;
          console.log(`${idx + 1}. ${page} (${impressions} impressions)`);
        });

        // Save to file
        const outputPath = path.join(process.cwd(), 'docs', 'gsc-zero-clicks.json');
        fs.writeFileSync(outputPath, JSON.stringify(noClickPages, null, 2));
        console.log(`\n💾 Saved zero-click URLs to: ${outputPath}`);
      }

      console.log('\n\n📝 NOTE: To get actual 404 errors from GSC:');
      console.log('1. Go to https://search.google.com/search-console');
      console.log('2. Select your property (len.golf)');
      console.log('3. Go to: Indexing → Pages → "Not found (404)"');
      console.log('4. Click "Export" and download the CSV');
      console.log('5. Save it to docs/gsc-404-errors.csv');
      console.log('\nOr I can help you analyze URLs if you share the 404 list!');

    } else {
      console.log('⚠️  No search data found for this period');
    }

  } catch (error: any) {
    console.error('❌ Error fetching GSC data:', error.message);
    if (error.errors) {
      console.error('Details:', JSON.stringify(error.errors, null, 2));
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  fetch404Errors();
}

export { fetch404Errors };
