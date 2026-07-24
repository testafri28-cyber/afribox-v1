'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { processSteps } from '@/lib/constants'

export default function ProcessStepper() {
  const timelineRef = useRef<HTMLDivElement>(null)
  // Progression du remplissage du rail : suit le scroll à travers la timeline.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 55%'],
  })

  return (
    <div>
      <div ref={timelineRef} className="relative">
        {/* Rail vertical : trait gris + remplissage vert animé au scroll. */}
        <div
          aria-hidden
          className="absolute left-[19px] md:left-[23px] top-6 bottom-6 w-0.5 bg-brand-border"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className="absolute left-[19px] md:left-[23px] top-6 bottom-6 w-0.5 origin-top bg-green-primary"
        />

        <div className="space-y-6 md:space-y-8">
          {processSteps.map((s) => {
            const Icon = s.visual.kind === 'sms' ? MessageSquare : s.visual.icon
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative flex gap-4 md:gap-7"
              >
                {/* Nœud numéroté */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-green-primary font-heading text-base md:text-lg font-bold text-white ring-4 ring-white shadow-[0_8px_20px_-6px_rgba(11,61,27,0.5)]">
                    {s.id}
                  </div>
                </div>

                {/* Carte de l'étape */}
                <div className="flex-1 rounded-2xl border border-brand-border bg-white p-5 md:p-6 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(11,61,27,0.35)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-green-primary mb-1.5">
                        {s.tag}
                      </p>
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-gray">
                        {s.title}
                      </h3>
                    </div>
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-green-bg text-green-primary">
                      <Icon size={20} />
                    </span>
                  </div>

                  <p className="font-body text-brand-sub leading-relaxed mt-3">
                    {s.text}
                  </p>

                  {/* Code SMS affiché en ligne (étapes 3 & 5). */}
                  {s.visual.kind === 'sms' && (
                    <div className="mt-4 inline-flex items-center gap-3 rounded-xl border border-green-soft bg-green-bg px-4 py-2.5">
                      <MessageSquare size={16} className="text-green-primary" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-green-dark">
                        Code&nbsp;SMS
                      </span>
                      <span className="font-mono text-lg font-bold tracking-widest text-green-primary">
                        {s.visual.code}
                      </span>
                    </div>
                  )}

                  {/* Relais entre acteurs. */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {s.actors.map((a, idx) => (
                      <span key={a} className="inline-flex items-center gap-1.5">
                        {idx > 0 && (
                          <ArrowRight size={12} className="text-brand-mid" aria-hidden />
                        )}
                        <span className="font-mono text-[10px] tracking-widest uppercase rounded-full bg-brand-off px-2.5 py-1 text-brand-sub">
                          {a}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA final */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/reserver"
          className="inline-flex items-center gap-2 rounded-full bg-green-primary px-6 py-3 font-body font-medium text-white transition hover:bg-green-dark"
        >
          Réserver un locker
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
