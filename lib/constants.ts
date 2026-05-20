// Données statiques utilisées dans tout le site.
// Pas de backend pour cette version — toutes les données vivent ici.

import type { LucideIcon } from 'lucide-react'
import {
  Smartphone,
  Store,
  MessageSquare,
  Package,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  MapPin,
  Globe,
  Sparkles,
  ScanLine,
  PackageCheck,
  CheckCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Lockers (mêmes données pour la carte Contact et la page Réserver)
// ---------------------------------------------------------------------------
export type LockerSize = 'S' | 'M' | 'L'

export type Locker = {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  available: boolean
  sizes: LockerSize[]
  distance?: string
}

export const lockers: Locker[] = [
  {
    id: 1,
    name: 'Locker Plateau',
    address: 'Avenue Botreau Roussel, Plateau',
    lat: 5.3196,
    lng: -4.0167,
    available: true,
    sizes: ['S', 'M', 'L'],
    distance: '1,2 km',
  },
  {
    id: 2,
    name: 'Locker Cocody',
    address: 'Rue des Jardins, Cocody',
    lat: 5.3467,
    lng: -3.9892,
    available: true,
    sizes: ['S', 'M'],
    distance: '2,8 km',
  },
  {
    id: 3,
    name: 'Locker Marcory',
    address: 'Boulevard VGE, Marcory',
    lat: 5.2999,
    lng: -3.9989,
    available: false,
    sizes: [],
    distance: '4,1 km',
  },
  {
    id: 4,
    name: 'Locker Yopougon',
    address: 'Avenue Jean Paul II, Yopougon',
    lat: 5.3411,
    lng: -4.0706,
    available: true,
    sizes: ['S', 'M', 'L'],
    distance: '6,5 km',
  },
]

// ---------------------------------------------------------------------------
// Stats Bar
// ---------------------------------------------------------------------------
export type Stat = { value: string; label: string }
export const stats: Stat[] = [
  { value: '4800', label: 'Livraisons réussies' },
  { value: '98%', label: 'Satisfaction client' },
  { value: '24', label: 'Marchands partenaires' },
  { value: '60s', label: 'Secondes de dépôt' },
]

// ---------------------------------------------------------------------------
// Problème (3 cartes)
// ---------------------------------------------------------------------------
export const problems = [
  {
    title: 'Pour les marchands',
    text: "Chaque livraison ratée, c'est une vente perdue. Afribox automatise le dernier kilomètre de bout en bout.",
  },
  {
    title: 'Pour les livreurs',
    text: 'Finis les allers-retours et les appels sans réponse. Déposer un colis prend 60 secondes.',
  },
  {
    title: 'Pour vous',
    text: 'Récupérez votre colis quand ça vous convient. Pas quand ça convient au livreur.',
  },
]

// ---------------------------------------------------------------------------
// Services (sur l'accueil)
// ---------------------------------------------------------------------------
export const merchantBenefits = [
  'Réseau de lockers déjà déployés à Abidjan',
  'Intégration API ou tableau de bord clé en main',
  'SMS automatiques aux livreurs et clients',
  'Confirmation de livraison instantanée',
]

export const consumerBenefits = [
  "Réservation en ligne en moins d'une minute",
  "Code unique envoyé par SMS",
  'Accessible 24h/24, 7j/7',
  'Paiement Mobile Money ou carte',
]

// ---------------------------------------------------------------------------
// Aperçu "Comment ça marche" (3 étapes simplifiées sur l'accueil)
// ---------------------------------------------------------------------------
export type PreviewStep = {
  number: string
  title: string
  text: string
  icon: LucideIcon
}

export const previewSteps: PreviewStep[] = [
  {
    number: '01',
    title: 'Réservez',
    text: "Choisissez un locker près de chez vous, sélectionnez la taille et la durée, payez en ligne.",
    icon: ScanLine,
  },
  {
    number: '02',
    title: 'Recevez votre code',
    text: 'Le destinataire reçoit un code unique par SMS dès que le colis est déposé dans le locker.',
    icon: PackageCheck,
  },
  {
    number: '03',
    title: 'Récupérez',
    text: "Le code ouvre le casier 24h/24. Pas de rendez-vous. Pas d'attente.",
    icon: CheckCircle,
  },
]

// ---------------------------------------------------------------------------
// Canaux d'accès
// ---------------------------------------------------------------------------
export type Channel = { icon: LucideIcon; title: string; text: string }
export const channels: Channel[] = [
  {
    icon: Globe,
    title: 'Site web',
    text: 'Réservez et gérez vos envois depuis votre navigateur, sur ordinateur ou mobile.',
  },
  {
    icon: Smartphone,
    title: 'Application mobile',
    text: "L'appli Afribox suit vos colis en temps réel et stocke vos codes dans un coffre sécurisé.",
  },
  {
    icon: MessageSquare,
    title: 'Via WhatsApp',
    text: 'Envoyez un message à notre numéro Afribox, recevez le code, déposez. Sans appli.',
  },
]

// ---------------------------------------------------------------------------
// Process complet — 6 étapes (page Comment ça marche)
// ---------------------------------------------------------------------------
export type ProcessStep = {
  id: number
  title: string
  tag: string
  text: string
  actors: string[]
  visual:
    | { kind: 'pill'; icon: LucideIcon; pillLabel: string }
    | { kind: 'sms'; code: string; from: string }
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Commande',
    tag: 'Consommateur',
    text: "Vous passez commande chez un marchand partenaire. Le paiement couvre le produit, la livraison et l'accès au locker. Tout en une fois.",
    actors: ['Consommateur', 'Marchand'],
    visual: { kind: 'pill', icon: Smartphone, pillLabel: 'Paiement confirmé' },
  },
  {
    id: 2,
    title: 'Réservation & paiement',
    tag: 'Marchand',
    text: "Le marchand réserve un locker depuis son application ou le site. Il renseigne le numéro du livreur et le vôtre. C'est tout ce qu'il fait. Le reste est automatique.",
    actors: ['Marchand', 'Système'],
    visual: { kind: 'pill', icon: Store, pillLabel: '2 numéros enregistrés' },
  },
  {
    id: 3,
    title: 'Code au livreur',
    tag: 'Système → Livreur',
    text: 'Le système génère automatiquement un code unique pour ouvrir le locker et l\'envoie au livreur par SMS. Aucun appel. Aucune coordination.',
    actors: ['Système', 'Livreur'],
    visual: { kind: 'sms', code: '842 631', from: 'Afribox' },
  },
  {
    id: 4,
    title: 'Dépôt du colis',
    tag: 'Livreur',
    text: 'Le livreur arrive au locker, saisit son code, ouvre le casier, dépose le colis et referme la porte. 60 secondes. La livraison est confirmée instantanément.',
    actors: ['Livreur', 'Locker'],
    visual: { kind: 'pill', icon: Package, pillLabel: 'Livraison confirmée' },
  },
  {
    id: 5,
    title: 'Code au consommateur',
    tag: 'Système → Consommateur',
    text: "Dès que la porte est refermée, vous recevez votre code de retrait par SMS. Immédiatement. Pas besoin d'attendre un appel ou un email.",
    actors: ['Système', 'Consommateur'],
    visual: { kind: 'sms', code: '975 214', from: 'Afribox' },
  },
  {
    id: 6,
    title: 'Récupération',
    tag: 'Consommateur',
    text: "Vous allez au locker quand ça vous convient. Vous saisissez votre code, le casier s'ouvre, vous prenez votre colis. Disponible 24h/24, 7j/7.",
    actors: ['Consommateur', 'Locker'],
    visual: { kind: 'pill', icon: CheckCircle2, pillLabel: 'Mission accomplie' },
  },
]

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const faq = [
  {
    q: 'Que se passe-t-il si je ne récupère pas mon colis à temps ?',
    a: 'On vous envoie une notification de rappel avant la fin du délai. Si le délai est dépassé, des frais de garde s\'appliquent. Vous êtes toujours prévenus avant.',
  },
  {
    q: 'Mon colis est-il en sécurité dans le locker ?',
    a: "Oui. Chaque casier est verrouillé électroniquement. Il s'ouvre uniquement avec le code à usage unique envoyé par SMS. Personne d'autre n'y a accès.",
  },
  {
    q: "Est-ce qu'on peut utiliser Afribox sans smartphone ?",
    a: "Oui. Le code de retrait arrive par SMS simple. Pas besoin d'application, pas besoin de connexion internet pour récupérer votre colis.",
  },
  {
    q: 'Comment trouver le locker le plus proche ?',
    a: "Sur l'appli, le site ou via WhatsApp, une carte vous montre les lockers disponibles près de vous. Avec les itinéraires si vous en avez besoin.",
  },
  {
    q: 'Quelles tailles de colis peut-on déposer ?',
    a: "Nos lockers existent en trois tailles. Petit pour les documents et accessoires. Moyen pour les vêtements et l'électronique. Grand pour les équipements plus volumineux.",
  },
  {
    q: 'Comment payer ?',
    a: 'Par Mobile Money — Orange Money, Wave, MTN. Ou par carte bancaire. Le paiement est confirmé instantanément.',
  },
]

