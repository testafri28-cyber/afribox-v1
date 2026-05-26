'use client'

import Container from '@/components/layout/Container'
import StatCard from '@/components/ui/StatCard'
import { stats } from '@/lib/constants'

const tones = ['green', 'soft', 'green', 'soft'] as const

export default function StatsBar() {
  return (
    <section className="bg-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              label={s.label}
              icon={s.icon}
              hint={s.hint}
              tone={tones[i]}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
