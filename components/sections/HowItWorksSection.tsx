'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import ProcessStepper from '@/components/features/ProcessStepper'
import { fadeInUp } from '@/lib/animations'

export default function HowItWorksSection() {
  return (
    <section id="fonctionnement" className="bg-white">
      {/* Suit Services (gris) : la couleur alterne, espacement plein. */}
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-12"
        >
          <SectionLabel className="mb-4">Comment ça marche</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray max-w-2xl">
            De la commande à la récupération.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-2xl mt-4">
            De la commande au retrait, en 3 temps. Entièrement automatisé — pas de
            coup de fil, pas d&apos;attente.
          </p>
        </motion.div>
        <ProcessStepper />
      </Container>
    </section>
  )
}
