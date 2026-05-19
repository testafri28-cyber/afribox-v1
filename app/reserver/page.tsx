import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import ReservationForm from '@/components/features/ReservationForm'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Réserver un locker — Afribox',
  description:
    "Réservez un casier Afribox près de chez vous en moins d'une minute. Paiement Mobile Money ou carte bancaire.",
  path: '/reserver',
})

export default function ReservePage() {
  return (
    <>
      <section className="bg-white">
        <Container className="pt-16 pb-10 md:pt-24 md:pb-14">
          <SectionLabel className="mb-4">Réservation</SectionLabel>
          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray max-w-3xl mb-4">
            Réservez votre locker en{' '}
            <span className="text-green-primary">4 étapes.</span>
          </h1>
          <p className="font-body text-lg text-brand-sub leading-relaxed max-w-2xl">
            Choisissez un casier, configurez votre envoi, payez en toute
            sécurité. Le code de dépôt est généré immédiatement.
          </p>
        </Container>
      </section>

      <section className="bg-brand-off">
        <Container className="py-12 md:py-20">
          <ReservationForm />
        </Container>
      </section>
    </>
  )
}
