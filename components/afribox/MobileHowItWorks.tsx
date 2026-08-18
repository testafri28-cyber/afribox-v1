export default function MobileHowItWorks() {
  return (
    <section id="comment-ca-marche" className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">
        Comment ça marche
      </p>
      <h2 className="mb-2.5 font-heading text-2xl font-bold leading-tight text-brand-gray">
        De la commande à la récupération.
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-brand-sub">
        Entièrement automatisé. Pas de coup de fil. Pas d&apos;attente.
      </p>

      <div className="flex flex-col gap-2.5">
        <div className="max-w-[84%] self-start rounded-2xl rounded-bl-md border border-brand-border bg-brand-white px-3.5 py-3 text-sm leading-snug text-brand-gray">
          <div className="mb-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-brand-sub">
            Marchand → Livreur
          </div>
          Code pour ouvrir le casier Sococé, casier M-04.
          <span className="mt-1 block font-mono text-lg font-semibold tracking-wider text-green-dark">
            842 631
          </span>
        </div>

        <div className="max-w-[84%] self-start rounded-2xl rounded-bl-md border border-brand-border bg-brand-white px-3.5 py-3 text-sm leading-snug text-brand-gray">
          <div className="mb-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-brand-sub">
            Système
          </div>
          Colis déposé. Casier refermé et sécurisé à l&apos;instant.
        </div>

        <div className="max-w-[84%] self-end rounded-2xl rounded-br-md border border-green-dark/30 bg-green-dark/5 px-3.5 py-3 text-sm leading-snug text-brand-gray">
          <div className="mb-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-brand-sub">Vous</div>
          Votre code de retrait. Colis disponible 48h.
          <span className="mt-1 block font-mono text-lg font-semibold tracking-wider text-green-dark">
            975 214
          </span>
        </div>
      </div>
    </section>
  );
}
