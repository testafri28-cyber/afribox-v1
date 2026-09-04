// Point d'entrée unique de l'i18n : `getDictionary(locale)` côté serveur
// comme côté client (les dictionnaires sont de simples objets, pas des imports
// dynamiques — le site n'a que deux langues, la charge est négligeable).
import { fr, type Dictionary } from './fr'
import { en } from './en'
import type { Locale } from './config'

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
export * from './config'
