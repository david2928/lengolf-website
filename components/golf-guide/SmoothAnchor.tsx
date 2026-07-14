'use client'

import type { ReactNode, CSSProperties } from 'react'

interface SmoothAnchorProps {
  targetId: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function SmoothAnchor({ targetId, children, className, style }: SmoothAnchorProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  )
}
