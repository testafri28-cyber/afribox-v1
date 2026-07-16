'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { processSteps, type ProcessStep } from '@/lib/constants'

export default function ProcessStepper() {
  const [active, setActive] = useState(1)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const isFirstRun = useRef(true)

  const step = processSteps.find((s) => s.id === active) as ProcessStep

  // Centre l'étape active dans le scroller horizontal (sans scroller la page)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    const scroller = scrollerRef.current
    if (!scroller) return
    const btn = scroller.querySelector<HTMLButtonElement>(
      `[data-step="${active}"]`,
    )
    if (!btn) return
    const offset = btn.offsetLeft - (scroller.clientWidth - btn.clientWidth) / 2
    scroller.scrollTo({ left: offset, behavior: 'smooth' })
  }, [active])

  const goPrev = () => setActive((s) => Math.max(1, s - 1))
  const goNext = () => setActive((s) => Math.min(processSteps.length, s + 1))

  const isLast = active === processSteps.length

  return (
    <div className="bg-white border border-brand-border rounded-2xl overflow-hidden">
      {/* Barre de progression — étapes cliquables */}
      <div
        ref={scrollerRef}
        className="grid grid-cols-6 gap-1.5 md:gap-2 p-3 md:p-6 bg-brand-off border-b border-brand-border"
      >
        {processSteps.map((s) => {
          const isActive = s.id === active
          const isPast = s.id < active
          return (
            <button
              key={s.id}
              data-step={s.id}
              onClick={() => setActive(s.id)}
              aria-label={`Étape ${s.id} : ${s.title}`}
              className={`text-center md:text-left rounded-xl border p-2 md:p-3 transition ${
                isActive
                  ? 'bg-green-primary text-white border-green-primary shadow-sm'
                  : isPast
                  ? 'bg-green-soft text-green-dark border-green-soft'
                  : 'bg-white text-brand-sub border-brand-border hover:border-green-primary/40'
              }`}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 md:mb-1">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                    isActive
                      ? 'bg-white text-green-primary'
                      : isPast
                      ? 'bg-white text-green-dark'
                      : 'bg-brand-off text-brand-mid'
                  }`}
                >
                  {s.id}
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-70 hidden md:inline">
                  Étape
                </span>
              </div>
              {/* Titre visible en desktop ; sur mobile la grille ne montre que les
                  numéros (le titre de l'étape active s'affiche dans le contenu). */}
              <p className="hidden md:block font-body text-xs font-medium leading-tight">
                {s.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* Contenu de l'étape active */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-10"
        >
          {/* Gauche — texte */}
          <div>
            <p className="font-mono text-xs tracking-widest text-green-primary uppercase mb-3">
              Étape {step.id} sur {processSteps.length}
            </p>
            <h3 className="font-heading font-bold text-3xl md:text-4xl text-brand-gray mb-2">
              {step.title}
            </h3>
            <p className="font-mono text-xs text-brand-mid uppercase tracking-widest mb-6">
              {step.tag}
            </p>
            <p className="font-body text-lg text-brand-sub leading-relaxed mb-8">
              {step.text}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {step.actors.map((a) => (
                <span
                  key={a}
                  className="font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full bg-green-bg text-green-dark border border-green-soft"
                >
                  {a}
                </span>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={goPrev}
                disabled={active === 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-border bg-white text-brand-gray text-sm font-body hover:bg-brand-off disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft size={16} />
                Précédent
              </button>

              {isLast ? (
                <Link
                  href="/reserver"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-primary text-white text-sm font-body font-medium hover:bg-green-dark transition"
                >
                  Réserver un locker
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-primary text-white text-sm font-body font-medium hover:bg-green-dark transition"
                >
                  Suivant
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Droite — visuel */}
          <div className="flex items-center justify-center">
            <StepVisual step={step} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function StepVisual({ step }: { step: ProcessStep }) {
  if (step.visual.kind === 'sms') {
    const { code, from } = step.visual
    return (
      <div className="w-full max-w-sm bg-brand-off rounded-2xl p-6 border border-brand-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-primary text-white flex items-center justify-center">
            <MessageSquare size={18} />
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-brand-gray">
              {from}
            </p>
            <p className="font-mono text-[10px] text-brand-mid uppercase tracking-widest">
              SMS · à l&apos;instant
            </p>
          </div>
        </div>
        <div className="bg-white border border-brand-border rounded-xl p-5">
          <p className="font-body text-xs text-brand-sub mb-3 leading-relaxed">
            Votre code d&apos;accès au locker :
          </p>
          <p className="font-mono text-4xl font-bold text-green-primary tracking-widest text-center py-2">
            {code}
          </p>
          <p className="font-body text-[11px] text-brand-mid mt-3 leading-relaxed">
            Valide 72h. À usage unique.
          </p>
        </div>
      </div>
    )
  }

  const { icon: Icon, pillLabel } = step.visual
  return (
    <div className="w-full max-w-sm bg-green-bg rounded-2xl p-10 border border-green-soft flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-2xl bg-white border border-green-soft flex items-center justify-center mb-6">
        <Icon size={36} className="text-green-primary" />
      </div>
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-primary text-white font-mono text-xs tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {pillLabel}
      </span>
    </div>
  )
}
