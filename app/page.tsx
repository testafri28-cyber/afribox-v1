import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

import HeroSection         from '@/components/sections/HeroSection'
import StatsBar            from '@/components/sections/StatsBar'
import ProblemSection      from '@/components/sections/ProblemSection'
import ServicesAccordion   from '@/components/sections/ServicesAccordion'
import HowItWorksSection   from '@/components/sections/HowItWorksSection'
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
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <ServicesAccordion />
      <HowItWorksSection />
      <ChannelsSection />
      <AppDownloadSection />
      <AboutSection />
      <TestimonialSection />
      <LockersMapSection />
      <FaqSection />
      <ContactSection />
      <CTASection />
    </>
  )
}
