'use client'

import { motion, useReducedMotion } from 'framer-motion'

/* Single stylised locker in isometric projection.
   Pure SVG so it stays crisp and travels through the design system tokens.
   Subtle vertical float + softly opening door, both gated by reduced-motion. */
export default function IsometricLocker() {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full max-w-[360px]">
      {/* Brand badge on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-border shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-green-dark">
            Locker · Cocody
          </span>
        </span>
      </div>

      <motion.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg viewBox="0 0 360 420" className="w-full h-auto" aria-hidden>
          <defs>
            {/* Front-face gradient */}
            <linearGradient id="loc-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#1B5E20" />
              <stop offset="100%" stopColor="#27AE60" />
            </linearGradient>
            {/* Side-face gradient (darker for shadowed side) */}
            <linearGradient id="loc-side" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="#144419" />
              <stop offset="100%" stopColor="#1B5E20" />
            </linearGradient>
            {/* Top-face */}
            <linearGradient id="loc-top" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="#2FC36A" />
              <stop offset="100%" stopColor="#27AE60" />
            </linearGradient>
            {/* Inside (dark) */}
            <linearGradient id="loc-inside" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"  stopColor="#2F2F2F" />
              <stop offset="100%" stopColor="#1B5E20" />
            </linearGradient>
            {/* Soft drop shadow */}
            <filter id="loc-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feOffset dy="8" />
              <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground shadow ellipse */}
          <ellipse cx="180" cy="395" rx="120" ry="14" fill="#1B5E20" opacity="0.18" />

          {/* === LOCKER BODY ============================================== */}
          <g filter="url(#loc-shadow)">
            {/* Right side face (parallelogram receding back) */}
            <polygon
              points="270,90 320,60 320,360 270,390"
              fill="url(#loc-side)"
            />
            {/* Top face */}
            <polygon
              points="60,60 270,60 320,30 110,30"
              fill="url(#loc-top)"
            />
            {/* Front face */}
            <rect x="60" y="60" width="210" height="330" fill="url(#loc-front)" />
          </g>

          {/* === DOOR GRID (3 rows × 2 cols) =============================== */}
          {/* Each cell: small rounded panel inset into the front face */}
          {Array.from({ length: 6 }).map((_, i) => {
            const col = i % 2
            const row = Math.floor(i / 2)
            const x = 78 + col * 96
            const y = 80 + row * 104
            const isOpen = i === 2 // middle-left cell opens
            return (
              <g key={i}>
                {/* Cell frame / inside (darker) */}
                <rect
                  x={x}
                  y={y}
                  width="84"
                  height="88"
                  rx="6"
                  fill="url(#loc-inside)"
                />
                {/* Door */}
                {isOpen ? (
                  <g>
                    {/* Open door swung outward (skewed parallelogram on the left) */}
                    <polygon
                      points={`${x},${y} ${x - 28},${y - 8} ${x - 28},${y + 96} ${x},${y + 88}`}
                      fill="#6FCF97"
                      stroke="#27AE60"
                      strokeWidth="1"
                    />
                    {/* Inside: small package */}
                    <rect
                      x={x + 22}
                      y={y + 24}
                      width="40"
                      height="40"
                      rx="4"
                      fill="#EBF7F0"
                    />
                    <rect
                      x={x + 22}
                      y={y + 40}
                      width="40"
                      height="3"
                      fill="#27AE60"
                    />
                    <rect
                      x={x + 40}
                      y={y + 24}
                      width="4"
                      height="40"
                      fill="#27AE60"
                    />
                  </g>
                ) : (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width="84"
                      height="88"
                      rx="6"
                      fill="#D4EDDF"
                      stroke="#27AE60"
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    {/* Handle */}
                    <circle cx={x + 74} cy={y + 44} r="2.5" fill="#1B5E20" />
                    {/* Size tag */}
                    <text
                      x={x + 8}
                      y={y + 14}
                      fontFamily="ui-monospace, monospace"
                      fontSize="7"
                      fill="#1B5E20"
                      opacity="0.55"
                      letterSpacing="1.4"
                    >
                      {['S', 'M', 'L', 'S', 'M', 'L'][i]}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* === KEYPAD / SCREEN at the top of the front face ============== */}
          <rect x="80" y="64" width="170" height="12" rx="3" fill="#2F2F2F" opacity="0.85" />
          <circle cx="92" cy="70" r="2" fill="#6FCF97">
            {!reduced && (
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            )}
          </circle>
          <text
            x="104"
            y="73"
            fontFamily="ui-monospace, monospace"
            fontSize="6"
            fill="#6FCF97"
            letterSpacing="1.8"
          >
            AFRIBOX · ONLINE
          </text>
        </svg>
      </motion.div>
    </div>
  )
}
