import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/metadata'

// Généré à /sitemap.xml. Ajouter ici chaque nouvelle page publique.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMetadata.siteUrl
  const now = new Date()
  return [
    { url: `${base}/`,         lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/reserver`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
