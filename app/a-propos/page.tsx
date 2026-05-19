import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'
import CTASection from '@/components/sections/CTASection'
import { values, team } from '@/lib/constants'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'À propos — Afribox',
  description:
    "Afribox construit l'infrastructure de livraison last-mile que l'Afrique attendait. Notre histoire, notre mission, nos valeurs.",
  path: '/a-propos',
})

export default function AboutPage() {
  return (
    <>
      {/* En-tête */}
      <section className="bg-white">
        <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
          <SectionLabel className="mb-4">À propos</SectionLabel>
          <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray max-w-3xl mb-6">
            Nous construisons l&apos;infrastructure que{' '}
            <span className="text-green-primary">l&apos;Afrique attendait.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-brand-sub leading-relaxed max-w-2xl">
            Afribox est une jeune entreprise ivoirienne. Notre mission : rendre
            la livraison last-mile aussi simple que d&apos;envoyer un SMS.
          </p>
        </Container>
      </section>

      {/* Histoire */}
      <section className="bg-brand-off">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <SectionLabel className="mb-4">Notre histoire</SectionLabel>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
                Tout est parti d&apos;un constat simple.
              </h2>
            </div>
            <div className="lg:col-span-2 space-y-5 text-brand-sub text-lg leading-relaxed font-body">
              <p>
                À Abidjan, comme dans la plupart des grandes villes africaines,
                commander en ligne reste compliqué. Les adresses sont
                imprécises, les rues n&apos;ont pas toujours de nom, et les
                livreurs passent une partie de leur journée au téléphone à
                chercher leurs clients.
              </p>
              <p>
                Résultat : des colis perdus, des livraisons ratées, des heures
                perdues. Et un commerce en ligne qui peine à décoller alors que
                la demande est là.
              </p>
              <p>
                On s&apos;est dit qu&apos;il fallait régler le problème
                autrement. Plutôt que d&apos;essayer d&apos;améliorer le
                système actuel, créer une infrastructure parallèle : des
                casiers connectés, présents en ville, accessibles à tout moment.
                Afribox est né de cette idée.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <SectionLabel className="mb-4">Notre mission</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray mb-6">
              Rendre la livraison accessible à tous.
            </h2>
            <p className="font-body text-lg text-brand-sub leading-relaxed">
              On ne croit pas qu&apos;il faille attendre que les adresses
              postales soient parfaites pour que l&apos;e-commerce africain
              fonctionne. On préfère construire dès maintenant les outils qui
              le rendent fluide, fiable et sans friction. Pour les marchands
              comme pour leurs clients.
            </p>
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="bg-brand-off">
        <Container className="py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <SectionLabel className="mb-4">Nos valeurs</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
              Quatre engagements. Pas de grands discours.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white border border-brand-border rounded-2xl p-6 md:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-green-bg flex items-center justify-center mb-5">
                  <Icon size={22} className="text-green-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl text-brand-gray mb-3">
                  {title}
                </h3>
                <p className="font-body text-brand-sub leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Équipe */}
      <section className="bg-white" id="equipe">
        <Container className="py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <SectionLabel className="mb-4">Notre équipe</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray">
              Des gens qui livrent. Vraiment.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-brand-off border border-brand-border rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-primary text-white font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {m.initials}
                </div>
                <p className="font-heading font-bold text-brand-gray mb-1">
                  {m.name}
                </p>
                <p className="font-mono text-[11px] text-brand-mid tracking-widest uppercase">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-green-dark text-white">
        <GridBackground opacity={0.06} />
        <Container className="relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <SectionLabel className="mb-4" tone="white">
              Notre vision
            </SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight mb-6">
              Abidjan d&apos;abord.{' '}
              <span className="text-green-light">L&apos;Afrique ensuite.</span>
            </h2>
            <p className="font-body text-lg text-white/80 leading-relaxed">
              On commence à Abidjan parce qu&apos;on connaît cette ville. Mais
              le besoin est partout. Notre objectif : déployer le réseau Afribox
              dans cinq capitales d&apos;Afrique de l&apos;Ouest d&apos;ici 2028.
              Pas comme une promesse marketing — comme un cap qui guide nos
              décisions chaque jour.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        title="Rejoignez l'aventure Afribox."
        subtitle="Vous êtes marchand, opérateur, ou simplement curieux ? Discutons."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Voir nos services"
        secondaryHref="/nos-services"
      />
    </>
  )
}
