import { pricingTiers } from "@/lib/afribox-data";

export default function MobilePricing() {
  return (
    <section className="border-t border-brand-border py-9">
      <div className="px-4">
        <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">Tarifs</p>
        <h2 className="mb-2.5 font-heading text-2xl font-bold leading-tight text-brand-gray">
          Trois tailles. Trois prix. C&apos;est tout.
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-brand-sub">
          Tarif unique par dépôt de 48h. Comptes marchand et entreprise : remises sur volume.
        </p>
      </div>

      <div className="flex snap-x gap-3 overflow-x-auto px-4 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`min-w-[150px] snap-start rounded-2xl border p-[18px] ${
              tier.popular
                ? "border-green-dark/35 bg-gradient-to-br from-green-dark/10 to-white"
                : "border-brand-border bg-brand-white"
            }`}
          >
            <div className="mb-2.5 text-[10.5px] text-brand-sub">{tier.tag}</div>
            <h3 className="mb-1 font-heading text-[17px] font-bold text-brand-gray">{tier.name}</h3>
            <div className="mb-3.5 text-xs text-brand-sub">{tier.desc}</div>
            <div className="font-mono text-[22px] font-semibold text-brand-gray">
              {tier.amount} <span className="font-body text-xs font-normal text-brand-sub">FCFA/48h</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
