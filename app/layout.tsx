import type { Metadata, Viewport } from 'next'
import { spaceGrotesk, dmSans, dmMono } from '@/lib/fonts'
import { buildMetadata, siteMetadata } from '@/lib/metadata'
import { contact } from '@/lib/constants'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/layout/ScrollToTop'
import CustomCursor from '@/components/ui/CustomCursor'
import LockyChat from '@/components/features/LockyChat'
import './globals.css'

export const metadata: Metadata = buildMetadata({
  title: 'Afribox — Smart Lockers · Livraison Last-Mile en Afrique',
  path: '/',
})

// Couleur de la barre du navigateur mobile — se fond avec le haut du hero.
export const viewport: Viewport = {
  themeColor: '#1B5E20',
}

// Données structurées (schema.org) — aide les moteurs à comprendre l'entité.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Afribox',
  url: siteMetadata.siteUrl,
  logo: `${siteMetadata.siteUrl}/icon.svg`,
  description: siteMetadata.description,
  email: contact.email,
  telephone: contact.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Abidjan',
    addressCountry: 'CI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-brand-off text-brand-gray font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <LockyChat />
      </body>
    </html>
  )
}
