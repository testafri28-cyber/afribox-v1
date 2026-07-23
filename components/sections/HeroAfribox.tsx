'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Package, CalendarClock, Smartphone, Check } from 'lucide-react'

/* Placeholder flou (14×15px, ~1 Ko) inline en base64 : affiché instantanément
   dans le HTML, il évite le « header vide » pendant le téléchargement du WebP
   de Locky. Généré depuis public/mascotte.webp. */
const MASCOTTE_BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAACzklEQVR42oWSXUhTYRjHn/c9Zx/u083l1JlO87s0ExMlsaQvKCglNhEJk0qIsrzoSpBRdFGERBfSTd0WbCYqXUQ3IhYUZJFmJs7QqdvSOfWc7exsO+d9u9DCi6g//HkunoeH5//wA/iH7nc6jK5b7anwH6EdMwgB5GRbr1vSjMvWPablkqJ9V+h2D+8e3q4YUQQAlFIoKy0zCyFfoKlYr8zNsMDQ17X5sZmfBRQoQgAUdm2gQKiCEpoCFJhEzvFoZWGuP12volYNJvX77dzHzquK3eexAAD1HfUdlr2WXoOsUZizMienXf0PKo+V2yWOoxGehzpb6qEF4UNNNcA7t8PBOD0emQUAaK5pzjvcfCQvS2sF3/QP3cton7c4tPbcqNG0WgtK8PLc5LC2onjK7ShinB4PAQBgn9Sm2JTL3tYq0w0ixDgwqYzYJ9DggbNV9+z+lRY5NsUsGjTPXtx5ze38ZDtjSGssT0ZWCxQsiwxaA1LGRX1PR9lEosEw8MYmMWOmBA005fe1jFy67Rp1aYECAgqIXdpMqrMQJV6/F0RRwJIowieLqtJamgaF9hMQjYlIYWYLwwr+4Xv/1EmM8GnivsBgIpE5IU6TWoOBrDAhKTXbJs/rGXltNkhqbdVQYMyBIl0+4Rd5siSGTp33tPWC0yPjp182ZpLmkrtqtYLdiPOsDJThfByztBDAM0EvhKMcjcRFLPFy0DvmXfWtBnquverOZwCAoozM73H/un9uajYx+HZ4PByLjMV1UBfBEVmQBLKOwjgmS/0sYXlTur4CS6pH6G/sHbzZ0BzUbw2as/SSSmaxNl2HE3PhIWRQn1GZdQPjF0fafpODRkdH2a7HXSq3281gJU5nlBgwAtCp1DhGKamgiaZzn1cWxhOJbuoC/Ae5xsZGaTI8KTudTlkiskySMghbIqxvbFGBi8KmKPFHJ/ztcPn1mucboF+lmkPVe4YouAAAAABJRU5ErkJggg=='

/* Effet machine à écrire sur le dernier mot du titre.
   Le SSR rend WORDS[0] : le titre reste lisible même sans JS. */
const WORDS       = ['no stress,', '24h/24 & 7j/7,', 'sécurisée.']
const TYPE_SPEED  = 75
const ERASE_SPEED = 42
const PAUSE_AFTER = 2400

function useTypewriter(words: string[]) {
  const [wordIdx, setWordIdx] = useState(0)
  const [text, setText]       = useState(words[0])
  const [erasing, setErasing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const full = words[wordIdx]
    if (!erasing) {
      if (text.length < full.length) {
        timer.current = setTimeout(() => setText(full.slice(0, text.length + 1)), TYPE_SPEED)
      } else {
        timer.current = setTimeout(() => setErasing(true), PAUSE_AFTER)
      }
    } else {
      if (text.length > 0) {
        timer.current = setTimeout(() => setText(text.slice(0, -1)), ERASE_SPEED)
      } else {
        setErasing(false)
        setWordIdx((i) => (i + 1) % words.length)
      }
    }
    return () => clearTimeout(timer.current)
  }, [text, erasing, wordIdx, words])

  return text
}

