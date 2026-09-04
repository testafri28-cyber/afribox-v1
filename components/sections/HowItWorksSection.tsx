'use client'

import { useDict } from '@/lib/i18n/LocaleProvider'
import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import ProcessStepper from '@/components/features/ProcessStepper'
import { fadeInUp } from '@/lib/animations'

export default function HowItWorksSection() {
  const d = useDict()
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
          <SectionLabel className="mb-4">{d.ui.howItWorks.label}</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray max-w-2xl">
            {d.ui.howItWorks.title}
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-2xl mt-4">
            {d.ui.howItWorks.lede}
          </p>
        </motion.div>
        <ProcessStepper />
      </Container>
    </section>
  )
}
