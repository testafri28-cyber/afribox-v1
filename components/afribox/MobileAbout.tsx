import Image from "next/image";
import { aboutMission, statStrip } from "@/lib/afribox-data";

export default function MobileAbout() {
  return (
    <section className="border-t border-brand-border px-4 py-10">
      <p className="mb-5 text-center text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">
        À propos
      </p>

      {/* Locky porte le discours : même langage visuel que sa bulle de chat
          (dégradé vert, pointe vers la mascotte). Le texte reste celui de
          constants.ts — une seule source pour les deux versions du site. */}
      <div
        className="relative rounded-3xl rounded-bl-md px-5 py-4 text-white shadow-[0_18px_40px_-20px_rgba(11,61,27,0.55)]"
        style={{ backgroundImage: "linear-gradient(135deg, #0B3D1B 0%, #1B5E20 100%)" }}
      >
        <p className="font-body text-[14.5px] leading-relaxed">
          «&nbsp;{aboutMission}&nbsp;»
        </p>
        <span
          aria-hidden
          className="absolute -bottom-1.5 left-9 h-4 w-4 rotate-45 rounded-[3px]"
          style={{ backgroundColor: "#1B5E20" }}
        />
      </div>

      <div className="mt-2 flex items-end gap-3">
        <Image
          src="/locky.webp"
          alt="Locky, le concierge Afribox"
          width={146}
          height={320}
          className="h-[108px] w-auto flex-shrink-0 drop-shadow-[0_10px_18px_rgba(11,61,27,0.28)]"
        />
        <div className="pb-4">
          <p className="font-heading text-[15px] font-bold leading-tight text-brand-gray">Locky</p>
          <p className="text-xs text-brand-sub">Votre concierge Afribox</p>
          <p className="mt-2 text-[11px] leading-snug text-brand-mid">
            AFRIBOX SARL — société ivoirienne, siège à Marcory, Abidjan.
          </p>
        </div>
      </div>

      <h3 className="mb-2.5 mt-7 text-center font-heading text-[13px] font-bold text-brand-gray">
        Le casier, en bref.
      </h3>
      {/* 3 colonnes : la bande compte 6 caractéristiques, en 4 colonnes la
          dernière ligne restait bancale. */}
      <div className="grid grid-cols-3 gap-x-2 gap-y-3.5 rounded-2xl border border-brand-border bg-green-bg px-3 py-4">
        {statStrip.map((stat) => (
          <div key={stat.label} className="text-center">
            <b className="block font-heading text-[17px] text-green-dark">{stat.value}</b>
            <span className="mt-0.5 block text-[9.5px] leading-tight text-brand-sub">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
