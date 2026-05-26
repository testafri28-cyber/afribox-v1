'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Services',       id: 'services' },
  { label: 'Fonctionnement', id: 'fonctionnement' },
  { label: "L'app",          id: 'app-mobile' },
  { label: 'À propos',       id: 'a-propos' },
  { label: 'Contact',        id: 'contact' },
]

/* Scroll to a section without putting a hash in the URL.
   This prevents the browser from trying to auto-scroll to an anchor
   on the next page load. */
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 64 // 64px navbar offset
  window.scrollTo({ top, behavior: 'smooth' })
}

function useActiveSection(): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = navLinks.map((l) => l.id)
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
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
  const pathname = usePathname()
  const activeId = useActiveSection()

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
    <header className="sticky top-0 z-50 pt-3 md:pt-4 pointer-events-none">
      <div className="max-w-container mx-auto px-4 md:px-10 lg:px-20">
        <div className={`pointer-events-auto h-14 md:h-16 px-4 md:px-6 flex items-center justify-between rounded-full border transition-all duration-200 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-brand-border shadow-lg shadow-black/5'
            : 'bg-white/95 backdrop-blur border-brand-border shadow-md shadow-black/5'
        }`}>

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
              const isActive = activeId === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative pb-1 font-body text-sm transition-colors duration-150 bg-transparent border-none cursor-pointer ${
                    isActive ? 'text-green-primary font-medium' : 'text-brand-sub hover:text-brand-gray'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-green-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
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
                  const isActive = activeId === link.id
                  return (
                    <button
                      key={link.id}
                      onClick={() => { scrollTo(link.id); setOpen(false) }}
                      className={`flex items-center gap-3 font-body text-lg py-3 border-b border-brand-border transition-colors text-left bg-transparent border-x-0 border-t-0 cursor-pointer w-full ${
                        isActive ? 'text-green-primary font-medium' : 'text-brand-gray hover:text-green-primary'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                        isActive ? 'bg-green-primary' : 'bg-transparent'
                      }`} />
                      {link.label}
                    </button>
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
