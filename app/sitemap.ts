import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/metadata'
import { locales, hreflang, localePath } from '@/lib/i18n/config'

// Généré à /sitemap.xml. Chaque page est déclarée dans les deux langues, et
// chaque entrée liste ses équivalents (`alternates`) : c'est le pendant des
// balises hreflang, côté sitemap.
// Ajouter ici chaque nouvelle page publique.
const PAGES = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/reserver', changeFrequency: 'monthly' as const, priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMetadata.siteUrl
  const now = new Date()

  const languagesFor = (path: string) =>
    Object.fromEntries(
      locales.map((l) => [hreflang[l], `${base}${localePath(l, path)}`]),
    )

  return PAGES.flatMap((page) =>
    locales.map((locale) => ({
      url: `${base}${localePath(locale, page.path)}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: languagesFor(page.path) },
    })),
  )
}
