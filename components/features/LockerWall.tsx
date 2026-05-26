'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Package } from 'lucide-react'

/* 4 rows × 3 cols = 12 locker cells. A different cell opens every cycle
   to reveal a package inside. Pure visual — no interaction. */
const ROWS = 4
const COLS = 3
const TOTAL = ROWS * COLS

/* Cells that look "occupied" (slight green tint). Hand-picked for rhythm. */
const OCCUPIED = new Set([1, 4, 7, 10])

const easeOutExpo = [0.22, 1, 0.36, 1] as const

export default function LockerWall() {
  const reduced = useReducedMotion()
  const [openCell, setOpenCell] = useState<number>(4)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setOpenCell((prev) => {
        let next = prev
        while (next === prev) next = Math.floor(Math.random() * TOTAL)
        return next
      })
    }, 2800)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="relative w-full max-w-[360px]">
      {/* Brand badge on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-border shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-green-dark">
            Locker actif
          </span>
        </span>
      </div>

      {/* Locker wall frame */}
      <div
        className="relative rounded-[1.75rem] bg-gradient-to-br from-green-dark to-green-primary p-4 shadow-[0_30px_60px_-25px_rgba(31,71,40,0.45)]"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 30%' }}
      >
        {/* Grid of cells */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            aspectRatio: `${COLS} / ${ROWS + 0.2}`,
          }}
        >
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isOpen = i === openCell
            const isOccupied = OCCUPIED.has(i)
            return (
              <div
                key={i}
                className="relative rounded-md bg-green-dark/60 overflow-hidden"
                style={{ perspective: '800px' }}
              >
                {/* Inside of the cell (visible when door is open) */}
                <div className="absolute inset-0 flex items-center justify-center bg-brand-gray">
                  <Package size={16} className="text-green-light" />
                </div>

                {/* Door */}
                <motion.div
                  initial={false}
                  animate={
                    reduced
                      ? { rotateY: isOpen ? -95 : 0 }
                      : { rotateY: isOpen ? -95 : 0 }
                  }
                  transition={{ duration: 0.7, ease: easeOutExpo }}
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                  className={`absolute inset-0 rounded-md border ${
                    isOccupied
                      ? 'bg-green-soft border-green-light/60'
                      : 'bg-white border-green-bg'
                  } shadow-[inset_0_-2px_4px_rgba(0,0,0,0.06)]`}
                >
                  {/* Handle (small dot near the right edge) */}
                  <span
                    className={`absolute top-1/2 right-1.5 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                      isOccupied ? 'bg-green-dark' : 'bg-brand-mid'
                    }`}
                  />
                  {/* Tiny size tag in the corner (S/M/L variation) */}
                  <span
                    className={`absolute top-1.5 left-1.5 font-mono text-[7px] tracking-widest uppercase ${
                      isOccupied ? 'text-green-dark/60' : 'text-brand-mid/70'
                    }`}
                  >
                    {(['S', 'M', 'L'] as const)[i % 3]}
                  </span>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Bottom strip: faux screen / status */}
        <div className="mt-3 flex items-center justify-between px-2 py-2 rounded-md bg-brand-gray/90 text-white">
          <span className="font-mono text-[9px] tracking-widest uppercase text-green-light">
            AFRIBOX · Cocody
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-light animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest uppercase">
              Online
            </span>
          </span>
        </div>
      </div>

      {/* Floating shadow on the ground */}
      <div className="absolute -bottom-6 left-8 right-8 h-6 rounded-full bg-green-dark/15 blur-xl" />
    </div>
  )
}
