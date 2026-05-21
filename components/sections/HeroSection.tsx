'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, ShieldCheck, Smartphone } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const features = [
  { icon: Clock,       title: '24h / 24',  sub: 'Sans rendez-vous' },
  { icon: ShieldCheck, title: 'Sécurisé',  sub: 'Code unique par colis' },
  { icon: Smartphone,  title: 'Mobile',    sub: 'App · Web · WhatsApp' },
]

export default function HeroSection() {
  return (
    <section id="hero" className="relative bg-white overflow-hidden pt-20 pb-0">
      {/* Lignes SVG décoratives */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        preserveAspectRatio="none"
      >
        <path d="M 0 120 L 180 120 L 180 320" stroke="#27AE60" strokeWidth="1.2" fill="none" opacity="0.13" strokeLinecap="round" />
        <path d="M 100% 80 L calc(100% - 160px) 80 L calc(100% - 160px) 280" stroke="#27AE60" strokeWidth="1.2" fill="none" opacity="0.1" strokeLinecap="round" />
        <circle cx="180" cy="120" r="3" fill="#27AE60" opacity="0.35" />
        <circle cx="180" cy="320" r="3" fill="#27AE60" opacity="0.25" />
      </svg>

      <Container className="relative z-10 pb-20 md:pb-28">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Pill disponibilité */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-green-bg text-green-dark rounded-full px-4 py-2 font-mono text-xs tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary" />
              </span>
              Disponible à Abidjan · Réseau en expansion
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading font-bold text-5xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray mb-5"
          >
            Vos colis vous attendent.{' '}
            <span className="text-green-primary">Toujours.</span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p variants={fadeInUp} className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-xl mx-auto mb-10">
            Des casiers intelligents accessibles 24h/24.
            Pas de rendez-vous. Pas d&apos;attente.
            Juste votre code et votre colis.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <div className="relative inline-flex">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-green-primary opacity-30 pointer-events-none" />
              <Button href="/reserver" variant="primary" size="lg">
                Réserver un locker
                <ArrowRight size={18} className="ml-1" />
              </Button>
            </div>
            <Button href="/#app-mobile" variant="secondary" size="lg">
              Télécharger l&apos;appli
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div variants={staggerContainer} className="flex flex-wrap gap-3 justify-center">
            {features.map(({ icon: Icon, title, sub }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="inline-flex items-center gap-3 bg-brand-off border border-brand-border rounded-2xl px-4 py-3"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 12 }}
                  className="w-9 h-9 bg-green-bg rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <Icon size={16} className="text-green-primary" />
                </motion.div>
                <div className="text-left">
                  <p className="font-heading font-bold text-sm text-brand-gray leading-none">{title}</p>
                  <p className="font-body text-xs text-brand-sub mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
