import { lockerLocations } from "@/lib/afribox-data";

export default function MobileLockers() {
  return (
    <section className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">Réseau pilote</p>
      <h2 className="mb-2.5 font-heading text-2xl font-bold leading-tight text-brand-gray">
        Nos premiers casiers arrivent à Abidjan.
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-brand-sub">
        Réseau pilote à Abidjan — et bientôt Bouaké. Pré-réservez : vous serez notifié dès l&apos;ouverture du
        casier.
      </p>

      <div className="flex flex-col gap-2.5">
        {lockerLocations.map((loc) => (
          <div
            key={loc.name}
            className="flex items-center gap-3 rounded-2xl border border-brand-border bg-brand-white px-3.5 py-3.5"
          >
            <div className="grid h-[38px] w-[38px] flex-shrink-0 place-items-center rounded-xl border border-brand-border bg-brand-border">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z"
                  stroke="#1B5E20"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="9" r="2.4" stroke="#1B5E20" strokeWidth="1.6" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14.5px] font-semibold text-brand-gray">{loc.name}</h3>
              <p className="text-xs text-brand-sub">{loc.area}</p>
            </div>
            <span className="whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
              {loc.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
