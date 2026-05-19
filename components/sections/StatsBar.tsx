import Container from '@/components/layout/Container'
import StatCard from '@/components/ui/StatCard'
import GridBackground from '@/components/ui/GridBackground'
import { stats } from '@/lib/constants'

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-green-primary">
      <GridBackground opacity={0.1} />
      <Container className="relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>
    </section>
  )
}
