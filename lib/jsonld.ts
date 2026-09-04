// ---------------------------------------------------------------------------
// Données structurées schema.org (JSON-LD), localisées.
//
// Un seul graphe centralise l'entité (Organization), le site (WebSite) et
// l'offre (Service + tarifs). Les moteurs classiques y lisent des « rich
// results » ; les moteurs génératifs s'en servent pour comprendre et citer
// l'entité. Les identifiants (@id) restent stables d'une langue à l'autre :
// c'est la même entreprise, décrite dans deux langues.
//
// Règle d'or : ne décrire QUE des faits vrais et présents à l'écran (les Q/R
// FAQPage proviennent du même tableau que l'accordéon visible).
// ---------------------------------------------------------------------------
import { siteMetadata } from './metadata'
import { getDictionary } from './i18n'
import { hreflang, localePath, type Locale } from './i18n/config'
import { getContent } from './content'

const ORG_ID = `${siteMetadata.siteUrl}/#organization`
const WEBSITE_ID = `${siteMetadata.siteUrl}/#website`
const SERVICE_ID = `${siteMetadata.siteUrl}/#service`

const areaServed = [
  { '@type': 'City', name: 'Abidjan' },
  { '@type': 'Country', name: "Côte d'Ivoire" },
]

// Tarif : « 500 FCFA / 48h » → montant numérique « 500 » (devise XOF = FCFA).
function priceAmount(price: string): string {
  return price.split('FCFA')[0].replace(/\D/g, '')
}

/** Graphe injecté sur toutes les pages, dans la langue de la page. */
export function siteGraph(locale: Locale) {
  const d = getDictionary(locale)
  const c = getContent(locale)

  const organization = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: d.meta.siteName,
    legalName: 'AFRIBOX SARL',
    url: siteMetadata.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}/icon.svg`,
    },
    image: `${siteMetadata.siteUrl}${siteMetadata.ogImage}`,
    description: d.meta.home.description,
    slogan: d.jsonld.slogan,
    email: c.contact.email,
    telephone: c.contact.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Rue Abli Mathieu, Résidence Premium, 4e étage, Zone 4, Marcory',
      addressLocality: 'Abidjan',
      addressRegion: 'Abidjan',
      addressCountry: 'CI',
    },
    areaServed,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: c.contact.phoneDisplay,
        email: c.contact.email,
        contactType: 'customer service',
        availableLanguage: ['French', 'English'],
        areaServed: 'CI',
      },
    ],
    // Relie l'entité à ses profils officiels (n'inclure que des liens réels).
    sameAs: c.socials.map((s) => s.href),
  }

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${siteMetadata.siteUrl}${localePath(locale, '/')}`,
    name: d.meta.siteName,
    description: d.meta.home.description,
    inLanguage: hreflang[locale],
    publisher: { '@id': ORG_ID },
  }

  const service = {
    '@type': 'Service',
    '@id': SERVICE_ID,
    serviceType: d.jsonld.serviceType,
    name: d.jsonld.serviceName,
    description: d.jsonld.serviceDescription,
    provider: { '@id': ORG_ID },
    areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: d.jsonld.offerCatalogName,
      itemListElement: c.pricing.map((p) => ({
        '@type': 'Offer',
        name: `${d.jsonld.offerPrefix} ${p.size}`,
        description: p.use,
        // Phase pilote : la réservation est une pré-inscription.
        availability: 'https://schema.org/PreOrder',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: priceAmount(p.price),
          priceCurrency: 'XOF',
          unitText: d.jsonld.offerUnit,
        },
      })),
    },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, service],
  }
}

/** FAQPage — construite depuis le MÊME tableau que l'accordéon visible. */
export function faqPageJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteMetadata.siteUrl}${localePath(locale, '/')}#faq`,
    inLanguage: hreflang[locale],
    mainEntity: getContent(locale).faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/** Fil d'Ariane — les URLs suivent la langue de la page. */
export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${siteMetadata.siteUrl}${localePath(locale, it.path)}`,
    })),
  }
}
