import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { faqPageJsonLd } from '@/lib/jsonld'
import JsonLd from '@/components/seo/JsonLd'

import HeroAfribox         from '@/components/sections/HeroAfribox'
import ProblemSection      from '@/components/sections/ProblemSection'
import ServicesAccordion   from '@/components/sections/ServicesAccordion'
import PricingSection      from '@/components/sections/PricingSection'
import HowItWorksSection   from '@/components/sections/HowItWorksSection'
import WhyAfriboxSection   from '@/components/sections/WhyAfriboxSection'
import ImpactSection       from '@/components/sections/ImpactSection'
import ChannelsSection     from '@/components/sections/ChannelsSection'
import AppDownloadSection  from '@/components/sections/AppDownloadSection'
import AboutSection        from '@/components/sections/AboutSection'
import LockersMapSection   from '@/components/sections/LockersMapSection'
import FaqSection          from '@/components/sections/FaqSection'
import ContactSection      from '@/components/sections/ContactSection'
import CTASection          from '@/components/sections/CTASection'

export const metadata: Metadata = buildMetadata({
  title: 'Afribox — Smart Lockers · Livraison Last-Mile en Afrique',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      {/* FAQPage — mêmes Q/R que l'accordéon visible (conformité Google). */}
      <JsonLd data={faqPageJsonLd()} />
      {/* Ordre narratif : expliquer → démontrer → chiffrer. Pas de témoignages
          en phase pilote (aucun client réel) — on les réintroduira après le
          lancement. « À propos » passe en fin de parcours. */}
      <HeroAfribox />
      <ProblemSection />
      <ServicesAccordion />
      <HowItWorksSection />
      <WhyAfriboxSection />
      <ImpactSection />
      <PricingSection />
      <ChannelsSection />
      <AppDownloadSection />
      <LockersMapSection />
      <AboutSection />
      <ContactSection />
      <CTASection />
      <FaqSection />
    </>
  )
}
