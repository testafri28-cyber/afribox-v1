'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type StatCardProps = {
  value: string
  label: string
}

// Tente d'extraire un nombre pour animation count-up.
// Si la valeur n'est pas un nombre (ex: "24/7"), on l'affiche telle quelle.
function parseNumeric(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return null
  return { num: parseInt(match[1], 10), suffix: match[2] }
}

export default function StatCard({ value, label }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const numeric = parseNumeric(value)
  const [display, setDisplay] = useState<string>(numeric ? '0' + numeric.suffix : value)

  useEffect(() => {
    if (!inView || !numeric) {
      if (!numeric) setDisplay(value)
      return
    }
    const duration = 900
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(numeric.num * eased)
      setDisplay(current + numeric.suffix)
      if (t < 1) raf = requestAnimationFrame(tick)
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
