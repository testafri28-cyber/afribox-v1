import type { Metadata } from 'next'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import GridBackground from '@/components/ui/GridBackground'
import ContactForm from '@/components/features/ContactForm'
import LockersMap from '@/components/features/LockersMap'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Contact — Afribox',
  description:
    'Une question ? Un projet partenaire ? Notre équipe vous répond sous 24h ouvrées.',
  path: '/contact',
})

const contactInfos = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Plateau · Rue du Commerce · Abidjan',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+225 27 22 49 56 78',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@afribox.africa',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun. – Ven., 8h – 18h (GMT)',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* En-tête */}
      <section className="bg-white">
        <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
          <SectionLabel className="mb-4">Contact</SectionLabel>
          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray max-w-3xl mb-4">
            On est là.
          </h1>
          <p className="font-body text-lg md:text-xl text-brand-sub leading-relaxed max-w-2xl">
            Question, demande de devis, projet partenaire ? Écrivez-nous,
            appelez-nous, ou passez nous voir au Plateau.
          </p>
        </Container>
      </section>

      {/* Infos + Formulaire */}
      <section className="bg-brand-off">
        <Container className="py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Infos */}
            <aside className="lg:col-span-2 space-y-6">
              <div className="space-y-5">
                {contactInfos.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-green-bg flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-green-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-brand-mid uppercase mb-1">
                        {label}
                      </p>
                      <p className="font-body text-brand-gray">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-4">
                <p className="font-mono text-[11px] tracking-widest text-brand-mid uppercase mb-3">
                  Suivez-nous
                </p>
                <div className="flex gap-2">
                  {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-gray hover:border-green-primary hover:text-green-primary transition"
                    >
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Carte */}
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl">
            <SectionLabel className="mb-4">Réseau Afribox</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
              Le locker le plus proche de vous.
            </h2>
          </div>
          <LockersMap height="500px" />
        </Container>
      </section>

      {/* B2B */}
      <section className="relative overflow-hidden bg-green-dark text-white">
        <GridBackground opacity={0.06} />
        <Container className="relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <SectionLabel className="mb-4" tone="white">
              Partenariats
            </SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight mb-5">
              Parlons de votre projet.
            </h2>
            <p className="font-body text-lg text-white/80 leading-relaxed mb-6 max-w-2xl">
              Vous gérez une plateforme e-commerce, une flotte logistique, ou un
              immeuble qui veut accueillir un locker ? Écrivez à notre équipe
              partenariats — réponse sous 48h ouvrées.
            </p>
            <p className="font-mono text-sm text-green-light mb-8">
              partnerships@afribox.africa
            </p>
            <Button href="mailto:partnerships@afribox.africa" variant="white">
              Écrire à l&apos;équipe partenariats
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
