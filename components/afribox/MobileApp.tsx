import { appFeatures, contact } from "@/lib/constants";

// Badges de téléchargement — mêmes destinations que la section desktop
// (« # » tant que l'application n'est pas publiée sur les stores).
const stores = [
  { surtitre: "Télécharger sur", nom: "App Store", href: "#", glyphe: <AppleGlyph /> },
  { surtitre: "Disponible sur", nom: "Google Play", href: "#", glyphe: <PlayGlyph /> },
];

export default function MobileApp() {
  return (
    <section id="app-mobile" className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">
        L&apos;application
      </p>
      <h2 className="mb-2.5 font-heading text-2xl font-bold leading-tight text-brand-gray">
        Vos lockers dans votre poche.
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-brand-sub">
        Gérez vos envois, suivez vos colis et récupérez vos codes directement depuis l&apos;appli Afribox.
      </p>

      <ul className="mb-6 space-y-3">
        {appFeatures.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-green-bg">
              <Icon size={16} className="text-green-primary" />
            </span>
            <span className="text-sm text-brand-gray">{label}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2.5">
        {stores.map((s) => (
          <a
            key={s.nom}
            href={s.href}
            className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-brand-gray px-4 py-3 text-white active:scale-[0.99]"
          >
            {s.glyphe}
            <span className="text-left leading-none">
              <span className="block text-[10px] text-white/70">{s.surtitre}</span>
              <span className="mt-0.5 block font-heading text-sm font-semibold">{s.nom}</span>
            </span>
          </a>
        ))}
      </div>

      {/* L'appli n'est pas encore publiée : WhatsApp est le canal disponible
          dès aujourd'hui, on ne laisse donc pas l'utilisateur sans solution. */}
      <p className="mt-4 text-center text-xs leading-relaxed text-brand-sub">
        Application bientôt disponible. En attendant, réservez en quelques messages sur{" "}
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-green-dark underline underline-offset-2"
        >
          WhatsApp
        </a>
        .
      </p>
    </section>
  );
}

function AppleGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.6zM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 0 2.1-.5 2.7-1.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.6 2.4c-.3.3-.5.8-.5 1.4v16.4c0 .6.2 1.1.5 1.4l.1.1 9.2-9.2v-.2L3.6 2.4z" opacity=".9" />
      <path d="m16 15.3-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.8 2z" />
      <path d="M16.1 15.2 12.9 12l-9.3 9.3c.3.4.9.4 1.5.1l11-6.2" opacity=".8" />
      <path d="M16.1 8.8 5.1 2.6c-.6-.3-1.2-.3-1.5.1L12.9 12l3.2-3.2z" opacity=".7" />
    </svg>
  );
}
