import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import ReservationForm from '@/components/features/ReservationForm'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import JsonLd from '@/components/seo/JsonLd'
import { getDictionary } from '@/lib/i18n'
import { isLocale, defaultLocale, localePath, type Locale } from '@/lib/i18n/config'

type LocaleParams = { params: { locale: string } }

export function generateMetadata({ params }: LocaleParams): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale
  return buildMetadata(locale, 'reserver')
}

export default function ReservePage({ params }: LocaleParams) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale
  const d = getDictionary(locale)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: d.common.breadcrumbHome, path: '/' },
          { name: d.common.breadcrumbReserver, path: '/reserver' },
        ])}
      />
      {/* En-tête resserré : bouton retour + titre compact, pour que le stepper
          et la sélection du locker soient visibles sans avoir à défiler. */}
      <section className="bg-white">
        <Container className="pt-5 pb-6 md:pt-8 md:pb-8">
          <Link
            href={localePath(locale, '/')}
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-brand-sub hover:text-green-primary transition-colors mb-5 md:mb-6"
          >
            <ArrowLeft size={16} />
            {d.ui.reserve.back}
          </Link>
          <SectionLabel className="mb-3">{d.ui.reserve.label}</SectionLabel>
          <h1 className="font-heading font-bold text-3xl md:text-5xl leading-[1.05] tracking-tight text-brand-gray max-w-3xl mb-3">
            {d.ui.reserve.titleStart}{' '}
            <span className="text-green-primary">{d.ui.reserve.titleAccent}</span>
          </h1>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-2xl">
            {d.ui.reserve.lede}
          </p>

          {/* Statut phase pilote — la réservation est une pré-inscription. */}
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-green-soft bg-green-bg px-4 py-2">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-primary" />
            </span>
            <span className="font-body text-sm text-green-dark">
              <span className="font-semibold">{d.ui.reserve.pilotLabel}</span>{' '}
              {d.ui.reserve.pilotText}
            </span>
          </div>
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
