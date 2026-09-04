// ---------------------------------------------------------------------------
// Dictionnaire français — SOURCE DE RÉFÉRENCE.
//
// Le type `Dictionary` est dérivé de cet objet : toute clé ajoutée ici devient
// obligatoire dans `en.ts`, et TypeScript signale l'oubli au build. C'est ce
// qui empêche les deux versions du site de diverger silencieusement.
//
// `meta`   → référencement (titres, descriptions)
// `common` → libellés d'interface transverses
// `jsonld` → textes des données structurées
// `content`→ contenu éditorial du site (fichier séparé, volumineux)
// ---------------------------------------------------------------------------
import { contentFr } from './content-fr'
import { uiFr } from './ui-fr'

export const fr = {
  meta: {
    siteName: 'Afribox',
    keywords:
      "casier intelligent Abidjan, smart locker Côte d'Ivoire, livraison last-mile Afrique, point de retrait colis Abidjan, consigne à colis, livraison colis Abidjan, Mobile Money livraison, casier automatique",
    ogImageAlt:
      'Afribox — réseau de casiers intelligents pour la livraison de colis en Afrique',
    home: {
      title: 'Afribox — Smart Lockers · Livraison Last-Mile en Afrique',
      description:
        'Afribox déploie un réseau de casiers intelligents pour rendre la livraison last-mile simple, rapide et sécurisée en Afrique. Disponible 24h/24.',
    },
    reserver: {
      title: 'Réserver un locker — Afribox',
      description:
        "Réservez un casier Afribox près de chez vous en moins d'une minute. Paiement Mobile Money ou carte bancaire.",
    },
  },

  common: {
    // Libellé d'accessibilité du sélecteur de langue, dans la langue de la page.
    switchAria: 'Passer le site en anglais',
    breadcrumbHome: 'Accueil',
    breadcrumbReserver: 'Réserver un locker',
    contactLabels: { email: 'Email', phone: 'Téléphone', office: 'Siège' },
    lockerStatus: { soon: 'Bientôt', full: 'Complet' },
  },

  jsonld: {
    slogan: 'La livraison last-mile simple, rapide et sécurisée en Afrique.',
    serviceType: 'Livraison last-mile par casiers intelligents',
    serviceName: 'Réseau de casiers intelligents Afribox',
    serviceDescription:
      'Dépôt et retrait de colis 24h/24 dans des casiers connectés, avec code SMS à usage unique et paiement Mobile Money.',
    offerCatalogName: 'Tarifs des casiers Afribox',
    offerPrefix: 'Casier',
    offerUnit: 'par colis, garde 48h',
  },

  content: contentFr,
  ui: uiFr,
}

export type Dictionary = typeof fr
