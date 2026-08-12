'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import BentoTriple from '@/components/features/BentoTriple'
import { values, team, lockerSpecs } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// Section équipe désactivée pour le moment — repasser à true pour la réafficher.
const SHOW_TEAM = false

export default function AboutSection() {
  return (
    <section id="a-propos" className="bg-brand-off">
      {/* pt réduit : suit la FAQ (gris) — évite le vide doublé au joint de même couleur */}
      <Container className="pt-6 md:pt-10 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-12 max-w-2xl"
        >
          <SectionLabel className="mb-4">À propos</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray">
            Construire l&apos;infrastructure logistique de demain.
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-brand-sub leading-relaxed">
            AFRIBOX SARL est une société ivoirienne qui déploie le premier réseau
            de casiers colis intelligents de Côte d&apos;Ivoire : des points de
            retrait et de dépôt sécurisés, automatisés et accessibles 24h/24,
            installés au plus près des habitants. Notre mission — démocratiser
            l&apos;accès à une logistique efficace et flexible.
          </p>
        </motion.div>

        {/* Values bento — accent on the left (varies from Channels which is on the right) */}
        <div className="mb-20">
          <BentoTriple
            accentPosition="left"
            accent={{
              label: '01',
              title: values[0].title,
              description: values[0].text,
              visual: <Visual3D icon={values[0].icon} tone="dark" />,
            }}
            hero={{
              label: '02',
              title: values[1].title,
              description: values[1].text,
              visual: <Visual3D icon={values[1].icon} tone="light" />,
            }}
            tertiary={{
              label: '03',
              title: values[2].title,
              description: values[2].text,
              visual: <Visual3D icon={values[2].icon} tone="light" />,
            }}
            quaternary={{
              label: '04',
              title: values[3].title,
              description: values[3].text,
              visual: <Visual3D icon={values[3].icon} tone="light" />,
            }}
          />
        </div>

        {/* Le casier en bref — caractéristiques réelles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.h3
            variants={fadeInUp}
            className="font-heading font-bold text-xl sm:text-2xl md:text-4xl text-brand-gray mb-8"
          >
            Le casier, en bref.
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {lockerSpecs.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="rounded-2xl border border-brand-border bg-white p-4 text-center"
              >
                <p className="font-heading font-bold text-lg leading-tight text-green-primary">{s.value}</p>
                <p className="mt-1 font-body text-xs leading-snug text-brand-sub">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team — désactivée pour le moment (SHOW_TEAM) */}
        {SHOW_TEAM && (
        <motion.div
          id="equipe"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <SectionLabel className="mb-4">L&apos;équipe</SectionLabel>
            <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-4xl text-brand-gray">
              Des gens qui s&apos;engagent.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 border border-brand-border hover:shadow-[0_8px_32px_-8px_rgba(31,71,40,0.12)] transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-primary text-white font-heading font-bold text-xl flex items-center justify-center mb-4">
                  {member.initials}
                </div>
                <p className="font-heading font-bold text-lg text-brand-gray">{member.name}</p>
                <p className="font-mono text-[10px] tracking-widest text-green-primary uppercase mb-3">
                  {member.role}
                </p>
                <p className="font-body text-sm text-brand-sub leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}
      </Container>
    </section>
  )
}

/* Visual 3D placeholder — same shape as the other bento sections,
   local so each can tweak independently when real 3D assets land. */
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
    <div className="relative w-full aspect-square max-w-[116px] flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full blur-2xl ${haloColor}`} />
      <div
        className={`relative w-[78%] aspect-square rounded-[1.5rem] bg-gradient-to-br ${bgGradient} shadow-[0_18px_40px_-12px_rgba(31,71,40,0.45),inset_0_-8px_24px_rgba(0,0,0,0.18),inset_0_8px_16px_rgba(255,255,255,0.18)] rotate-[-8deg] flex items-center justify-center`}
      >
        <Icon size={40} className="text-white drop-shadow-md" strokeWidth={2} />
      </div>
    </div>
  )
}
