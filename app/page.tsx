import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import ProblemSection from '@/components/sections/ProblemSection'
import ServicesSection from '@/components/sections/ServicesSection'
import HowItWorksPreview from '@/components/sections/HowItWorksPreview'
import ChannelsSection from '@/components/sections/ChannelsSection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import CTASection from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Afribox — Smart Lockers · Livraison Last-Mile en Afrique',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProblemSection />
      <ServicesSection />
      <HowItWorksPreview />
      <ChannelsSection />
      <TestimonialSection />
      <CTASection />
    </>
  )
}