/* Card flottante — entre en spring depuis le bord vers Locky.
   La rotation passe par Framer Motion et non par une classe Tailwind :
   Motion écrit son propre `transform` inline et écraserait la classe. */
function FloatingCard({
  from,
  delay,
  rotate,
  className,
  children,
}: {
  from: 'left' | 'right'
  delay: number
  rotate: number
  className: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'left' ? -70 : 70, scale: 0.9, rotate: 0 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotate }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay }}
      className={`absolute hidden md:block bg-white rounded-2xl ring-1 ring-green-dark/[0.06] shadow-[0_10px_20px_-8px_rgba(11,61,27,0.28),0_28px_55px_-18px_rgba(11,61,27,0.55)] p-3 lg:p-4 text-left ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function HeroAfribox() {
  const typedText = useTypewriter(WORDS)

  return (
    /* Le hero remonte sous la navbar sticky pour que le panneau démarre
       tout en haut et que la nav flotte dessus. */
    <section
      id="hero"
      className="relative bg-white -mt-[68px] md:-mt-[80px]"
    >
        {/* ---------- Panneau dégradé — bord à bord, sans arrondi ---------- */}
        <div
          className="relative"
          style={{ backgroundImage: 'linear-gradient(160deg, #1B5E20 0%, #27AE60 100%)' }}
        >
          {/* Halo — clippé par son propre calque pour ne pas déborder du panneau */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[460px] h-[460px] rounded-full bg-green-light/25 blur-3xl" />
          </div>

          <div className="relative px-6 md:px-12 pt-20 md:pt-24 pb-32 md:pb-40">

            {/* Mascotte + cards flottantes.
                `items-end` ancre Locky au bas du panneau : combiné au léger
                translate vers le bas, sa partie inférieure plonge derrière la
                pilule des CTA posée sur la couture vert/blanc. */}
            <div className="relative mx-auto max-w-5xl flex items-end justify-center min-h-[315px] md:min-h-[420px]">

              {/* ----- Halo + ombre de contact -----
                  Ancrent Locky : sans eux il « flotte dans le vide ».
                  z-0, donc derrière les cards (z-auto) et Locky (z-10). */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 pointer-events-none">
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 h-[300px] w-[300px] md:h-[430px] md:w-[430px] rounded-full bg-green-light/25 blur-3xl" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-[42px] w-[220px] md:w-[300px] rounded-[50%] bg-green-dark/45 blur-2xl" />
              </div>

              {/* ----- Réseau de liaisons -----
                  Des pointillés relient Locky (hub central) à chaque carte :
                  matérialise le « Smart Locker Network ». lg only, derrière les
                  cartes (z-0). Le viewBox est étiré au conteneur ; les traits
                  gardent une épaisseur constante (non-scaling-stroke). */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1000 440"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full hidden md:block pointer-events-none z-0"
                fill="none"
              >
                <g
                  stroke="rgba(233,247,239,0.22)"
                  strokeWidth="1.25"
                  strokeDasharray="2 9"
                  strokeLinecap="round"
                  style={{ animation: 'dashFlow 22s linear infinite' }}
                >
                  <path d="M500,250 C450,150 260,120 150,80"   vectorEffect="non-scaling-stroke" />
                  <path d="M500,250 C430,360 250,420 140,395"  vectorEffect="non-scaling-stroke" />
                  <path d="M500,250 C560,150 750,90  855,70"   vectorEffect="non-scaling-stroke" />
                  <path d="M500,250 C630,300 800,160 890,205"  vectorEffect="non-scaling-stroke" />
                  <path d="M500,250 C560,360 780,430 850,390"  vectorEffect="non-scaling-stroke" />
                </g>
                <g fill="rgba(233,247,239,0.45)">
                  <circle cx="150" cy="80"  r="2.75" />
                  <circle cx="140" cy="395" r="2.75" />
                  <circle cx="855" cy="70"  r="2.75" />
                  <circle cx="890" cy="205" r="2.75" />
                  <circle cx="850" cy="390" r="2.75" />
                </g>
              </svg>

              {/* ----- Identité de Locky -----
                  Petit cartouche au-dessus de sa tête : lui donne un nom et un
                  rôle (cf. « This is Ona » sur la réf.). lg only, comme les cards. */}
              <motion.div
                initial={{ opacity: 0, x: '-50%', y: -12 }}
                animate={{ opacity: 1, x: '-50%', y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-0 left-1/2 z-20 flex items-center gap-2.5 rounded-full pl-2 pr-4 py-1.5 text-white ring-1 ring-white/15 shadow-[0_16px_38px_-10px_rgba(11,61,27,0.65)]"
                style={{ backgroundImage: 'linear-gradient(135deg, #0B3D1B 0%, #1B5E20 100%)' }}
              >
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-base leading-none flex-shrink-0" aria-hidden="true">👋</span>
                <span className="text-left leading-tight">
                  <span className="block font-heading font-bold text-[12px] text-white">Je suis Locky</span>
                  <span className="block font-body text-[10px] text-white/70">Votre concierge Afribox</span>
                </span>
              </motion.div>

              {/* ----- Gauche ----- */}
              {/* En haut : disponibilité */}
              <FloatingCard from="left" delay={0.35} rotate={-3} className="left-0 top-2 w-[158px] lg:w-[190px]">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-green-bg flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-green-primary" />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-[13px] text-brand-gray leading-none flex items-center gap-1.5">
                      Toujours actif
                      <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" aria-hidden="true" />
                    </p>
                    <p className="font-body text-[11px] text-brand-sub mt-1">24 h/24 · 7 j/7</p>
                  </div>
                </div>
              </FloatingCard>

              {/* À gauche : sans rendez-vous */}
              <FloatingCard from="left" delay={0.5} rotate={2} className="-left-4 bottom-0 w-[158px] lg:w-[200px]">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-green-bg flex items-center justify-center flex-shrink-0">
                    <CalendarClock size={16} className="text-green-primary" />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-[13px] text-brand-gray leading-none">Sans rendez-vous</p>
                    <p className="font-body text-[11px] text-brand-sub mt-1">Récupérez quand vous voulez</p>
                  </div>
                </div>
              </FloatingCard>

              {/* ----- Droite ----- */}
              {/* En haut à droite : notification nouveau colis */}
              <FloatingCard from="right" delay={0.4} rotate={3} className="right-0 top-0 w-[162px] lg:w-[205px]">
                <div className="flex items-start gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-green-primary flex items-center justify-center flex-shrink-0">
                    <Package size={16} className="text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-heading font-bold text-[13px] text-brand-gray leading-none">Nouveau colis</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-primary flex-shrink-0 animate-pulse" aria-hidden="true" />
                    </div>
                    <p className="font-body text-[11px] text-brand-sub mt-1 leading-snug">Un casier vous attend · à l&apos;instant</p>
                  </div>
                </div>
              </FloatingCard>

              {/* À droite : paiement Mobile Money */}
              <FloatingCard from="right" delay={0.55} rotate={-2} className="-right-4 top-[calc(50%-40px)] w-[158px] lg:w-[190px]">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-green-bg flex items-center justify-center flex-shrink-0">
                    <Smartphone size={16} className="text-green-primary" />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-[13px] text-brand-gray leading-none">Paiement</p>
                    <p className="font-body text-[11px] text-green-dark font-medium mt-1">Mobile Money</p>
                  </div>
                </div>
              </FloatingCard>

              {/* En bas : colis livré */}
              <FloatingCard from="right" delay={0.7} rotate={2} className="right-0 lg:right-6 bottom-0 w-[158px] lg:w-[185px]">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full bg-green-primary flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-[13px] text-brand-gray leading-none">Colis livré</p>
                    <p className="font-body text-[11px] text-brand-sub mt-1">Code utilisé</p>
                  </div>
                </div>
              </FloatingCard>

              {/* ----- Locky -----
                  Visible par défaut (aucune opacity:0 en SSR) : seul le
                  flottement passe par Framer, l'apparition par CSS. */}
              <div className="relative z-10 translate-y-6 md:translate-y-14" style={{ animation: 'fadeUp 0.6s ease-out both' }}>
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                >
                  <Image
                    src="/mascotte.webp"
                    alt="Locky, la mascotte Afribox, présentant une réservation de locker confirmée"
                    width={480}
                    height={500}
                    priority
                    placeholder="blur"
                    blurDataURL={MASCOTTE_BLUR}
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, 250px"
                    className="w-[250px] md:w-[300px] lg:w-[360px] h-auto drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

      {/* ---------- Bloc blanc : pleine largeur, remonte par-dessus le panneau ----------
          Bord à bord (couvre le vert sur les côtés), sans arrondi en haut.
          Visible par défaut, révélé par une animation CSS (jamais bloqué à 0). */}
      <div
        id="hero-seam"
        className="relative z-10 -mt-28 md:-mt-36 bg-white px-6 pt-4 sm:pt-10 pb-10 md:pb-14 text-center"
        style={{ animation: 'fadeUp 0.6s ease-out 0.15s both' }}
      >
          {/* CTAs — pilule horizontale à cheval sur la couture vert/blanc à
              TOUTES les tailles ; la mascotte passe derrière (z-30 > mascotte).
              Sur très petit écran le libellé se raccourcit pour tenir. */}
          <div className="absolute left-0 right-0 -top-[34px] sm:-top-[38px] z-30 flex justify-center px-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white rounded-full p-1.5 sm:p-2 shadow-[0_16px_40px_-10px_rgba(11,61,27,0.4)]">
              <a
                href="https://wa.me/2250789444441"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm rounded-full px-4 sm:px-5 py-2.5 sm:py-3 bg-green-bg text-green-dark hover:bg-green-soft transition-colors duration-150"
              >
                <Image
                  src="/images/whatsapp.png"
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5 flex-shrink-0"
                />
                WhatsApp
              </a>
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm rounded-full px-4 sm:px-6 py-2.5 sm:py-3 bg-green-primary text-white hover:bg-green-dark transition-all duration-150 active:scale-[0.97] whitespace-nowrap"
              >
                <span className="min-[420px]:hidden">Réserver</span>
                <span className="hidden min-[420px]:inline">Réserver un locker</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <h1 className="mt-2 md:mt-4 font-heading font-bold text-[32px] sm:text-[42px] md:text-[52px] leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto">
            <span className="text-green-dark">Afribox,</span>{' '}
            <span className="text-brand-gray">la livraison</span>
            <br />
            <span className="text-green-primary italic whitespace-nowrap">
              {typedText}
              <span
                className="inline-block w-[3px] h-[0.8em] bg-green-primary ml-1 align-middle rounded-sm not-italic"
                style={{ animation: 'cursorBlink 1s step-end infinite' }}
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed max-w-xl mx-auto mt-5">
            Des casiers intelligents accessibles à toute heure. Pas de rendez-vous,
            pas d&apos;attente — juste votre code et votre colis.
          </p>

          {/* Bande de bénéfices — mobile seulement (< md). À partir de md, les
              cartes flottantes autour de Locky prennent le relais. Version
              épurée : 3 atouts clés, même univers que les cartes desktop. */}
          <div className="md:hidden mt-8 max-w-md mx-auto grid grid-cols-3 rounded-2xl bg-white ring-1 ring-green-dark/[0.06] shadow-[0_10px_30px_-12px_rgba(11,61,27,0.25)] divide-x divide-brand-border overflow-hidden">
            {[
              { icon: Clock, title: '24 h/24', sub: 'Toujours actif' },
              { icon: CalendarClock, title: 'Sans RDV', sub: 'Quand vous voulez' },
              { icon: Smartphone, title: 'Mobile Money', sub: 'Paiement simple' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="px-2 py-4 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-lg bg-green-bg flex items-center justify-center mb-2">
                  <Icon size={15} className="text-green-primary" />
                </span>
                <div className="font-heading font-bold text-[13px] text-green-dark leading-tight">
                  {title}
                </div>
                <div className="font-body text-[10px] text-brand-sub leading-tight mt-0.5">
                  {sub}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  )
}
