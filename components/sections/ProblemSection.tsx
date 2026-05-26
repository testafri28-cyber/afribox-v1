'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Truck, User, type LucideIcon } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import BentoTriple from '@/components/features/BentoTriple'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function ProblemSection() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <SectionLabel className="mb-4">Le problème que nous résolvons</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray mb-6 max-w-3xl">
            La livraison en Afrique mérite mieux.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-3xl mb-12 md:mb-16">
            Commander en ligne, c&apos;est prendre un risque. Adresse introuvable,
            livreur injoignable, colis perdu. Afribox règle ça simplement : un
            casier près de chez vous, un code par SMS, et c&apos;est tout.
          </p>
        </motion.div>

        <BentoTriple
          accent={{
            label: '01',
            title: 'Pour les marchands',
            description:
              "Chaque livraison ratée, c'est une vente perdue. Afribox automatise le dernier kilomètre de bout en bout.",
            visual: <Visual3D icon={ShoppingBag} tone="dark" />,
          }}
          hero={{
            label: '02',
            title: 'Pour les livreurs',
            description:
              'Finis les allers-retours et les appels sans réponse. Déposer un colis prend 60 secondes.',
            visual: <Visual3D icon={Truck} tone="light" />,
          }}
          tertiary={{
            label: '03',
            title: 'Pour vous',
            description:
              "Récupérez votre colis quand ça vous convient. Pas quand ça convient au livreur.",
            visual: <Visual3D icon={User} tone="light" />,
          }}
        />
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------- Visual 3D
   Placeholder en attendant de vrais assets 3D (PNG/WebP) :
   - grosse icône Lucide
   - dégradé radial + halo + ombre portée pour un rendu "3D-ish"
   - léger tilt
   Pour swap : remplace par <Image src="/images/xxx.png" .../>. */
function Visual3D({
  icon: Icon,
  tone,
}: {
  icon: LucideIcon
  tone: 'light' | 'dark'
}) {
  const bgGradient =
    tone === 'dark'
      ? 'from-green-light to-green-primary'
      : 'from-green-primary to-green-dark'
  const iconColor = 'text-white'
  const haloColor = tone === 'dark' ? 'bg-green-dark/40' : 'bg-green-primary/15'

  return (
    <div className="relative w-full aspect-square max-w-[170px] flex items-center justify-center">
      {/* halo */}
      <div className={`absolute inset-0 rounded-full blur-2xl ${haloColor}`} />
      {/* main blob */}
      <div
        className={`relative w-[78%] aspect-square rounded-[2rem] bg-gradient-to-br ${bgGradient} shadow-[0_18px_40px_-12px_rgba(31,71,40,0.45),inset_0_-8px_24px_rgba(0,0,0,0.18),inset_0_8px_16px_rgba(255,255,255,0.18)] rotate-[-8deg] flex items-center justify-center`}
      >
        <Icon size={56} className={`${iconColor} drop-shadow-md`} strokeWidth={2} />
      </div>
    </div>
  )
}
