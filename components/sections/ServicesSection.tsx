'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { merchantBenefits, consumerBenefits } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function ServicesSection() {
  return (
    <section className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-12 md:mb-16"
        >
          <SectionLabel className="mb-4">Nos services</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray max-w-2xl">
            Pour chaque besoin, une solution.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card marchands — fond green-dark */}
          <motion.div
            id="b2b"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="bg-green-dark text-white rounded-2xl p-8 md:p-10 flex flex-col"
          >
            <Badge tone="green" className="mb-6 self-start">
              Marchands & E-commerce
            </Badge>
            <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight mb-4">
              Livrez vos clients. Sans vous en occuper.
            </h3>
            <p className="font-body text-white/80 leading-relaxed mb-6">
              Confiez le dernier kilomètre à notre réseau de lockers. Vos clients
              récupèrent leurs commandes quand ils veulent, sans appel, sans
              attente. Et vous gardez la main sur tout via notre tableau de bord.
            </p>
            <ul className="space-y-3 mb-8">
              {merchantBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check size={18} className="text-green-light mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-white/90">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button href="/nos-services" variant="white">
                Découvrir l&apos;offre marchand
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Card consommateurs — fond blanc */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="bg-white border border-brand-border rounded-2xl p-8 md:p-10 flex flex-col"
          >
            <Badge tone="soft" className="mb-6 self-start">
              Particuliers & Entreprises
            </Badge>
            <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight mb-4 text-brand-gray">
              Envoyez. Recevez. À votre rythme.
            </h3>
            <p className="font-body text-brand-sub leading-relaxed mb-6">
              Réservez un locker en ligne en quelques clics. Déposez ou récupérez
              votre colis quand ça vous arrange. Pas de file d&apos;attente, pas
              d&apos;horaires.
            </p>
            <ul className="space-y-3 mb-8">
              {consumerBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check size={18} className="text-green-primary mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-brand-gray">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button href="/reserver" variant="primary">
                Réserver un locker
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
