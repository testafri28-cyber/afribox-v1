'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { problems } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

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
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray mb-6 max-w-3xl">
            La livraison en Afrique mérite mieux.
          </h2>
          <p className="font-body text-lg text-brand-sub leading-relaxed max-w-3xl mb-12 md:mb-16">
            Commander en ligne, c&apos;est prendre un risque. Adresse introuvable,
            livreur injoignable, colis perdu. Afribox règle ça simplement : un
            casier près de chez vous, un code par SMS, et c&apos;est tout.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="bg-brand-off rounded-2xl p-6 md:p-8 border border-brand-border"
            >
              <p className="font-mono text-xs tracking-widest text-green-primary uppercase mb-3">
                0{i + 1}
              </p>
              <h3 className="font-heading font-bold text-xl text-brand-gray mb-3">
                {p.title}
              </h3>
              <p className="font-body text-brand-sub leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
