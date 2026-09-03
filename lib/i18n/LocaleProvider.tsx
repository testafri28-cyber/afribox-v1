'use client'

import { createContext, useContext } from 'react'
import { defaultLocale, type Locale } from './config'
import { getDictionary } from './index'
import { getContent } from '../content'

// ---------------------------------------------------------------------------
// Donne la langue courante à tout l'arbre client.
//
// Elle est posée une seule fois par le layout (qui la tient du segment d'URL),
// ce qui évite de faire descendre `locale` en props à travers 30 composants.
// ---------------------------------------------------------------------------
const LocaleContext = createContext<Locale>(defaultLocale)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

/** Langue de la page courante. */
export function useLocale(): Locale {
  return useContext(LocaleContext)
}

/** Libellés d'interface (meta, common, jsonld). */
export function useDict() {
  return getDictionary(useContext(LocaleContext))
}

/** Contenu éditorial localisé (sections, FAQ, tarifs…). */
export function useContent() {
  return getContent(useContext(LocaleContext))
}
