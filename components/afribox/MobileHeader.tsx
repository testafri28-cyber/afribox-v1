import Image from "next/image";
import { contactInfo } from "@/lib/afribox-data";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-brand-border bg-brand-off/90 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2 font-heading text-lg font-bold text-brand-gray">
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center overflow-hidden rounded-full border border-brand-border bg-green-bg">
          {/*
            Remplacez ce SVG par la vraie mascotte dès que le fichier est dans /public :
            <Image src="/mascotte.webp" alt="Locky, mascotte Afribox" width={36} height={36} className="object-cover" />
          */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="8" width="16" height="12" rx="2.5" stroke="#1B5E20" strokeWidth="1.7" />
            <path d="M4 12h16" stroke="#1B5E20" strokeWidth="1.7" />
            <circle cx="9" cy="15.5" r="0.9" fill="#1B5E20" />
            <circle cx="15" cy="15.5" r="0.9" fill="#1B5E20" />
            <path d="M9 5.5c0-1.5 1.3-2.5 3-2.5s3 1 3 2.5" stroke="#1B5E20" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
        Afribox
      </div>
      <a
        href={contactInfo.whatsappHref}
        aria-label="WhatsApp"
        className="grid h-9 w-9 place-items-center rounded-full border border-brand-border bg-brand-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.6 6.3A8.9 8.9 0 0 0 3.2 16.9L2 22l5.3-1.4a8.9 8.9 0 0 0 12.9-7.9c0-2.4-.9-4.6-2.6-6.4z"
            stroke="#1B5E20"
            strokeWidth="1.6"
          />
        </svg>
      </a>
    </header>
  );
}
