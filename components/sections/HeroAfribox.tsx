'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Clock, Package, Smile, Star, Store, User, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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

/* Card flottante — entre en spring depuis le bord vers Lucky.
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
      className={`absolute hidden lg:block bg-white rounded-2xl shadow-[0_18px_45px_-12px_rgba(11,61,27,0.5)] p-4 text-left ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* Card chiffre — colonne de droite : en-tête + pastille de valeur. */
function MiniStat({
  icon: Icon,
  label,
  badge,
  value,
}: {
  icon: LucideIcon
  label: string
  badge: string
  value: string
}) {
  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-full bg-green-bg flex items-center justify-center flex-shrink-0">
          <Icon size={14} className="text-green-primary" />
        </span>
        <span className="font-heading font-bold text-[12px] text-brand-gray">{label}</span>
        <span className="ml-auto rounded-full bg-green-bg text-green-dark font-body font-medium text-[9px] px-2 py-0.5 whitespace-nowrap">
          {badge}
        </span>
      </div>
      <div className="rounded-xl bg-green-bg px-3 py-2.5 flex items-center justify-between gap-2">
        <span className="font-heading font-bold text-xl text-green-dark leading-none">{value}</span>
        <Icon size={16} className="text-green-primary/60 flex-shrink-0" />
      </div>
    </>
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
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[460px] h-[460px] rounded-full bg-green-light/20 blur-3xl" />
          </div>

          <div className="relative px-6 md:px-12 pt-20 md:pt-24 pb-44 md:pb-56">

            {/* Mascotte + cards flottantes */}
            <div className="relative mx-auto max-w-5xl flex items-center justify-center min-h-[260px] lg:min-h-[380px]">

              {/* ----- Gauche ----- */}
              <FloatingCard from="left" delay={0.35} rotate={-3} className="left-0 top-2 w-[210px]">
                <div className="flex items-center gap-2 mb-3">
                  {[Store, User, Building2].map((Icon, i) => (
                    <span
                      key={i}
                      className="w-9 h-9 rounded-full bg-green-bg border-2 border-white flex items-center justify-center"
                    >
                      <Icon size={15} className="text-green-primary" />
                    </span>
                  ))}
                </div>
                <p className="font-heading font-bold text-[13px] text-brand-gray leading-snug mb-2">
                  Une solution par usage
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Marchands', 'Particuliers', 'Entreprises'].map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center rounded-full bg-green-bg text-green-dark font-body font-medium text-[10px] px-2 py-0.5"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </FloatingCard>

              <FloatingCard from="left" delay={0.5} rotate={2} className="-left-4 bottom-0 w-[205px]">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full bg-green-bg flex items-center justify-center flex-shrink-0 font-heading font-bold text-[11px] text-green-dark">
                    FK
                  </span>
                  <span>
                    <span className="block font-heading font-bold text-[13px] text-brand-gray leading-none">
                      Fatou K.
                    </span>
                    <span className="flex gap-0.5 mt-1.5" aria-label="5 étoiles sur 5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={11} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                      ))}
                    </span>
                  </span>
                </div>
                <p className="font-body text-[11px] text-brand-sub leading-snug mt-2.5">
                  « Mon colis m&apos;attendait. Zéro appel, zéro attente. »
                </p>
              </FloatingCard>

              {/* ----- Droite ----- */}
              <FloatingCard from="right" delay={0.4} rotate={3} className="right-0 top-0 w-[185px]">
                <MiniStat icon={Clock} label="Disponibilité" badge="Live" value="24/7" />
              </FloatingCard>

              <FloatingCard from="right" delay={0.55} rotate={-2} className="-right-4 top-[calc(50%-40px)] w-[185px]">
                <MiniStat icon={Package} label="Livraisons" badge="+42%" value="4 800" />
              </FloatingCard>

              <FloatingCard from="right" delay={0.7} rotate={2} className="right-6 bottom-0 w-[185px]">
                <MiniStat icon={Smile} label="Satisfaction" badge="+3pt" value="98%" />
              </FloatingCard>

              {/* ----- Lucky -----
                  Visible par défaut (aucune opacity:0 en SSR) : seul le
                  flottement passe par Framer, l'apparition par CSS. */}
              <div className="relative z-10" style={{ animation: 'fadeUp 0.6s ease-out both' }}>
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                >
                  <Image
                    src="/lucky.svg"
                    alt="Lucky, la mascotte Afribox"
                    width={200}
                    height={220}
                    priority
                    className="w-[170px] md:w-[230px] h-auto drop-shadow-2xl"
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
        className="relative z-10 -mt-28 md:-mt-36 bg-white px-6 pt-8 sm:pt-16 pb-10 md:pb-14 text-center"
        style={{ animation: 'fadeUp 0.6s ease-out 0.15s both' }}
      >
          {/* CTAs — pilule blanche à cheval sur la couture vert/blanc.
              Sur sm+ elle est en absolu, centrée sur le bord supérieur du bloc :
              moitié sur le vert, moitié sur le blanc. Sur mobile, dans le flux. */}
          <div className="flex justify-center sm:absolute sm:left-0 sm:right-0 sm:-top-[30px] sm:z-20">
            <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-3xl sm:rounded-full p-2 shadow-[0_16px_40px_-10px_rgba(11,61,27,0.4)]">
              <a
                href="https://wa.me/2250789444441"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm rounded-full px-5 py-3 text-brand-gray hover:bg-brand-off transition-colors duration-150"
              >
                <span className="w-[18px] h-[18px] rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={11} color="white" />
                </span>
                WhatsApp
              </a>
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm rounded-full px-6 py-3 bg-green-primary text-white hover:bg-green-dark transition-all duration-150 active:scale-[0.97] whitespace-nowrap"
              >
                Réserver un locker
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <h1 className="mt-6 md:mt-8 font-heading font-bold text-[32px] sm:text-[42px] md:text-[52px] leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto">
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
      </div>
    </section>
  )
}
