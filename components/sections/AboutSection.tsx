'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import BentoTriple from '@/components/features/BentoTriple'
import { values, team } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function AboutSection() {
  return (
    <section id="a-propos" className="bg-brand-off">
      <Container className="py-16 md:py-24">
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
            }}
            quaternary={{
              label: '04',
              title: values[3].title,
              description: values[3].text,
            }}
          />
        </div>

        {/* Team */}
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
    <div className="relative w-full aspect-square max-w-[170px] flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full blur-2xl ${haloColor}`} />
      <div
        className={`relative w-[78%] aspect-square rounded-[2rem] bg-gradient-to-br ${bgGradient} shadow-[0_18px_40px_-12px_rgba(31,71,40,0.45),inset_0_-8px_24px_rgba(0,0,0,0.18),inset_0_8px_16px_rgba(255,255,255,0.18)] rotate-[-8deg] flex items-center justify-center`}
      >
        <Icon size={56} className="text-white drop-shadow-md" strokeWidth={2} />
      </div>
    </div>
  )
}
