import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
      {/* En-tête resserré : bouton retour + titre compact, pour que le stepper
          et la sélection du locker soient visibles sans avoir à défiler. */}
      <section className="bg-white">
        <Container className="pt-5 pb-6 md:pt-8 md:pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-brand-sub hover:text-green-primary transition-colors mb-5 md:mb-6"
          >
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </Link>
          <SectionLabel className="mb-3">Réservation</SectionLabel>
          <h1 className="font-heading font-bold text-3xl md:text-5xl leading-[1.05] tracking-tight text-brand-gray max-w-3xl mb-3">
            Réservez votre locker en{' '}
            <span className="text-green-primary">4 étapes.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-2xl">
            Choisissez un casier, configurez votre envoi, puis finalisez votre
            réservation sur WhatsApp en un clic.
          </p>
        </Container>
      </section>

      <section className="bg-brand-off">
        <Container className="pt-6 pb-12 md:pt-8 md:pb-16">
          <ReservationForm />
        </Container>
      </section>
    </>
  )
}
