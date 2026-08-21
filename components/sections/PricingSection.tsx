'use client'

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

export default function PricingSection() {
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
            Tarif unique par dépôt de 48h. Les comptes marchand et entreprise
            bénéficient de remises sur volume.
          </p>
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
            // Prix fixe (dépôt de 48h).
            const value = p.price.split(' / ')[0].replace(' FCFA', '')
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

                {/* Dimensions et charge admise du compartiment */}
                <dl className="mt-4 space-y-1.5 border-t border-brand-border pt-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">Dimensions</dt>
                    <dd className="font-body text-[13px] font-medium text-brand-gray">{p.dims}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">Poids</dt>
                    <dd className="font-body text-[13px] font-medium text-brand-gray">{p.weight}</dd>
                  </div>
                </dl>

                {/* Prix */}
                <div className="mt-6 mb-6 flex items-baseline gap-1.5">
                  <span className="font-heading font-bold text-3xl md:text-[32px] leading-none text-green-dark">
                    {value}
                  </span>
                  <span className="font-mono text-sm text-brand-mid">FCFA</span>
                  <span className="font-body text-sm text-brand-mid">/ 48h</span>
                </div>

                {/* CTA */}
                <Link
                  href="/reserver"
                  className={`btn-fill mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-body font-medium text-sm ${
                    featured
                      ? 'bg-green-primary text-white [--fill:#1B5E20]'
                      : 'bg-brand-off text-green-dark [--fill:#EBF7F0]'
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
