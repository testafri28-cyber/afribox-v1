import type { Metadata, Viewport } from 'next'
import { spaceGrotesk, dmSans, dmMono } from '@/lib/fonts'
import { buildMetadata } from '@/lib/metadata'
import { siteGraph } from '@/lib/jsonld'
import JsonLd from '@/components/seo/JsonLd'
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
        <JsonLd data={siteGraph} />
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Wrapper neutre : sert de cible CSS (LockyChat est `fixed`, donc
            l'enveloppe n'affecte pas son positionnement). */}
        <div data-site-chat>
          <LockyChat />
        </div>
      </body>
    </html>
  )
}
