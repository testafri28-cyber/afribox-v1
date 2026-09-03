// ---------------------------------------------------------------------------
// Interface labels — ENGLISH.
//
// Typed against `UiStrings` (derived from ui-fr.ts): a key that exists in
// French and is missing here breaks the build.
// ---------------------------------------------------------------------------
import type { UiStrings } from './ui-fr'

export const uiEn: UiStrings = {
  problem: {
    label: 'The problem we solve',
    title: 'Delivery in Africa deserves better.',
    lede: 'E-commerce is growing by around 11% a year in Côte d’Ivoire, but the last mile remains the weak link: addresses that cannot be found, couriers who cannot be reached, parcels that go missing. Afribox fixes that simply — a locker near you, a code by SMS, and that is it.',
    withoutAfribox: 'Without Afribox',
    withAfribox: 'With Afribox',
    pains: [
      'An address nobody can find, a courier going in circles',
      'Unanswered calls, a failed delivery',
      'A parcel mislaid, or that never arrived at all',
      'Stuck at home waiting around all day',
    ],
    solutions: [
      'A smart locker close to home',
      'A single-use pickup code, sent by SMS',
      'Collection 24/7, whenever it suits you',
      'Drop-off in 60 seconds, not one phone call',
    ],
  },

  faq: {
    label: 'FAQ',
    title: 'Frequently asked questions.',
    lede: 'Everything worth knowing before you book a locker.',
    another: 'Another question?',
    replyTime: 'Our team replies within 24 hours — or right away on WhatsApp.',
    writeUs: 'Write to us',
  },

  cta: {
    eyebrow: 'Our vision',
    title: 'Ready to make your deliveries simpler?',
    subtitle:
      'Book your first locker in under a minute. Or talk to our team about a merchant rollout.',
    primaryLabel: 'Book a locker',
    secondaryLabel: 'Talk to a human',
  },

  pricing: {
    label: 'Pricing',
    title: 'Three sizes. Three prices. That is all.',
    lede: 'One flat price per 48-hour drop-off. Merchant and business accounts get volume discounts.',
    bookThis: 'Book this size',
    note: 'Merchant and business accounts: volume-based pricing.',
  },

  impact: {
    label: 'Local impact',
    title: 'A service for the whole neighbourhood.',
    lede: 'A locker is a piece of local infrastructure: it serves residents, supports nearby businesses and cuts the traffic that deliveries generate.',
  },

  testimonials: {
    label: 'Testimonials',
    title: 'They trust us.',
    lede: 'Merchants, operators and partner stores — here is what they say about it.',
  },

  app: {
    label: 'The app',
    title: 'Your lockers in your pocket.',
    lede: 'Manage your shipments, track your parcels and retrieve your codes straight from the Afribox app.',
  },

  channels: {
    label: 'Ways to reach us',
    title: 'Use Afribox however you like.',
  },

  about: {
    label: 'About',
    title: 'Building tomorrow’s logistics infrastructure.',
    teamLabel: 'The team',
    teamTitle: 'People who are invested.',
  },

  contact: {
    label: 'Contact',
    title: 'Let’s talk about your project.',
    lede: 'Merchant, business, investor or simply curious — our team replies within 24 working hours.',
  },
}
