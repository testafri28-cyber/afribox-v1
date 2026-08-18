import { aboutMission, aboutValues, statStrip } from "@/lib/afribox-data";
import type { ReactElement } from "react";

const icons: Record<string, ReactElement> = {
  "Fiabilité": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 12.5l2 2 4-4.5" stroke="#1B5E20" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="8.2" stroke="#1B5E20" strokeWidth="1.6" />
    </svg>
  ),
  "Simplicité": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 12h16M4 12l5-5M4 12l5 5" stroke="#1B5E20" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Innovation qui sert": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4z" stroke="#1B5E20" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  "Impact concret": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"
        stroke="#1B5E20"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function MobileAbout() {
  return (
    <section className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">À propos</p>
      <h2 className="mb-2.5 font-heading text-2xl font-bold leading-tight text-brand-gray">
        Construire l&apos;infrastructure logistique de demain.
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-brand-sub">{aboutMission}</p>

      <div className="mb-5 grid grid-cols-2 gap-2.5">
        {aboutValues.map((value) => (
          <div key={value.title} className="rounded-2xl border border-brand-border bg-brand-white p-3.5">
            <div className="mb-2.5 grid h-8 w-8 place-items-center rounded-lg border border-brand-border bg-brand-border">
              {icons[value.title]}
            </div>
            <h3 className="mb-1 text-[13.5px] font-semibold text-brand-gray">{value.title}</h3>
            <p className="text-[11.5px] leading-snug text-brand-sub">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 rounded-2xl border border-brand-border bg-green-bg px-2 py-3.5">
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
