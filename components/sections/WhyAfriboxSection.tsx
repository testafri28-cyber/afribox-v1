'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { whyAfribox } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// Pastille d'icône 3D (reprise du style des autres sections).
function IconChip({ Icon }: { Icon: (typeof whyAfribox)[number]['icon'] }) {
  return (
    <div className="relative w-14 h-14 md:w-[58px] md:h-[58px]">
      <div className="absolute inset-0 rounded-full blur-2xl bg-green-primary/15" />
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-green-primary to-green-dark shadow-[0_18px_40px_-12px_rgba(31,71,40,0.45),inset_0_-8px_24px_rgba(0,0,0,0.18),inset_0_8px_16px_rgba(255,255,255,0.18)] rotate-[-8deg] flex items-center justify-center">
        <Icon size={24} className="text-white drop-shadow-md" strokeWidth={2} />
      </div>
    </div>
  )
}

// Position + alignement des 4 raisons autour du baobab (grille lg 3×2).
const radial = [
  { pos: 'col-start-1 row-start-1', box: 'items-end text-right' },   // haut-gauche
  { pos: 'col-start-3 row-start-1', box: 'items-start text-left' },  // haut-droite
  { pos: 'col-start-1 row-start-2', box: 'items-end text-right' },   // bas-gauche
  { pos: 'col-start-3 row-start-2', box: 'items-start text-left' },  // bas-droite
]

// Branches courbes reliant le baobab à chaque raison (coord. viewBox 100×46).
// Toutes partent de la canopée (haut de l'arbre), jamais du tronc/wordmark.
const branches = [
  { d: 'M45,14 C40,10 35,8 31,7', node: [31, 7] },     // vers haut-gauche
  { d: 'M55,14 C60,10 65,8 69,7', node: [69, 7] },     // vers haut-droite
  { d: 'M44,16 C37,21 33,29 31,33', node: [31, 33] },  // vers bas-gauche (sort du feuillage)
  { d: 'M56,16 C63,21 67,29 69,33', node: [69, 33] },  // vers bas-droite
]

// Les branches (trait plein) apparaissent en fondu, puis les nœuds éclosent.
const drawBranch = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.25 } },
}
const popNode = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.75, duration: 0.4, ease: 'easeOut' } },
}

export default function WhyAfriboxSection() {
  const reasons = whyAfribox.slice(0, 4)
  const hero = whyAfribox[whyAfribox.length - 1] // « Conçu pour l'Afrique »

  return (
    <section id="pourquoi" className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <SectionLabel className="mb-4">Pourquoi Afribox</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray">
            Cinq raisons concrètes.
          </h2>
        </motion.div>

        {/* ── Mobile / tablette : baobab centré + liste simple ── */}
        <div className="lg:hidden">
          <div className="flex flex-col items-center text-center mb-12">
            <Image
              src="/logo.svg"
              alt="Le réseau de lockers Afribox qui s'étend à travers l'Afrique"
              width={797}
              height={1109}
              unoptimized
              className="h-[220px] w-auto mb-5 drop-shadow-[0_12px_24px_rgba(31,71,40,0.16)]"
            />
            <h3 className="font-heading font-bold text-xl text-brand-gray mb-1">{hero.title}</h3>
            <p className="font-body text-sm text-brand-sub max-w-xs">{hero.text}</p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="space-y-8 max-w-md mx-auto"
          >
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <motion.div key={title} variants={fadeInUp} className="flex items-start gap-4">
                <IconChip Icon={Icon} />
                <div>
                  <span className="font-mono text-xs text-green-primary">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading font-bold text-lg text-brand-gray">{title}</h3>
                  <p className="font-body text-sm text-brand-sub leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Desktop : disposition radiale, raisons en branches ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="hidden lg:block relative"
        >
          {/* Branches organiques reliant le baobab à chaque raison, avec un
              petit nœud « casier » au bout — elles se dessinent au scroll. */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none z-0"
            viewBox="0 0 100 46"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <defs>
              <radialGradient id="branchGrad" gradientUnits="userSpaceOnUse" cx="50" cy="23" r="40">
                <stop offset="0" stopColor="#1B5E20" stopOpacity="0.55" />
                <stop offset="0.7" stopColor="#27AE60" stopOpacity="0.5" />
                <stop offset="1" stopColor="#6FCF97" stopOpacity="0.55" />
              </radialGradient>
              <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#27AE60" />
                <stop offset="1" stopColor="#1B5E20" />
              </linearGradient>
            </defs>
            {branches.map(({ d }) => (
              <motion.path
                key={d}
                d={d}
                stroke="url(#branchGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                variants={drawBranch}
              />
            ))}
            {branches.map(({ node: [x, y] }) => (
              <motion.rect
                key={`${x}-${y}`}
                x={x - 0.95}
                y={y - 0.95}
                width="1.9"
                height="1.9"
                rx="0.55"
                fill="url(#nodeGrad)"
                transform={`rotate(-8 ${x} ${y})`}
                variants={popNode}
              />
            ))}
          </svg>

          <div className="relative grid grid-cols-3 grid-rows-2 items-center gap-x-8 gap-y-20 xl:gap-x-16">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className={`relative z-10 flex flex-col gap-3 ${radial[i].box} ${radial[i].pos}`}
              >
                <IconChip Icon={Icon} />
                <div>
                  <span className="font-mono text-xs text-green-primary">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading font-bold text-lg xl:text-xl text-brand-gray mb-1">{title}</h3>
                  <p className="font-body text-sm text-brand-sub leading-relaxed max-w-[240px]">{text}</p>
                </div>
              </motion.div>
            ))}

            {/* Baobab central + « Conçu pour l'Afrique » */}
            <motion.div
              variants={fadeInUp}
              className="relative z-10 col-start-2 row-start-1 row-span-2 flex flex-col items-center justify-center text-center"
            >
              <Image
                src="/logo.svg"
                alt="Le réseau de lockers Afribox qui s'étend à travers l'Afrique"
                width={797}
                height={1109}
                unoptimized
                className="h-[300px] xl:h-[340px] w-auto drop-shadow-[0_14px_28px_rgba(31,71,40,0.18)]"
              />
              <h3 className="font-heading font-bold text-lg xl:text-xl text-brand-gray mt-4 mb-1">{hero.title}</h3>
              <p className="font-body text-sm text-brand-sub max-w-[240px]">{hero.text}</p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
