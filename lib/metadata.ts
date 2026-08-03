import type { Metadata } from 'next'

export const siteMetadata = {
  title: 'Afribox — Smart Lockers · Livraison Last-Mile en Afrique',
  description:
    'Afribox déploie un réseau de casiers intelligents pour rendre la livraison last-mile simple, rapide et sécurisée en Afrique. Disponible 24h/24.',
  keywords:
    "casier intelligent Abidjan, smart locker Côte d'Ivoire, livraison last-mile Afrique, point de retrait colis Abidjan, consigne à colis, livraison colis Abidjan, Mobile Money livraison, casier automatique",
  ogImage: '/og-image.jpg',
  ogImageAlt:
    'Afribox — réseau de casiers intelligents pour la livraison de colis en Afrique',
  siteUrl: 'https://afriboxlockers.com',
}

type PageMetaInput = {
  title: string
  description?: string
  path?: string
}

export function buildMetadata({ title, description, path = '/' }: PageMetaInput): Metadata {
  const url = `${siteMetadata.siteUrl}${path}`
  const desc = description ?? siteMetadata.description
  return {
    title,
    description: desc,
    keywords: siteMetadata.keywords,
    applicationName: 'Afribox',
    authors: [{ name: 'Afribox', url: siteMetadata.siteUrl }],
    creator: 'Afribox',
    publisher: 'AFRIBOX SARL',
    category: 'logistics',
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: { canonical: url },
    // Autorise Google ET les moteurs IA à afficher un extrait complet et une
    // grande image en preview — sans quoi les résultats restent tronqués.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description: desc,
      siteName: 'Afribox',
      images: [
        {
          url: siteMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: siteMetadata.ogImageAlt,
        },
      ],
      locale: 'fr_CI',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [siteMetadata.ogImage],
    },
  }
}
