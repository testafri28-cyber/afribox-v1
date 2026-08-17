import MobileHeader from "./MobileHeader";
import MobileHero from "./MobileHero";
import MobileHowItWorks from "./MobileHowItWorks";
import MobilePricing from "./MobilePricing";
import MobileLockers from "./MobileLockers";
import MobileAbout from "./MobileAbout";
import MobileFAQ from "./MobileFAQ";
import MobileContact from "./MobileContact";
import MobileFooter from "./MobileFooter";
import MobileStickyBar from "./MobileStickyBar";

// Version mobile complète d'Afribox — pensée pour être affichée sous md: (< 768px)
// en complément de votre composant desktop existant. Voir README.md pour l'intégration.
export default function MobileHome() {
  return (
    <div className="relative mx-auto max-w-[430px] bg-brand-off pb-24 font-body text-brand-gray">
      <MobileHeader />
      <MobileHero />
      <MobileHowItWorks />
      <MobilePricing />
      <MobileLockers />
      <MobileAbout />
      <MobileFAQ />
      <MobileContact />
      <MobileFooter />
      <MobileStickyBar />
    </div>
  );
}
