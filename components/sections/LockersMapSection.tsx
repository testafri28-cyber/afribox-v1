'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import LockersMap from '@/components/features/LockersMap'
import { fadeInUp } from '@/lib/animations'

export default function LockersMapSection() {
  return (
    <section id="lockers" className="bg-white">
      {/* pt réduit : suit L'app (blanc) — évite le vide doublé au joint de même couleur */}
      <Container className="pt-6 md:pt-10 pb-16 md:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-10"
        >
          <SectionLabel className="mb-4">Réseau de lockers</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray mb-4">
            Trouvez un locker près de vous.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub max-w-xl">
            4 points de retrait à Abidjan. Le réseau s&apos;étend.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="h-[280px] sm:h-[380px] md:h-[480px]">
            <LockersMap height="100%" />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
