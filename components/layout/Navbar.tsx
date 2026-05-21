'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Services',       href: '/#services' },
  { label: 'Fonctionnement', href: '/#fonctionnement' },
  { label: "L'app",          href: '/#app-mobile' },
  { label: 'À propos',       href: '/#a-propos' },
  { label: 'Contact',        href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isHome = pathname === '/'

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled
        ? 'bg-white/90 backdrop-blur border-b border-brand-border shadow-sm'
        : 'bg-white border-b border-brand-border'
    }`}>
      <div className="max-w-container mx-auto px-4 md:px-10 lg:px-20 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col" aria-label="Afribox">
          <span className="font-heading font-bold text-xl text-green-dark leading-none">Afribox</span>
          <span className="hidden sm:block font-mono text-[9px] tracking-widest text-green-primary uppercase mt-0.5">
            Smart Locker Network
          </span>
        </Link>

        {/* Liens centre — desktop */}
        {isHome && (
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-brand-sub hover:text-brand-gray transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* CTAs — desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/#app-mobile" variant="ghost" size="sm">
            Télécharger l&apos;appli
          </Button>
          <Button href="/reserver" variant="primary" size="sm">
            Réserver un locker
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        {/* Hamburger — mobile */}
        <button
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 -mr-2 text-brand-gray"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 lg:hidden flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-brand-border">
                <span className="font-heading font-bold text-xl text-green-dark">Afribox</span>
                <button aria-label="Fermer" onClick={() => setOpen(false)} className="p-2 -mr-2 text-brand-gray">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-6 flex-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-body text-lg text-brand-gray hover:text-green-primary py-3 border-b border-brand-border transition"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 px-6 pb-8">
                <Button href="/#app-mobile" variant="ghost" fullWidth onClick={() => setOpen(false)}>
                  Télécharger l&apos;appli
                </Button>
                <Button href="/reserver" variant="primary" fullWidth onClick={() => setOpen(false)}>
                  Réserver un locker
                  <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button href="#download" variant="secondary" fullWidth onClick={() => setOpen(false)}>
                  <Download size={16} className="mr-1" />
                  Télécharger l&apos;appli
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
