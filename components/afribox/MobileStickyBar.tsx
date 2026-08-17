import { contactInfo } from "@/lib/afribox-data";

export default function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] mx-auto flex max-w-[430px] gap-2.5 border-t border-brand-border bg-brand-off/95 px-4 pt-3 backdrop-blur-lg"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={contactInfo.whatsappHref}
        aria-label="WhatsApp"
        className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl border border-brand-border bg-brand-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.6 6.3A8.9 8.9 0 0 0 3.2 16.9L2 22l5.3-1.4a8.9 8.9 0 0 0 12.9-7.9c0-2.4-.9-4.6-2.6-6.4z"
            stroke="#1B5E20"
            strokeWidth="1.6"
          />
        </svg>
      </a>
      <a href={contactInfo.reserveHref} className="flex-1">
        <div className="flex items-center justify-center rounded-xl bg-green-dark py-3.5 text-[14.5px] font-bold text-white">
          Réserver un locker
        </div>
      </a>
    </div>
  );
}
