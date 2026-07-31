'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { whyAfribox } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// Géométrie de la roue (cercle segmenté).
const CX = 460
const CY = 250
const R = 165 // rayon extérieur
const RI = 92 // rayon intérieur (trou)
const rad = (d: number) => (d * Math.PI) / 180
const pt = (radius: number, angDeg: number): [number, number] => [
  CX + radius * Math.cos(rad(angDeg)),
  CY + radius * Math.sin(rad(angDeg)),
]
const midDeg = (i: number) => -90 + (i + 0.5) * 72

function segPath(i: number) {
  const a0 = -90 + i * 72
  const a1 = -90 + (i + 1) * 72
  const [x0, y0] = pt(R, a0)
  const [x1, y1] = pt(R, a1)
  const [ix1, iy1] = pt(RI, a1)
  const [ix0, iy0] = pt(RI, a0)
  return `M${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${ix1.toFixed(1)},${iy1.toFixed(1)} A${RI},${RI} 0 0 0 ${ix0.toFixed(1)},${iy0.toFixed(1)} Z`
}

function labelStyle(i: number): React.CSSProperties {
  const a = rad(midDeg(i))
  const c = Math.cos(a)
  const s = Math.sin(a)
  const [x, y] = pt(R + 30, midDeg(i))
  let transform = 'translate(-50%,-50%)'
  let textAlign: React.CSSProperties['textAlign'] = 'center'
  if (c > 0.35) {
    transform = 'translateY(-50%)'
    textAlign = 'left'
  } else if (c < -0.35) {
    transform = 'translate(-100%,-50%)'
    textAlign = 'right'
  } else if (s < 0) {
    transform = 'translate(-50%,-100%)'
  } else {
    transform = 'translate(-50%,0)'
  }
  return { left: `${x}px`, top: `${y}px`, transform, textAlign }
}

// Verts distincts par segment (adjacents contrastés), 100 % marque.
const segColors = ['#27AE60', '#14532A', '#43A047', '#0E4D1E', '#2E7D32']

export default function WhyAfriboxSection() {
  return (
    <section id="pourquoi" className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-10 md:mb-14 max-w-2xl"
        >
          <SectionLabel className="mb-4">Pourquoi Afribox</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray">
            Cinq raisons concrètes.
          </h2>
        </motion.div>

        {/* ── Desktop : roue segmentée + libellés & descriptions ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="hidden justify-center lg:flex"
        >
          <div className="relative" style={{ width: 920, height: 500 }}>
            <svg viewBox="0 0 920 500" className="absolute inset-0 h-full w-full" aria-hidden>
              {whyAfribox.map((_, i) => (
                <path key={i} d={segPath(i)} fill={segColors[i]} stroke="#F7F9F7" strokeWidth="4" />
              ))}
              <circle cx={CX} cy={CY} r={RI - 2} fill="#ffffff" />
              {whyAfribox.map((_, i) => {
                const [sx, sy] = pt(R + 3, midDeg(i))
                const [ex, ey] = pt(R + 26, midDeg(i))
                return (
                  <line key={`l${i}`} x1={sx} y1={sy} x2={ex} y2={ey} stroke="#B7C6BA" strokeWidth="1.5" />
                )
              })}
            </svg>

            {/* Arbre-réseau au centre */}
            <div
              className="absolute z-10"
              style={{ left: CX, top: CY, transform: 'translate(-50%,-50%)' }}
            >
              <Image
                src="/logo-tree.svg"
                alt="Le réseau de lockers Afribox qui s'étend à travers l'Afrique"
                width={797}
                height={838}
                unoptimized
                className="h-[148px] w-auto"
              />
            </div>

            {/* Icônes dans les segments */}
            {whyAfribox.map(({ icon: Icon }, i) => {
              const [ix, iy] = pt((R + RI) / 2, midDeg(i))
              return (
                <div
                  key={`i${i}`}
                  className="absolute z-10"
                  style={{ left: ix, top: iy, transform: 'translate(-50%,-50%)' }}
                >
                  <Icon size={28} className="text-white drop-shadow" strokeWidth={2} />
                </div>
              )
            })}

            {/* Libellés + descriptions à l'extérieur */}
            {whyAfribox.map(({ title, text }, i) => (
              <div key={`t${i}`} className="absolute z-10 w-[188px]" style={labelStyle(i)}>
                <h3 className="font-heading text-sm font-bold leading-tight" style={{ color: segColors[i] }}>
                  {title}
                </h3>
                <p className="mt-1 font-body text-xs leading-snug text-brand-sub">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Mobile / tablette : emblème + liste avec descriptions ── */}
        <div className="lg:hidden">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.svg"
              alt="Le réseau de lockers Afribox qui s'étend à travers l'Afrique"
              width={797}
              height={1109}
              unoptimized
              className="h-[200px] w-auto drop-shadow-[0_12px_24px_rgba(31,71,40,0.16)]"
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="space-y-6 max-w-md mx-auto"
          >
            {whyAfribox.map(({ icon: Icon, title, text }, i) => (
              <motion.div key={title} variants={fadeInUp} className="flex items-start gap-4">
                <div
                  style={{ backgroundColor: segColors[i] }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-[0_10px_24px_-8px_rgba(31,71,40,0.45)]"
                >
                  <Icon size={20} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold leading-tight text-brand-gray">{title}</h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-brand-sub">{text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
