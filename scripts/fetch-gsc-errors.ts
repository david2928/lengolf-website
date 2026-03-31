#!/usr/bin/env tsx

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const CREDENTIALS_PATH = process.env.GSC_CREDENTIALS_PATH ?? path.join(process.cwd(), 'search-console-access.json');
const SITE_URL = 'sc-domain:len.golf'; // or 'https://www.len.golf/'

interface GSCError {
  url: string;
  responseCode: number;
  impressions: number;
  clicks: number;
}

async function fetchGSCErrors() {
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

    console.log('🔍 Fetching errors from Google Search Console...\n');

    // Get the list of sites first
    const sitesResponse = await searchConsole.sites.list({});
    console.log('📊 Available sites:');
    sitesResponse.data.siteEntry?.forEach(site => {
      console.log(`  - ${site.siteUrl} (${site.permissionLevel})`);
    });
    console.log('');

    // Try both domain and URL property formats
    const sitesToCheck = [
      'sc-domain:len.golf',
      'https://len.golf/',
      'https://www.len.golf/',
    ];

    let foundSite = false;

    for (const siteUrl of sitesToCheck) {
      try {
        console.log(`🔎 Checking: ${siteUrl}`);

        // Fetch URL inspection data (limited, but useful)
        // Note: The URL Inspection API has different limits and methods

        // Let's use the Search Analytics API instead to find URLs with errors
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        const startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        console.log(`📅 Fetching data from ${startDate} to ${endDate}`);

        const response = await searchConsole.searchanalytics.query({
          siteUrl: siteUrl,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['page'],
            rowLimit: 25000,
            type: 'web',
          },
        });

        foundSite = true;
        console.log(`✅ Successfully connected to: ${siteUrl}\n`);

        if (response.data.rows && response.data.rows.length > 0) {
          console.log(`📈 Found ${response.data.rows.length} pages with search data\n`);

          // Sort by clicks descending
          const sortedRows = response.data.rows.sort((a, b) => {
            return (b.clicks || 0) - (a.clicks || 0);
          });

          // Show top pages
          console.log('🔝 Top 20 pages by clicks:');
          console.log('─'.repeat(80));
          sortedRows.slice(0, 20).forEach((row, idx) => {
            const page = row.keys?.[0] || 'Unknown';
            const clicks = row.clicks || 0;
            const impressions = row.impressions || 0;
            const ctr = ((clicks / impressions) * 100).toFixed(2);
            console.log(`${idx + 1}. ${page}`);
            console.log(`   Clicks: ${clicks} | Impressions: ${impressions} | CTR: ${ctr}%`);
          });

          // Save full data to file
          const outputPath = path.join(process.cwd(), 'docs', 'gsc-search-data.json');
          fs.writeFileSync(outputPath, JSON.stringify(response.data.rows, null, 2));
          console.log(`\n💾 Full data saved to: ${outputPath}`);

        } else {
          console.log('⚠️  No search data found for this period');
        }

        break; // Successfully found and processed

      } catch (error: any) {
        if (error.message.includes('not found') || error.message.includes('User does not have')) {
          console.log(`❌ Not accessible: ${siteUrl}\n`);
          continue;
        }
        throw error;
      }
    }

    if (!foundSite) {
      console.error('\n❌ Could not access any GSC property. Please check:');
      console.error('1. Service account email is added to GSC with proper permissions');
      console.error(`2. Service account email: ${credentials.client_email}`);
      console.error('3. Go to GSC → Settings → Users and permissions → Add User');
      process.exit(1);
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
  fetchGSCErrors();
}

export { fetchGSCErrors };
