import { aboutMission, aboutValues, statStrip } from "@/lib/afribox-data";

export default function MobileAbout() {
  return (
    <section id="a-propos" className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">À propos</p>
      <h2 className="mb-2.5 font-heading text-2xl font-bold leading-tight text-brand-gray">
        Construire l&apos;infrastructure logistique de demain.
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-brand-sub">{aboutMission}</p>

      {/* Mêmes valeurs que le desktop, en cartes empilées : c'est la structure
          des autres sections mobiles (casiers, tarifs, application). */}
      <div className="flex flex-col gap-2.5">
        {aboutValues.map((valeur) => (
          <div
            key={valeur.title}
            className="rounded-2xl border border-brand-border bg-brand-white px-3.5 py-3.5"
          >
            <h3 className="text-[14.5px] font-semibold text-brand-gray">{valeur.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-brand-sub">{valeur.description}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-2.5 mt-6 font-heading text-[14.5px] font-semibold text-brand-gray">
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
