import { aboutMission, statStrip, lockerLocations } from "@/lib/afribox-data";

// Fiche d'identité : des faits vérifiables plutôt que des valeurs abstraites.
// C'est ce qu'on attend d'un « À propos » — qui est derrière le service.
const identite = [
  { cle: "Société", valeur: "AFRIBOX SARL" },
  { cle: "Activité", valeur: "Logistique urbaine et last mile" },
  { cle: "Siège", valeur: "Zone 4, Marcory — Abidjan" },
  { cle: "Réseau", valeur: `Phase pilote · ${lockerLocations.length} sites` },
];

export default function MobileAbout() {
  return (
    <section className="border-t border-brand-border px-4 py-10">
      <div className="mx-auto mb-7 w-full max-w-[340px] text-center">
        <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">
          À propos
        </p>
        <h2 className="mb-4 font-heading text-2xl font-bold leading-tight text-brand-gray">
          Construire l&apos;infrastructure logistique de demain.
        </h2>
        <p className="text-[15px] leading-relaxed text-brand-sub">{aboutMission}</p>
      </div>

      <dl className="mb-7 overflow-hidden rounded-2xl border border-brand-border bg-brand-white">
        {identite.map((ligne, i) => (
          <div
            key={ligne.cle}
            className={`flex items-baseline justify-between gap-4 px-4 py-3 ${
              i < identite.length - 1 ? "border-b border-brand-border" : ""
            }`}
          >
            <dt className="flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-brand-mid">
              {ligne.cle}
            </dt>
            <dd className="text-right text-[13px] font-medium leading-snug text-brand-gray">
              {ligne.valeur}
            </dd>
          </div>
        ))}
      </dl>

      <h3 className="mb-2.5 text-center font-heading text-[13px] font-bold text-brand-gray">
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
