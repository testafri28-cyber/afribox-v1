// Adaptateur d'affichage pour la version mobile.
//
// AUCUN contenu n'est stocké ici : tout est dérivé de `lib/constants.ts`, la
// source unique du site. Ce fichier ne fait que reformater ces données dans la
// forme attendue par les composants de `components/afribox/`.
// Pour modifier un prix, un casier, une question ou un contact → constants.ts.

import {
  pricing,
  lockers,
  values,
  lockerSpecs,
  faq,
  contact,
  aboutMission as mission,
} from '@/lib/constants'

export const aboutMission = mission

// --- Tarifs ---------------------------------------------------------------
export interface PricingTier {
  tag: string
  name: string
  desc: string
  amount: string
  popular?: boolean
}

// Libellés courts propres au mobile ; le montant, lui, vient de `pricing`.
const libellesTarifs = [
  { name: 'Documents', desc: 'Accessoires, papiers' },
  { name: 'Vêtements', desc: 'Électronique, textile' },
  { name: 'Volumineux', desc: 'Équipements larges' },
]

export const pricingTiers: PricingTier[] = pricing.map((p, i) => ({
  tag: i === 1 ? `${p.size} · populaire` : p.size,
  name: libellesTarifs[i]?.name ?? p.use,
  desc: libellesTarifs[i]?.desc ?? p.use,
  // « 500 FCFA / 48h » → « 500 »
  amount: p.price.split('FCFA')[0].trim(),
  popular: i === 1,
}))

// --- Casiers --------------------------------------------------------------
export interface LockerLocation {
  name: string
  area: string
  status: string
}

export const lockerLocations: LockerLocation[] = lockers.map((l) => ({
  name: l.name,
  // « Centre commercial, Marcory » → « Marcory »
  area: l.address.split(',').pop()!.trim(),
  status: l.available ? 'Bientôt' : 'Complet',
}))

// --- À propos -------------------------------------------------------------
export interface AboutValue {
  title: string
  description: string
}

export const aboutValues: AboutValue[] = values.map((v) => ({
  title: v.title,
  description: v.text,
}))

export interface StatItem {
  value: string
  label: string
}

export const statStrip: StatItem[] = lockerSpecs.map((s) => ({
  value: s.value,
  label: s.label,
}))

// --- FAQ ------------------------------------------------------------------
export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = faq.map((f) => ({
  question: f.q,
  answer: f.a,
}))

// --- Contact --------------------------------------------------------------
export const contactInfo = {
  email: contact.email,
  whatsapp: contact.phoneDisplay,
  whatsappHref: `https://wa.me/${contact.whatsapp}`,
  address: contact.address,
  // Liens internes relatifs : valides en local, en preview et en production.
  reserveHref: '/reserver',
  fullSiteHref: '/',
}
