// ---------------------------------------------------------------------------
// Données structurées schema.org (JSON-LD)
//
// Un seul graphe centralise l'entité (Organization), le site (WebSite) et
// l'offre (Service + tarifs). Les moteurs classiques (Google/Bing) y lisent
// des « rich results » ; les moteurs génératifs (ChatGPT, Perplexity, Gemini,
// Google AI Overviews) s'en servent pour comprendre et citer l'entité.
//
// Règle d'or : ne décrire QUE des faits vrais et présents à l'écran (les Q/R
// FAQPage proviennent du même tableau `faq` que l'accordéon visible).
// ---------------------------------------------------------------------------
import { siteMetadata } from './metadata'
import { contact, socials, pricing, faq } from './constants'

const ORG_ID = `${siteMetadata.siteUrl}/#organization`
const WEBSITE_ID = `${siteMetadata.siteUrl}/#website`
const SERVICE_ID = `${siteMetadata.siteUrl}/#service`

const areaServed = [
  { '@type': 'City', name: 'Abidjan' },
  { '@type': 'Country', name: "Côte d'Ivoire" },
]

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Afribox',
  legalName: 'AFRIBOX SARL',
  url: siteMetadata.siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteMetadata.siteUrl}/icon.svg`,
  },
  image: `${siteMetadata.siteUrl}${siteMetadata.ogImage}`,
  description: siteMetadata.description,
  slogan: 'La livraison last-mile simple, rapide et sécurisée en Afrique.',
  email: contact.email,
  telephone: contact.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue Abli Mathieu, Résidence Premium, 4e étage, Zone 4, Marcory',
    addressLocality: 'Abidjan',
    addressRegion: 'Abidjan',
    addressCountry: 'CI',
  },
  areaServed,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: contact.phoneDisplay,
      email: contact.email,
      contactType: 'customer service',
      availableLanguage: ['French'],
      areaServed: 'CI',
    },
  ],
  // Relie l'entité à ses profils officiels (n'inclure que des liens réels).
  sameAs: socials.map((s) => s.href),
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: siteMetadata.siteUrl,
  name: 'Afribox',
  description: siteMetadata.description,
  inLanguage: 'fr-CI',
  publisher: { '@id': ORG_ID },
}

// Tarif : « 500 FCFA / 48h » → montant numérique « 500 » (devise XOF = FCFA).
function priceAmount(price: string): string {
  return price.split('FCFA')[0].replace(/\D/g, '')
}

const service = {
  '@type': 'Service',
  '@id': SERVICE_ID,
  serviceType: 'Livraison last-mile par casiers intelligents',
  name: 'Réseau de casiers intelligents Afribox',
  description:
    'Dépôt et retrait de colis 24h/24 dans des casiers connectés, avec code SMS à usage unique et paiement Mobile Money.',
  provider: { '@id': ORG_ID },
  areaServed,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tarifs des casiers Afribox',
    itemListElement: pricing.map((p) => ({
      '@type': 'Offer',
      name: `Casier ${p.size}`,
      description: p.use,
      // Phase pilote : la réservation est une pré-inscription.
      availability: 'https://schema.org/PreOrder',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: priceAmount(p.price),
        priceCurrency: 'XOF',
        unitText: 'par colis, garde 48h',
      },
    })),
  },
}

// Graphe injecté sur toutes les pages (dans le layout racine).
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [organization, website, service],
}

// FAQPage — construite depuis le MÊME tableau que l'accordéon visible.
export function faqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteMetadata.siteUrl}/#faq`,
    inLanguage: 'fr-CI',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

// Fil d'Ariane (aide les moteurs à situer chaque page dans l'arbo).
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${siteMetadata.siteUrl}${it.path}`,
    })),
  }
}
