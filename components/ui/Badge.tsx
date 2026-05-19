import type { ReactNode } from 'react'

type Tone = 'green' | 'soft' | 'dark' | 'white' | 'neutral'

type BadgeProps = {
  children: ReactNode
  tone?: Tone
  className?: string
}

const tones: Record<Tone, string> = {
  green: 'bg-green-primary text-white',
  soft: 'bg-green-soft text-green-dark',
  dark: 'bg-green-dark text-white',
  white: 'bg-white text-green-dark border border-brand-border',
  neutral: 'bg-brand-off text-brand-gray border border-brand-border',
}

export default function Badge({ children, tone = 'soft', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
