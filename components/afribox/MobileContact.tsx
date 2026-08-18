import { contactInfo } from "@/lib/afribox-data";

export default function MobileContact() {
  const rows = [
    {
      label: "Email",
      value: contactInfo.email,
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
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.6 6.3A8.9 8.9 0 0 0 3.2 16.9L2 22l5.3-1.4a8.9 8.9 0 0 0 12.9-7.9c0-2.4-.9-4.6-2.6-6.4z"
            stroke="#1B5E20"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Siège",
      value: contactInfo.address,
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
          <div
            key={row.label}
            className={`flex items-center gap-3 py-2.5 ${i < rows.length - 1 ? "border-b border-brand-border" : ""}`}
          >
            <div className="grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-lg bg-brand-border">
              {row.icon}
            </div>
            <div>
              <p className="text-[11px] text-brand-sub">{row.label}</p>
              <p className="text-[13.5px] font-medium text-brand-gray">{row.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
