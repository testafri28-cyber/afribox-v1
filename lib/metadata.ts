import type { Metadata } from 'next'

export const siteMetadata = {
  title: 'Afribox — Smart Lockers · Livraison Last-Mile en Afrique',
  description:
    'Afribox déploie un réseau de casiers intelligents pour rendre la livraison last-mile simple, rapide et sécurisée en Afrique. Disponible 24h/24.',
  keywords:
    "livraison Abidjan, locker Côte d'Ivoire, last-mile Afrique, colis Abidjan, smart locker",
  ogImage: '/og-image.jpg',
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
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description: desc,
      siteName: 'Afribox',
      images: [{ url: siteMetadata.ogImage }],
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
