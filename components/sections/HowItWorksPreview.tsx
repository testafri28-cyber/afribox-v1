'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'
import { previewSteps } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function HowItWorksPreview() {
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
          <SectionLabel className="mb-4">Comment ça marche</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
            Simple comme 1, 2, 3.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {previewSteps.map(({ icon: Icon, number, title, text }) => (
            <motion.article
              key={number}
              variants={fadeUp}
              className="relative overflow-hidden bg-white rounded-2xl p-7 md:p-8 border border-brand-border shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(31,71,40,0.15)] transition-shadow"
            >
              <GridBackground tone="green" />
              <div className="relative">
                {/* Ligne sup : icône à gauche, gros numéro fantôme à droite */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-green-bg flex items-center justify-center">
                    <Icon size={22} className="text-green-primary" />
                  </div>
                  <span
                    className="font-heading font-bold text-5xl md:text-6xl leading-none select-none"
                    style={{ color: 'rgba(39, 174, 96, 0.12)' }}
                  >
                    {number}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-gray mb-3">
                  {title}
                </h3>
                <p className="font-body text-brand-sub leading-relaxed">{text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10"
        >
          <Link
            href="/comment-ca-marche"
            className="inline-flex items-center gap-2 font-body font-medium text-green-primary hover:text-green-dark transition"
          >
            Voir le fonctionnement complet
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
