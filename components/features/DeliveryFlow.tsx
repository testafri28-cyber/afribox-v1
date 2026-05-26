'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ShoppingBag, Truck, Package, User, Check, type LucideIcon,
} from 'lucide-react'

type Step = {
  icon: LucideIcon
  title: string
  status: string
}

const STEPS: Step[] = [
  { icon: ShoppingBag, title: 'Commande passée',  status: 'À l’instant' },
  { icon: Truck,       title: 'En transit',        status: 'Livreur en route' },
  { icon: Package,     title: 'Déposé au locker',  status: 'Code envoyé par SMS' },
  { icon: User,        title: 'Prêt à récupérer',  status: 'Cocody · 24/7' },
]

const easeOutExpo = [0.22, 1, 0.36, 1] as const

export default function DeliveryFlow() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) {
      setActive(STEPS.length - 1)
      return
    }
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, 2200)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="relative w-full max-w-[360px]">
      {/* Brand badge on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-border shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-green-dark">
            Suivi en direct
          </span>
        </span>
      </div>

      {/* Outer card */}
      <div className="relative rounded-[1.75rem] bg-white border border-brand-border p-5 pt-7 shadow-[0_30px_60px_-25px_rgba(31,71,40,0.25)]">
        {/* Vertical connector running through the steps */}
        <div className="absolute left-[2.45rem] top-12 bottom-12 w-px bg-brand-border" />
        <motion.div
          className="absolute left-[2.45rem] top-12 w-px bg-green-primary origin-top"
          initial={false}
          animate={{ scaleY: (active + 0.5) / STEPS.length }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          style={{ bottom: '3rem' }}
        />

        <ul className="relative space-y-3">
          {STEPS.map((s, i) => {
            const isActive = i === active
            const isDone = i < active
            const Icon = s.icon
            return (
              <li key={i} className="relative">
                <div
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                    isActive
                      ? 'bg-green-bg'
                      : isDone
                        ? 'bg-white'
                        : 'bg-white'
                  }`}
                >
                  {/* Icon disc on the connector line */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={
                        isActive && !reduced
                          ? { scale: [1, 1.08, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isDone
                          ? 'bg-green-primary border-green-primary text-white'
                          : isActive
                            ? 'bg-white border-green-primary text-green-primary'
                            : 'bg-white border-brand-border text-brand-mid'
                      }`}
                    >
                      {isDone ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
                    </motion.div>
                    {/* Pulse halo on active */}
                    {isActive && !reduced && (
                      <span className="absolute inset-0 rounded-full border-2 border-green-primary opacity-40 animate-ping" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-heading font-semibold text-sm leading-tight transition-colors ${
                        isDone || isActive ? 'text-brand-gray' : 'text-brand-mid'
                      }`}
                    >
                      {s.title}
                    </p>
                    <p
                      className={`font-body text-[11px] leading-tight mt-0.5 transition-colors ${
                        isActive ? 'text-green-dark' : 'text-brand-sub'
                      }`}
                    >
                      {s.status}
                    </p>
                  </div>

                  {/* Trailing status dot */}
                  <span
                    className={`flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors ${
                      isDone
                        ? 'bg-green-primary'
                        : isActive
                          ? 'bg-green-primary animate-pulse'
                          : 'bg-brand-border'
                    }`}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        {/* Bottom strip — code preview */}
        <div className="mt-4 flex items-center justify-between px-3 py-2.5 rounded-xl bg-brand-gray text-white">
          <span className="font-mono text-[9px] tracking-widest uppercase text-green-light">
            Code de retrait
          </span>
          <span className="font-mono text-base font-bold tracking-[0.3em] text-white">
            48-12
          </span>
        </div>
      </div>

      {/* Floating shadow on the ground */}
      <div className="absolute -bottom-6 left-8 right-8 h-6 rounded-full bg-green-dark/15 blur-xl" />
    </div>
  )
}
