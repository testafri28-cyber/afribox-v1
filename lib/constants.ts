import type { LucideIcon } from 'lucide-react'
import {
  Smartphone, Store, MessageSquare, Package, CheckCircle2,
  ShieldCheck, Zap, MapPin, Globe,
  ScanLine, ShoppingBag, Truck,
  User, Bell, CreditCard, Lightbulb,
  Clock, Smile, Facebook, Instagram,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Lockers
// ---------------------------------------------------------------------------
export type LockerSize = 'S' | 'M' | 'L'
export type Locker = {
  id: number; name: string; address: string
  lat: number; lng: number; available: boolean; sizes: LockerSize[]
}

export const lockers: Locker[] = [
  { id: 1, name: 'Locker Plateau',  address: 'Avenue Botreau Roussel, Plateau', lat: 5.3196, lng: -4.0167, available: true,  sizes: ['S','M','L'] },
  { id: 2, name: 'Locker Cocody',   address: 'Rue des Jardins, Cocody',          lat: 5.3467, lng: -3.9892, available: true,  sizes: ['S','M'] },
  { id: 3, name: 'Locker Marcory',  address: 'Boulevard VGE, Marcory',           lat: 5.2999, lng: -3.9989, available: false, sizes: ['S'] },
  { id: 4, name: 'Locker Yopougon', address: 'Avenue Jean Paul II, Yopougon',    lat: 5.3411, lng: -4.0706, available: true,  sizes: ['S','M','L'] },
]

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export type Stat = {
  value: string
  label: string
  icon: LucideIcon
  hint?: string
  progress: number   // 0–100, drives the progress bar at the bottom of the card
}
export const stats: Stat[] = [
  { value: '24/7',  label: 'Disponibilité',         icon: Clock,   hint: 'Toujours actif',     progress: 100 },
  { value: '60',    label: 'Secondes pour déposer', icon: Zap,     hint: 'Sans rendez-vous',   progress: 75  },
  { value: '4800',  label: 'Livraisons réussies',   icon: Package, hint: '+42% vs an dernier', progress: 82  },
  { value: '98%',   label: 'Satisfaction client',   icon: Smile,   hint: '+3pt cette année',   progress: 98  },
]

// ---------------------------------------------------------------------------
// Problèmes
// ---------------------------------------------------------------------------
export type Problem = { icon: LucideIcon; title: string; text: string; number: string }
export const problems: Problem[] = [
  { icon: ShoppingBag, title: 'Pour les marchands', text: "Chaque livraison ratée, c'est une vente perdue. Afribox automatise le dernier kilomètre de bout en bout.", number: '01' },
  { icon: Truck,       title: 'Pour les livreurs',  text: 'Finis les allers-retours et les appels sans réponse. Déposer un colis prend 60 secondes.',               number: '02' },
  { icon: User,        title: 'Pour vous',           text: 'Récupérez votre colis quand ça vous convient. Pas quand ça convient au livreur.',                         number: '03' },
]

// ---------------------------------------------------------------------------
// Services (accordéon)
// ---------------------------------------------------------------------------
export type Service = {
  tag: string; title: string; text: string
  points: string[]; cta: string; ctaHref: string; image: string
}
export const services: Service[] = [
  {
    tag: 'Marchands & E-commerce',
    title: 'Livrez vos clients. Sans y penser.',
    text: "Intégrez Afribox à votre boutique. Votre client choisit un locker à la commande. Le reste est automatique.",
    points: ['Intégration API', 'Suivi temps réel', 'Tarifs par volume'],
    cta: "Découvrir l'offre →", ctaHref: '#contact',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    tag: 'Particuliers',
    title: 'Envoyez. Recevez. À votre rythme.',
    text: "Réservez un locker en 2 minutes. Votre colis vous attend 24h/24.",
    points: ['Paiement Mobile Money', 'Code SMS instantané', 'Sans inscription'],
    cta: 'Réserver un locker →', ctaHref: '/reserver',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  },
  {
    tag: 'PME & Entreprises',
    title: 'Plusieurs envois par semaine ?',
    text: "Compte centralisé, facturation mensuelle, envois groupés.",
    points: ['Multi-utilisateurs', 'Facture mensuelle unique', 'Support dédié'],
    cta: 'Ouvrir un compte →', ctaHref: '#contact',
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=80',
  },
]

// ---------------------------------------------------------------------------
// Étapes du processus
// ---------------------------------------------------------------------------
export type ProcessStep = {
  id: number; title: string; tag: string; text: string; actors: string[]
  visual: { kind: 'pill'; icon: LucideIcon; pillLabel: string } | { kind: 'sms'; code: string; from: string }
}
export const processSteps: ProcessStep[] = [
  { id: 1, title: 'Commande',               tag: 'Consommateur',          text: "Vous passez commande chez un marchand partenaire. Le paiement couvre le produit, la livraison et l'accès au locker. Tout en une fois.", actors: ['Consommateur', 'Marchand'],    visual: { kind: 'pill', icon: Smartphone,   pillLabel: 'Paiement confirmé' } },
  { id: 2, title: 'Réservation & paiement', tag: 'Marchand',              text: "Le marchand réserve un locker depuis son application ou le site. Il renseigne le numéro du livreur et le vôtre. C'est tout ce qu'il fait. Le reste est automatique.", actors: ['Marchand', 'Système'],       visual: { kind: 'pill', icon: Store,        pillLabel: '2 numéros enregistrés' } },
  { id: 3, title: 'Code au livreur',        tag: 'Système → Livreur',     text: "Le système génère automatiquement un code unique pour ouvrir le locker et l'envoie au livreur par SMS. Aucun appel. Aucune coordination.", actors: ['Système', 'Livreur'],        visual: { kind: 'sms',  code: '842 631',    from: 'Afribox' } },
  { id: 4, title: 'Dépôt du colis',         tag: 'Livreur',               text: "Le livreur arrive au locker, saisit son code, ouvre le casier, dépose le colis et referme la porte. 60 secondes. La livraison est confirmée instantanément.", actors: ['Livreur', 'Locker'],         visual: { kind: 'pill', icon: Package,      pillLabel: 'Livraison confirmée' } },
  { id: 5, title: 'Code au consommateur',   tag: 'Système → Consommateur',text: "Dès que la porte est refermée, vous recevez votre code de retrait par SMS. Immédiatement.", actors: ['Système', 'Consommateur'],   visual: { kind: 'sms',  code: '975 214',    from: 'Afribox' } },
  { id: 6, title: 'Récupération',           tag: 'Consommateur',          text: "Vous allez au locker quand ça vous convient. Vous saisissez votre code, le casier s'ouvre, vous prenez votre colis. Disponible 24h/24, 7j/7.", actors: ['Consommateur', 'Locker'],    visual: { kind: 'pill', icon: CheckCircle2, pillLabel: 'Mission accomplie' } },
]

// ---------------------------------------------------------------------------
// Aperçu du processus (3 étapes clés — pour la version simplifiée)
// ---------------------------------------------------------------------------
export type PreviewStep = { icon: LucideIcon; number: string; title: string; text: string }
export const previewSteps: PreviewStep[] = [
  { icon: Smartphone,   number: '01', title: 'Commandez',         text: 'Choisissez un locker Afribox à la commande. Paiement unique.' },
  { icon: Package,      number: '02', title: 'Le livreur dépose', text: 'Il ouvre le casier avec son code SMS. 60 secondes, pas un appel.' },
  { icon: CheckCircle2, number: '03', title: 'Récupérez',         text: 'Vous recevez votre code et retirez votre colis quand vous voulez.' },
]

// ---------------------------------------------------------------------------
// Canaux d'accès
// ---------------------------------------------------------------------------
export type Channel = { icon: LucideIcon; title: string; text: string; tag: string }
export const channels: Channel[] = [
  { icon: Globe,         title: 'Sur le site web',     text: "Réservez et gérez vos livraisons depuis n'importe quel navigateur.",     tag: 'Tout navigateur' },
  { icon: Smartphone,    title: "Sur l'application",   text: "Notifications temps réel, historique, lockers favoris.",                 tag: 'iOS & Android' },
  { icon: MessageSquare, title: 'Via WhatsApp',         text: "Rien à télécharger. Quelques messages suffisent.",                      tag: 'Zéro installation' },
]

// ---------------------------------------------------------------------------
// App features
// ---------------------------------------------------------------------------
export const appFeatures = [
  { icon: Bell,        label: 'Notifications instantanées' },
  { icon: MapPin,      label: 'Lockers favoris et historique' },
  { icon: CreditCard,  label: 'Paiement Mobile Money intégré' },
  { icon: ScanLine,    label: 'Code de retrait en un tap' },
]

// ---------------------------------------------------------------------------
// Valeurs
// ---------------------------------------------------------------------------
export type Value = { icon: LucideIcon; title: string; text: string }
export const values: Value[] = [
  { icon: ShieldCheck, title: 'Fiabilité',          text: "Nos lockers sont disponibles. Nos codes fonctionnent. Si quelque chose ne va pas, on le sait avant vous." },
  { icon: Zap,         title: 'Simplicité',          text: "Chaque étape que l'on retire du parcours, c'est une friction en moins pour vous." },
  { icon: Lightbulb,   title: 'Innovation qui sert', text: "On construit de la technologie pour résoudre des problèmes réels. Pas pour impressionner." },
  { icon: Globe,       title: 'Impact concret',      text: "Chaque locker déployé, c'est un quartier connecté à l'économie digitale." },
]

// ---------------------------------------------------------------------------
// Équipe
// ---------------------------------------------------------------------------
export type TeamMember = { initials: string; name: string; role: string; bio: string }
export const team: TeamMember[] = [
  { initials: 'AK', name: 'Ama Kofo',        role: 'Co-fondatrice & CEO', bio: 'Passionnée de logistique et convaincue que l\'Afrique mérite mieux.' },
  { initials: 'DB', name: 'David Bamba',      role: 'CTO',                 bio: 'Construit les systèmes qui font fonctionner les lockers 24h/24.' },
  { initials: 'MO', name: 'Marie Ouattara',   role: 'Head of Ops',         bio: "S'assure que chaque locker est là quand vous en avez besoin." },
]

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export type FaqItem = { q: string; a: string }
export const faq: FaqItem[] = [
  { q: "Que se passe-t-il si je ne récupère pas mon colis à temps ?",   a: "On vous envoie une notification de rappel avant la fin du délai. Si le délai est dépassé, des frais de garde s'appliquent. Vous êtes toujours prévenus avant." },
  { q: "Mon colis est-il en sécurité dans le locker ?",                  a: "Oui. Chaque casier est verrouillé électroniquement. Il s'ouvre uniquement avec le code à usage unique envoyé par SMS. Personne d'autre n'y a accès." },
  { q: "Est-ce qu'on peut utiliser Afribox sans smartphone ?",            a: "Oui. Le code de retrait arrive par SMS simple. Pas besoin d'application, pas besoin de connexion internet." },
  { q: "Comment trouver le locker le plus proche ?",                     a: "Sur l'appli, le site ou via WhatsApp, une carte vous montre les lockers disponibles près de vous." },
  { q: "Quelles tailles de colis peut-on déposer ?",                     a: "Nos lockers existent en trois tailles. Petit pour les documents et accessoires. Moyen pour les vêtements et l'électronique. Grand pour les équipements plus volumineux." },
  { q: "Comment payer ?",                                                 a: "Par Mobile Money — Orange Money, Wave, MTN. Ou par carte bancaire. Le paiement est confirmé instantanément." },
]

// ---------------------------------------------------------------------------
// Témoignages
// ---------------------------------------------------------------------------
export type Testimonial = { quote: string; name: string; initials: string; role: string }
export const testimonials: Testimonial[] = [
  { quote: "Depuis qu'on utilise Afribox, nos livraisons ratées ont quasiment disparu. Et on n'a plus besoin d'appeler les clients trois fois.", name: 'Ama Koné',     initials: 'AK', role: 'Fondatrice, boutique partenaire' },
  { quote: "La qualité du matériel et la fiabilité de l'application nous ont permis de passer à 12 points de retrait en 4 mois.",               name: "Ibrahim N'Diaye", initials: 'IN', role: 'Directeur Logistique · Dakar Plaza' },
  { quote: "Le ROI a été visible dès le deuxième mois. L'équipe Afribox est ultra-réactive sur les demandes terrain.",                           name: 'Cheick Diop',   initials: 'CD', role: 'CEO · ParcelGo' },
]

// ---------------------------------------------------------------------------
// Tarifs
// ---------------------------------------------------------------------------
export const pricing = [
  { size: 'Petit',  use: 'Documents, accessoires',       price: '1 500 FCFA / 24h' },
  { size: 'Moyen',  use: 'Vêtements, électronique',       price: '2 500 FCFA / 24h' },
  { size: 'Grand',  use: 'Équipements volumineux',        price: '4 000 FCFA / 24h' },
]

// ---------------------------------------------------------------------------
// Avantages marchands
// ---------------------------------------------------------------------------
export const merchantBenefits: string[] = [
  'Intégration API en quelques heures',
  'Tableau de bord temps réel',
  'Notification automatique du client à chaque étape',
  'Facturation mensuelle simplifiée',
  'Support dédié 7j/7',
]

// ---------------------------------------------------------------------------
// Avantages consommateurs
// ---------------------------------------------------------------------------
export const consumerBenefits: string[] = [
  'Disponible 24h/24, 7j/7',
  'Code SMS à usage unique',
  'Sans inscription obligatoire',
  'Paiement Mobile Money ou carte bancaire',
  'Récupération en moins de 60 secondes',
]

// ---------------------------------------------------------------------------
// Pourquoi Afribox
// ---------------------------------------------------------------------------
export type WhyAfriboxItem = { icon: LucideIcon; title: string; text: string }
export const whyAfribox: WhyAfriboxItem[] = [
  { icon: ShieldCheck, title: 'Sécurisé',             text: 'Code unique par colis. Accès électronique. Aucune intervention humaine.' },
  { icon: Zap,         title: 'Ultra rapide',          text: 'Dépôt en 60 secondes. Code reçu instantanément. Zéro friction.' },
  { icon: Smartphone,  title: 'Accessible partout',    text: 'App, site web ou WhatsApp. Aucune installation requise.' },
  { icon: Globe,       title: 'Réseau en expansion',   text: 'Abidjan en premier. Puis toute la région. Toujours plus de lockers.' },
  { icon: Lightbulb,   title: 'Conçu pour l\'Afrique', text: 'Mobile Money, SMS, réseau intermittent — tout est pensé localement.' },
]

// ---------------------------------------------------------------------------
// Contact — source unique (numéro business, WhatsApp, email)
// ---------------------------------------------------------------------------
export const contact = {
  email: 'info@afriboxlockers.com',
  phoneDisplay: '+225 07 89 44 44 41',
  // Format wa.me : indicatif 225 + numéro, sans « + » ni espaces.
  whatsapp: '2250789444441',
  city: "Abidjan, Côte d'Ivoire",
}

// Réseaux sociaux — source unique (footer + JSON-LD `sameAs`).
// N'ajouter ici qu'un profil qui existe réellement : un lien mort nuit au SEO.
export type Social = { label: string; href: string; icon: LucideIcon }
export const socials: Social[] = [
  { label: 'Facebook',  href: 'https://www.facebook.com/afriboxlockers',    icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/afribox_lockers/', icon: Instagram },
]

// ---------------------------------------------------------------------------
// Footer links
// ---------------------------------------------------------------------------
// Le site est une one-page : les ancres sont préfixées par « / » pour rester
// cliquables depuis /reserver (Next navigue vers la home puis scrolle).
export const footerLinks = {
  produit:    [{ label: 'Comment ça marche', href: '/#fonctionnement' }, { label: 'Services', href: '/#services' }, { label: 'Tarifs', href: '/#tarifs' }, { label: "L'application", href: '/#app-mobile' }, { label: 'Réserver', href: '/reserver' }],
  societe:    [{ label: 'À propos', href: '/#a-propos' }, { label: "L'équipe", href: '/#equipe' }, { label: 'Partenaires', href: '#' }, { label: 'Presse', href: '#' }],
  ressources: [{ label: 'Documentation API', href: '#' }, { label: 'Aide', href: '#' }, { label: 'Statut', href: '#' }, { label: 'Contact', href: '/#contact' }],
}
