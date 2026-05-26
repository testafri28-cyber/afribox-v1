'use client'

import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { Monitor, Box, QrCode, ScanLine } from 'lucide-react'

type Hotspot = {
  x: number              // % from left
  y: number              // % from top
  icon: typeof Monitor
  label: string
  description: string
  /** Where the label flies out from the dot. */
  side: 'left' | 'right'
}

const HOTSPOTS: Hotspot[] = [
  { x: 50, y: 47, icon: Monitor,   label: 'Écran tactile',        description: 'Interface simple, dépose ou retire en 60 s', side: 'right' },
  { x: 22, y: 27, icon: Box,       label: 'Compartiments S/M/L',  description: 'Pour tous les formats de colis',             side: 'right' },
  { x: 82, y: 60, icon: QrCode,    label: 'QR de retrait',         description: 'Scanne et récupère sans contact',            side: 'left'  },
  { x: 50, y: 70, icon: ScanLine,  label: 'Lecteur de code',       description: 'Saisis ton code 4 chiffres reçu par SMS',    side: 'right' },
]

export default function LockerPhoto() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  /* Mouse-driven 3D tilt */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 })
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 25 })

  const [hovered, setHovered] = useState<number | null>(null)

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setHovered(null)
  }

  return (
    <div className="relative w-full max-w-[440px]" style={{ perspective: '1200px' }}>
      {/* Brand badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-border shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-green-dark">
            Locker Afribox · Cocody
          </span>
        </span>
      </div>

      {/* Decorative corner accents */}
      <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-green-primary rounded-tl-lg z-20" />
      <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-green-primary rounded-tr-lg z-20" />
      <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-green-primary rounded-bl-lg z-20" />
      <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-green-primary rounded-br-lg z-20" />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
        className="relative rounded-[1.5rem] overflow-hidden border border-brand-border shadow-[0_30px_60px_-25px_rgba(31,71,40,0.45),0_8px_20px_-8px_rgba(31,71,40,0.2)] bg-brand-off group"
      >
        {/* Image with hover-zoom */}
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={reduced ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/locker-hero.jpeg"
              alt="Casier intelligent Afribox installé en Côte d'Ivoire"
              width={1280}
              height={853}
              priority
              className="block w-full h-auto"
            />
          </motion.div>

          {/* Vignette gradient for hotspot readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Hotspots */}
          {HOTSPOTS.map((h, i) => {
            const Icon = h.icon
            const isOpen = hovered === i
            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((cur) => (cur === i ? null : cur))}
                aria-label={`${h.label} — ${h.description}`}
                style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
                className="absolute z-20 group/dot"
              >
                {/* Pulsing dot */}
                <span className="relative flex w-3.5 h-3.5 cursor-pointer">
                  <span className="absolute inset-0 rounded-full bg-green-primary opacity-60 animate-ping" />
                  <span className="relative inline-flex w-3.5 h-3.5 rounded-full bg-green-primary border-2 border-white shadow-md transition-transform duration-200 group-hover/dot:scale-125" />
                </span>

                {/* Floating tooltip */}
                <motion.div
                  initial={false}
                  animate={
                    isOpen
                      ? { opacity: 1, x: 0, scale: 1 }
                      : { opacity: 0, x: h.side === 'right' ? -6 : 6, scale: 0.95 }
                  }
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    [h.side === 'right' ? 'left' : 'right']: '1.4rem',
                    pointerEvents: isOpen ? 'auto' : 'none',
                  }}
                  className="absolute top-1/2 -translate-y-1/2 w-44 px-3 py-2 rounded-lg bg-white border border-brand-border shadow-[0_10px_24px_-8px_rgba(31,71,40,0.3)]"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon size={11} className="text-green-primary flex-shrink-0" />
                    <span className="font-heading font-bold text-[11px] text-brand-gray leading-none">
                      {h.label}
                    </span>
                  </div>
                  <p className="font-body text-[10px] text-brand-sub leading-tight">
                    {h.description}
                  </p>
                </motion.div>
              </button>
            )
          })}
        </div>

        {/* Bottom strip with live status */}
        <div className="relative flex items-center justify-between px-4 py-3 bg-white border-t border-brand-border">
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-green-primary opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-primary" />
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-brand-gray">
              En ligne
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-green-dark">
            12 casiers libres
          </span>
        </div>
      </motion.div>
    </div>
  )
}
