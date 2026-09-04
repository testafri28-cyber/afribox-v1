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

  hero: {
    typedWords: ['stress-free,', '24/7,', 'secure.'],
    titleBrand: 'Afribox,',
    titleRest: 'delivery that is',
    lede: 'Smart lockers you can reach at any hour. No appointment, no waiting — just your code and your parcel.',
    mascotAlt: 'Locky, the Afribox mascot, holding up a confirmed locker booking',
    lockyName: 'I am Locky',
    lockyRole: 'Your Afribox concierge',
    ctaShort: 'Book',
    ctaLong: 'Book a locker',
    cards: {
      alwaysOnTitle: 'Always on',
      alwaysOnSub: '24/7',
      noAppointmentTitle: 'No appointment',
      noAppointmentSub: 'Collect whenever you like',
      newParcelTitle: 'New parcel',
      newParcelSub: 'A locker is waiting · just now',
      paymentTitle: 'Payment',
      paymentSub: 'Mobile Money',
      deliveredTitle: 'Parcel delivered',
      deliveredSub: 'Code used',
    },
    strip: [
      { title: '24/7', sub: 'Always on' },
      { title: 'No booking', sub: 'Whenever you like' },
      { title: 'Mobile Money', sub: 'Simple payment' },
    ],
  },

  nav: {
    links: ['Services', 'How it works', 'Pricing', 'The app', 'About', 'Contact', 'FAQ'],
    book: 'Book a locker',
    openMenu: 'Open the menu',
    closeMenu: 'Close',
  },

  services: {
    label: 'Our services',
    title: 'A solution for every need.',
    usages: [
      { title: 'E-commerce', text: 'The courier drops off, you collect with your code.' },
      { title: 'Sending & returns', text: 'You drop off, the courier or merchant collects.' },
      { title: 'Between individuals', text: 'A local handover, with no courier in between.' },
      { title: 'Locker-to-locker', text: 'Transfers from one locker to another — coming soon.' },
    ],
    channels: ['Website', 'Mobile app', 'WhatsApp', 'At merchant checkout', 'Business portal', 'Kiosk — no account'],
    usagesTitle: 'One locker, four uses.',
    orderHint: 'Order whichever way suits you',
  },

  why: {
    label: 'Why Afribox',
    title: 'Five concrete reasons.',
    networkAlt: 'The Afribox locker network spreading across Africa',
  },

  footer: {
    tagline: 'Smart connected lockers for individuals, operators and cities. Logistics infrastructure built for what comes next.',
    newsletterTitle: 'Stay informed',
    emailPlaceholder: 'you@email.com',
    legal: ['Legal notice', 'Privacy', 'Cookies'],
    rights: 'All rights reserved.',
  },

  reserve: {
    back: 'Back to home',
    label: 'Booking',
    titleStart: 'Book your locker in',
    titleAccent: '4 steps.',
    lede: 'Pick a locker, set up your shipment, then finish your request on WhatsApp in one click.',
    pilotLabel: 'Pilot phase',
    pilotText: '— book your slot and we will let you know as soon as the locker opens.',
  },

  reserveForm: {
    steps: ['Locker', 'Set up', 'Payment', 'Confirmation'],
    backToStep: 'Back to step',
    prev: 'Back',
    next: 'Next',
    confirm: 'Confirm request',

    step1Title: 'Choose a locker',
    step1Lede: 'Pick the locker closest to you or to your recipient — you will move straight on to the next step.',

    step2Title: 'Set up your booking',
    step2Lede: 'Size, duration and recipient details.',
    durationLabel: 'Duration',
    duration48: '48 hours',
    durationUnique: 'single duration',
    phoneLabel: 'Recipient phone *',
    phonePlaceholder: '+225 07 00 00 00 00',
    messageLabel: 'Message (optional)',
    messagePlaceholder: 'Hello, your parcel is ready',

    step3Title: 'Payment',
    step3Lede: 'Tell us how you would rather pay. Payment is settled with our team when your slot is confirmed.',
    paidOnConfirm: 'Paid on confirmation',
    summaryTitle: 'Summary',
    summaryLocker: 'Locker',
    summarySize: 'Size',
    summaryTotal: 'Total incl. tax',
    paymentLabels: ['Orange Money', 'Wave', 'MTN Mobile Money', 'Bank card'],

    step4Title: 'Your request is on its way.',
    step4Lede: 'Finish your booking in one click on WhatsApp: our team confirms your slot and sends you the drop-off code.',
    requestNumber: 'Request number',
    finishWhatsApp: 'Finish on WhatsApp',
    newBooking: 'New booking',

    wa: {
      greeting: 'Hello Afribox 👋',
      intro: 'I would like to finalise my locker booking:',
      locker: 'Locker',
      size: 'Size',
      duration: 'Duration',
      phone: 'Recipient phone',
      ref: 'Request ref.',
    },
  },

  howItWorks: {
    label: 'How it works',
    title: 'From order to pickup.',
    lede: 'From ordering to collecting, in three moves. Fully automated — no phone calls, no waiting.',
    phases: [
      {
        title: 'Order & booking',
        text: 'You order from a partner merchant; they book the locker. One payment covers the product, the delivery and the locker.',
        steps: ['Order', 'Booking & payment'],
      },
      {
        title: 'Parcel drop-off',
        text: 'The courier gets an opening code by SMS, opens the locker, drops the parcel in and closes it — 60 seconds.',
        steps: ['Code to the courier', 'Parcel drop-off'],
      },
      {
        title: 'Pickup, around the clock',
        text: 'Your code arrives by SMS straight away, and you collect your parcel whenever you like, at any hour.',
        steps: ['Code to the recipient', 'Pickup'],
      },
    ],
  },
}
