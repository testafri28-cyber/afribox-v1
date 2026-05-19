'use client'

import Link from 'next/link'
import { Twitter, Linkedin, Instagram, Box } from 'lucide-react'
import { footerLinks } from '@/lib/constants'

const socials = [
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Instagram, label: 'Instagram' },
]

const legalLinks = ['Mentions légales', 'Confidentialité', 'Conditions']

export default function Footer() {
  return (
    <footer style={{ background: '#222422' }}>
      <div className="max-w-container mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Colonne gauche — span 2 */}
          <div className="lg:col-span-2">
            {/* Logo bloc */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#2E302E] border border-[#3A3C3A] flex items-center justify-center">
                <Box className="text-green-primary" size={22} />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-lg leading-tight">
                  Afribox
                </p>
                <p className="font-mono text-[10px] tracking-widest text-green-primary">
                  SMART LOCKER NETWORK
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-sm text-[#9CA3A0] leading-relaxed max-w-xs mb-8">
              Casiers connectés intelligents pour particuliers, opérateurs et villes.
              Une infrastructure logistique pensée pour l&apos;avenir.
            </p>

            {/* Newsletter */}
            <p className="font-mono text-[11px] tracking-widest text-[#6B7280] uppercase mb-3">
              Restez informé
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-1 bg-[#2E302E] border border-[#3A3C3A] rounded-full p-1 max-w-sm"
            >
              <input
                type="email"
                placeholder="vous@email.com"
                className="flex-1 bg-transparent text-white text-sm px-4 outline-none placeholder:text-[#6B7280] font-body"
              />
              <button
                type="submit"
                className="bg-green-primary text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-green-dark transition font-body"
              >
                S&apos;abonner →
              </button>
            </form>
          </div>

          {/* Colonnes liens — droite */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-3">
            <FooterColumn title="Produit" links={footerLinks.product} />
            <FooterColumn
              title="Société"
              links={footerLinks.company.concat([])}
            />
            <FooterColumn title="Ressources" links={footerLinks.resources} />

            {/* Colonne Suivre */}
            <div>
              <p className="font-mono text-[11px] tracking-widest text-[#6B7280] uppercase mb-4">
                Suivre
              </p>
              <div className="flex flex-row md:flex-col gap-2">
                {socials.map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-[#2E302E] border border-[#3A3C3A] flex items-center justify-center text-[#9CA3A0] hover:bg-[#3A3C3A] hover:border-green-primary hover:text-white transition"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre copyright avec filigrane */}
      <div className="relative border-t border-[#3A3C3A] overflow-hidden">
        {/* Filigrane */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span
            className="font-heading font-bold whitespace-nowrap"
            style={{
              fontSize: 'clamp(80px, 12vw, 160px)',
              color: 'rgba(255,255,255,0.03)',
              lineHeight: 1,
            }}
          >
            Afribox
          </span>
        </div>
        <div className="relative z-10 max-w-container mx-auto px-6 md:px-10 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="font-body text-sm text-[#6B7280]">
            © 2026 Afribox. Tous droits réservés.
          </p>
          <div className="flex gap-4 md:gap-6 flex-wrap">
            {legalLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="font-body text-sm text-[#6B7280] hover:text-white transition"
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

type Link = { label: string; href: string }
function FooterColumn({ title, links }: { title: string; links: Link[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-widest text-[#6B7280] uppercase mb-4">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-body text-sm text-[#D1D5DB] hover:text-white transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
