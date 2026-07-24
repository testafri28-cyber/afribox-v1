import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/metadata'

// Généré à /robots.txt. Indexation ouverte ; les routes API sont exclues.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
