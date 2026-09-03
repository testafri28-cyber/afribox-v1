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
import { locales, isLocale, hreflang, defaultLocale, type Locale } from '@/lib/i18n/config'
import '../globals.css'

type LocaleParams = { params: { locale: string } }

// Pré-génère les deux langues au build (rendu statique conservé).
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: LocaleParams): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale
  return buildMetadata(locale, 'home')
}

// Couleur de la barre du navigateur mobile — se fond avec le haut du hero.
export const viewport: Viewport = {
  themeColor: '#1B5E20',
}

export default function RootLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale

  return (
    <html
      lang={hreflang[locale]}
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-brand-off text-brand-gray font-body antialiased">
        <JsonLd data={siteGraph(locale)} />
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
