import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

// AI assistant / answer-engine crawlers we explicitly welcome. Naming them
// documents intent and survives any future tightening of the wildcard rule.
// The retrieval bots (OAI-SearchBot, PerplexityBot, ChatGPT-User) are the ones
// that fetch pages in real time to build AI-generated answers and citations.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
