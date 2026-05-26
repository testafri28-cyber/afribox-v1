'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import BentoTriple from '@/components/features/BentoTriple'
import { channels } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function ChannelsSection() {
  // Mapping: accent (vertical) = WhatsApp (the most distinctive channel),
  // hero (large) = Site web, tertiary = App mobile.
  const [web, app, whatsapp] = channels

  return (
    <section id="app-mobile" className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <SectionLabel className="mb-4">Canaux d&apos;accès</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray">
            Utilisez Afribox comme vous le souhaitez.
          </h2>
        </motion.div>

        <BentoTriple
          accentPosition="right"
          accent={{
            label: '03',
            title: whatsapp.title,
            description: whatsapp.text,
            visual: <Visual3D icon={whatsapp.icon} tone="dark" />,
          }}
          hero={{
            label: '01',
            title: web.title,
            description: web.text,
            visual: <Visual3D icon={web.icon} tone="light" />,
          }}
          tertiary={{
            label: '02',
            title: app.title,
            description: app.text,
            visual: <Visual3D icon={app.icon} tone="light" />,
          }}
        />
      </Container>
    </section>
  )
}

/* Visual 3D placeholder — same look as ProblemSection, kept local
   so each section can tweak it independently when 3D assets land. */
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
  const haloColor = tone === 'dark' ? 'bg-green-dark/40' : 'bg-green-primary/15'

  return (
    <div className="relative w-full aspect-square max-w-[170px] flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full blur-2xl ${haloColor}`} />
      <div
        className={`relative w-[78%] aspect-square rounded-[2rem] bg-gradient-to-br ${bgGradient} shadow-[0_18px_40px_-12px_rgba(31,71,40,0.45),inset_0_-8px_24px_rgba(0,0,0,0.18),inset_0_8px_16px_rgba(255,255,255,0.18)] rotate-[8deg] flex items-center justify-center`}
      >
        <Icon size={56} className="text-white drop-shadow-md" strokeWidth={2} />
      </div>
    </div>
  )
}
