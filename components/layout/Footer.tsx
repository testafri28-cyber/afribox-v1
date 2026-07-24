'use client'

import Link from 'next/link'
import { footerLinks, socials } from '@/lib/constants'

const legalLinks = ['Mentions légales', 'Confidentialité', 'Cookies']

export default function Footer() {
  return (
    <footer
      className="relative text-white pt-20 pb-10 overflow-hidden"
      style={{ background: '#1A1F1C' }}
    >
      {/* Motif grille fine avec masque radial en haut */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.3,
          maskImage:
            'radial-gradient(ellipse at top, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at top, black 30%, transparent 75%)',
        }}
      />

      {/* Filigrane — ancré en bas, déborde sous le footer (overflow-hidden coupe) */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 font-heading font-bold leading-none pointer-events-none select-none whitespace-nowrap"
        style={{
          bottom: '-8rem',
          fontSize: 'clamp(180px, 22vw, 280px)',
          color: 'rgba(255,255,255,0.03)',
        }}
      >
        Afribox
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Grille 12 colonnes */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 pb-14">
          {/* Logo + description + newsletter — span 5 */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white/95 ring-1 ring-white/20 flex items-center justify-center p-1.5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="Afribox"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="font-heading font-bold text-xl">Afribox</div>
                <div className="text-[9px] font-bold tracking-[0.22em] uppercase text-green-light/70">
                  Smart Locker Network
                </div>
              </div>
            </div>
            <p className="text-white/65 max-w-md leading-relaxed text-sm md:text-[15px]">
              Casiers connectés intelligents pour particuliers, opérateurs et
              villes. Une infrastructure logistique pensée pour l&apos;avenir.
            </p>

            {/* Newsletter */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 max-w-md">
              <label className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50 block mb-3">
                Restez informé
              </label>
              <div className="flex gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-green-primary transition-colors">
                <input
                  type="email"
                  placeholder="vous@email.com"
                  className="flex-1 bg-transparent px-4 py-2 text-sm placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-green-primary text-white text-sm font-semibold hover:bg-green-dark disabled:opacity-60 transition-colors flex items-center gap-1.5"
                >
                  S&apos;abonner →
                </button>
              </div>
            </form>
          </div>

          {/* Colonnes liens */}
          <FooterColumn title="Produit" links={footerLinks.produit} />
          <FooterColumn title="Société" links={footerLinks.societe} />
          <FooterColumn title="Ressources" links={footerLinks.ressources} />

          {/* Suivre — span 1 */}
          <div className="lg:col-span-1">
            <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50 mb-5">
              Suivre
            </div>
            <div className="flex flex-row lg:flex-col gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-primary border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <div>© 2026 Afribox. Tous droits réservés.</div>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="lg:col-span-2">
      <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50 mb-5">
        {title}
      </div>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-white/80 hover:text-green-primary text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
