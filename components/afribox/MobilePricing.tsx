import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMobileData } from "@/lib/afribox-data";
import { getDictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/i18n/config";

export default function MobilePricing({ locale }: { locale: Locale }) {
  const { pricingTiers } = getMobileData(locale);
  const d = getDictionary(locale);
  return (
    <section id="tarifs" className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">{d.ui.pricing.label}</p>
      <h2 className="mb-2.5 font-heading text-2xl font-bold leading-tight text-brand-gray">
        {d.ui.pricing.title}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-brand-sub">
        {d.ui.mobileUi.pricingLede}
      </p>

      {/* Empilé plutôt qu'en carrousel : les trois offres sont visibles d'un
          coup d'œil, et chacune mène directement à la réservation. */}
      <div className="flex flex-col gap-3">
        {pricingTiers.map((tier) => (
          <Link
            key={tier.name}
            href={localePath(locale, "/reserver")}
            className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors active:bg-green-bg ${
              tier.popular
                ? "border-green-dark/35 bg-gradient-to-br from-green-dark/[0.07] to-white"
                : "border-brand-border bg-brand-white"
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="font-heading text-[16px] font-bold text-brand-gray">{tier.name}</h3>
                {tier.popular && (
                  <span className="rounded-full bg-green-dark px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-white">
                    {d.ui.mobileUi.popularBadge}
                  </span>
                )}
              </div>
              <p className="text-xs leading-snug text-brand-sub">
                {tier.tag.split(" · ")[0]} · {tier.desc}
              </p>
              {/* Dimensions et charge admise, comme sur le desktop. */}
              <p className="mt-1 font-mono text-[10.5px] leading-snug text-brand-mid">
                {tier.dims} · {tier.weight}
              </p>
            </div>

            {/* Prix insécable : « 1 250 » et son unité ne se coupent plus. */}
            <div className="flex-shrink-0 text-right">
              <div className="whitespace-nowrap font-mono text-[19px] font-semibold leading-none text-brand-gray">
                {tier.amount}
              </div>
              <div className="mt-0.5 whitespace-nowrap text-[10.5px] text-brand-sub">FCFA / 48h</div>
            </div>

            <ArrowRight size={16} className="flex-shrink-0 text-green-dark" aria-hidden />
          </Link>
        ))}
      </div>

      <Link
        href={localePath(locale, "/reserver")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-dark py-3.5 text-[15px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(27,94,32,0.45)] active:scale-[0.99]"
      >
        {d.ui.nav.book}
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
