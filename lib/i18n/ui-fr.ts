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
  hero: {
    // Le dernier mot du titre défile ; WORDS[0] est rendu côté serveur.
    typedWords: ['no stress,', '24h/24 & 7j/7,', 'sécurisée.'],
    titleBrand: 'Afribox,',
    titleRest: 'la livraison',
    lede: "Des casiers intelligents accessibles à toute heure. Pas de rendez-vous, pas d'attente — juste votre code et votre colis.",
    mascotAlt: 'Locky, la mascotte Afribox, présentant une réservation de locker confirmée',
    lockyName: 'Je suis Locky',
    lockyRole: 'Votre concierge Afribox',
    ctaShort: 'Réserver',
    ctaLong: 'Réserver un locker',
    cards: {
      alwaysOnTitle: 'Toujours actif',
      alwaysOnSub: '24 h/24 · 7 j/7',
      noAppointmentTitle: 'Sans rendez-vous',
      noAppointmentSub: 'Récupérez quand vous voulez',
      newParcelTitle: 'Nouveau colis',
      newParcelSub: "Un casier vous attend · à l'instant",
      paymentTitle: 'Paiement',
      paymentSub: 'Mobile Money',
      deliveredTitle: 'Colis livré',
      deliveredSub: 'Code utilisé',
    },
    strip: [
      { title: '24 h/24', sub: 'Toujours actif' },
      { title: 'Sans RDV', sub: 'Quand vous voulez' },
      { title: 'Mobile Money', sub: 'Paiement simple' },
    ],
  },
  nav: {
    links: ['Services', 'Fonctionnement', 'Tarifs', "L'app", 'À propos', 'Contact', 'FAQ'],
    book: 'Réserver un locker',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer',
  },

  services: {
    label: 'Nos services',
    title: 'Pour chaque besoin, une solution.',
    usages: [
      { title: 'E-commerce', text: 'Le coursier dépose, vous retirez avec votre code.' },
      { title: 'Envoi & retours', text: 'Vous déposez, le coursier ou le marchand collecte.' },
      { title: 'Entre particuliers', text: 'Une remise locale, sans passer par un coursier.' },
      { title: 'Relais casier', text: 'Des flux casier-à-casier — bientôt.' },
    ],
    channels: ['Site web', 'Application', 'WhatsApp', 'Au checkout marchand', 'Portail pro', 'Kiosque — sans compte'],
    usagesTitle: 'Un casier, quatre usages.',
    orderHint: 'Commandez comme ça vous arrange',
  },

  why: {
    label: 'Pourquoi Afribox',
    title: 'Cinq raisons concrètes.',
    networkAlt: "Le réseau de lockers Afribox qui s'étend à travers l'Afrique",
  },

  footer: {
    tagline: "Casiers connectés intelligents pour particuliers, opérateurs et villes. Une infrastructure logistique pensée pour l'avenir.",
    newsletterTitle: 'Restez informé',
    emailPlaceholder: 'vous@email.com',
    legal: ['Mentions légales', 'Confidentialité', 'Cookies'],
    rights: 'Tous droits réservés.',
  },
  reserve: {
    back: "Retour à l'accueil",
    label: 'Réservation',
    titleStart: 'Réservez votre locker en',
    titleAccent: '4 étapes.',
    lede: 'Choisissez un casier, configurez votre envoi, puis finalisez votre demande sur WhatsApp en un clic.',
    pilotLabel: 'Phase pilote',
    pilotText: "— réservez votre créneau, vous serez notifié dès l'ouverture du casier.",
  },
  reserveForm: {
    steps: ['Locker', 'Configurer', 'Paiement', 'Confirmation'],
    backToStep: "Revenir à l'étape",
    prev: 'Précédent',
    next: 'Suivant',
    confirm: 'Confirmer la demande',

    step1Title: 'Choisissez un locker',
    step1Lede: "Sélectionnez le casier le plus proche de vous ou de votre destinataire — vous passerez directement à l'étape suivante.",

    step2Title: 'Configurez votre réservation',
    step2Lede: 'Taille, durée et informations du destinataire.',
    durationLabel: 'Durée',
    duration48: '48 heures',
    durationUnique: 'durée unique',
    phoneLabel: 'Téléphone destinataire *',
    phonePlaceholder: '+225 07 00 00 00 00',
    messageLabel: 'Message (optionnel)',
    messagePlaceholder: 'Bonjour, votre colis est prêt',

    step3Title: 'Paiement',
    step3Lede: 'Indiquez votre moyen de paiement préféré. Le règlement est finalisé avec notre équipe à la confirmation de votre créneau.',
    paidOnConfirm: 'Réglé à la confirmation',
    summaryTitle: 'Récapitulatif',
    summaryLocker: 'Locker',
    summarySize: 'Taille',
    summaryTotal: 'Total TTC',
    paymentLabels: ['Orange Money', 'Wave', 'MTN Mobile Money', 'Carte bancaire'],

    step4Title: 'Votre demande est envoyée.',
    step4Lede: 'Finalisez votre réservation en un clic sur WhatsApp : notre équipe confirme votre créneau et vous envoie le code de dépôt.',
    requestNumber: 'Numéro de demande',
    finishWhatsApp: 'Finaliser sur WhatsApp',
    newBooking: 'Nouvelle réservation',

    wa: {
      greeting: 'Bonjour Afribox 👋',
      intro: 'Je souhaite finaliser ma réservation de locker :',
      locker: 'Locker',
      size: 'Taille',
      duration: 'Durée',
      phone: 'Tél. destinataire',
      ref: 'Réf. demande',
    },
  },
  howItWorks: {
    label: 'Comment ça marche',
    title: 'De la commande à la récupération.',
    lede: "De la commande au retrait, en 3 temps. Entièrement automatisé — pas de coup de fil, pas d'attente.",
    phases: [
      {
        title: 'Commande & réservation',
        text: 'Vous commandez chez un marchand partenaire ; il réserve le casier. Un seul paiement couvre le produit, la livraison et le locker.',
        steps: ['Commande', 'Réservation & paiement'],
      },
      {
        title: 'Dépôt du colis',
        text: "Le livreur reçoit un code d'ouverture par SMS, ouvre le casier, dépose le colis et referme — 60 secondes.",
        steps: ['Code au livreur', 'Dépôt du colis'],
      },
      {
        title: 'Retrait 24h/24',
        text: 'Vous recevez aussitôt votre code par SMS et retirez votre colis quand vous voulez, à toute heure.',
        steps: ['Code au consommateur', 'Récupération'],
      },
    ],
  },
  mobileUi: {
    downloadOn: 'Télécharger sur',
    availableOn: 'Disponible sur',
    appSoon: 'Application bientôt disponible. En attendant, réservez en quelques messages sur',
    hiwLede: "Entièrement automatisé. Pas de coup de fil. Pas d'attente.",
    smsCourier: 'Code pour ouvrir le casier Sococé, casier M-04.',
    smsSystem: 'Système',
    smsDeposited: "Colis déposé. Casier refermé et sécurisé à l'instant.",
    lockersLabel: 'Réseau pilote',
    lockersTitle: 'Nos premiers casiers arrivent à Abidjan.',
    lockersLede: "Réseau pilote à Abidjan — et bientôt Bouaké. Pré-réservez : vous serez notifié dès l'ouverture du casier.",
    pricingLede: 'Tarif unique par dépôt de 48h. Comptes marchand et entreprise : remises sur volume.',
    faqLabel: 'Questions',
    contactTitle: 'Une question ? On répond vite.',
    whatsappAria: 'Nous écrire sur WhatsApp',
  },
  lockersMap: {
    label: 'Réseau pilote',
    title: 'Nos premiers casiers arrivent à Abidjan.',
    lede: "Voici les sites de notre réseau pilote à Abidjan — et bientôt Bouaké. Réservez votre créneau dès maintenant : vous serez notifié dès l'ouverture du casier.",
    prebook: 'Pré-réserver',
  },

  appMock: {
    parcelReady: 'Colis prêt à retirer',
    codeValidity: 'Valide 72h · à usage unique',
  },
  contactForm: {
    roles: ['Particulier', 'Marchand / E-commerce', 'Entreprise', 'Partenaire / Investisseur', 'Presse', 'Autre'],
    subjects: ['Question générale', 'Devenir partenaire', 'Support technique', 'Demande de devis', 'Presse / Communication', 'Autre'],
    firstName: 'Prénom *',
    lastName: 'Nom *',
    email: 'Email *',
    phone: 'Téléphone',
    role: 'Vous êtes *',
    subject: 'Sujet *',
    message: 'Message *',
    choose: 'Choisir…',
    messagePlaceholder: 'Dites-nous comment nous pouvons vous aider…',
    required: 'Requis',
    invalidEmail: 'Email invalide',
    submit: 'Envoyer le message',
    sentTitle: 'Message bien reçu.',
    sentLede: 'Notre équipe vous répond sous 24h ouvrées. Pour une réponse immédiate, continuez sur WhatsApp.',
    continueWhatsApp: 'Continuer sur WhatsApp',
    sendAnother: 'Envoyer un autre message',
    error: 'Une erreur est survenue. Merci de réessayer.',
    footnote: 'Réponse sous 24h ouvrées · infos confidentielles',
  },

  locky: {
    quicks: ['Comment ça marche', 'Tarifs', 'Moyens de paiement', 'Trouver un locker', 'Réserver un locker', 'Parler à un humain'],
    prompts: [
      'Comment fonctionne Afribox, en bref ?',
      'Quels sont vos tarifs ?',
      'Comment puis-je payer ?',
      'Comment trouver le locker le plus proche de moi ?',
    ],
    greeting: 'Bonjour, je suis Locky 👋 votre concierge Afribox. Une question sur les lockers, les tarifs ou une livraison ? Je suis là pour vous aider.',
    connError: 'Souci de connexion 😅 Réessayez, ou écrivez-nous sur WhatsApp au +225 07 89 44 44 41.',
    subtitle: 'Concierge Afribox · en ligne',
    openAria: 'Ouvrir le chat avec Locky',
    closeAria: 'Fermer le chat',
    writingAria: 'Locky écrit…',
    inputPlaceholder: 'Écrivez votre question…',
    yourMessageAria: 'Votre message',
    sendAria: 'Envoyer',
    disclaimer: 'Locky peut se tromper — vérifiez les infos importantes.',
    fallbackNoKey: "Je ne suis pas encore tout à fait branché ici 🙈 Pour une réponse immédiate, écrivez-nous sur WhatsApp, ou réservez directement un locker depuis la page « Réserver ».",
    techIssue: "Désolé, j'ai un petit souci technique. Réessayez, ou écrivez-nous sur WhatsApp.",
  },
}

export type UiStrings = typeof uiFr
