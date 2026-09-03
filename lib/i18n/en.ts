// ---------------------------------------------------------------------------
// English dictionary.
//
// Typed against `Dictionary` (derived from fr.ts): if a key exists in French
// and is missing here, the build fails. Translations are adapted, not literal —
// the tone stays close to the French copy without translating word for word.
// ---------------------------------------------------------------------------
import type { Dictionary } from './fr'
import { contentEn } from './content-en'

export const en: Dictionary = {
  meta: {
    siteName: 'Afribox',
    keywords:
      "smart locker Abidjan, parcel locker Côte d'Ivoire, last-mile delivery Africa, parcel pickup point Abidjan, package locker, Mobile Money delivery, automated parcel locker",
    ogImageAlt:
      'Afribox — a smart parcel locker network for deliveries across Africa',
    home: {
      title: 'Afribox — Smart Lockers · Last-Mile Delivery in Africa',
      description:
        'Afribox is rolling out a network of smart parcel lockers to make last-mile delivery simple, fast and secure across Africa. Available 24/7.',
    },
    reserver: {
      title: 'Book a locker — Afribox',
      description:
        'Reserve an Afribox locker near you in under a minute. Pay by Mobile Money or bank card.',
    },
  },

  common: {
    switchAria: 'Switch the site to French',
    breadcrumbHome: 'Home',
    breadcrumbReserver: 'Book a locker',
  },

  jsonld: {
    slogan: 'Last-mile delivery made simple, fast and secure across Africa.',
    serviceType: 'Last-mile delivery through smart parcel lockers',
    serviceName: 'Afribox smart locker network',
    serviceDescription:
      'Drop off and pick up parcels around the clock from connected lockers, using a single-use SMS code and Mobile Money payment.',
    offerCatalogName: 'Afribox locker pricing',
    offerPrefix: 'Locker',
    offerUnit: 'per parcel, 48h storage',
  },

  content: contentEn,
}
