'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import GridBackground from '@/components/ui/GridBackground'

/* ------------------------------------------------------------------ Types */
export type BentoCard = {
  label?: string
  title: string
  description: string
  /** Visual rendered on the right side of the card (e.g. a 3D image). */
  visual?: React.ReactNode
}

type Props = {
  accent: BentoCard       // tall accent-coloured card (animates as a side card)
  hero: BentoCard         // wide card with the scale-in entrance
  tertiary: BentoCard     // bottom card
  /** Optional 4th card. When provided, tertiary and quaternary share the bottom row. */
  quaternary?: BentoCard
  /** Where the accent card sits in the bento grid. Default: 'left'. */
  accentPosition?: 'left' | 'right'
  className?: string
}

/* --------------------------------------------------------------- Easing */
const easeOutExpo = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------ Component */
export default function BentoTriple({
  accent,
  hero,
  tertiary,
  quaternary,
  accentPosition = 'left',
  className = '',
}: Props) {
  const accentOnRight = accentPosition === 'right'
  const hasQuad = !!quaternary
  const reduced = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.15 })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const fullAnim = !reduced && isDesktop
  const variantKey = `${fullAnim ? 'd' : 'm'}-${reduced ? 'r' : 'a'}`
  const phase = inView ? 'visible' : 'hidden'

  /* Hero card: scale 1.5 -> 1 with fade (desktop only) */
  const heroVariants: Variants = fullAnim
    ? {
        hidden: { scale: 1.5, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            scale:   { duration: 0.9, ease: easeOutExpo },
            opacity: { duration: 0.4, ease: 'easeOut' },
          },
        },
      }
    : reduced
      ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
      : {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        }

  const sideVariants: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.45 + i * 0.12, ease: easeOutExpo },
        }),
      }

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[1fr_1fr] gap-4 md:gap-6 md:min-h-[460px]">

        {/* ---------------- Card 1 — Accent (left, vertical) ---------------- */}
        <motion.article
          key={`a-${variantKey}`}
          variants={sideVariants}
          initial="hidden"
          animate={phase}
          custom={0}
          className={`${accentOnRight ? 'md:col-start-3 md:col-end-4' : 'md:col-start-1 md:col-end-2'} md:row-start-1 md:row-end-3 relative overflow-hidden rounded-2xl p-6 md:p-7 bg-gradient-to-br from-green-dark to-green-primary text-white border border-green-dark shadow-[0_4px_20px_-8px_rgba(31,71,40,0.18)] flex flex-col`}
        >
          <GridBackground tone="white" />
          <CardBody
            label={accent.label}
            title={accent.title}
            description={accent.description}
            visual={accent.visual}
            tone="dark"
            layout="vertical"
          />
        </motion.article>

        {/* ---------------- Card 2 — Hero (top-right, large) ---------------- */}
        <motion.article
          key={`h-${variantKey}`}
          variants={heroVariants}
          initial="hidden"
          animate={phase}
          style={{ transformOrigin: 'center center', willChange: 'transform' }}
          className={`${accentOnRight ? 'md:col-start-1 md:col-end-3' : 'md:col-start-2 md:col-end-4'} md:row-start-1 md:row-end-2 relative overflow-hidden rounded-2xl p-6 md:p-8 bg-white border border-brand-border shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)] z-10`}
        >
          <CardBody
            label={hero.label}
            title={hero.title}
            description={hero.description}
            visual={hero.visual}
            tone="light"
            layout="horizontal"
          />
        </motion.article>

        {/* ---------------- Card 3 — Tertiary (bottom) ---------------- */}
        <motion.article
          key={`t-${variantKey}`}
          variants={sideVariants}
          initial="hidden"
          animate={phase}
          custom={1}
          className={`${
            hasQuad
              ? accentOnRight
                ? 'md:col-start-1 md:col-end-2'
                : 'md:col-start-2 md:col-end-3'
              : accentOnRight
                ? 'md:col-start-1 md:col-end-3'
                : 'md:col-start-2 md:col-end-4'
          } md:row-start-2 md:row-end-3 relative overflow-hidden rounded-2xl p-6 md:p-8 bg-brand-off border border-brand-border shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)]`}
        >
          <CardBody
            label={tertiary.label}
            title={tertiary.title}
            description={tertiary.description}
            visual={tertiary.visual}
            tone="light"
            layout={hasQuad ? 'vertical' : 'horizontal'}
          />
        </motion.article>

        {/* ---------------- Card 4 — Quaternary (bottom, optional) ---------------- */}
        {quaternary && (
          <motion.article
            key={`q-${variantKey}`}
            variants={sideVariants}
            initial="hidden"
            animate={phase}
            custom={2}
            className={`${
              accentOnRight ? 'md:col-start-2 md:col-end-3' : 'md:col-start-3 md:col-end-4'
            } md:row-start-2 md:row-end-3 relative overflow-hidden rounded-2xl p-6 md:p-8 bg-white border border-brand-border shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)]`}
          >
            <CardBody
              label={quaternary.label}
              title={quaternary.title}
              description={quaternary.description}
              visual={quaternary.visual}
              tone="light"
              layout="vertical"
            />
          </motion.article>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------------- Card body */
type CardBodyProps = {
  label?: string
  title: string
  description: string
  visual?: React.ReactNode
  tone: 'light' | 'dark'
  layout: 'vertical' | 'horizontal'
}

function CardBody({ label, title, description, visual, tone, layout }: CardBodyProps) {
  const titleClass = tone === 'dark' ? 'text-white' : 'text-brand-gray'
  const descClass  = tone === 'dark' ? 'text-white/85' : 'text-brand-sub'
  const ghostStyle: React.CSSProperties =
    tone === 'dark'
      ? { color: 'rgba(255,255,255,0.14)' }
      : { color: 'rgba(39, 174, 96, 0.14)' }

  const ghostNumber = label && (
    <span
      aria-hidden
      className="absolute top-4 right-5 md:top-5 md:right-6 font-heading font-bold text-5xl md:text-6xl leading-none select-none pointer-events-none z-10"
      style={ghostStyle}
    >
      {label}
    </span>
  )

  if (layout === 'vertical') {
    // Visual sits at the bottom of the card, text on top
    return (
      <>
        {ghostNumber}
        <div className="relative flex flex-col h-full z-20">
          <div className="flex-1">
            <h3 className={`font-heading font-bold text-2xl md:text-3xl leading-tight ${titleClass}`}>
              {title}
            </h3>
            <p className={`font-body text-sm md:text-base leading-relaxed mt-3 ${descClass}`}>
              {description}
            </p>
          </div>
          {visual && (
            <div className="relative mt-6 flex justify-end items-end">
              {visual}
            </div>
          )}
        </div>
      </>
    )
  }

  // Horizontal: text on the left, visual on the right
  return (
    <>
      {ghostNumber}
      <div className="relative flex items-stretch gap-6 h-full z-20">
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className={`font-heading font-bold text-2xl md:text-3xl leading-tight ${titleClass}`}>
            {title}
          </h3>
          <p className={`font-body text-sm md:text-base leading-relaxed mt-2 max-w-md ${descClass}`}>
            {description}
          </p>
        </div>
        {visual && (
          <div className="relative hidden sm:flex flex-shrink-0 items-center justify-center w-32 md:w-44">
            {visual}
          </div>
        )}
      </div>
    </>
  )
}
