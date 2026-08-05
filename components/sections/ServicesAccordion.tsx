'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Package, Undo2, Archive, Network } from 'lucide-react'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { services } from '@/lib/constants'

// Pose de Locky par service (même ordre que `services` : Marchands, Particuliers,
// PME). Dimensions réelles des WebP pour conserver le bon ratio.
const mascots = [
  { src: '/locky-marchand.webp',    w: 355, h: 900 }, // présente le téléphone
  { src: '/locky-particulier.webp', w: 323, h: 900 }, // tend le colis
  { src: '/locky-pme.webp',         w: 539, h: 900 }, // presse-papier + colis
]

// Le casier sert quatre usages, et se commande par six canaux (source : dossiers AFRIBOX).
const usages = [
  { icon: Package, title: 'E-commerce',         text: 'Le coursier dépose, vous retirez avec votre code.' },
  { icon: Undo2,   title: 'Envoi & retours',     text: 'Vous déposez, le coursier ou le marchand collecte.' },
  { icon: Archive, title: 'Entre particuliers',  text: 'Une remise locale, sans passer par un coursier.' },
  { icon: Network, title: 'Relais casier',       text: 'Des flux casier-à-casier — bientôt.' },
]
const channels = ['Site web', 'Application', 'WhatsApp', 'Au checkout marchand', 'Portail pro', 'Kiosque — sans compte']

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

        {/* Desktop — accordéon horizontal. overflow visible pour laisser
            Locky déborder au-dessus de la carte active. */}
        <div className="hidden md:flex gap-2 h-[380px]">
          {services.map((s, i) => (
            <motion.div
              key={s.tag}
              className={`relative cursor-pointer rounded-2xl border transition-colors ${
                active === i
                  ? 'overflow-visible border-green-soft bg-gradient-to-br from-white to-green-bg shadow-[0_20px_50px_-26px_rgba(27,94,32,0.5)]'
                  : 'overflow-hidden border-green-soft bg-green-soft'
              }`}
              animate={{ flex: active === i ? 3 : 0.22 }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => setActive(i)}
            >
              {/* Locky — grand format, déborde au-dessus de la carte (pose par
                  service : pilote / remet le colis / gère le volume). Pieds posés
                  en bas, tête au-dessus du bord. Ombre de contact discrète, pas
                  d'autre effet. Desktop lg uniquement. */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    key="locky"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute bottom-0 right-2 z-[2] hidden w-[48%] items-end justify-center lg:flex"
                    aria-hidden
                  >
                    {/* Ombre de contact au sol (douce, sur fond clair) */}
                    <span className="absolute bottom-2 left-1/2 h-5 w-40 -translate-x-1/2 rounded-[50%] bg-green-dark/15 blur-md" />
                    <Image
                      src={mascots[i].src}
                      alt=""
                      width={mascots[i].w}
                      height={mascots[i].h}
                      className="relative h-[430px] w-auto drop-shadow-[0_16px_26px_rgba(27,94,32,0.18)]"
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
                    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rotate-180 whitespace-nowrap [writing-mode:vertical-rl] text-green-dark text-sm font-bold font-heading"
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
                    className="absolute inset-0 z-10 flex flex-col items-start justify-center p-7 lg:pr-[42%]"
                  >
                    <span className="inline-block font-mono text-[10px] tracking-widest uppercase bg-green-soft text-green-dark rounded-full px-3 py-1 mb-3">
                      {s.tag}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-brand-gray mb-2">{s.title}</h3>
                    <p className="font-body text-brand-sub text-sm mb-4 max-w-xs">{s.text}</p>
                    <ul className="space-y-1.5 mb-5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-brand-gray text-sm font-body">
                          <ArrowRight size={14} className="text-green-primary flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={s.ctaHref}
                      className="btn-fill [--fill:#1B5E20] inline-flex items-center gap-2 bg-green-primary text-white font-body font-medium text-sm rounded-full px-5 py-2.5 transition-transform"
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

        {/* Un casier, quatre usages + les canaux de commande (dossiers AFRIBOX). */}
        <div className="mt-14 md:mt-20">
          <h3 className="mb-8 text-center font-heading text-xl font-bold text-brand-gray md:text-2xl">
            Un casier, quatre usages.
          </h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {usages.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-green-soft bg-white p-5">
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-bg">
                  <Icon size={18} className="text-green-primary" />
                </span>
                <h4 className="font-heading text-sm font-bold text-brand-gray">{title}</h4>
                <p className="mt-1 font-body text-xs leading-snug text-brand-sub">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center gap-3">
            <p className="font-body text-sm text-brand-sub">Commandez comme ça vous arrange</p>
            <div className="flex flex-wrap justify-center gap-2">
              {channels.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-green-soft px-3.5 py-1.5 font-body text-xs font-medium text-green-dark"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
