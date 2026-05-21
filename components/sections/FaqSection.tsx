'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import FAQAccordion from '@/components/features/FAQAccordion'
import { fadeInUp } from '@/lib/animations'

export default function FaqSection() {
  return (
    <section id="faq" className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-12 max-w-2xl"
        >
          <SectionLabel className="mb-4">FAQ</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
            Questions fréquentes.
          </h2>
        </motion.div>
        <FAQAccordion />
      </Container>
    </section>
  )
}
