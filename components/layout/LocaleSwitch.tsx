'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  locales,
  defaultLocale,
  localeLabel,
  localePath,
  stripLocale,
  type Locale,
} from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'

// La langue courante se lit dans l'URL affichée : « /en/... » → en, sinon fr.
function currentLocale(pathname: string): Locale {
  for (const l of locales) {
    if (l === defaultLocale) continue
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l
  }
  return defaultLocale
}

/**
 * Sélecteur de langue.
 *
 * Ce sont de vrais liens vers de vraies URLs — pas un état React qui
 * remplacerait le texte. C'est ce qui rend la version anglaise indexable, et
 * ce qui permet de partager un lien vers la page dans une langue précise.
 * Le lien pointe vers la MÊME page dans l'autre langue (/reserver → /en/reserver).
 */
export default function LocaleSwitch({ className = '' }: { className?: string }) {
  const pathname = usePathname() || '/'
  const current = currentLocale(pathname)
  const basePath = stripLocale(pathname)
  const d = getDictionary(current)

  return (
    <div
      className={`inline-flex items-center rounded-full border border-brand-border bg-white p-0.5 ${className}`}
      role="group"
      aria-label={d.common.switchAria}
    >
      {locales.map((l) => {
        const active = l === current
        return (
          <Link
            key={l}
            href={localePath(l, basePath)}
            hrefLang={l}
            aria-current={active ? 'true' : undefined}
            className={`font-body text-xs font-semibold tracking-wide rounded-full px-2.5 py-1 transition-colors ${
              active
                ? 'bg-green-primary text-white'
                : 'text-brand-sub hover:text-green-dark'
            }`}
          >
            {localeLabel[l]}
          </Link>
        )
      })}
    </div>
  )
}
