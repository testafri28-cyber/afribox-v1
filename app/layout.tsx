import type { Metadata } from 'next'
import { spaceGrotesk, dmSans, dmMono } from '@/lib/fonts'
import { buildMetadata } from '@/lib/metadata'
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
