'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, PackageOpen, Boxes, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { pricing } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// Icône + libellé d'accroche par taille (aligné sur l'ordre de `pricing`).
const meta = [
  { icon: Package,     tagline: 'L’essentiel' },
  { icon: PackageOpen, tagline: 'Le plus polyvalent' },
  { icon: Boxes,       tagline: 'Grand volume' },
]

// Durées de dépôt et coefficients — identiques au formulaire de réservation.
const durations = [
  { key: '24h', mult: 1 },
  { key: '48h', mult: 1.6 },
  { key: '72h', mult: 2.2 },
] as const

export default function PricingSection() {
  const [dur, setDur] = useState<(typeof durations)[number]>(durations[0])

  return (
    <section id="tarifs" className="bg-white">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <SectionLabel className="mb-4">Tarifs</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray">
            Trois tailles. Trois prix. C&apos;est tout.
          </h2>
          <p className="font-body text-lg text-brand-sub mt-5">
            Tarifs grand public. Les comptes marchand et entreprise bénéficient de
            remises sur volume.
          </p>
        </motion.div>

        {/* Sélecteur de durée — recalcule les prix affichés. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-brand-mid">
            Durée de dépôt
          </p>
          <div
            role="group"
            aria-label="Durée de dépôt"
            className="inline-flex items-center gap-1 self-start rounded-full border border-brand-border bg-white p-1"
          >
            {durations.map((d) => {
              const active = d.key === dur.key
              return (
                <button
                  key={d.key}
                  onClick={() => setDur(d)}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors ${
                    active
                      ? 'bg-green-primary text-white'
                      : 'text-brand-sub hover:text-green-dark'
                  }`}
                >
                  {d.key}
                </button>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {pricing.map((p, i) => {
            const { icon: Icon, tagline } = meta[i]
            // Prix de base (par 24h) recalculé selon la durée sélectionnée.
            const base = parseInt(p.price.split(' / ')[0].replace(/\D/g, ''), 10)
            const value = Math.round(base * dur.mult).toLocaleString('fr-FR')
            const featured = i === 1
            const segments = i + 1

            return (
              <motion.div
                key={p.size}
                variants={fadeInUp}
                className={`group relative flex flex-col rounded-2xl border p-6 md:p-7 transition-all duration-300 ${
                  featured
                    ? 'border-green-primary bg-green-bg/50 shadow-[0_24px_55px_-26px_rgba(11,61,27,0.6)] md:-translate-y-2'
                    : 'border-brand-border bg-white hover:border-green-primary/40 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(11,61,27,0.4)]'
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-green-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    {tagline}
                  </span>
                )}

                {/* Icône + jauge de taille */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                      featured
                        ? 'bg-green-primary text-white'
                        : 'bg-green-bg text-green-primary group-hover:bg-green-primary group-hover:text-white'
                    }`}
                  >
                    <Icon size={22} />
                  </span>
                  <div className="flex items-end gap-1" aria-hidden="true">
                    {[0, 1, 2].map((s) => (
                      <span
                        key={s}
                        className={`w-1.5 rounded-full transition-colors ${
                          s < segments ? 'bg-green-primary' : 'bg-brand-border'
                        }`}
                        style={{ height: `${8 + s * 6}px` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Taille + usage */}
                {!featured && (
                  <p className="font-mono text-[10px] tracking-widest uppercase text-brand-mid mb-1">
                    {tagline}
                  </p>
                )}
                <h3 className="font-heading font-bold text-xl text-brand-gray">
                  {p.size}
                </h3>
                <p className="font-body text-sm text-brand-sub mt-1">{p.use}</p>

                {/* Prix */}
                <div className="mt-6 mb-6 flex items-baseline gap-1.5">
                  <motion.span
                    key={dur.key}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-heading font-bold text-3xl md:text-[32px] leading-none text-green-dark"
                  >
                    {value}
                  </motion.span>
                  <span className="font-mono text-sm text-brand-mid">FCFA</span>
                  <span className="font-body text-sm text-brand-mid">/ {dur.key}</span>
                </div>

                {/* CTA */}
                <Link
                  href="/reserver"
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-body font-medium text-sm transition-colors ${
                    featured
                      ? 'bg-green-primary text-white hover:bg-green-dark'
                      : 'bg-brand-off text-green-dark hover:bg-green-bg'
                  }`}
                >
                  Réserver ce format
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <p className="font-body text-sm text-brand-mid mt-6">
          Comptes marchand et entreprise : tarification dégressive selon le
          volume.{' '}
          <a
            href="#contact"
            className="text-green-primary hover:text-green-dark underline transition"
          >
            Demander un devis
          </a>
          .
        </p>
      </Container>
    </section>
  )
}
