'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'
import { services } from '@/lib/constants'

// Pose de Locky par service (même ordre que `services` : Marchands, Particuliers,
// PME). Dimensions réelles des WebP pour conserver le bon ratio.
const mascots = [
  { src: '/locky-marchand.webp',    w: 284, h: 720 }, // présente le téléphone
  { src: '/locky-particulier.webp', w: 258, h: 720 }, // tend le colis
  { src: '/locky-pme.webp',         w: 431, h: 720 }, // presse-papier + colis
]

export default function ServicesAccordion() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <div className="mb-12">
          <SectionLabel className="mb-4">Nos services</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray">
            Pour chaque besoin, une solution.
          </h2>
        </div>

        {/* Desktop — accordéon horizontal */}
        <div className="hidden md:flex gap-2 h-[380px] rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <motion.div
              key={s.tag}
              className="relative overflow-hidden cursor-pointer rounded-2xl"
              animate={{ flex: active === i ? 3 : 0.22 }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => setActive(i)}
              style={{
                backgroundImage:
                  active === i
                    ? 'linear-gradient(155deg, #1B5E20 0%, #27AE60 100%)'
                    : 'linear-gradient(180deg, #1B5E20 0%, #0B3D1B 100%)',
              }}
            >
              {/* Texture de motifs (remplace l'ancienne photo de fond). */}
              <GridBackground tone="white" />

              {/* Locky — une pose par service (il pilote / remet le colis /
                  gère le volume). Desktop lg uniquement. */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    key="locky"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="pointer-events-none absolute bottom-0 right-3 z-[1] hidden lg:block"
                    aria-hidden
                  >
                    <span className="absolute bottom-20 right-8 h-52 w-52 rounded-full bg-green-light/30 blur-3xl" />
                    <Image
                      src={mascots[i].src}
                      alt=""
                      width={mascots[i].w}
                      height={mascots[i].h}
                      className="relative h-[338px] w-auto drop-shadow-2xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Label vertical (inactif) */}
              <AnimatePresence>
                {active !== i && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    /* Texte vertical ancré par le bas (writing-mode + rotate-180) :
                       tous les titres partent de la même ligne, quelle que soit
                       leur longueur — contrairement à un -rotate-90 centré. */
                    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rotate-180 whitespace-nowrap [writing-mode:vertical-rl] text-white text-sm font-bold font-heading"
                  >
                    {s.tag}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Contenu actif */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 z-10 p-7 lg:pr-[42%]"
                  >
                    <span className="inline-block font-mono text-[10px] tracking-widest uppercase bg-white/20 text-white rounded-full px-3 py-1 mb-3">
                      {s.tag}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-white mb-2">{s.title}</h3>
                    <p className="font-body text-white/80 text-sm mb-4 max-w-xs">{s.text}</p>
                    <ul className="space-y-1.5 mb-5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-white/90 text-sm font-body">
                          <ArrowRight size={14} className="text-green-light flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={s.ctaHref}
                      className="btn-fill [--fill:#EBF7F0] inline-flex items-center gap-2 bg-white text-green-dark font-body font-medium text-sm rounded-full px-5 py-2.5 transition-transform"
                    >
                      {s.cta}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile — accordéon vertical */}
        <div className="md:hidden space-y-3">
          {services.map((s, i) => (
            <div key={s.tag} className="rounded-2xl overflow-hidden border border-brand-border">
              <button
                onClick={() => setActive(active === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 bg-white text-left"
              >
                <span className="font-heading font-bold text-brand-gray">{s.tag}</span>
                <motion.div animate={{ rotate: active === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={18} className="text-green-primary" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    transition={{ duration: 0.28 }} className="overflow-hidden"
                  >
                    <div className="p-5 bg-white">
                      <h3 className="font-heading font-bold text-xl text-brand-gray mb-2">{s.title}</h3>
                      <p className="font-body text-brand-sub text-sm mb-4">{s.text}</p>
                      <ul className="space-y-2 mb-5">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-brand-gray text-sm">
                            <Check size={14} className="text-green-primary flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <a href={s.ctaHref} className="btn-fill [--fill:#1B5E20] inline-flex items-center gap-2 bg-green-primary text-white font-body font-medium text-sm rounded-full px-5 py-2.5 transition-transform">
                        {s.cta}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
