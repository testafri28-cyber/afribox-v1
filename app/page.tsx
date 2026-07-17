import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

import HeroAfribox         from '@/components/sections/HeroAfribox'
import ProblemSection      from '@/components/sections/ProblemSection'
import ServicesAccordion   from '@/components/sections/ServicesAccordion'
import PricingSection      from '@/components/sections/PricingSection'
import HowItWorksSection   from '@/components/sections/HowItWorksSection'
import WhyAfriboxSection   from '@/components/sections/WhyAfriboxSection'
import ChannelsSection     from '@/components/sections/ChannelsSection'
import AppDownloadSection  from '@/components/sections/AppDownloadSection'
import AboutSection        from '@/components/sections/AboutSection'
import TestimonialSection  from '@/components/sections/TestimonialSection'
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
      {/* Ordre narratif : expliquer → prouver → chiffrer.
          Le prix arrive après la valeur (Fonctionnement, Pourquoi) et la
          preuve (Témoignages) ; « À propos » passe en fin de parcours. */}
      <HeroAfribox />
      <ProblemSection />
      <ServicesAccordion />
      <HowItWorksSection />
      <WhyAfriboxSection />
      <TestimonialSection />
      <PricingSection />
      <ChannelsSection />
      <AppDownloadSection />
      <LockersMapSection />
      <FaqSection />
      <AboutSection />
      <ContactSection />
      <CTASection />
    </>
  )
}
