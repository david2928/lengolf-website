'use client'

import { useEffect, useState } from 'react'

const STAGES = ['stage-plan', 'stage-book', 'stage-travel', 'stage-ground'] as const
const LABELS = ['Plan', 'Book', 'Travel', 'On the Ground'] as const
const stageColors = ['#C8A050', '#4A8B6F', '#E87B4A', '#005A32'] as const

export default function StageNavClient() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('[data-hero]') as HTMLElement | null
    const els = STAGES.map((id) => document.getElementById(id))

    function update() {
      if (hero) {
        setVisible(hero.getBoundingClientRect().bottom < 0)
      } else {
        setVisible(window.scrollY > 300)
      }

      const OFFSET = window.innerHeight * 0.5
      let idx = 0
      for (let i = 0; i < els.length; i++) {
        const el = els[i]
        if (el && el.getBoundingClientRect().top <= OFFSET) {
          idx = i
        }
      }
      setActive(idx)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  function handleClick(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    // Outer wrapper: fixed, full-width with side insets, flex-centered
    <div
      className="fixed z-40 flex justify-center transition-all duration-300"
      style={{
        top: '88px', // header is 80px; add 8px breathing room
        left: 0,
        right: 0,
        paddingLeft: '10px',
        paddingRight: '10px',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      }}
    >
      <nav
        aria-label="Journey stages"
        className="flex items-center gap-1 rounded-full px-2 py-1.5 shadow-xl"
        style={{
          background: '#1C1C1C',
          // On narrow viewports the pill fits within the padded wrapper;
          // on wide viewports it shrinks to content width via inline-flex behaviour.
          width: '100%',
          maxWidth: '560px',
        }}
      >
        {STAGES.map((id, i) => {
          const isActive = active === i
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              aria-current={isActive ? 'true' : undefined}
              // flex-1 so buttons share space equally on any width
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-[10px] font-semibold uppercase transition-all duration-200 whitespace-nowrap"
              style={{
                background: isActive ? stageColors[i] : 'transparent',
                color: isActive ? (i === 3 ? '#fff' : '#1C1C1C') : 'rgba(255,255,255,0.4)',
                letterSpacing: '0.05em',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                style={{
                  background: isActive ? (i === 3 ? '#fff' : '#1C1C1C') : 'currentColor',
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? 'scale(1.4)' : 'scale(1)',
                }}
              />
              {LABELS[i]}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
