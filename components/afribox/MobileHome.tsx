import MobileHowItWorks from "./MobileHowItWorks";
import MobilePricing from "./MobilePricing";
import MobileLockers from "./MobileLockers";
import MobileApp from "./MobileApp";
import MobileAbout from "./MobileAbout";
import MobileFAQ from "./MobileFAQ";
import MobileContact from "./MobileContact";
import MobileReserveBar from "./MobileReserveBar";

// Sections de contenu en version mobile — affichées sous md: (< 768px).
// Le hero, le header, le footer et le chat Locky sont ceux du site : ils sont
// rendus une seule fois par la page, partagés avec le desktop.
export default function MobileHome() {
  return (
    <div className="bg-brand-off font-body text-brand-gray">
      <MobileHowItWorks />
      <MobilePricing />
      <MobileLockers />
      <MobileApp />
      <MobileAbout />
      <MobileFAQ />
      <MobileContact />

      {/* Barre d'action permanente + remontée de la bulle Locky au-dessus
          d'elle (accueil mobile uniquement : /reserver garde sa position). */}
      <style>{`@media (max-width:767px){[data-locky-fab]{bottom:5.75rem}}`}</style>
      <MobileReserveBar />
    </div>
  );
}
