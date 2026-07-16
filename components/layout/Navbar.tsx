'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import { TubelightNavbar } from '@/components/ui/TubelightNavbar'

const navLinks = [
  { label: 'Services',       id: 'services',       icon: 'briefcase' as const },
  { label: 'Tarifs',         id: 'tarifs',         icon: 'creditcard' as const },
  { label: 'Fonctionnement', id: 'fonctionnement', icon: 'filetext' as const },
  { label: "L'app",          id: 'app-mobile',     icon: 'home' as const },
  { label: 'À propos',       id: 'a-propos',       icon: 'info' as const },
  { label: 'Contact',        id: 'contact',        icon: 'phone' as const },
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

/* Ligne (en px depuis le haut du viewport) sous laquelle une section est
   considérée « active » : juste sous la navbar. */
const NAV_OFFSET = 100

/* Scroll-spy déterministe : au lieu de laisser plusieurs IntersectionObserver
   se faire la course (le dernier qui déclenche gagnait, d'où le mauvais onglet),
   on calcule à chaque défilement la DERNIÈRE section dont le haut a franchi la
   ligne de la navbar. Résultat sans ambiguïté, quelle que soit la vitesse.

   `selectManually` fige le spy pendant le défilement fluide d'un clic pour que
   le surlignage ne « saute » pas vers une section simplement traversée. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('')
  const lockedUntil = useRef(0)

  useEffect(() => {
    if (!enabled) return
    const compute = () => {
      if (Date.now() < lockedUntil.current) return
      let current = ''
      for (const { id } of navLinks) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= NAV_OFFSET) current = id
      }
      // Bas de page : la dernière section ne peut pas toujours franchir la ligne
      // (contenu insuffisant en dessous). On active alors la dernière section de
      // nav présente pour que « Contact » reste sélectionné.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        for (let i = navLinks.length - 1; i >= 0; i--) {
          if (document.getElementById(navLinks[i].id)) { current = navLinks[i].id; break }
        }
      }
      setActive(current)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [enabled])

  const selectManually = (id: string) => {
    setActive(id)
    lockedUntil.current = Date.now() + 900 // couvre la durée du smooth-scroll
  }

  return { active, selectManually }
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(isHome)
  const [open, setOpen]         = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const { active: activeId, selectManually } = useActiveSection(isHome)

  useEffect(() => {
    const compute = () => {
      setScrolled(window.scrollY > 10)
      // Rester transparent tant que le vert du hero remplit la bande de la
      // navbar ; passer au blanc dès que la couture vert/blanc (#hero-seam)
      // atteint le bas de la navbar.
      const seam = document.getElementById('hero-seam')
      const navH = headerRef.current?.offsetHeight ?? 80
      setOverHero(isHome && !!seam && seam.getBoundingClientRect().top > navH)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* On the home page the sections are in the DOM, so we scroll to them.
     Anywhere else, navigate back to the home page anchor instead. */
  const tubelightItems = navLinks.map((link) => ({
    name: link.label,
    url: isHome ? '' : `/#${link.id}`,
    icon: link.icon,
    onClick: isHome ? () => { selectManually(link.id); scrollTo(link.id) } : undefined,
  }))

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 pt-3 md:pt-4 pointer-events-none transition-colors duration-200 ${
        overHero ? 'bg-transparent' : 'bg-white'
      }`}
    >
      <div className="max-w-container mx-auto px-4 md:px-10 lg:px-20">
        <div className={`pointer-events-auto h-14 md:h-16 px-3 md:px-5 flex items-center justify-between gap-4 rounded-full border backdrop-blur-lg transition-all duration-200 ${
          overHero
            ? 'bg-white/10 border-white/25 shadow-none'
            : `bg-white/70 border-brand-border ${scrolled ? 'shadow-lg shadow-black/5' : 'shadow-sm shadow-black/5'}`
        }`}>

        {/* Logo */}
        <Link href="/" className="flex flex-col flex-shrink-0" aria-label="Afribox">
          <span className={`font-heading font-bold text-lg md:text-xl leading-none transition-colors ${
            overHero ? 'text-white' : 'text-green-dark'
          }`}>Afribox</span>
          <span className={`hidden sm:block font-mono text-[8px] tracking-widest uppercase mt-0.5 transition-colors ${
            overHero ? 'text-white/70' : 'text-green-primary'
          }`}>
            Smart Locker
          </span>
        </Link>

        {/* Liens centre — desktop */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <TubelightNavbar
            items={tubelightItems}
            activeTab={navLinks.find((l) => l.id === activeId)?.label ?? ''}
            tone={overHero ? 'light' : 'dark'}
            className="gap-1"
          />
        </div>

        {/* CTA — desktop */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <Button href="/reserver" variant={overHero ? 'white' : 'primary'} size="sm">
            Réserver un locker
            <ArrowRight size={16} className="ml-1.5" />
          </Button>
        </div>

        {/* Hamburger — mobile */}
        <button
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
          className={`lg:hidden p-2 -mr-2 flex-shrink-0 transition-colors ${
            overHero ? 'text-white' : 'text-brand-gray'
          }`}
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
                  const isActive = isHome && activeId === link.id
                  const className = `flex items-center gap-3 font-body text-lg py-3 border-b border-brand-border transition-colors text-left bg-transparent border-x-0 border-t-0 cursor-pointer w-full ${
                    isActive ? 'text-green-primary font-medium' : 'text-brand-gray hover:text-green-primary'
                  }`
                  const dot = (
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                      isActive ? 'bg-green-primary' : 'bg-transparent'
                    }`} />
                  )

                  return isHome ? (
                    <button
                      key={link.id}
                      onClick={() => { selectManually(link.id); scrollTo(link.id); setOpen(false) }}
                      className={className}
                    >
                      {dot}
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.id}
                      href={`/#${link.id}`}
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {dot}
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="px-6 pb-8">
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
