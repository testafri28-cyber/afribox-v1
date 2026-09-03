// ---------------------------------------------------------------------------
// Contenu éditorial du site — FRANÇAIS (référence).
//
// Ici : uniquement du TEXTE. La structure non traduisible (icônes, coordonnées
// GPS, liens, images, identifiants) reste dans `lib/constants.ts` et vient s'y
// greffer dans `lib/content.ts`. Les tableaux doivent garder le même ORDRE que
// leurs homologues de structure — c'est l'index qui les relie.
// ---------------------------------------------------------------------------

export const contentFr = {
  // --- Lockers du réseau pilote (les noms de lieux restent des noms propres) --
  lockers: [
    { name: 'Cap Sud', address: 'Centre commercial, Marcory' },
    { name: 'Sococé 2 Plateaux', address: 'Les 2 Plateaux, Cocody' },
    { name: "Mairie d'Abobo", address: 'Abobo, Abidjan' },
    { name: 'Cosmos Yopougon', address: 'Yopougon, Abidjan' },
  ],

  // --- Caractéristiques du casier ------------------------------------------
  lockerSpecs: [
    { value: '≈ 35', label: 'compartiments par casier' },
    { value: '3 tailles', label: 'Petit · Moyen · Grand' },
    { value: '21″', label: 'écran tactile Android' },
    { value: '2 caméras', label: 'vidéosurveillance continue' },
    { value: 'Code unique', label: 'RFID + serrure à solénoïde' },
    { value: '24h/24 · 48h', label: 'accès libre & garde du colis' },
  ],

  // --- Impact local ---------------------------------------------------------
  impact: [
    {
      audience: 'Pour les habitants',
      points: [
        'Un point de retrait accessible 24h/24, à côté de chez soi',
        "Plus besoin d'attendre un livreur ni de se déplacer loin",
        'Un service abordable, à partir de 500 FCFA',
        'Colis sécurisé, sous vidéosurveillance, remis au seul destinataire',
      ],
    },
    {
      audience: 'Pour les commerçants',
      points: [
        'Une solution de livraison fiable pour les vendeurs du quartier',
        'Réduction des livraisons manquées et des retours',
        'Un accès à la vente en ligne sans logistique propre',
        'Un flux de visiteurs supplémentaire près du site',
      ],
    },
    {
      audience: 'Pour la commune',
      points: [
        'Moins de trajets de livraison répétés, donc moins de circulation',
        "Création d'emplois locaux : installation, maintenance, support",
        'Un équipement moderne, propre et sans nuisance sonore',
        'Une infrastructure numérique au service des habitants',
      ],
    },
  ],

  // --- Statistiques ---------------------------------------------------------
  stats: [
    { value: '24/7', label: 'Disponibilité', hint: 'Toujours actif' },
    { value: '60', label: 'Secondes pour déposer', hint: 'Sans rendez-vous' },
    { value: '4800', label: 'Livraisons réussies', hint: '+42% vs an dernier' },
    { value: '98%', label: 'Satisfaction client', hint: '+3pt cette année' },
  ],

  // --- Problèmes résolus ----------------------------------------------------
  problems: [
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
  ],

  // --- Services (accordéon) -------------------------------------------------
  services: [
    {
      tag: 'Marchands & E-commerce',
      title: 'Livrez vos clients. Sans y penser.',
      text: 'Intégrez Afribox à votre boutique. Votre client choisit un locker à la commande. Le reste est automatique.',
      points: ['Intégration API', 'Suivi temps réel', 'Tarifs par volume'],
      cta: "Découvrir l'offre →",
    },
    {
      tag: 'Particuliers',
      title: 'Envoyez. Recevez. À votre rythme.',
      text: 'Réservez un locker en 2 minutes. Votre colis vous attend 24h/24.',
      points: ['Paiement Mobile Money', 'Code SMS instantané', 'Sans inscription'],
      cta: 'Réserver un locker →',
    },
    {
      tag: 'PME & Entreprises',
      title: 'Plusieurs envois par semaine ?',
      text: 'Compte centralisé, facturation mensuelle, envois groupés.',
      points: ['Multi-utilisateurs', 'Facture mensuelle unique', 'Support dédié'],
      cta: 'Ouvrir un compte →',
    },
  ],

  // --- Étapes du processus --------------------------------------------------
  processSteps: [
    {
      title: 'Commande',
      tag: 'Consommateur',
      text: "Vous passez commande chez un marchand partenaire. Le paiement couvre le produit, la livraison et l'accès au locker. Tout en une fois.",
      short: 'Un seul paiement : produit, livraison et locker.',
      actors: ['Consommateur', 'Marchand'],
      visualLabel: 'Paiement confirmé',
    },
    {
      title: 'Réservation & paiement',
      tag: 'Marchand',
      text: "Le marchand réserve un locker depuis son application ou le site. Il renseigne le numéro du livreur et le vôtre. C'est tout ce qu'il fait. Le reste est automatique.",
      short: 'Le marchand réserve le locker et saisit les 2 numéros.',
      actors: ['Marchand', 'Système'],
      visualLabel: '2 numéros enregistrés',
    },
    {
      title: 'Code au livreur',
      tag: 'Système → Livreur',
      text: "Le système génère automatiquement un code unique pour ouvrir le locker et l'envoie au livreur par SMS. Aucun appel. Aucune coordination.",
      short: "Un code d'ouverture est envoyé au livreur par SMS.",
      actors: ['Système', 'Livreur'],
      visualLabel: 'Afribox',
    },
    {
      title: 'Dépôt du colis',
      tag: 'Livreur',
      text: 'Le livreur arrive au locker, saisit son code, ouvre le casier, dépose le colis et referme la porte. 60 secondes. La livraison est confirmée instantanément.',
      short: 'Le livreur ouvre, dépose, referme — 60 secondes.',
      actors: ['Livreur', 'Locker'],
      visualLabel: 'Livraison confirmée',
    },
    {
      title: 'Code au consommateur',
      tag: 'Système → Consommateur',
      text: 'Dès que la porte est refermée, vous recevez votre code de retrait par SMS. Immédiatement.',
      short: 'Vous recevez aussitôt votre code de retrait par SMS.',
      actors: ['Système', 'Consommateur'],
      visualLabel: 'Afribox',
    },
    {
      title: 'Récupération',
      tag: 'Consommateur',
      text: "Vous allez au locker quand ça vous convient. Vous saisissez votre code, le casier s'ouvre, vous prenez votre colis. Disponible 24h/24, 7j/7.",
      short: 'Vous retirez votre colis quand vous voulez, 24h/24.',
      actors: ['Consommateur', 'Locker'],
      visualLabel: 'Mission accomplie',
    },
  ],

  // --- Aperçu du processus (3 étapes) ---------------------------------------
  previewSteps: [
    { title: 'Commandez', text: 'Choisissez un locker Afribox à la commande. Paiement unique.' },
    { title: 'Le livreur dépose', text: 'Il ouvre le casier avec son code SMS. 60 secondes, pas un appel.' },
    { title: 'Récupérez', text: 'Vous recevez votre code et retirez votre colis quand vous voulez.' },
  ],

  // --- Canaux d'accès -------------------------------------------------------
  channels: [
    {
      title: 'Sur le site web',
      text: "Réservez et gérez vos livraisons depuis n'importe quel navigateur.",
      tag: 'Tout navigateur',
    },
    {
      title: "Sur l'application",
      text: 'Notifications temps réel, historique, lockers favoris.',
      tag: 'iOS & Android',
    },
    {
      title: 'Via WhatsApp',
      text: 'Rien à télécharger. Quelques messages suffisent.',
      tag: 'Zéro installation',
    },
  ],

  // --- Fonctionnalités de l'application -------------------------------------
  appFeatures: [
    'Notifications instantanées',
    'Lockers favoris et historique',
    'Paiement Mobile Money intégré',
    'Code de retrait en un tap',
  ],

  // --- À propos -------------------------------------------------------------
  aboutMission:
    "AFRIBOX SARL est une société ivoirienne qui déploie le premier réseau de casiers colis intelligents de Côte d'Ivoire : des points de retrait et de dépôt sécurisés, automatisés et accessibles 24h/24, installés au plus près des habitants. Notre mission — démocratiser l'accès à une logistique efficace et flexible.",
  aboutMissionCourte:
    "Le premier réseau de casiers colis intelligents de Côte d'Ivoire : des points de retrait sécurisés et automatisés, ouverts 24h/24, au plus près des habitants.",

  // --- Valeurs --------------------------------------------------------------
  values: [
    {
      title: 'Fiabilité',
      text: 'Nos lockers sont disponibles. Nos codes fonctionnent. Si quelque chose ne va pas, on le sait avant vous.',
    },
    {
      title: 'Simplicité',
      text: "Chaque étape que l'on retire du parcours, c'est une friction en moins pour vous.",
    },
    {
      title: 'Innovation qui sert',
      text: 'On construit de la technologie pour résoudre des problèmes réels. Pas pour impressionner.',
    },
    {
      title: 'Impact concret',
      text: "Chaque locker déployé, c'est un quartier connecté à l'économie digitale.",
    },
  ],

  // --- Équipe (les noms restent, les rôles se traduisent) --------------------
  team: [
    { role: 'Direction Générale', bio: 'Vision, partenariats stratégiques et financement.' },
    {
      role: 'Direction des Opérations',
      bio: 'Opérations, commercial, déploiement terrain et équipe technique.',
    },
    { role: 'Direction Marketing', bio: 'Marketing digital, marque et développement de la demande.' },
    { role: 'Direction Financière', bio: 'Finance, juridique et ressources humaines.' },
  ],

  // --- FAQ ------------------------------------------------------------------
  faq: [
    {
      q: 'Combien de temps mon colis reste-t-il dans le casier ?',
      a: 'Votre colis reste disponible 48h dans le casier. Vous recevez des rappels automatiques avant la fin du délai. Au-delà : prolongation payante ou annulation remboursée — vous êtes toujours prévenu avant.',
    },
    {
      q: 'Mon colis est-il en sécurité dans le casier ?',
      a: "Oui. Chaque casier est verrouillé électroniquement (serrure à solénoïde et lecteur RFID) et ne s'ouvre qu'avec le code à usage unique envoyé par SMS. Deux caméras filment la façade en continu, et chaque dépôt comme chaque retrait est horodaté et tracé.",
    },
    {
      q: 'Comment se passe le retrait ?',
      a: "Vous vous présentez au casier au moment de votre choix, 24h/24. Sur l'écran tactile, vous saisissez le code reçu par SMS : le compartiment s'ouvre, vous récupérez votre colis. C'est tout.",
    },
    {
      q: 'Combien ça coûte ?',
      a: 'Le tarif dépend de la taille du casier, pour une garde de 48h : 500 FCFA (Petit), 750 FCFA (Moyen), 1 250 FCFA (Grand).',
    },
    {
      q: "Est-ce qu'on peut utiliser Afribox sans smartphone ?",
      a: 'Oui. Le code de retrait arrive par SMS simple. Pas besoin d’application ni de connexion internet.',
    },
    {
      q: 'Où et quand puis-je utiliser un casier ?',
      a: "Nous lançons notre réseau pilote à Abidjan : premiers casiers à Cap Sud (Marcory), Sococé (2 Plateaux), la Mairie d'Abobo et Cosmos (Yopougon) — et bientôt Bouaké. Vous pouvez déjà pré-réserver votre créneau : vous serez notifié dès l'ouverture d'un casier près de chez vous.",
    },
    {
      q: 'Quelles tailles de colis peut-on déposer ?',
      a: 'Nos casiers existent en trois tailles, jusqu’à 15 kg par colis : Petit (35 × 10 × 49 cm) pour documents et accessoires, Moyen (35 × 20 × 49 cm) pour vêtements et électronique, Grand (35 × 30 × 49 cm) pour les articles plus volumineux.',
    },
    {
      q: 'Comment payer ?',
      a: 'Le paiement se fait à la réservation, jamais à la collecte : par carte VISA ou par Mobile Money — Orange Money, Wave, MTN. La confirmation est instantanée.',
    },
    {
      q: 'Puis-je aussi envoyer un colis ou faire un retour ?',
      a: 'Oui. Au-delà de la réception d’achats en ligne, vous pouvez déposer un colis à expédier ou un retour marchand dans un casier — et même organiser une remise entre particuliers. Vous réservez, vous déposez, et le destinataire ou le coursier récupère avec son code.',
    },
  ],

  // --- Témoignages (les noms restent) ---------------------------------------
  testimonials: [
    {
      quote: "Depuis qu'on utilise Afribox, nos livraisons ratées ont quasiment disparu. Et on n'a plus besoin d'appeler les clients trois fois.",
      role: 'Fondatrice, boutique partenaire',
    },
    {
      quote: "La qualité du matériel et la fiabilité de l'application nous ont permis de passer à 12 points de retrait en 4 mois.",
      role: 'Directeur Logistique · Dakar Plaza',
    },
    {
      quote: "Le ROI a été visible dès le deuxième mois. L'équipe Afribox est ultra-réactive sur les demandes terrain.",
      role: 'CEO · ParcelGo',
    },
  ],

  // --- Tarifs ---------------------------------------------------------------
  pricing: [
    { size: 'Petit', use: 'Documents, accessoires', weight: '0 – 5 kg', price: '500 FCFA / 48h' },
    { size: 'Moyen', use: 'Vêtements, électronique', weight: '5 – 10 kg', price: '750 FCFA / 48h' },
    { size: 'Grand', use: 'Équipements volumineux', weight: "jusqu'à 15 kg", price: '1 250 FCFA / 48h' },
  ],

  // --- Avantages ------------------------------------------------------------
  merchantBenefits: [
    'Intégration API en quelques heures',
    'Tableau de bord temps réel',
    'Notification automatique du client à chaque étape',
    'Facturation mensuelle simplifiée',
    'Support dédié 7j/7',
  ],
  consumerBenefits: [
    'Disponible 24h/24, 7j/7',
    'Code SMS à usage unique',
    'Sans inscription obligatoire',
    'Paiement Mobile Money ou carte bancaire',
    'Récupération en moins de 60 secondes',
  ],

  // --- Pourquoi Afribox -----------------------------------------------------
  whyAfribox: [
    { title: 'Sécurisé', text: 'Code unique par colis. Accès électronique. Aucune intervention humaine.' },
    { title: 'Ultra rapide', text: 'Dépôt en 60 secondes. Code reçu instantanément. Zéro friction.' },
    { title: 'Accessible partout', text: 'App, site web ou WhatsApp. Aucune installation requise.' },
    { title: 'Réseau en expansion', text: 'Abidjan en premier. Puis toute la région. Toujours plus de lockers.' },
    { title: "Conçu pour l'Afrique", text: 'Mobile Money, SMS, réseau intermittent — tout est pensé localement.' },
  ],

  // --- Contact (ville et adresse s'écrivent différemment en anglais) ---------
  contact: {
    city: "Abidjan, Côte d'Ivoire",
    address: 'Rue Abli Mathieu, Résidence Premium, 4e étage, Zone 4, Marcory, Abidjan',
  },

  // --- Liens de pied de page (libellés seulement, les URLs sont ailleurs) ----
  footer: {
    columns: { produit: 'Produit', societe: 'Société', ressources: 'Ressources' },
    produit: ['Comment ça marche', 'Services', 'Tarifs', "L'application", 'Réserver'],
    societe: ['À propos', 'Partenaires', 'Presse'],
    ressources: ['Documentation API', 'Aide', 'Statut', 'Contact'],
  },
}

// Forme de référence du contenu : le fichier anglais doit la respecter.
export type SiteContent = typeof contentFr
