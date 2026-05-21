'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'
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
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
            Construire l&apos;infrastructure logistique de demain.
          </h2>
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.article
                key={v.title}
                variants={fadeInUp}
                className="relative overflow-hidden bg-white rounded-2xl p-7 md:p-8 border border-brand-border shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(31,71,40,0.15)] transition-shadow"
              >
                <GridBackground tone="green" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        transition: { duration: 2.2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
                      }}
                      whileHover={{
                        scale: 1.18, rotate: 6, y: 0,
                        transition: { type: 'spring', stiffness: 380, damping: 12 },
                      }}
                      className="w-11 h-11 rounded-xl bg-green-bg flex items-center justify-center"
                    >
                      <Icon size={22} className="text-green-primary" />
                    </motion.div>
                    <span
                      className="font-heading font-bold text-5xl md:text-6xl leading-none select-none"
                      style={{ color: 'rgba(39, 174, 96, 0.12)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-gray mb-3">
                    {v.title}
                  </h3>
                  <p className="font-body text-brand-sub leading-relaxed">{v.text}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

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
            <h3 className="font-heading font-bold text-2xl md:text-4xl text-brand-gray">
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
