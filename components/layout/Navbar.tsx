'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Nos services', href: '/nos-services' },
  { label: 'Comment ça marche', href: '/comment-ca-marche' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur border-b border-brand-border shadow-sm'
          : 'bg-white border-b border-brand-border'
      }`}
    >
      <div className="max-w-container mx-auto px-4 md:px-10 lg:px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Afribox">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Afribox" className="h-10 w-auto" />
        </Link>

        {/* Liens centre — desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-body text-sm transition group ${
                  active ? 'text-green-primary font-medium' : 'text-brand-gray hover:text-green-primary'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-green-primary rounded-full transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* CTAs — desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Button href="#download" variant="ghost" size="sm">
            <Download size={14} className="mr-1.5" />
            Télécharger l&apos;appli
          </Button>
          <Button href="/reserver" variant="primary" size="sm">
            Réserver un locker
            <ArrowRight size={16} className="ml-1.5" />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-brand-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="Afribox" className="h-10 w-auto" />
                <button
                  aria-label="Fermer le menu"
                  onClick={() => setOpen(false)}
                  className="p-2 -mr-2 text-brand-gray"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-6 flex-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between font-body text-lg py-3 border-b border-brand-border transition ${
                        active
                          ? 'text-green-primary font-medium'
                          : 'text-brand-gray hover:text-green-primary'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-primary" />
                      )}
                    </Link>
                  )
                })}
              </nav>
              <div className="flex flex-col gap-3 px-6 pb-8">
                <Button
                  href="#download"
                  variant="ghost"
                  fullWidth
                  onClick={() => setOpen(false)}
                >
                  <Download size={16} className="mr-1.5" />
                  Télécharger l&apos;application
                </Button>
                <Button
                  href="/reserver"
                  variant="primary"
                  fullWidth
                  onClick={() => setOpen(false)}
                >
                  Réserver un locker
                  <ArrowRight size={16} className="ml-1.5" />
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
