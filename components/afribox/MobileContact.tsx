import Image from "next/image";
import { contactInfo } from "@/lib/afribox-data";

export default function MobileContact() {
  // Chaque ligne est actionnable : sur mobile, on tape pour écrire, discuter ou
  // ouvrir l'itinéraire — plutôt que de recopier une adresse à la main.
  const rows = [
    {
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16v12H4z" stroke="#1B5E20" strokeWidth="1.5" />
          <path d="m4 7 8 6 8-6" stroke="#1B5E20" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      value: contactInfo.whatsapp,
      href: contactInfo.whatsappHref,
      icon: (
        <Image src="/images/whatsapp.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
      ),
    },
    {
      label: "Siège",
      value: contactInfo.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" stroke="#1B5E20" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-t border-brand-border px-4 py-9">
      <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-green-dark">Contact</p>
      <h2 className="mb-6 font-heading text-2xl font-bold leading-tight text-brand-gray">
        Une question ? On répond vite.
      </h2>

      <div className="rounded-2xl border border-brand-border bg-brand-white p-5">
        {rows.map((row, i) => (
          <a
            key={row.label}
            href={row.href}
            target={row.href.startsWith("http") ? "_blank" : undefined}
            rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`flex min-h-[52px] items-center gap-3 py-2.5 transition-colors active:bg-green-bg ${
              i < rows.length - 1 ? "border-b border-brand-border" : ""
            }`}
          >
            <div className="grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-lg bg-brand-border">
              {row.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-brand-sub">{row.label}</p>
              <p className="text-[13.5px] font-medium text-brand-gray">{row.value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
