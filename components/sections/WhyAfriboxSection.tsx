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
          {whyAfribox.map(({ icon: Icon, title, text }, i) => {
            // La dernière carte remplit le trou de la grille (2 colonnes) et
            // devient la carte accent verte, comme dans les autres bento.
            const isAccent = i === whyAfribox.length - 1
            return (
              <motion.div
                key={title}
                variants={fadeInUp}
                className={`relative overflow-hidden rounded-2xl p-7 md:p-8 shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(31,71,40,0.15)] transition-shadow ${
                  isAccent
                    ? 'md:col-span-2 border border-green-dark text-white bg-gradient-to-br from-green-dark to-green-primary'
                    : 'border border-brand-border bg-white'
                }`}
              >
                {isAccent && <GridBackground tone="white" />}

                {/* Numéro fantôme */}
                <span
                  aria-hidden
                  className="absolute top-4 right-5 md:top-5 md:right-6 z-10 font-heading font-bold text-5xl md:text-6xl leading-none select-none pointer-events-none"
                  style={{ color: isAccent ? 'rgba(255,255,255,0.16)' : 'rgba(39, 174, 96, 0.14)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  {/* Visuel 3D — même recette que les autres cartes numérotées */}
                  <div className="relative w-16 h-16 md:w-[70px] md:h-[70px] mb-6">
                    <div className={`absolute inset-0 rounded-full blur-2xl ${isAccent ? 'bg-green-dark/40' : 'bg-green-primary/15'}`} />
                    <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${isAccent ? 'from-green-light to-green-primary' : 'from-green-primary to-green-dark'} shadow-[0_18px_40px_-12px_rgba(31,71,40,0.45),inset_0_-8px_24px_rgba(0,0,0,0.18),inset_0_8px_16px_rgba(255,255,255,0.18)] rotate-[-8deg] flex items-center justify-center`}>
                      <Icon size={28} className="text-white drop-shadow-md" strokeWidth={2} />
                    </div>
                  </div>

                  <h3 className={`font-heading font-bold text-xl md:text-2xl mb-3 ${isAccent ? 'text-white' : 'text-brand-gray'}`}>
                    {title}
                  </h3>
                  <p className={`font-body leading-relaxed ${isAccent ? 'text-white/85' : 'text-brand-sub'}`}>
                    {text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
