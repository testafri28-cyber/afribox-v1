'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

type CTASectionProps = {
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTASection({
  eyebrow = 'Notre vision',
  title = 'Prêt à simplifier vos livraisons ?',
  subtitle = "Réservez votre premier locker en moins d'une minute. Ou parlez à notre équipe pour un déploiement marchand.",
  primaryLabel = 'Réserver un locker',
  primaryHref = '/reserver',
  secondaryLabel = 'Parler à un humain',
  secondaryHref = '/contact',
}: CTASectionProps) {
  return (
    <section className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] text-white"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #2EC368 0%, #27AE60 45%, #1B5E20 100%)',
          }}
        >
          {/* Motif grille fine blanche en arrière-plan */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(ellipse at center, black 40%, transparent 90%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, black 40%, transparent 90%)',
            }}
          />

          {/* Halo doux en haut à droite */}
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)',
            }}
          />

          <div className="relative z-10 px-6 py-12 md:px-14 md:py-20 lg:px-20 lg:py-24 max-w-3xl">
            {eyebrow && (
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/70 mb-6">
                {eyebrow}
              </p>
            )}
            <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6">
              {title}
            </h2>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-9 max-w-xl">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href={primaryHref} variant="white" size="lg">
                {primaryLabel}
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                href={secondaryHref}
                variant="ghost"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white/10"
              >
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
