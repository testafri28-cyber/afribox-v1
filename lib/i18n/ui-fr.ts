// ---------------------------------------------------------------------------
// Libellés d'interface — FRANÇAIS (référence).
//
// Titres de sections, accroches, boutons : tout ce qui est écrit dans le JSX
// plutôt que dans les données. Organisé par section pour rester navigable.
// Le type `UiStrings` en dérive : une clé oubliée dans ui-en.ts casse le build.
// ---------------------------------------------------------------------------

export const uiFr = {
  problem: {
    label: 'Le problème que nous résolvons',
    title: 'La livraison en Afrique mérite mieux.',
    lede: "Le e-commerce progresse d'environ 11 % par an en Côte d'Ivoire, mais le dernier kilomètre reste le maillon faible : adresse introuvable, livreur injoignable, colis perdu. Afribox règle ça simplement — un casier près de chez vous, un code par SMS, et c'est tout.",
    withoutAfribox: 'Sans Afribox',
    withAfribox: 'Avec Afribox',
    pains: [
      'Adresse introuvable, le livreur tourne en rond',
      'Appels sans réponse, livraison ratée',
      'Colis égaré ou jamais arrivé',
      'Bloqué chez soi à attendre toute la journée',
    ],
    solutions: [
      'Un casier intelligent près de chez vous',
      'Un code de retrait par SMS, à usage unique',
      'Récupération 24h/24, quand ça vous arrange',
      'Dépôt en 60 secondes, zéro coup de fil',
    ],
  },

  faq: {
    label: 'FAQ',
    title: 'Questions fréquentes.',
    lede: "Tout ce qu'il faut savoir avant de réserver un locker.",
    another: 'Une autre question ?',
    replyTime: 'Notre équipe répond sous 24h — ou tout de suite sur WhatsApp.',
    writeUs: 'Nous écrire',
  },

  cta: {
    eyebrow: 'Notre vision',
    title: 'Prêt à simplifier vos livraisons ?',
    subtitle:
      "Réservez votre premier locker en moins d'une minute. Ou parlez à notre équipe pour un déploiement marchand.",
    primaryLabel: 'Réserver un locker',
    secondaryLabel: 'Parler à un humain',
  },

  pricing: {
    label: 'Tarifs',
    title: "Trois tailles. Trois prix. C'est tout.",
    lede: 'Tarif unique par dépôt de 48h. Les comptes marchand et entreprise bénéficient de remises sur volume.',
    bookThis: 'Réserver ce format',
    note: 'Comptes marchand et entreprise : tarification dégressive selon le volume.',
  },

  impact: {
    label: 'Impact local',
    title: 'Un service pour tout le quartier.',
    lede: 'Un casier est un équipement de proximité : il rend service aux habitants, soutient les commerçants du quartier et réduit la circulation liée aux livraisons.',
  },

  testimonials: {
    label: 'Témoignages',
    title: 'Ils nous font confiance.',
    lede: "Marchands, opérateurs et boutiques partenaires — voici ce qu'ils en disent.",
  },

  app: {
    label: "L'application",
    title: 'Vos lockers dans votre poche.',
    lede: "Gérez vos envois, suivez vos colis et récupérez vos codes directement depuis l'appli Afribox.",
  },

  channels: {
    label: "Canaux d'accès",
    title: 'Utilisez Afribox comme vous le souhaitez.',
  },

  about: {
    label: 'À propos',
    title: "Construire l'infrastructure logistique de demain.",
    teamLabel: "L'équipe",
    teamTitle: "Des gens qui s'engagent.",
  },

  contact: {
    label: 'Contact',
    title: 'Parlons de votre projet.',
    lede: 'Marchand, entreprise, investisseur ou simple curieux — notre équipe répond sous 24h ouvrées.',
  },
}

export type UiStrings = typeof uiFr
