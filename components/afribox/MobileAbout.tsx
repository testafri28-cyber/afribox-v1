import { aboutMission, aboutValues, statStrip } from "@/lib/afribox-data";

export default function MobileAbout() {
  return (
    <section className="border-t border-brand-border px-4 py-10">
      <div className="mx-auto mb-8 w-full max-w-[340px] text-center">
        <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">
          À propos
        </p>
        <h2 className="mb-4 font-heading text-2xl font-bold leading-tight text-brand-gray">
          Construire l&apos;infrastructure logistique de demain.
        </h2>
        <p className="text-[15px] leading-relaxed text-brand-sub">{aboutMission}</p>
      </div>

      {/* Les mêmes valeurs que sur le desktop, en liste simple séparée de
          filets : ni cartes, ni icônes — celles-ci ne correspondaient pas à
          leur sens et alourdissaient la section. */}
      <dl className="mb-8 divide-y divide-brand-border border-y border-brand-border">
        {aboutValues.map((valeur) => (
          <div key={valeur.title} className="py-4">
            <dt className="font-heading text-[15px] font-bold leading-tight text-brand-gray">
              {valeur.title}
            </dt>
            <dd className="mt-1 text-[13px] leading-relaxed text-brand-sub">
              {valeur.description}
            </dd>
          </div>
        ))}
      </dl>

      <h3 className="mb-3 text-center font-heading text-[13px] font-bold text-brand-gray">
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
