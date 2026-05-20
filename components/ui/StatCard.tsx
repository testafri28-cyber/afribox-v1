'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

type StatCardProps = {
  value: string
  label: string
}

function parseNumeric(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return null
  return { num: parseInt(match[1], 10), suffix: match[2] }
}

export default function StatCard({ value, label }: StatCardProps) {
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
      className="flex flex-col items-start"
    >
      <p className="font-heading font-bold text-4xl md:text-5xl text-white leading-none">
        {display}
      </p>
      <p className="font-mono text-xs tracking-widest uppercase text-white/80 mt-3">
        {label}
      </p>
    </motion.div>
  )
}
