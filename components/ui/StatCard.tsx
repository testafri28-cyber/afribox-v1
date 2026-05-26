'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TrendingUp, type LucideIcon } from 'lucide-react'

type StatCardProps = {
  value: string
  label: string
  icon: LucideIcon
  hint?: string
  tone?: 'green' | 'soft'
}

const toneMap = {
  green: {
    band:    'bg-green-primary',
    bandText:'text-white',
    iconBg:  'bg-white text-green-dark',
    inset:   'bg-brand-gray text-white',
    insetHint: 'text-white/75',
    hintIcon:'text-green-light',
  },
  soft: {
    band:    'bg-green-bg',
    bandText:'text-green-dark',
    iconBg:  'bg-green-primary text-white',
    inset:   'bg-white text-brand-gray border border-brand-border',
    insetHint: 'text-brand-sub',
    hintIcon:'text-green-primary',
  },
} as const

function parseNumeric(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return null
  return { num: parseInt(match[1], 10), suffix: match[2] }
}

export default function StatCard({ value, label, icon: Icon, hint, tone = 'green' }: StatCardProps) {
  const t = toneMap[tone]
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const numeric = useMemo(() => parseNumeric(value), [value])
  const [display, setDisplay] = useState<string>(numeric ? '0' + numeric.suffix : value)

  useEffect(() => {
    if (!inView || !numeric) {
      if (!numeric) setDisplay(value)
      return
    }
    const duration = 1600
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(numeric.num * eased)
      setDisplay(current.toLocaleString('fr-FR') + numeric.suffix)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(numeric.num.toLocaleString('fr-FR') + numeric.suffix)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, numeric, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative rounded-2xl p-3 pb-1 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] ${t.band}`}
    >
      {/* Top band — label + icon button */}
      <div className="flex items-center justify-between px-2 pt-1 pb-3">
        <span className={`font-heading font-semibold text-sm md:text-base ${t.bandText}`}>
          {label}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${t.iconBg}`}>
          <Icon size={14} />
        </span>
      </div>

      {/* Inset card — big number + hint */}
      <div className={`rounded-xl px-4 py-4 md:px-5 md:py-5 ${t.inset}`}>
        <p className="font-heading font-bold text-3xl md:text-4xl leading-none tracking-tight">
          {display}
        </p>
        {hint && (
          <div className="flex items-center gap-1.5 mt-3">
            <TrendingUp size={12} className={`flex-shrink-0 ${t.hintIcon}`} />
            <span className={`font-body text-[11px] md:text-xs leading-tight ${t.insetHint}`}>
              {hint}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
