'use client'

import Container from '@/components/layout/Container'
import StatCard from '@/components/ui/StatCard'
import { stats } from '@/lib/constants'

/* Perspective tilts so cards seem to float around the viewer's gaze
   (outer cards angle inward, inner cards stay near-flat). */
const tilts = [
  { rotateY:  24, translateZ: -90, translateY:  14 },
  { rotateY:   9, translateZ:  30, translateY:  -8 },
  { rotateY:  -9, translateZ:  30, translateY:  -8 },
  { rotateY: -24, translateZ: -90, translateY:  14 },
]

export default function StatsBar() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-24">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          style={{ perspective: '900px', perspectiveOrigin: '50% 40%' }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                transform: `rotateY(${tilts[i].rotateY}deg) translateZ(${tilts[i].translateZ}px) translateY(${tilts[i].translateY}px)`,
                transformStyle: 'preserve-3d',
              }}
              className="transition-transform duration-500 hover:!transform-none"
            >
              <StatCard
                value={s.value}
                label={s.label}
                icon={s.icon}
                hint={s.hint}
                progress={s.progress}
                index={i}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
