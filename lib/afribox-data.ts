// Source unique de contenu, partagée entre les composants desktop et mobile.
// Modifiez ici un prix, un casier ou une question FAQ : les deux versions se mettent à jour.

export interface PricingTier {
  tag: string;
  name: string;
  desc: string;
  amount: string;
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  { tag: "Petit", name: "Documents", desc: "Accessoires, papiers", amount: "500" },
  { tag: "Moyen · populaire", name: "Vêtements", desc: "Électronique, textile", amount: "750", popular: true },
  { tag: "Grand", name: "Volumineux", desc: "Équipements larges", amount: "1 250" },
];

export interface LockerLocation {
  name: string;
  area: string;
  status: "Bientôt" | "Ouvert";
}

export const lockerLocations: LockerLocation[] = [
  { name: "Cap Sud", area: "Marcory", status: "Bientôt" },
  { name: "Sococé 2 Plateaux", area: "Cocody", status: "Bientôt" },
  { name: "Mairie d'Abobo", area: "Abobo", status: "Bientôt" },
  { name: "Cosmos Yopougon", area: "Yopougon", status: "Bientôt" },
];

export interface AboutValue {
  title: string;
  description: string;
}

export const aboutValues: AboutValue[] = [
  {
    title: "Fiabilité",
    description:
      "Nos lockers sont disponibles. Nos codes fonctionnent. Si quelque chose ne va pas, on le sait avant vous.",
  },
  {
    title: "Simplicité",
    description: "Chaque étape que l'on retire du parcours, c'est une friction en moins pour vous.",
  },
  {
    title: "Innovation qui sert",
    description: "On construit de la technologie pour résoudre des problèmes réels. Pas pour impressionner.",
  },
  {
    title: "Impact concret",
    description: "Chaque locker déployé, c'est un quartier connecté à l'économie digitale.",
  },
];

export const aboutMission =
  "AFRIBOX SARL est une société ivoirienne qui déploie le premier réseau de casiers colis intelligents de Côte d'Ivoire : des points de retrait et de dépôt sécurisés, automatisés et accessibles 24h/24, installés au plus près des habitants. Notre mission — démocratiser l'accès à une logistique efficace et flexible.";

export interface StatItem {
  value: string;
  label: string;
}

export const statStrip: StatItem[] = [
  { value: "≈35", label: "compartiments par casier" },
  { value: "3", label: "tailles · petit, moyen, grand" },
  { value: "2", label: "caméras · vidéosurveillance" },
  { value: "24/7", label: "accès libre · 48h de garde" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Combien de temps mon colis reste-t-il dans le casier ?",
    answer:
      "48h incluses dans le tarif, avec des rappels automatiques avant la fin du délai. Au-delà : prolongation payante ou annulation remboursée.",
  },
  {
    question: "Mon colis est-il en sécurité ?",
    answer:
      "Oui. Casier fermé par RFID + serrure à solénoïde, sous vidéosurveillance continue. Aucune intervention humaine.",
  },
  {
    question: "Comment payer ?",
    answer:
      "À la réservation, jamais à la collecte : par carte VISA ou Mobile Money — depuis le site, l'app ou WhatsApp.",
  },
  {
    question: "Faut-il un smartphone ?",
    answer: "Non. Le service fonctionne aussi par simple SMS et WhatsApp, sans application à installer.",
  },
  {
    question: "Quelles tailles de colis sont acceptées ?",
    answer: "Trois formats : petit (documents), moyen (vêtements, électronique), grand (équipements volumineux).",
  },
];

export const contactInfo = {
  email: "info@afriboxlockers.com",
  whatsapp: "+225 07 89 44 44 41",
  whatsappHref: "https://wa.me/2250789444441",
  address: "Zone 4, Marcory, Abidjan",
  // Liens internes (relatifs) : fonctionnent en local, en preview et en prod.
  reserveHref: "/reserver",
  fullSiteHref: "/",
};