// ---------------------------------------------------------------------------
// Témoignages (carrousel sur l'accueil)
// ---------------------------------------------------------------------------
export type Testimonial = {
  quote: string
  name: string
  initials: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Avec Afribox, nos livraisons sont confirmées en minutes. Plus de litiges, plus d'appels. Mes clients reviennent commander.",
    name: 'Kadi Koffi',
    initials: 'KK',
    role: 'Fondatrice · Boutique Yala, Cocody',
  },
  {
    quote:
      "La qualité du matériel et la fiabilité de l'application nous ont permis de passer à 12 points de retrait en 4 mois.",
    name: 'Ibrahim N\'Diaye',
    initials: 'IN',
    role: 'Directeur Logistique · Dakar Plaza',
  },
  {
    quote:
      "Une infrastructure premium, discrète et durable. Exactement ce qu'il fallait pour notre quartier d'affaires.",
    name: 'Fatou Camara',
    initials: 'FC',
    role: 'Smart City Manager · Abidjan',
  },
  {
    quote:
      "Le ROI a été visible dès le deuxième mois. L'équipe Afribox est ultra-réactive sur les demandes terrain.",
    name: 'Cheick Diop',
    initials: 'CD',
    role: 'CEO · ParcelGo',
  },
  {
    quote:
      "Nos résidents adorent ne plus chercher leurs colis perdus dans le hall ou à la réception.",
    name: 'Awa Touré',
    initials: 'AT',
    role: 'Property Manager · Riviera 3',
  },
  {
    quote:
      "On a divisé par trois nos retours pour adresse introuvable. L'expérience client a complètement changé.",
    name: 'Mariama Sow',
    initials: 'MS',
    role: 'COO · Sahel Express',
  },
]

