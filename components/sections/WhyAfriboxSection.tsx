'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'
import { whyAfribox } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function WhyAfriboxSection() {
  return (
    <section id="pourquoi" className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <SectionLabel className="mb-4">Pourquoi Afribox</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray">
            Cinq raisons concrètes.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyAfribox.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="relative overflow-hidden bg-white border border-brand-border rounded-2xl p-7 md:p-8 shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(31,71,40,0.15)] transition-shadow"
            >
              <GridBackground tone="green" />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-green-bg flex items-center justify-center">
                    <Icon size={22} className="text-green-primary" />
                  </div>
                  <span
                    className="font-heading font-bold text-5xl md:text-6xl leading-none select-none"
                    style={{ color: 'rgba(39, 174, 96, 0.12)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-gray mb-3">
                  {title}
                </h3>
                <p className="font-body text-brand-sub leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
