'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { impact } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function ImpactSection() {
  return (
    <section className="bg-brand-off">
      {/* pt réduit : suit Pourquoi (gris) — évite le vide doublé au joint de même couleur */}
      <Container className="pt-6 md:pt-10 pb-16 md:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-10 md:mb-14 max-w-2xl"
        >
          <SectionLabel className="mb-4">Impact local</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray mb-4">
            Un service pour tout le quartier.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed">
            Un casier est un équipement de proximité : il rend service aux
            habitants, soutient les commerçants du quartier et réduit la
            circulation liée aux livraisons.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {impact.map(({ icon: Icon, audience, points }) => (
            <motion.div
              key={audience}
              variants={fadeInUp}
              className="rounded-2xl border border-brand-border bg-white p-6 md:p-7 shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)]"
            >
              {/* Pastille icône 3D */}
              <div className="relative w-12 h-12 mb-5">
                <div className="absolute inset-0 rounded-full blur-2xl bg-green-primary/15" />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-green-primary to-green-dark rotate-[-8deg] flex items-center justify-center shadow-[0_14px_32px_-12px_rgba(31,71,40,0.45),inset_0_-6px_18px_rgba(0,0,0,0.18),inset_0_6px_12px_rgba(255,255,255,0.18)]">
                  <Icon size={22} className="text-white drop-shadow" strokeWidth={2} />
                </div>
              </div>

              <h3 className="font-heading font-bold text-lg text-brand-gray mb-4">{audience}</h3>

              <ul className="space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-soft text-green-dark">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="font-body text-sm text-brand-sub leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
