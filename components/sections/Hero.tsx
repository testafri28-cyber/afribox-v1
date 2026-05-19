'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, ShieldCheck, Smartphone, Download } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

const features = [
  { icon: Clock, label: '24h/24 · Sans rendez-vous' },
  { icon: ShieldCheck, label: 'Sécurisé · Code unique' },
  { icon: Smartphone, label: 'Mobile · Appli, Web, WhatsApp' },
]

export default function Hero() {
  return (
    <>
      {/* Bandeau de disponibilité */}
      <div className="bg-green-primary text-white">
        <Container className="py-2.5 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <p className="font-mono text-[11px] tracking-widest uppercase text-center">
            Disponible à Abidjan · Réseau en expansion
          </p>
        </Container>
      </div>

      <section className="bg-white">
        <Container className="pt-16 pb-20 md:pt-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs tracking-widest text-green-primary uppercase mb-6">
              AFR-2025 · Smart Locker Network
            </p>
            <h1 className="font-heading font-bold text-[36px] md:text-[56px] leading-[1.05] tracking-tight text-brand-gray mb-6">
              Vos colis vous attendent.{' '}
              <span className="text-green-primary">Toujours.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-brand-sub leading-relaxed max-w-2xl mb-8">
              Des casiers intelligents accessibles 24h/24. Pas de rendez-vous. Pas
              d&apos;attente. Juste votre code et votre colis.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button href="/reserver" variant="primary" size="lg">
                Réserver un locker
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button href="#download" variant="secondary" size="lg">
                <Download size={18} className="mr-2" />
                Télécharger l&apos;application
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {features.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-off border border-brand-border rounded-full"
                >
                  <Icon size={14} className="text-green-primary" />
                  <span className="font-body text-xs text-brand-gray">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
