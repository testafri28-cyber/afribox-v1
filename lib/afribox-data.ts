// Adaptateur d'affichage pour la version mobile, localisé.
//
// AUCUN contenu n'est stocké ici : tout est dérivé de `lib/content.ts`, qui
// fusionne la structure (`constants.ts`) et le texte traduit (dictionnaires).
// Ce fichier ne fait que reformater ces données dans la forme attendue par les
// composants de `components/afribox/`.
// Pour modifier un prix, un casier, une question ou un contact →
// constants.ts (structure) ou lib/i18n/content-*.ts (texte).
import { getContent } from './content'
import { getDictionary } from './i18n'
import { localePath, type Locale } from './i18n/config'

// --- Formes attendues par les composants mobiles ---------------------------
export interface PricingTier {
  tag: string
  name: string
  desc: string
  dims: string
  weight: string
  amount: string
  popular?: boolean
}

export interface LockerLocation {
  id: number
  name: string
  area: string
  status: string
  available: boolean
}

export interface AboutValue {
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}

export interface FaqItem {
  question: string
  answer: string
}

function build(locale: Locale) {
  const c = getContent(locale)
  const dict = getDictionary(locale)
  const m = dict.content.mobile

  // Le mobile utilise la version courte : le paragraphe complet y fait bloc.
  const aboutMission = c.aboutMissionCourte

  const pricingTiers: PricingTier[] = c.pricing.map((p, i) => ({
    tag: i === 1 ? `${p.size} · ${m.popularSuffix}` : p.size,
    // Libellés courts propres au mobile ; le montant vient de la grille.
    name: m.pricingLabels[i]?.name ?? p.use,
    desc: m.pricingLabels[i]?.desc ?? p.use,
    dims: p.dims,
    weight: p.weight,
    // « 500 FCFA / 48h » → « 500 »
    amount: p.price.split('FCFA')[0].trim(),
    popular: i === 1,
  }))

  const lockerLocations: LockerLocation[] = c.lockers.map((l) => ({
    id: l.id,
    name: l.name,
    // « Centre commercial, Marcory » → « Marcory »
    area: l.address.split(',').pop()!.trim(),
    status: l.available ? dict.common.lockerStatus.soon : dict.common.lockerStatus.full,
    available: l.available,
  }))

  const aboutValues: AboutValue[] = c.values.map((v) => ({
    title: v.title,
    description: v.text,
  }))

  const statStrip: StatItem[] = c.lockerSpecs.map((s) => ({
    value: s.value,
    label: s.label,
  }))

  const faqItems: FaqItem[] = c.faq.map((f) => ({
    question: f.q,
    answer: f.a,
  }))

  const contactInfo = {
    email: c.contact.email,
    whatsapp: c.contact.phoneDisplay,
    whatsappHref: `https://wa.me/${c.contact.whatsapp}`,
    address: c.contact.address,
    // Liens internes conscients de la langue : depuis /en on reste sur /en.
    reserveHref: localePath(locale, '/reserver'),
    fullSiteHref: localePath(locale, '/'),
  }

  return {
    aboutMission,
    pricingTiers,
    lockerLocations,
    aboutValues,
    statStrip,
    faqItems,
    contactInfo,
  }
}

export type MobileData = ReturnType<typeof build>

const cache = new Map<Locale, MobileData>()

export function getMobileData(locale: Locale): MobileData {
  let hit = cache.get(locale)
  if (!hit) {
    hit = build(locale)
    cache.set(locale, hit)
  }
  return hit
}
