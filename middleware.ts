import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/config'

// ---------------------------------------------------------------------------
// Routage des langues.
//
// - « /en/... »  → laissé tel quel, servi par le segment [locale].
// - « /fr/... »  → redirection 308 vers la version sans préfixe : le français
//                  n'a qu'une seule URL indexable, pas de contenu dupliqué.
// - tout le reste → réécriture interne vers « /fr/... ». L'URL affichée dans le
//                  navigateur ne change pas, seul le rendu sait qu'il est en fr.
// ---------------------------------------------------------------------------

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Garde-fou : jamais de localisation sur l'API ni les fichiers statiques
  // (le matcher les exclut déjà, ceci couvre les cas limites).
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  // « /fr » et « /fr/... » → on retire le préfixe (URL canonique unique).
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  // Déjà préfixé par une langue explicite (/en…) → rien à faire.
  const alreadyPrefixed = locales.some(
    (l) => l !== defaultLocale && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)),
  )
  if (alreadyPrefixed) return NextResponse.next()

  // Défaut : on sert le français sans toucher à l'URL affichée.
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Exclut les internals Next, l'API et tout chemin contenant un point
  // (robots.txt, sitemap.xml, manifest.webmanifest, llms.txt, images…).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
