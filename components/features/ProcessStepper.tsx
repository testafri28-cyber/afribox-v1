'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { processSteps } from '@/lib/constants'

// Révélation en cascade des étapes.
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function ProcessStepper() {
  return (
    <div>
      {/* ---------- Desktop : frise horizontale compacte ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative hidden lg:block"
      >
        {/* Rail horizontal reliant les nœuds (borné aux 1er/dernier centres). */}
        <div aria-hidden className="absolute left-[8.33%] right-[8.33%] top-6 h-0.5 bg-brand-border" />
        <div className="grid grid-cols-6 gap-4">
          {processSteps.map((s) => {
            const Icon = s.visual.kind === 'sms' ? MessageSquare : s.visual.icon
            return (
              <motion.div key={s.id} variants={item} className="relative flex flex-col items-center px-1 text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-green-primary font-heading text-lg font-bold text-white ring-4 ring-white shadow-[0_8px_20px_-6px_rgba(11,61,27,0.5)]">
                  {s.id}
                </div>
                <span className="mt-4 flex h-9 w-9 items-center justify-center rounded-xl bg-green-bg text-green-primary">
                  <Icon size={17} />
                </span>
                <h3 className="mt-3 font-heading text-sm font-bold leading-tight text-brand-gray">{s.title}</h3>
                <p className="mt-1 font-body text-xs leading-snug text-brand-sub">{s.short}</p>
                {s.visual.kind === 'sms' && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-green-soft bg-green-bg px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-green-primary">
                    <MessageSquare size={12} />
                    {s.visual.code}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ---------- Mobile / tablette : grille 2 colonnes compacte ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden"
      >
        {processSteps.map((s) => {
          const Icon = s.visual.kind === 'sms' ? MessageSquare : s.visual.icon
          return (
            <motion.div
              key={s.id}
              variants={item}
              className="flex gap-3 rounded-2xl border border-brand-border bg-white p-4"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-primary font-heading text-sm font-bold text-white">
                {s.id}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-sm font-bold text-brand-gray">{s.title}</h3>
                  <Icon size={14} className="flex-shrink-0 text-green-primary" />
                </div>
                <p className="mt-1 font-body text-xs leading-snug text-brand-sub">{s.short}</p>
                {s.visual.kind === 'sms' && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-green-soft bg-green-bg px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest text-green-primary">
                    <MessageSquare size={12} />
                    {s.visual.code}
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* CTA final */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/reserver"
          style={{ '--fill': '#1B5E20' } as React.CSSProperties}
          className="btn-fill inline-flex items-center gap-2 rounded-full bg-green-primary px-6 py-3 font-body font-medium text-white"
        >
          Réserver un locker
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
