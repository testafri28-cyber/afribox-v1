'use client'

import { motion } from 'framer-motion'
import { X, Check, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// Douleurs (gauche) et réponses Afribox (droite) — même ordre pour le miroir.
const pains = [
  'Adresse introuvable, le livreur tourne en rond',
  'Appels sans réponse, livraison ratée',
  'Colis égaré ou jamais arrivé',
  'Bloqué chez soi à attendre toute la journée',
]
const solutions = [
  'Un casier intelligent près de chez vous',
  'Un code de retrait par SMS, à usage unique',
  'Récupération 24h/24, quand ça vous arrange',
  'Dépôt en 60 secondes, zéro coup de fil',
]

export default function ProblemSection() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <SectionLabel className="mb-4">Le problème que nous résolvons</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray mb-6 max-w-3xl">
            La livraison en Afrique mérite mieux.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-3xl mb-12 md:mb-16">
            Commander en ligne, c&apos;est prendre un risque. Adresse introuvable,
            livreur injoignable, colis perdu. Afribox règle ça simplement : un
            casier près de chez vous, un code par SMS, et c&apos;est tout.
          </p>
        </motion.div>

        {/* Contraste Sans / Avec */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          {/* Sans Afribox — la douleur */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-2xl border border-brand-border bg-brand-off p-6 md:p-8"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-brand-mid mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-mid" />
              Sans Afribox
            </span>
            <ul className="space-y-4">
              {pains.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-mid ring-1 ring-brand-border">
                    <X size={13} strokeWidth={2.5} />
                  </span>
                  <span className="font-body text-brand-sub leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Avec Afribox — la solution */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
            className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-white shadow-[0_20px_50px_-24px_rgba(11,61,27,0.6)]"
            style={{ backgroundImage: 'linear-gradient(135deg, #1B5E20 0%, #27AE60 100%)' }}
          >
            <GridBackground tone="white" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-white/80 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-green-light animate-pulse" />
                Avec Afribox
              </span>
              <ul className="space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="font-body text-white/90 leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Flèche de transformation (desktop) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 hidden md:flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center rounded-full bg-white text-green-primary ring-1 ring-brand-border shadow-[0_10px_24px_-10px_rgba(11,61,27,0.45)]"
          >
            <ArrowRight size={18} />
          </div>
        </div>
      </Container>
    </section>
  )
}
