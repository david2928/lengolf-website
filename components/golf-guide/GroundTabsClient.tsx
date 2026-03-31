'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'

type Article = {
  cat: string
  title: string
  desc: string
  href: string
  imgLabel: string
}

type Tab = {
  label: string
  articles: Article[]
}

const TABS: Tab[] = [
  {
    label: 'Outdoor Courses',
    articles: [
      {
        cat: 'Etiquette Guide',
        title: 'Thai golf course etiquette — caddies, tipping, and pace of play',
        desc: "What to expect from a Thai caddie, how much to tip, and the unwritten rules of Thai golf that no one puts in a brochure.",
        href: '/guide/thai-golf-course-etiquette',
        imgLabel: 'Caddie on course',
      },
      {
        cat: 'FAQ',
        title: 'Do you need a caddie at Thai golf courses?',
        desc: "Most Thai courses include a caddie in the green fee. Here's what that means, what they do, and how to get the most from yours.",
        href: '/faq/do-you-need-caddie-thailand-golf',
        imgLabel: 'Caddie briefing',
      },
      {
        cat: "First-Timer's Guide",
        title: 'What to expect playing golf in Thailand for the first time',
        desc: 'Practical notes on check-in, cart hire, caddie briefings, pace of play, and course conditions.',
        href: '/guide/first-time-golf-thailand',
        imgLabel: 'First round Thailand',
      },
      {
        cat: 'FAQ',
        title: 'How much to tip a caddie in Thailand',
        desc: 'Caddie tipping is customary and expected. Here is the going rate and how it works.',
        href: '/faq/how-much-tip-caddie-thailand',
        imgLabel: 'Caddie tip',
      },
    ],
  },
  {
    label: 'Indoor / Simulator',
    articles: [
      {
        cat: 'Comparison Guide',
        title: 'Best golf simulators in Bangkok — compared',
        desc: 'LENGOLF, Topgolf Megacity, Front 9, Fairway Golf — which is worth your time and money, and for what kind of session.',
        href: '/guide/best-golf-simulators-bangkok',
        imgLabel: 'Simulator bay Bangkok',
      },
      {
        cat: 'Guide',
        title: 'Golf simulators vs real courses in Bangkok — which should you do?',
        desc: 'How to think about the indoor vs outdoor decision depending on weather, budget, time, and what kind of golfer you are.',
        href: '/guide/golf-simulator-vs-real-course-bangkok',
        imgLabel: 'Simulator vs outdoor',
      },
      {
        cat: 'FAQ',
        title: 'Where to play golf in Bangkok at night',
        desc: 'Outdoor courses close at dusk. Indoor simulator venues run until 11pm or later. Here are your options.',
        href: '/faq/where-play-golf-night-bangkok',
        imgLabel: 'Night golf Bangkok',
      },
    ],
  },
  {
    label: 'Lessons',
    articles: [
      {
        cat: 'Guide',
        title: 'Golf lessons in Bangkok — best coaches and what to expect',
        desc: 'PGA-qualified coaching options in Bangkok, what a session costs, and whether a holiday lesson actually improves your game.',
        href: '/guide/golf-lessons-bangkok-coaches',
        imgLabel: 'Golf lesson Bangkok',
      },
      {
        cat: 'FAQ',
        title: 'Is it worth taking golf lessons in Bangkok on holiday?',
        desc: 'Honest take on whether a single lesson or short series will make a real difference to your game.',
        href: '/faq/worth-taking-golf-lessons-bangkok-holiday',
        imgLabel: 'Holiday golf lesson',
      },
      {
        cat: 'Cost Guide',
        title: 'Golf lesson prices in Bangkok — what to expect',
        desc: 'Per-session and package rates for coaching in Bangkok, from group lessons to private PGA coaching.',
        href: '/cost/golf-lesson-prices-bangkok',
        imgLabel: 'Lesson pricing',
      },
    ],
  },
  {
    label: 'Corporate Events',
    articles: [
      {
        cat: 'Planning Guide',
        title: 'Corporate golf events in Bangkok — complete planning guide',
        desc: 'Outdoor vs indoor options, venue comparison, what packages include, and how to organise a team golf event in Bangkok.',
        href: '/guide/corporate-golf-events-bangkok',
        imgLabel: 'Corporate golf event',
      },
      {
        cat: 'Guide',
        title: 'Golf tournament packages in Bangkok',
        desc: "Options for organising a full golf day or mini tournament — from full-course buyouts to simulator competitions.",
        href: '/guide/golf-tournament-packages-bangkok',
        imgLabel: 'Golf tournament',
      },
      {
        cat: 'Cost Guide',
        title: 'How much does a corporate golf event cost in Bangkok?',
        desc: 'Price breakdown for venue hire, packages, catering, and equipment for team golf events.',
        href: '/cost/corporate-golf-event-cost-bangkok',
        imgLabel: 'Event cost',
      },
    ],
  },
]

export default function GroundTabsClient() {
  const [activeTab, setActiveTab] = useState(0)
  const articles = TABS[activeTab].articles

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-0 mb-8 border-b overflow-x-auto"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        role="tablist"
        aria-label="On the ground topics"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            id={`ground-tab-${i}`}
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`ground-panel-${i}`}
            onClick={() => setActiveTab(i)}
            className="px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 flex-shrink-0"
            style={{
              color: activeTab === i ? '#fff' : 'rgba(255,255,255,0.4)',
              borderBottomColor: activeTab === i ? '#C8A050' : 'transparent',
              background: 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Article list */}
      <div
        id={`ground-panel-${activeTab}`}
        className="divide-y"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        role="tabpanel"
        aria-labelledby={`ground-tab-${activeTab}`}
      >
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href as Parameters<typeof Link>[0]['href']}
            className="flex items-stretch gap-0 group transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {/* Thumbnail */}
            <div
              className="w-32 flex-shrink-0 border-r flex items-center justify-center"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: 'linear-gradient(135deg, #1A4D30 0%, #2A5A3C 100%)',
                minHeight: '90px',
              }}
            >
              <span
                className="text-center px-2 leading-tight"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {article.imgLabel}
              </span>
            </div>

            {/* Body */}
            <div
              className="flex flex-col gap-1 py-4 px-5 group-hover:bg-white/[0.03] transition-colors flex-1"
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#C8A050',
                }}
              >
                {article.cat}
              </span>
              <span className="text-sm font-semibold leading-snug text-white group-hover:text-[#C8A050] transition-colors">
                {article.title}
              </span>
              <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {article.desc}
              </span>
            </div>

            {/* Arrow */}
            <div className="flex items-center pr-4 flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* LENGOLF inline callout — only shown in Indoor tab */}
      {activeTab === 1 && (
        <div
          className="mt-6 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{
            background: 'rgba(200,160,80,0.1)',
            border: '1px solid rgba(200,160,80,0.25)',
          }}
        >
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: '#C8A050', fontFamily: 'var(--font-mono, monospace)' }}
            >
              LENGOLF — Best-rated in Bangkok
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Mercury Ville @BTS Chidlom, Floor 4. Open daily 9am–11pm. Walk-in or book online — no experience needed.
            </p>
          </div>
          <a
            href="https://booking.len.golf/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide rounded px-5 py-2.5 transition-colors"
            style={{
              background: '#C8A050',
              color: '#1C1C1C',
              letterSpacing: '0.07em',
            }}
          >
            Book a Bay
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}
