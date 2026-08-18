import MobileHowItWorks from "./MobileHowItWorks";
import MobilePricing from "./MobilePricing";
import MobileLockers from "./MobileLockers";
import MobileAbout from "./MobileAbout";
import MobileFAQ from "./MobileFAQ";
import MobileContact from "./MobileContact";

// Sections de contenu en version mobile — affichées sous md: (< 768px).
// Le hero, le header, le footer et le chat Locky sont ceux du site : ils sont
// rendus une seule fois par la page, partagés avec le desktop.
export default function MobileHome() {
  return (
    <div className="bg-brand-off font-body text-brand-gray">
      <MobileHowItWorks />
      <MobilePricing />
      <MobileLockers />
      <MobileAbout />
      <MobileFAQ />
      <MobileContact />
    </div>
  );
}
