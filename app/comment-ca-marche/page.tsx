import type { Metadata } from 'next'
import { Play } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import ProcessStepper from '@/components/features/ProcessStepper'
import FAQAccordion from '@/components/features/FAQAccordion'
import ChannelsSection from '@/components/sections/ChannelsSection'
import CTASection from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Comment ça marche — Afribox',
  description:
    "Découvrez le fonctionnement complet d'Afribox en 6 étapes. De la commande au retrait, simple et rapide.",
  path: '/comment-ca-marche',
})

export default function HowItWorksPage() {
  return (
    <>
      {/* En-tête */}
      <section className="bg-white">
        <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
          <SectionLabel className="mb-4">Comment ça marche</SectionLabel>
          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray max-w-3xl mb-6">
            Rapide à comprendre.{' '}
            <span className="text-green-primary">Rapide à utiliser.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-brand-sub leading-relaxed max-w-2xl">
            Six étapes pour que votre colis arrive à destination sans appel, sans
            attente, sans coordination compliquée.
          </p>
        </Container>
      </section>

      {/* Process Stepper */}
      <section className="bg-brand-off">
        <Container className="py-16 md:py-24">
          <ProcessStepper />
        </Container>
      </section>

      {/* Canaux */}
      <ChannelsSection />

      {/* Vidéo placeholder */}
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <div className="bg-brand-off border border-brand-border rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative group cursor-pointer hover:bg-green-bg transition">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-green-primary text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-lg">
                <Play size={30} className="ml-1.5" fill="currentColor" />
              </div>
              <p className="font-heading font-bold text-2xl md:text-3xl text-brand-gray text-center px-6">
                Moins de 60 secondes,{' '}
                <span className="text-green-primary">du dépôt au retrait.</span>
              </p>
              <p className="font-mono text-xs tracking-widest text-brand-mid uppercase mt-3">
                Vidéo · 0:58
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-brand-off">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl mb-12">
            <SectionLabel className="mb-4">Questions fréquentes</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
              Les réponses aux questions qu&apos;on nous pose le plus.
            </h2>
          </div>
          <FAQAccordion />
        </Container>
      </section>

      <CTASection />
    </>
  )
}
