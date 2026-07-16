'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { pricing } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'

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
            Tarifs grand public. Les comptes marchand et entreprise bénéficient de
            remises sur volume.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          {/* overflow-x-auto : sur écran très étroit (<360px) la table défile au
              lieu de rogner la colonne des prix ; à partir de 360px elle tient. */}
          <div className="overflow-x-auto border border-brand-border rounded-2xl">
            <table className="w-full min-w-[300px]">
              <thead className="bg-brand-off">
                <tr>
                  <th className="text-left font-mono text-xs tracking-widest text-brand-mid uppercase py-4 px-4 md:px-6">
                    Taille
                  </th>
                  <th className="text-left font-mono text-xs tracking-widest text-brand-mid uppercase py-4 px-4 md:px-6">
                    Usage type
                  </th>
                  <th className="text-right font-mono text-xs tracking-widest text-brand-mid uppercase py-4 px-4 md:px-6">
                    Tarif
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, i) => (
                  <tr
                    key={p.size}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-brand-off/50'}
                  >
                    <td className="py-5 px-4 md:px-6 font-heading font-bold text-brand-gray">
                      {p.size}
                    </td>
                    <td className="py-5 px-4 md:px-6 font-body text-brand-sub">{p.use}</td>
                    <td className="py-5 px-4 md:px-6 text-right font-mono font-semibold text-green-primary">
                      {p.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="font-body text-sm text-brand-mid mt-5">
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
        </motion.div>
      </Container>
    </section>
  )
}
