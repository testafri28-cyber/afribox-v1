'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, ScanLine, LockOpen, Signal, Wifi, BatteryFull } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { appFeatures } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// Glyphes plateformes (badges de téléchargement).
function AppleGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.13 3-.78.87-2.05 1.54-3.09 1.46-.13-1.1.42-2.26 1.09-3 .76-.85 2.11-1.48 3.13-1.46zM20.5 17.2c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.38 3.5-4.1 3.51-1.53.01-1.92-.98-4-.97-2.08.01-2.51.99-4.04.98-1.72-.02-3.03-1.76-4.02-3.32C.16 15.98.03 11.6 1.5 9.28c1.04-1.66 2.68-2.63 4.22-2.63 1.57 0 2.56 1.03 3.86 1.03 1.26 0 2.03-1.03 3.85-1.03 1.37 0 2.82.75 3.85 2.04-3.38 1.85-2.83 6.68.32 8.5z" />
    </svg>
  )
}
function PlayGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3 2.2v19.6a.6.6 0 0 0 .92.5l16.3-9.8a.6.6 0 0 0 0-1.02L3.92 1.7A.6.6 0 0 0 3 2.2z" />
    </svg>
  )
}

export default function AppDownloadSection() {
  const phoneRef = useRef<HTMLDivElement>(null)
  const inView = useInView(phoneRef, { once: true, amount: 0.3 })

  return (
    <section id="app-mobile" className="bg-white overflow-hidden">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Gauche — contenu */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel className="mb-4">L&apos;application</SectionLabel>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray mb-4">
                Vos lockers dans votre poche.
              </h2>
              <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed mb-8">
                Gérez vos envois, suivez vos colis et récupérez vos codes
                directement depuis l&apos;appli Afribox.
              </p>
            </motion.div>

            <motion.ul variants={staggerContainer} className="space-y-3.5 mb-8">
              {appFeatures.map(({ icon: Icon, label }) => (
                <motion.li key={label} variants={fadeInUp} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-green-bg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-green-primary" />
                  </span>
                  <span className="font-body text-brand-gray">{label}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Badges de téléchargement — deux lignes. */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-xl bg-brand-gray px-4 py-2.5 text-white transition hover:bg-brand-gray/90"
              >
                <AppleGlyph className="w-6 h-6" />
                <span className="text-left leading-none">
                  <span className="block font-body text-[10px] text-white/70">Télécharger sur</span>
                  <span className="block font-heading font-semibold text-sm mt-0.5">App Store</span>
                </span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-xl bg-brand-gray px-4 py-2.5 text-white transition hover:bg-brand-gray/90"
              >
                <PlayGlyph className="w-[22px] h-[22px]" />
                <span className="text-left leading-none">
                  <span className="block font-body text-[10px] text-white/70">Disponible sur</span>
                  <span className="block font-heading font-semibold text-sm mt-0.5">Google Play</span>
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Droite — maquette téléphone + notifications flottantes */}
          <motion.div
            ref={phoneRef}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex justify-center"
          >
            {/* Halo */}
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px] w-[360px] rounded-full bg-green-light/25 blur-3xl"
            />

            {/* Téléphone — écran « colis prêt à retirer » */}
            <div className="relative z-10 w-[256px] sm:w-[272px] rounded-[2.6rem] border-[6px] border-brand-gray bg-brand-gray shadow-2xl">
              <div className="relative flex min-h-[482px] flex-col overflow-hidden rounded-[2.1rem] bg-white">
                {/* Dynamic island */}
                <div className="absolute left-1/2 top-2 z-20 h-5 w-[74px] -translate-x-1/2 rounded-full bg-brand-gray" />

                {/* Barre d'état */}
                <div className="flex items-center justify-between px-6 pt-3">
                  <span className="font-heading text-[11px] font-semibold text-brand-gray">9:41</span>
                  <span className="flex items-center gap-1 text-brand-gray">
                    <Signal size={12} />
                    <Wifi size={12} />
                    <BatteryFull size={15} />
                  </span>
                </div>

                {/* Moment clé : colis prêt */}
                <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-4 text-center">
                  <div className="relative mb-5">
                    <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-green-primary/25 blur-xl" />
                    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green-primary text-white ring-8 ring-green-bg shadow-[0_16px_32px_-10px_rgba(11,61,27,0.6)]">
                      <LockOpen size={30} />
                    </span>
                  </div>

                  <p className="font-mono text-[9px] uppercase tracking-widest text-green-primary">
                    Colis prêt à retirer
                  </p>
                  <h3 className="mt-1.5 font-heading text-xl font-bold leading-tight text-brand-gray">
                    Votre colis vous attend.
                  </h3>
                  <p className="mt-2 flex items-center gap-1 font-body text-[12px] text-brand-sub">
                    <MapPin size={12} className="text-green-primary" />
                    Locker Plateau · Casier M-04
                  </p>

                  {/* Code de retrait */}
                  <div className="mt-5 w-full rounded-2xl border border-green-soft bg-green-bg p-3.5">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-brand-mid">Code de retrait</p>
                    <p className="mt-1 font-mono text-[28px] font-bold leading-none tracking-[0.2em] text-green-primary">
                      842 631
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-full bg-green-primary py-3 font-heading text-sm font-semibold text-white">
                    <ScanLine size={16} />
                    Ouvrir le casier
                  </div>
                  <p className="mt-3 font-body text-[10px] text-brand-mid">Valide 72h · à usage unique</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
