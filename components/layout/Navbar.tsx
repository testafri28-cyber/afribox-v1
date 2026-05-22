'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Services',       href: '/#services' },
  { label: 'Fonctionnement', href: '/#fonctionnement' },
  { label: "L'app",          href: '/#app-mobile' },
  { label: 'À propos',       href: '/#a-propos' },
  { label: 'Contact',        href: '/#contact' },
]

const sectionIds = navLinks.map((l) => l.href.replace('/#', ''))

function useActiveSection(): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        // Zone active : entre 64px (navbar) et le milieu de l'écran
        { rootMargin: '-64px 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return active
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname  = usePathname()
  const activeId  = useActiveSection()

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
            {navLinks.map((link) => {
              const id       = link.href.replace('/#', '')
              const isActive = activeId === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 font-body text-sm transition-colors duration-150 ${
                    isActive ? 'text-green-primary font-medium' : 'text-brand-sub hover:text-brand-gray'
                  }`}
                >
                  {link.label}

                  {/* Indicateur underline animé */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-green-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>
        )}

        {/* CTAs — desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/connexion" variant="ghost" size="sm">
            Se connecter
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
              className="fixed top-0 right-0 bottom-0 w-[90vw] max-w-[280px] bg-white z-50 lg:hidden flex flex-col"
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
                {navLinks.map((link) => {
                  const id       = link.href.replace('/#', '')
                  const isActive = activeId === id
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 font-body text-lg py-3 border-b border-brand-border transition-colors ${
                        isActive ? 'text-green-primary font-medium' : 'text-brand-gray hover:text-green-primary'
                      }`}
                    >
                      {/* Point indicateur mobile */}
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                        isActive ? 'bg-green-primary' : 'bg-transparent'
                      }`} />
                      {link.label}
                    </a>
                  )
                })}
              </nav>

              <div className="flex flex-col gap-3 px-6 pb-8">
                <Button href="/connexion" variant="ghost" fullWidth onClick={() => setOpen(false)}>
                  Se connecter
                </Button>
                <Button href="/reserver" variant="primary" fullWidth onClick={() => setOpen(false)}>
                  Réserver un locker
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
