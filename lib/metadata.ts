import type { Metadata } from 'next'
import { getDictionary } from './i18n'
import {
  locales,
  defaultLocale,
  hreflang,
  localePath,
  type Locale,
} from './i18n/config'

// Valeurs non traduisibles, communes aux deux langues.
export const siteMetadata = {
  ogImage: '/og-image.jpg',
  siteUrl: 'https://afriboxlockers.com',
}

export type PageKey = 'home' | 'reserver'

const PATHS: Record<PageKey, string> = {
  home: '/',
  reserver: '/reserver',
}

// Code Open Graph par langue (format `langue_PAYS`).
const OG_LOCALE: Record<Locale, string> = { fr: 'fr_CI', en: 'en_US' }

/**
 * Metadata complète d'une page, dans une langue donnée.
 * Émet notamment les `hreflang` croisés : ils disent aux moteurs que les deux
 * URLs sont deux traductions d'une même page, pas du contenu dupliqué.
 */
export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const d = getDictionary(locale)
  const path = PATHS[page]
  const { title, description } = d.meta[page]
  const url = `${siteMetadata.siteUrl}${localePath(locale, path)}`

  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[hreflang[l]] = `${siteMetadata.siteUrl}${localePath(l, path)}`
  }
  // x-default : la version servie à un visiteur dont la langue n'est pas couverte.
  languages['x-default'] = `${siteMetadata.siteUrl}${localePath(defaultLocale, path)}`

  return {
    title,
    description,
    keywords: d.meta.keywords,
    applicationName: d.meta.siteName,
    authors: [{ name: 'Afribox', url: siteMetadata.siteUrl }],
    creator: 'Afribox',
    publisher: 'AFRIBOX SARL',
    category: 'logistics',
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: { canonical: url, languages },
    // Autorise Google ET les moteurs IA à afficher un extrait complet et une
    // grande image en preview.
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
      description,
      siteName: d.meta.siteName,
      images: [
        {
          url: siteMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: d.meta.ogImageAlt,
        },
      ],
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteMetadata.ogImage],
    },
  }
}
