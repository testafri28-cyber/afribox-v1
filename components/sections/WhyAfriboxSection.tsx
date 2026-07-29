'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

// Position (grille lg 3×2), alignement, côté du nœud et origine de la branche
// sur le baobab (fractions de sa bbox : x depuis la gauche, y depuis le haut).
const radial = [
  { pos: 'col-start-1 row-start-1', box: 'items-end text-right', side: 'right', origin: [0.32, 0.26] },  // haut-gauche
  { pos: 'col-start-3 row-start-1', box: 'items-start text-left', side: 'left', origin: [0.68, 0.26] },  // haut-droite
  { pos: 'col-start-1 row-start-2', box: 'items-end text-right', side: 'right', origin: [0.30, 0.44] },  // bas-gauche
  { pos: 'col-start-3 row-start-2', box: 'items-start text-left', side: 'left', origin: [0.70, 0.44] },  // bas-droite
] as const

const drawBranch = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 } },
}

export default function WhyAfriboxSection() {
  const reasons = whyAfribox.slice(0, 4)
  const hero = whyAfribox[whyAfribox.length - 1] // « Conçu pour l'Afrique »

  const wrapRef = useRef<HTMLDivElement>(null)
  const treeRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [paths, setPaths] = useState<string[]>([])

  // Recalcule les branches à partir des positions réelles (robuste à toutes
  // les largeurs) : origine sur la canopée du baobab → centre de chaque nœud.
  const measure = useCallback(() => {
    const wrap = wrapRef.current
    const tree = treeRef.current
    if (!wrap || !tree) return
    const wr = wrap.getBoundingClientRect()
    const tr = tree.getBoundingClientRect()
    const ds = radial.map(({ origin }, i) => {
      const el = nodeRefs.current[i]
      if (!el) return ''
      const nr = el.getBoundingClientRect()
      const nx = nr.left + nr.width / 2 - wr.left
      const ny = nr.top + nr.height / 2 - wr.top
      const ox = tr.left + origin[0] * tr.width - wr.left
      const oy = tr.top + origin[1] * tr.height - wr.top
      const dx = nx - ox
      const dy = ny - oy
      const c1x = ox + dx * 0.45
      const c1y = oy + dy * 0.06
      const c2x = ox + dx * 0.72
      const c2y = ny
      return `M${ox.toFixed(1)},${oy.toFixed(1)} C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`
    })
    setSize({ w: wr.width, h: wr.height })
    setPaths(ds)
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    if (wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

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

        {/* ── Desktop : baobab central + branches organiques mesurées ── */}
        <motion.div
          ref={wrapRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="hidden lg:block relative"
        >
          {/* Branches : dessinées en pixels réels, alignées à toute largeur */}
          {size.w > 0 && (
            <svg
              className="absolute inset-0 z-0 pointer-events-none"
              width={size.w}
              height={size.h}
              viewBox={`0 0 ${size.w} ${size.h}`}
              fill="none"
              aria-hidden
            >
              <defs>
                <radialGradient
                  id="branchGrad"
                  gradientUnits="userSpaceOnUse"
                  cx={size.w / 2}
                  cy={size.h * 0.4}
                  r={size.w * 0.34}
                >
                  <stop offset="0" stopColor="#1B5E20" stopOpacity="0.55" />
                  <stop offset="0.7" stopColor="#27AE60" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#6FCF97" stopOpacity="0.6" />
                </radialGradient>
              </defs>
              {paths.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="url(#branchGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={drawBranch}
                />
              ))}
            </svg>
          )}

          <div className="relative grid grid-cols-3 grid-rows-2 items-center gap-x-8 gap-y-20 xl:gap-x-16">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className={`relative z-10 flex flex-col gap-3 ${radial[i].box} ${radial[i].pos}`}
              >
                {/* Pastille + nœud « casier » (point d'ancrage de la branche) */}
                <div className="relative">
                  <IconChip Icon={Icon} />
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el
                    }}
                    className={`absolute top-1/2 z-[2] h-3.5 w-3.5 -translate-y-1/2 rotate-[-8deg] rounded-[5px] bg-gradient-to-br from-green-primary to-green-dark shadow-[0_4px_10px_-2px_rgba(31,71,40,0.5)] ${
                      radial[i].side === 'right' ? '-right-2.5' : '-left-2.5'
                    }`}
                  />
                </div>
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
              <div ref={treeRef} className="relative">
                <Image
                  src="/logo.svg"
                  alt="Le réseau de lockers Afribox qui s'étend à travers l'Afrique"
                  width={797}
                  height={1109}
                  unoptimized
                  onLoad={measure}
                  className="h-[300px] xl:h-[340px] w-auto drop-shadow-[0_14px_28px_rgba(31,71,40,0.18)]"
                />
              </div>
              <h3 className="font-heading font-bold text-lg xl:text-xl text-brand-gray mt-4 mb-1">{hero.title}</h3>
              <p className="font-body text-sm text-brand-sub max-w-[240px]">{hero.text}</p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
