import Link from "next/link";
import { contactInfo } from "@/lib/afribox-data";

export default function MobileFooter() {
  return (
    <footer className="px-4 pb-5 pt-6 text-center">
      <div className="mb-1 font-heading text-[15px] font-bold text-brand-gray">Afribox</div>
      <p className="mt-1.5 text-[11.5px] text-brand-sub">AFRIBOX SARL · © 2026</p>
      <p className="mt-1.5 text-[11.5px] text-brand-sub">Casiers intelligents pour la livraison en Afrique</p>

      {/*
        Si la version desktop vit sur une autre route (ex: "/"), remplacez ce lien externe
        par un <Link href="/"> interne. En l'état il pointe vers le site en production.
      */}
      <Link
        href={contactInfo.fullSiteHref}
        className="mt-[18px] inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-white px-4 py-2 text-[12.5px] font-semibold text-green-dark"
      >
        Voir le site complet
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M7 17 17 7M9 7h8v8" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </footer>
  );
}
