import Container from '@/components/layout/Container'
import StatCard from '@/components/ui/StatCard'
import { stats } from '@/lib/constants'

export default function StatsBar() {
  return (
    <section className="bg-green-primary">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>
    </section>
  )
}
