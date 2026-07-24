import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/lib/metadata'

// Généré à /manifest.webmanifest — installable + couleur de barre mobile.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Afribox — Smart Lockers',
    short_name: 'Afribox',
    description: siteMetadata.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F9F7',
    theme_color: '#27AE60',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  }
}
