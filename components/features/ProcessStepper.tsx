'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { processSteps } from '@/lib/constants'

const columns = [processSteps.slice(0, 3), processSteps.slice(3)]

export default function ProcessStepper() {
  return (
    <div>
      {/* Liste épurée : 2 colonnes (1·2·3 / 4·5·6), rangées séparées par un
          filet fin. Aucune carte — lecture rapide et légère. */}
      <div className="grid gap-x-8 md:grid-cols-2 md:gap-x-16">
        {columns.map((col, ci) => (
          <div
            key={ci}
            className={`divide-y divide-brand-border ${
              ci === 1 ? 'border-t border-brand-border md:border-t-0' : ''
            }`}
          >
            {col.map((s, j) => {
              const gi = ci * 3 + j
              const Icon = s.visual.kind === 'sms' ? MessageSquare : s.visual.icon
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: gi * 0.05 }}
                  className="flex gap-4 py-5"
                >
                  <span className="w-6 flex-shrink-0 font-heading text-lg font-bold tabular-nums text-green-primary">
                    {s.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-base font-bold text-brand-gray">{s.title}</h3>
                      <Icon size={14} className="flex-shrink-0 text-brand-mid" />
                    </div>
                    <p className="mt-0.5 font-body text-sm leading-snug text-brand-sub">{s.short}</p>
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
          </div>
        ))}
      </div>

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
