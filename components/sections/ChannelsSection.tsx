'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'
import { channels } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function ChannelsSection() {
  return (
    <section className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <SectionLabel className="mb-4">Canaux d&apos;accès</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
            Utilisez Afribox comme vous le souhaitez.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {channels.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="relative overflow-hidden bg-white rounded-2xl p-6 md:p-8 border border-brand-border"
            >
              <GridBackground tone="green" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-green-bg flex items-center justify-center mb-5">
                  <Icon size={22} className="text-green-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-gray mb-3">
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
