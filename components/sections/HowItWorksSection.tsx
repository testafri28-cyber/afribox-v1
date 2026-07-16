'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import ProcessStepper from '@/components/features/ProcessStepper'
import { fadeInUp } from '@/lib/animations'

export default function HowItWorksSection() {
  return (
    <section id="fonctionnement" className="bg-white">
      {/* pt réduit : suit Tarifs (blanc) — évite le vide doublé au joint de même couleur */}
      <Container className="pt-6 md:pt-10 pb-16 md:pb-24">
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
            6 étapes entièrement automatisées. Pas de coup de fil. Pas d&apos;attente.
          </p>
        </motion.div>
        <ProcessStepper />
      </Container>
    </section>
  )
}
