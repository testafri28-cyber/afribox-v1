import { contactInfo } from "@/lib/afribox-data";

export default function MobileHero() {
  const lockerCells = Array.from({ length: 36 });
  const litIndex = 14;

  return (
    <div className="relative overflow-hidden px-4 pb-8 pt-8">
      <div
        className="pointer-events-none absolute inset-0 grid grid-cols-6 gap-1 px-1 opacity-50"
        style={{
          gridAutoRows: "28px",
          maskImage: "linear-gradient(to bottom, black, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 92%)",
        }}
        aria-hidden
      >
        {lockerCells.map((_, i) => (
          <div
            key={i}
            className={`rounded border ${
              i === litIndex
                ? "border-green-dark/35 bg-green-dark/10"
                : "border-brand-border bg-brand-border"
            }`}
          />
        ))}
      </div>

      <div className="relative mb-4 inline-flex items-center gap-1.5 rounded-full border border-green-dark/25 bg-green-dark/5 px-2.5 py-1 text-xs font-semibold text-green-dark">
        👋 Je suis Locky, votre concierge Afribox
      </div>

      <h1 className="relative mb-3 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-brand-gray">
        Afribox, la livraison <span className="text-green-dark">no stress</span>.
      </h1>

      <p className="relative mb-6 max-w-[34ch] text-[15.5px] leading-relaxed text-brand-sub">
        Des casiers intelligents accessibles à toute heure. Pas de rendez-vous, pas d&apos;attente — juste votre
        code et votre colis.
      </p>

      <a
        href={contactInfo.reserveHref}
        className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-green-dark py-4 text-base font-bold text-white shadow-[0_8px_24px_-6px_rgba(27,94,32,0.35)]"
      >
        Réserver un locker
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </a>
      <a
        href="#comment-ca-marche"
        className="relative mt-2.5 flex w-full items-center justify-center rounded-2xl border border-brand-border py-3.5 text-[14.5px] font-semibold text-brand-gray"
      >
        Voir comment ça marche
      </a>

      <div className="relative mt-5 flex gap-2.5">
        {[
          { value: "24/7", label: "Accès libre" },
          { value: "60s", label: "Dépôt colis" },
          { value: "500F", label: "Dès ce prix" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex-1 rounded-xl border border-brand-border bg-brand-white px-2 py-2.5 text-center"
          >
            <b className="block font-heading text-[15px] text-green-dark">{stat.value}</b>
            <span className="text-[10.5px] text-brand-sub">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
