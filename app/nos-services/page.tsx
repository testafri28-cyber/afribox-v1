import type { Metadata } from 'next'
import { ArrowRight, Check } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import GridBackground from '@/components/ui/GridBackground'
import {
  merchantBenefits,
  pricing,
  whyAfribox,
  consumerBenefits,
} from '@/lib/constants'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Nos services — Afribox',
  description:
    "Une infrastructure de lockers pour les marchands, les particuliers et les entreprises. Une solution adaptée à chaque acteur.",
  path: '/nos-services',
})

const consumerSteps = [
  { n: '01', text: 'Choisissez un locker près de chez vous ou de votre destinataire.' },
  { n: '02', text: 'Sélectionnez la taille du casier et la durée de location.' },
  { n: '03', text: 'Payez en Mobile Money ou par carte bancaire.' },
  { n: '04', text: 'Recevez votre code unique, déposez ou récupérez le colis.' },
]

const entrepriseBenefits = [
  'Compte multi-utilisateurs avec rôles',
  'Facturation mensuelle centralisée',
  'Tarifs dégressifs selon le volume',
  'Support dédié et SLA contractuel',
  'API d\'intégration avec votre ERP',
]

export default function ServicesPage() {
  return (
    <>
      {/* En-tête */}
      <section className="bg-white">
        <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
          <SectionLabel className="mb-4">Nos services</SectionLabel>
          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray max-w-3xl mb-4">
            Une infrastructure pour{' '}
            <span className="text-green-primary">chaque acteur.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-brand-sub leading-relaxed max-w-2xl">
            Marchands, particuliers, entreprises — chacun trouve un usage. Une
            seule promesse : que vos colis arrivent toujours à destination.
          </p>
        </Container>
      </section>

      {/* Service B2B — pleine largeur fond vert sombre */}
      <section id="b2b" className="relative overflow-hidden bg-green-dark text-white">
        <GridBackground opacity={0.06} />
        <Container className="relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Badge tone="green" className="mb-6">
                B2B · Marchands
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight mb-5">
                Livrez vos clients. Sans y penser.
              </h2>
              <p className="font-body text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                Que vous gériez 10 ou 10 000 livraisons par mois, notre réseau
                de lockers s&apos;intègre à votre flux. Aucune coordination
                manuelle. Aucune relance. Vos clients sont informés
                automatiquement, et vous suivez tout depuis un tableau de bord.
              </p>
              <Button href="/contact" variant="white" size="lg">
                Parler à notre équipe
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>

            <ul className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              {merchantBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-green-light mt-0.5 flex-shrink-0"
                  />
                  <span className="font-body text-white/90">{b}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 pt-4 border-t border-white/10 mt-4">
                <span className="font-mono text-xs tracking-widest text-green-light uppercase">
                  + Intégration API · Webhooks · Tableau de bord temps réel
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Service Particuliers */}
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <Badge className="mb-6">B2C · Particuliers</Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray mb-5">
                Envoyez un colis à n&apos;importe qui. Simplement.
              </h2>
              <p className="font-body text-lg text-brand-sub leading-relaxed mb-8 max-w-xl">
                Pas besoin d&apos;être marchand. Un anniversaire à organiser, un
                document à transmettre, un colis à expédier à un proche ? Afribox
                fonctionne aussi pour vous.
              </p>
              <Button href="/reserver" variant="primary" size="lg">
                Réserver un locker
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <ul className="space-y-3 mt-8">
                {consumerBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-green-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="font-body text-brand-gray text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {consumerSteps.map((s) => (
                <div
                  key={s.n}
                  className="relative overflow-hidden flex gap-4 p-5 bg-brand-off border border-brand-border rounded-2xl"
                >
                  <GridBackground tone="green" />
                  <p className="relative font-mono font-bold text-2xl text-green-primary leading-none">
                    {s.n}
                  </p>
                  <p className="relative font-body text-brand-gray leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Service Entreprises */}
      <section className="bg-brand-off">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <Badge tone="dark" className="mb-6">
                B2B · Entreprises
              </Badge>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray mb-5">
                Plusieurs envois par semaine ? On a ce qu&apos;il faut.
              </h2>
              <p className="font-body text-lg text-brand-sub leading-relaxed mb-8 max-w-xl">
                Pour vos équipes ou vos partenaires, ouvrez un compte
                entreprise. Vous gardez la visibilité sur tous les envois,
                centralisez la facturation, et bénéficiez de tarifs adaptés à
                votre volume.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Ouvrir un compte entreprise
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
            <div className="relative overflow-hidden bg-white border border-brand-border rounded-2xl p-6 md:p-8">
              <GridBackground tone="green" />
              <ul className="relative space-y-4">
                {entrepriseBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="text-green-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="font-body text-brand-gray">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Tarifs */}
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <SectionLabel className="mb-4">Tarifs</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray mb-3">
              Des tarifs clairs. Sans surprise.
            </h2>
            <p className="font-body text-lg text-brand-sub">
              Tarifs grand public. Les comptes marchand et entreprise bénéficient
              de remises sur volume.
            </p>
          </div>
          <div className="overflow-hidden border border-brand-border rounded-2xl">
            <table className="w-full">
              <thead className="bg-brand-off">
                <tr>
                  <th className="text-left font-mono text-xs tracking-widest text-brand-mid uppercase py-4 px-6">
                    Taille
                  </th>
                  <th className="text-left font-mono text-xs tracking-widest text-brand-mid uppercase py-4 px-6">
                    Usage type
                  </th>
                  <th className="text-right font-mono text-xs tracking-widest text-brand-mid uppercase py-4 px-6">
                    Tarif
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, i) => (
                  <tr
                    key={p.size}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-brand-off/50'}
                  >
                    <td className="py-5 px-6 font-heading font-bold text-brand-gray">
                      {p.size}
                    </td>
                    <td className="py-5 px-6 font-body text-brand-sub">{p.use}</td>
                    <td className="py-5 px-6 text-right font-mono font-semibold text-green-primary">
                      {p.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-sm text-brand-mid mt-5">
            Comptes marchand et entreprise : tarification dégressive selon le
            volume.{' '}
            <a
              href="/contact"
              className="text-green-primary hover:text-green-dark underline transition"
            >
              Demander un devis
            </a>
            .
          </p>
        </Container>
      </section>

      {/* Pourquoi Afribox */}
      <section className="bg-brand-off">
        <Container className="py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <SectionLabel className="mb-4">Pourquoi Afribox</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
              Cinq raisons concrètes.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAfribox.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="relative overflow-hidden bg-white border border-brand-border rounded-2xl p-7 md:p-8 shadow-[0_4px_20px_-8px_rgba(31,71,40,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(31,71,40,0.15)] transition-shadow"
              >
                <GridBackground tone="green" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-green-bg flex items-center justify-center">
                      <Icon size={22} className="text-green-primary" />
                    </div>
                    <span
                      className="font-heading font-bold text-5xl md:text-6xl leading-none select-none"
                      style={{ color: 'rgba(39, 174, 96, 0.12)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-gray mb-3">
                    {title}
                  </h3>
                  <p className="font-body text-brand-sub leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Triple CTA */}
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <CTACard
              tag="Particulier"
              title="Envoyez votre premier colis"
              href="/reserver"
              cta="Réserver un locker"
              tone="light"
            />
            <CTACard
              tag="Marchand"
              title="Automatisez vos livraisons"
              href="/contact"
              cta="Parler à notre équipe"
              tone="dark"
            />
            <CTACard
              tag="Entreprise"
              title="Ouvrez un compte multi-utilisateurs"
              href="/contact"
              cta="Demander un devis"
              tone="light"
            />
          </div>
        </Container>
      </section>
    </>
  )
}

type CTACardProps = {
  tag: string
  title: string
  href: string
  cta: string
  tone: 'light' | 'dark'
}

function CTACard({ tag, title, href, cta, tone }: CTACardProps) {
  const isDark = tone === 'dark'
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col border ${
        isDark
          ? 'bg-green-dark text-white border-green-dark'
          : 'bg-brand-off border-brand-border'
      }`}
    >
      <GridBackground tone={isDark ? 'white' : 'green'} opacity={isDark ? 0.06 : 0.06} />
      <div className="relative flex flex-col h-full">
      <p
        className={`font-mono text-[11px] tracking-widest uppercase mb-3 ${
          isDark ? 'text-green-light' : 'text-green-primary'
        }`}
      >
        {tag}
      </p>
      <h3
        className={`font-heading font-bold text-xl leading-snug mb-6 flex-1 ${
          isDark ? 'text-white' : 'text-brand-gray'
        }`}
      >
        {title}
      </h3>
      <Button
        href={href}
        variant={isDark ? 'white' : 'primary'}
        size="sm"
        className="self-start"
      >
        {cta}
        <ArrowRight size={14} className="ml-1.5" />
      </Button>
      </div>
    </div>
  )
}
