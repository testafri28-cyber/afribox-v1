'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { whyAfribox } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// Placement explicite des 4 raisons numérotées sur la grille lg (bloc 2×2 à
// gauche) ; la carte-héros occupe la 3e colonne sur 2 rangées.
const lgPos = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-2 lg:row-start-1',
  'lg:col-start-1 lg:row-start-2',
  'lg:col-start-2 lg:row-start-2',
]

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
            // La dernière raison (« Conçu pour l'Afrique ») devient la carte-héros
            // verticale avec Locky ; les 4 autres restent des cartes numérotées.
            const isHero = i === whyAfribox.length - 1

            if (isHero) {
              return (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  className="relative overflow-hidden rounded-2xl border border-green-soft bg-gradient-to-b from-green-bg to-white shadow-[0_10px_40px_-14px_rgba(31,71,40,0.35)] flex flex-col md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-2"
                >
                  <div className="relative z-10 p-6 md:p-7">
                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-2 text-brand-gray">{title}</h3>
                    <p className="font-body text-sm leading-relaxed text-brand-sub max-w-xs">{text}</p>
                  </div>

                  {/* Symbole baobab-réseau : le réseau de casiers qui s'étend
                      comme un arbre à travers l'Afrique. */}
                  <div className="relative mt-auto flex items-end justify-center px-6 pb-6 pt-2">
                    <Image
                      src="/logo.svg"
                      alt="Le réseau de lockers Afribox qui s'étend à travers l'Afrique"
                      width={797}
                      height={1109}
                      unoptimized
                      className="h-[230px] md:h-[300px] lg:h-[320px] w-auto drop-shadow-[0_12px_24px_rgba(31,71,40,0.16)]"
                    />
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={title}
                variants={fadeInUp}
                className={`relative overflow-hidden rounded-2xl p-5 md:p-6 border border-brand-border bg-white shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(31,71,40,0.15)] transition-shadow ${lgPos[i]}`}
              >
                {/* Numéro fantôme */}
                <span
                  aria-hidden
                  className="absolute top-4 right-5 md:top-5 md:right-6 z-10 font-heading font-bold text-4xl md:text-5xl leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(39, 174, 96, 0.14)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  {/* Visuel 3D — icône en pastille */}
                  <div className="relative w-14 h-14 md:w-[58px] md:h-[58px] mb-5">
                    <div className="absolute inset-0 rounded-full blur-2xl bg-green-primary/15" />
                    <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-green-primary to-green-dark shadow-[0_18px_40px_-12px_rgba(31,71,40,0.45),inset_0_-8px_24px_rgba(0,0,0,0.18),inset_0_8px_16px_rgba(255,255,255,0.18)] rotate-[-8deg] flex items-center justify-center">
                      <Icon size={24} className="text-white drop-shadow-md" strokeWidth={2} />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg md:text-xl mb-2 text-brand-gray">
                    {title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-brand-sub">
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