// ---------------------------------------------------------------------------
// Valeurs (page À propos)
// ---------------------------------------------------------------------------
export const values = [
  {
    icon: ShieldCheck,
    title: 'Fiabilité',
    text: "On préfère faire moins, mais bien. Chaque locker installé doit fonctionner. Toujours.",
  },
  {
    icon: Zap,
    title: 'Simplicité',
    text: 'Un produit utile se devine en 10 secondes. Si on doit expliquer, on a échoué.',
  },
  {
    icon: Sparkles,
    title: 'Innovation qui sert',
    text: "On n'innove pas pour le plaisir. On résout des problèmes que les gens vivent vraiment.",
  },
  {
    icon: Users,
    title: 'Impact concret',
    text: "On mesure notre succès en livraisons réussies, pas en levées de fonds.",
  },
]

// ---------------------------------------------------------------------------
// Équipe (À propos)
// ---------------------------------------------------------------------------
export const team = [
  { name: 'Aïsha Koné', role: 'Co-fondatrice · CEO', initials: 'AK' },
  { name: 'Yao Kouassi', role: 'Co-fondateur · CTO', initials: 'YK' },
  { name: 'Sarah Diabaté', role: 'Head of Operations', initials: 'SD' },
  { name: 'Marc N\'Guessan', role: 'Head of Partnerships', initials: 'MN' },
]

// ---------------------------------------------------------------------------
// Tarifs (page Nos services — placeholder)
// ---------------------------------------------------------------------------
export const pricing = [
  { size: 'Petit', use: 'Documents, accessoires', price: '1 500 FCFA / 24h' },
  { size: 'Moyen', use: 'Vêtements, électronique', price: '2 500 FCFA / 24h' },
  { size: 'Grand', use: 'Équipements volumineux', price: '4 000 FCFA / 24h' },
]

// ---------------------------------------------------------------------------
// Pourquoi Afribox (page Nos services)
// ---------------------------------------------------------------------------
export const whyAfribox = [
  {
    icon: Clock,
    title: 'Disponible en continu',
    text: '24h/24, 7j/7. Aucune contrainte horaire pour vos clients comme pour vos livreurs.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurisé par design',
    text: 'Chaque casier est verrouillé électroniquement et ouvert uniquement par code unique.',
  },
  {
    icon: MapPin,
    title: "Couvre l'urbain dense",
    text: 'Nos lockers sont placés là où vivent et travaillent vos clients : commerces, stations, immeubles.',
  },
  {
    icon: Zap,
    title: 'Intégration en quelques heures',
    text: 'API simple ou tableau de bord. Pas besoin de refondre votre stack logistique.',
  },
  {
    icon: Users,
    title: 'Support local et réactif',
    text: 'Une équipe à Abidjan qui parle votre langue et comprend votre marché.',
  },
]

// ---------------------------------------------------------------------------
// Liens du footer
// ---------------------------------------------------------------------------
export const footerLinks = {
  product: [
    { label: 'Comment ça marche', href: '/comment-ca-marche' },
    { label: 'Fonctionnalités', href: '/nos-services' },
    { label: "Cas d'usage", href: '/nos-services#b2b' },
    { label: 'Application mobile', href: '#' },
  ],
  company: [
    { label: 'À propos', href: '/a-propos' },
    { label: 'Partenaires', href: '/a-propos#partenaires' },
    { label: 'Carrières', href: '#' },
    { label: 'Presse', href: '#' },
  ],
  resources: [
    { label: 'Documentation API', href: '#' },
    { label: 'Aide', href: '/contact' },
    { label: 'Statut', href: '#' },
    { label: 'Contact', href: '/contact' },
  ],
}
