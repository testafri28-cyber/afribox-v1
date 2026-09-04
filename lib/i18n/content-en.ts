// ---------------------------------------------------------------------------
// Site content — ENGLISH.
//
// Typed against `SiteContent` (derived from content-fr.ts): a key that exists
// in French and is missing here breaks the build. Arrays must keep the SAME
// ORDER as the French ones — the index is what binds text to structure
// (icons, coordinates, links) in `lib/content.ts`.
//
// Translations are adapted rather than literal: the register stays close to
// the French copy — direct, concrete, no marketing filler.
// ---------------------------------------------------------------------------
import type { SiteContent } from './content-fr'

export const contentEn: SiteContent = {
  // --- Pilot network lockers (place names stay as-is) -----------------------
  lockers: [
    { name: 'Cap Sud', address: 'Shopping centre, Marcory' },
    { name: 'Sococé 2 Plateaux', address: 'Les 2 Plateaux, Cocody' },
    { name: 'Abobo Town Hall', address: 'Abobo, Abidjan' },
    { name: 'Cosmos Yopougon', address: 'Yopougon, Abidjan' },
  ],

  // --- Locker specifications ------------------------------------------------
  lockerSpecs: [
    { value: '≈ 35', label: 'compartments per locker' },
    { value: '3 sizes', label: 'Small · Medium · Large' },
    { value: '21″', label: 'Android touchscreen' },
    { value: '2 cameras', label: 'continuous video surveillance' },
    { value: 'Unique code', label: 'RFID + solenoid lock' },
    { value: '24/7 · 48h', label: 'open access & parcel storage' },
  ],

  // --- Local impact ---------------------------------------------------------
  impact: [
    {
      audience: 'For residents',
      points: [
        'A pickup point open 24/7, right around the corner',
        'No more waiting for a courier or travelling across town',
        'An affordable service, from 500 FCFA',
        'Parcels kept secure, under video surveillance, released only to the recipient',
      ],
    },
    {
      audience: 'For local businesses',
      points: [
        'A dependable delivery option for neighbourhood sellers',
        'Fewer missed deliveries and fewer returns',
        'A way into online selling without running your own logistics',
        'Extra footfall around the locker site',
      ],
    },
    {
      audience: 'For the municipality',
      points: [
        'Fewer repeated delivery trips, so less traffic',
        'Local jobs created: installation, maintenance, support',
        'Modern, clean equipment that makes no noise',
        'Digital infrastructure that serves residents',
      ],
    },
  ],

  // --- Statistics -----------------------------------------------------------
  stats: [
    { value: '24/7', label: 'Availability', hint: 'Always on' },
    { value: '60', label: 'Seconds to drop off', hint: 'No appointment' },
    { value: '4800', label: 'Successful deliveries', hint: '+42% vs last year' },
    { value: '98%', label: 'Customer satisfaction', hint: '+3pts this year' },
  ],

  // --- Problems solved ------------------------------------------------------
  problems: [
    {
      title: 'For merchants',
      text: 'Every failed delivery is a lost sale. Afribox automates the last mile from end to end.',
    },
    {
      title: 'For couriers',
      text: 'No more back-and-forth trips or unanswered calls. Dropping off a parcel takes 60 seconds.',
    },
    {
      title: 'For you',
      text: 'Collect your parcel when it suits you. Not when it suits the courier.',
    },
  ],

  // --- Services (accordion) -------------------------------------------------
  services: [
    {
      tag: 'Merchants & E-commerce',
      title: 'Deliver to your customers. Without thinking about it.',
      text: 'Plug Afribox into your store. Your customer picks a locker at checkout. Everything after that is automatic.',
      points: ['API integration', 'Real-time tracking', 'Volume pricing'],
      cta: 'Explore the offer →',
    },
    {
      tag: 'Individuals',
      title: 'Send. Receive. On your own schedule.',
      text: 'Book a locker in 2 minutes. Your parcel waits for you around the clock.',
      points: ['Mobile Money payment', 'Instant SMS code', 'No sign-up needed'],
      cta: 'Book a locker →',
    },
    {
      tag: 'SMEs & Businesses',
      title: 'Several shipments a week?',
      text: 'One central account, monthly invoicing, batched shipments.',
      points: ['Multiple users', 'Single monthly invoice', 'Dedicated support'],
      cta: 'Open an account →',
    },
  ],

  // --- Process steps --------------------------------------------------------
  processSteps: [
    {
      title: 'Order',
      tag: 'Customer',
      text: 'You order from a partner merchant. One payment covers the product, the delivery and locker access. All at once.',
      short: 'A single payment: product, delivery and locker.',
      actors: ['Customer', 'Merchant'],
      visualLabel: 'Payment confirmed',
    },
    {
      title: 'Booking & payment',
      tag: 'Merchant',
      text: 'The merchant books a locker from their app or the website and enters the courier’s number and yours. That is all they do — the rest runs automatically.',
      short: 'The merchant books the locker and enters both numbers.',
      actors: ['Merchant', 'System'],
      visualLabel: '2 numbers saved',
    },
    {
      title: 'Code to the courier',
      tag: 'System → Courier',
      text: 'The system generates a unique code to open the locker and texts it to the courier. No phone calls. No coordination.',
      short: 'An opening code is texted to the courier.',
      actors: ['System', 'Courier'],
      visualLabel: 'Afribox',
    },
    {
      title: 'Parcel drop-off',
      tag: 'Courier',
      text: 'The courier reaches the locker, enters their code, opens the compartment, drops the parcel in and shuts the door. 60 seconds. Delivery is confirmed instantly.',
      short: 'The courier opens, drops off, closes — 60 seconds.',
      actors: ['Courier', 'Locker'],
      visualLabel: 'Delivery confirmed',
    },
    {
      title: 'Code to the recipient',
      tag: 'System → Customer',
      text: 'The moment the door closes, your pickup code arrives by SMS. Immediately.',
      short: 'Your pickup code arrives by SMS right away.',
      actors: ['System', 'Customer'],
      visualLabel: 'Afribox',
    },
    {
      title: 'Pickup',
      tag: 'Customer',
      text: 'You go to the locker whenever suits you. Enter your code, the compartment opens, you take your parcel. Available 24 hours a day, 7 days a week.',
      short: 'Collect your parcel whenever you like, 24/7.',
      actors: ['Customer', 'Locker'],
      visualLabel: 'All done',
    },
  ],

  // --- Process preview (3 steps) --------------------------------------------
  previewSteps: [
    { title: 'Order', text: 'Choose an Afribox locker at checkout. One single payment.' },
    { title: 'The courier drops off', text: 'They open the locker with their SMS code. 60 seconds, not one phone call.' },
    { title: 'Collect', text: 'You get your code and pick up your parcel whenever you want.' },
  ],

  // --- Access channels ------------------------------------------------------
  channels: [
    {
      title: 'On the website',
      text: 'Book and manage your deliveries from any browser.',
      tag: 'Any browser',
    },
    {
      title: 'In the app',
      text: 'Real-time notifications, history, favourite lockers.',
      tag: 'iOS & Android',
    },
    {
      title: 'Over WhatsApp',
      text: 'Nothing to download. A few messages are enough.',
      tag: 'Zero install',
    },
  ],

  // --- App features ---------------------------------------------------------
  appFeatures: [
    'Instant notifications',
    'Favourite lockers and history',
    'Built-in Mobile Money payment',
    'Pickup code in one tap',
  ],

  // --- About ----------------------------------------------------------------
  aboutMission:
    'AFRIBOX SARL is an Ivorian company rolling out the first smart parcel locker network in Côte d’Ivoire: secure, automated pickup and drop-off points, open around the clock and placed as close as possible to the people who use them. Our mission — to make efficient, flexible logistics available to everyone.',
  aboutMissionCourte:
    'The first smart parcel locker network in Côte d’Ivoire: secure, automated pickup points, open 24/7, right where people live.',

  // --- Values ---------------------------------------------------------------
  values: [
    {
      title: 'Reliability',
      text: 'Our lockers are available. Our codes work. If something goes wrong, we know before you do.',
    },
    {
      title: 'Simplicity',
      text: 'Every step we remove from the journey is one less thing in your way.',
    },
    {
      title: 'Technology that serves',
      text: 'We build technology to solve real problems. Not to impress anyone.',
    },
    {
      title: 'Tangible impact',
      text: 'Every locker we install connects a neighbourhood to the digital economy.',
    },
  ],

  // --- Team (names stay, roles are translated) ------------------------------
  team: [
    { role: 'Chief Executive Officer', bio: 'Vision, strategic partnerships and funding.' },
    {
      role: 'Chief Operating Officer',
      bio: 'Operations, sales, field rollout and the technical team.',
    },
    { role: 'Marketing Director', bio: 'Digital marketing, brand and demand generation.' },
    { role: 'Finance Director', bio: 'Finance, legal and human resources.' },
  ],

  // --- FAQ ------------------------------------------------------------------
  faq: [
    {
      q: 'How long does my parcel stay in the locker?',
      a: 'Your parcel stays available for 48 hours. You get automatic reminders before the deadline. After that: a paid extension, or cancellation with a refund — you are always told beforehand.',
    },
    {
      q: 'Is my parcel safe inside the locker?',
      a: 'Yes. Every compartment is electronically locked (solenoid lock and RFID reader) and only opens with the single-use code sent by SMS. Two cameras film the front continuously, and every drop-off and pickup is timestamped and logged.',
    },
    {
      q: 'How does pickup work?',
      a: 'You come to the locker whenever suits you, 24 hours a day. On the touchscreen you enter the code you received by SMS: the compartment opens and you take your parcel. That is it.',
    },
    {
      q: 'How much does it cost?',
      a: 'The price depends on compartment size, for 48 hours of storage: 500 FCFA (Small), 750 FCFA (Medium), 1,250 FCFA (Large).',
    },
    {
      q: 'Can I use Afribox without a smartphone?',
      a: 'Yes. The pickup code arrives as a plain SMS. No app and no internet connection required.',
    },
    {
      q: 'Where and when can I use a locker?',
      a: 'We are launching our pilot network in Abidjan: the first lockers are at Cap Sud (Marcory), Sococé (2 Plateaux), Abobo Town Hall and Cosmos (Yopougon) — with Bouaké coming next. You can already pre-book your slot: we will notify you as soon as a locker opens near you.',
    },
    {
      q: 'What parcel sizes can I drop off?',
      a: 'Our compartments come in three sizes, up to 15 kg per parcel: Small (35 × 10 × 49 cm) for documents and accessories, Medium (35 × 20 × 49 cm) for clothing and electronics, Large (35 × 30 × 49 cm) for bulkier items.',
    },
    {
      q: 'How do I pay?',
      a: 'Payment is taken when you book, never at pickup: by VISA card or Mobile Money — Orange Money, Wave, MTN. Confirmation is instant.',
    },
    {
      q: 'Can I also send a parcel or return an item?',
      a: 'Yes. Beyond receiving online orders, you can drop off a parcel to ship or a merchant return in a locker — and even arrange a handover between individuals. You book, you drop off, and the recipient or courier collects with their code.',
    },
  ],

  // --- Testimonials (names stay) --------------------------------------------
  testimonials: [
    {
      quote: 'Since we started using Afribox, our failed deliveries have all but disappeared. And we no longer have to call customers three times.',
      role: 'Founder, partner store',
    },
    {
      quote: 'The build quality and the reliability of the app let us grow to 12 pickup points in four months.',
      role: 'Logistics Director · Dakar Plaza',
    },
    {
      quote: 'The return was visible from the second month. The Afribox team is extremely responsive on field issues.',
      role: 'CEO · ParcelGo',
    },
  ],

  // --- Pricing --------------------------------------------------------------
  pricing: [
    { size: 'Small', use: 'Documents, accessories', weight: '0 – 5 kg', price: '500 FCFA / 48h' },
    { size: 'Medium', use: 'Clothing, electronics', weight: '5 – 10 kg', price: '750 FCFA / 48h' },
    { size: 'Large', use: 'Bulkier items', weight: 'up to 15 kg', price: '1,250 FCFA / 48h' },
  ],

  // --- Benefits -------------------------------------------------------------
  merchantBenefits: [
    'API integration in a few hours',
    'Real-time dashboard',
    'Automatic customer notification at every step',
    'Simplified monthly invoicing',
    'Dedicated support, 7 days a week',
  ],
  consumerBenefits: [
    'Available 24 hours a day, 7 days a week',
    'Single-use SMS code',
    'No mandatory sign-up',
    'Mobile Money or bank card payment',
    'Pickup in under 60 seconds',
  ],

  // --- Why Afribox ----------------------------------------------------------
  whyAfribox: [
    { title: 'Secure', text: 'A unique code per parcel. Electronic access. No human handling.' },
    { title: 'Very fast', text: 'Drop off in 60 seconds. Code received instantly. Zero friction.' },
    { title: 'Reachable anywhere', text: 'App, website or WhatsApp. Nothing to install.' },
    { title: 'A growing network', text: 'Abidjan first. Then the wider region. More lockers all the time.' },
    { title: 'Built for Africa', text: 'Mobile Money, SMS, patchy networks — all designed around local realities.' },
  ],

  // --- Contact --------------------------------------------------------------
  contact: {
    city: 'Abidjan, Côte d’Ivoire',
    address: 'Rue Abli Mathieu, Résidence Premium, 4th floor, Zone 4, Marcory, Abidjan',
  },

  // --- Mobile-specific labels -----------------------------------------------
  mobile: {
    pricingLabels: [
      { name: 'Documents', desc: 'Accessories, papers' },
      { name: 'Clothing', desc: 'Electronics, textiles' },
      { name: 'Bulky', desc: 'Large equipment' },
    ],
    popularSuffix: 'popular',
  },

  // --- Footer links (labels only; URLs live elsewhere) ----------------------
  footer: {
    columns: { produit: 'Product', societe: 'Company', ressources: 'Resources' },
    produit: ['How it works', 'Services', 'Pricing', 'The app', 'Book'],
    societe: ['About', 'Partners', 'Press'],
    ressources: ['API documentation', 'Help', 'Status', 'Contact'],
  },
}
