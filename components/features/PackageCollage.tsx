'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Truck, Package } from 'lucide-react'

type Status = 'ready' | 'transit' | 'delivered'

type Parcel = {
  size: 'S' | 'M' | 'L'
  code: string
  status: Status
  /** Position inside the 360×420 canvas, in % */
  x: number
  y: number
  /** Width relative to the container width, in % */
  w: number
  rotate: number
  z: number
  delay: number
}

const PARCELS: Parcel[] = [
  { size: 'M', code: '48-12', status: 'ready',     x: 18, y: 12, w: 62, rotate: -8, z: 30, delay: 0    },
  { size: 'S', code: '73-09', status: 'transit',   x: 56, y: 38, w: 46, rotate:  9, z: 20, delay: 0.4  },
  { size: 'L', code: '55-21', status: 'delivered', x:  6, y: 56, w: 54, rotate: -4, z: 10, delay: 0.8  },
  { size: 'S', code: '11-83', status: 'transit',   x: 64, y:  4, w: 36, rotate: 14, z:  5, delay: 1.2 },
]

const STATUS_MAP: Record<Status, { label: string; tint: string; icon: typeof Check }> = {
  ready:     { label: 'Prêt',       tint: 'text-green-primary',  icon: Check },
  transit:   { label: 'En transit', tint: 'text-brand-gray',     icon: Truck },
  delivered: { label: 'Livré',      tint: 'text-green-dark',     icon: Package },
}

export default function PackageCollage() {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full max-w-[380px]">
      {/* Brand badge on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-border shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-green-dark">
            Colis en mouvement
          </span>
        </span>
      </div>

      {/* Canvas with a subtle radial backdrop */}
      <div className="relative aspect-[360/420] rounded-[1.75rem] bg-gradient-to-br from-green-bg/40 to-white overflow-hidden">
        {/* Faint dotted grid for depth */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(39,174,96,0.18) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        {/* Floating parcels */}
        {PARCELS.map((p, i) => {
          const { icon: Icon, label, tint } = STATUS_MAP[p.status]
          return (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 20, rotate: p.rotate }}
              animate={
                reduced
                  ? { opacity: 1, rotate: p.rotate }
                  : {
                      opacity: 1,
                      y: [0, -8, 0],
                      rotate: [p.rotate, p.rotate + 2, p.rotate],
                    }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: 5 + i * 0.6,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              style={{
                left:  `${p.x}%`,
                top:   `${p.y}%`,
                width: `${p.w}%`,
                zIndex: p.z,
              }}
              className="absolute"
            >
              <Parcel size={p.size} code={p.code} statusLabel={label} statusTint={tint} StatusIcon={Icon} />
            </motion.div>
          )
        })}

        {/* Floor shadow */}
        <div className="absolute bottom-4 left-10 right-10 h-3 rounded-full bg-green-dark/15 blur-md" />
      </div>
    </div>
  )
}

/* --------------------------------------------------------- Parcel card */
function Parcel({
  size,
  code,
  statusLabel,
  statusTint,
  StatusIcon,
}: {
  size: 'S' | 'M' | 'L'
  code: string
  statusLabel: string
  statusTint: string
  StatusIcon: typeof Check
}) {
  return (
    <div className="relative rounded-xl bg-brand-off border border-brand-border shadow-[0_18px_32px_-14px_rgba(31,71,40,0.35)]">
      {/* Tape strip across the package */}
      <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 bg-green-soft border-y border-green-primary/30" />

      {/* Top-left size pill */}
      <span className="absolute -top-2 left-3 px-2 py-0.5 rounded-full bg-green-primary text-white font-mono text-[9px] tracking-widest uppercase shadow-sm">
        {size}
      </span>

      {/* Tag pinned to top-right */}
      <div className="absolute -top-3 -right-3 rounded-md bg-white border border-brand-border shadow-md px-2 py-1 rotate-[6deg]">
        <span className="block font-mono text-[8px] tracking-widest uppercase text-brand-mid leading-none">
          Code
        </span>
        <span className="block font-mono text-[11px] font-bold tracking-[0.18em] text-brand-gray leading-none mt-0.5">
          {code}
        </span>
      </div>

      {/* Bottom status row */}
      <div className="relative flex items-center gap-1.5 px-3 pt-7 pb-2.5">
        <StatusIcon size={11} className={`flex-shrink-0 ${statusTint}`} />
        <span className={`font-body text-[10px] font-medium leading-none ${statusTint}`}>
          {statusLabel}
        </span>
      </div>
    </div>
  )
}

