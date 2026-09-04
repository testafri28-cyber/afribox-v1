// ---------------------------------------------------------------------------
// Configuration des langues.
//
// Le français est la langue par défaut et n'a AUCUN préfixe d'URL : le site
// francophone reste servi sur « / », ce qui préserve l'indexation déjà acquise.
// L'anglais vit sous « /en ». Le middleware réécrit « / » vers le segment
// [locale] interne sans changer l'URL affichée.
// ---------------------------------------------------------------------------

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

// Code hreflang publié dans les balises <link rel="alternate">.
export const hreflang: Record<Locale, string> = { fr: 'fr-CI', en: 'en' }

// Libellé court du sélecteur — un code de langue, pas du contenu traduisible.
export const localeLabel: Record<Locale, string> = { fr: 'FR', en: 'EN' }

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * URL publique d'un chemin dans une langue donnée.
 *   localePath('fr', '/reserver') → '/reserver'
 *   localePath('en', '/reserver') → '/en/reserver'
 *   localePath('en', '/')         → '/en'
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = !path || path === '' ? '/' : path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/**
 * Retire le préfixe de langue d'un chemin, pour retrouver la page équivalente
 * dans l'autre langue depuis le sélecteur.
 *   stripLocale('/en/reserver') → '/reserver'
 *   stripLocale('/en')          → '/'
 *   stripLocale('/reserver')    → '/reserver'
 */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue
    if (pathname === `/${l}`) return '/'
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1)
  }
  return pathname || '/'
}
