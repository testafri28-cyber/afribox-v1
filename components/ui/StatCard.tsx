'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'

type StatCardProps = {
  value: string
  label: string
  icon: LucideIcon
  hint?: string
  index?: number
  progress: number
}

function parseNumeric(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return null
  return { num: parseInt(match[1], 10), suffix: match[2] }
}

export default function StatCard({ value, label, icon: Icon, hint, index = 0, progress }: StatCardProps) {
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

  const pct = Math.max(0, Math.min(100, progress))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl bg-gradient-to-br from-white to-brand-off border border-brand-border p-5 md:p-6 shadow-[0_10px_30px_-14px_rgba(31,71,40,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden"
    >
      {/* Top — icon + label */}
      <div className="flex items-center gap-2 mb-5 min-w-0">
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-green-bg flex items-center justify-center">
          <Icon size={14} className="text-green-primary" />
        </span>
        <span className="font-heading font-semibold text-sm text-brand-gray truncate">
          {label}
        </span>
      </div>

      {/* Big number */}
      <p className="font-heading font-bold text-4xl md:text-5xl leading-none tracking-tight text-brand-gray">
        {display}
      </p>

      {/* Trend pill — sits between number and progress bar */}
      {hint && (
        <span className="inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full bg-green-bg text-green-dark font-body text-[10px] font-medium">
          <ArrowUpRight size={10} />
          {hint}
        </span>
      )}

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-1.5 rounded-full bg-green-bg overflow-hidden">
          <motion.span
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : {}}
            transition={{ duration: 0.9, delay: index * 0.12 + 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full rounded-full bg-green-primary"
          />
        </div>
        <span className="block mt-2 font-mono text-[10px] tracking-widest uppercase text-brand-sub">
          {pct}%
        </span>
      </div>
    </motion.div>
  )
}
