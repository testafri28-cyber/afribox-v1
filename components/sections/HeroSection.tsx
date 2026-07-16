'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import {
  Clock, ShieldCheck, Smartphone, MapPin,
  Package, Lock, CreditCard, MessageCircle,
} from 'lucide-react'

/* Typewriter cycling on the second title line */
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

/* Pipeline node — simple pill */
const PipeNode = ({
  children,
  variant = 'default',
  delay = 0,
}: {
  children: React.ReactNode
  variant?: 'default' | 'success'
  delay?: number
}) => (
  <span
    className={`hidden md:inline-flex items-center gap-2 rounded-[8px] px-3 py-1.5 text-xs font-medium font-body flex-shrink-0 ${
      variant === 'success'
        ? 'bg-green-bg border border-green-primary/45 text-[#444]'
        : 'bg-[#F7F9F7] border border-[#E0E0E0] text-[#444]'
    }`}
    style={{
      animation: `nodeIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both, heroFloat 3s ease ${delay}s infinite`,
    }}
  >
    {children}
  </span>
)

/* Pipeline node — with progress bar */
const ProgressNode = ({ delay = 0 }: { delay?: number }) => (
  <span
    className="hidden md:inline-flex flex-col gap-1 bg-[#F7F9F7] border border-[#E0E0E0] rounded-[8px] px-3 py-1.5 min-w-[130px] flex-shrink-0"
    style={{
      animation: `nodeIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both, heroFloat 3s ease ${delay}s infinite`,
    }}
  >
    <span className="flex items-center gap-2">
      <span className="w-[7px] h-[7px] rounded-full bg-amber-400 flex-shrink-0" />
      <span className="text-[11px] font-medium font-body text-[#444] flex-1">
        Dépôt du colis
      </span>
      <span className="font-mono text-[10px] font-semibold text-green-primary">60s</span>
    </span>
    <span className="h-[3px] bg-[#E0E0E0] rounded-full overflow-hidden">
      <span
        className="h-full bg-green-primary rounded-full block"
        style={{ animation: `progressFill 1.4s cubic-bezier(0.4,0,0.2,1) ${delay + 0.25}s both` }}
      />
    </span>
  </span>
)

export default function HeroSection() {
  const typedText = useTypewriter(WORDS)
  const tickerItems = [
    { icon: MapPin,     label: 'Réseau Côte d’Ivoire'  },
    { icon: Smartphone, label: 'App, Web ou WhatsApp'        },
    { icon: Package,    label: 'Tous formats de colis'       },
    { icon: Clock,      label: 'Sans rendez-vous'            },
    { icon: Lock,       label: 'Code unique par livraison'   },
    { icon: CreditCard, label: 'Mobile Money accepté'        },
  ]

  return (
    <section
      id="hero"
      className="bg-white pt-12 pb-0 px-6 md:px-10 lg:px-20 relative overflow-hidden"
    >
      {/* Décoration SVG lignes vertes — droite */}
      <svg
        className="hidden md:block absolute top-0 right-10 pointer-events-none z-0"
        width="120" height="200" viewBox="0 0 120 200"
        aria-hidden="true"
      >
        <path
          d="M100 10 L100 80 C100 86 96 90 90 90
             L30 90 C24 90 20 94 20 100
             L20 160 C20 166 24 170 30 170 L80 170"
          fill="none" stroke="#27AE60" strokeWidth="1"
          strokeDasharray="120"
          style={{ opacity: 0.35, strokeDashoffset: 120, animation: 'drawLine 1.8s ease 0.8s forwards' }}
        />
        {[
          { cx: 100, cy: 10,  r: 3,   delay: 1.6, fill: '#27AE60' },
          { cx: 80,  cy: 170, r: 3,   delay: 1.8, fill: '#27AE60' },
          { cx: 20,  cy: 100, r: 2.5, delay: 2.0, fill: '#6FCF97' },
        ].map((d, i) => (
          <circle
            key={i} cx={d.cx} cy={d.cy} r={d.r} fill={d.fill}
            style={{ opacity: 0, animation: `fadeUp 0.4s ease ${d.delay}s forwards` }}
          />
        ))}
      </svg>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-6xl">

        {/* H1 — Ligne 1 */}
        <div
          className="flex items-center gap-3 flex-wrap mb-1"
          style={{ animation: 'fadeUp 0.6s ease 0.1s both' }}
        >
          <Image
            src="/images/afribox-logo.svg"
            alt="Afribox"
            width={320}
            height={80}
            priority
            className="h-[40px] md:h-[56px] w-auto"
          />
          <span className="font-heading font-extrabold text-[36px] md:text-[64px] leading-none tracking-[-0.035em] text-[#1a1a1a]">
            la livraison
          </span>
          <PipeNode variant="success" delay={0.55}>
            <span
              className="w-[7px] h-[7px] rounded-full bg-green-primary flex-shrink-0"
              style={{ animation: 'pulseDot 2s ease infinite' }}
            />
            Réseau actif
          </PipeNode>
        </div>

        {/* H1 — Ligne 2 */}
        <div
          className="flex items-center gap-3 flex-wrap mb-6"
          style={{ animation: 'fadeUp 0.6s ease 0.25s both' }}
        >
          <span className="font-heading font-extrabold italic text-[36px] md:text-[64px] leading-none tracking-[-0.035em] text-green-primary whitespace-nowrap">
            {typedText}
            <span
              className="inline-block w-[3px] h-[0.8em] bg-green-primary ml-1 align-middle rounded-sm not-italic"
              style={{ animation: 'cursorBlink 1s step-end infinite' }}
            />
          </span>
          <span className="hidden md:inline text-[#C0C0C0] text-sm flex-shrink-0">→</span>
          <ProgressNode delay={0.75} />
          <span className="hidden md:inline text-[#C0C0C0] text-sm flex-shrink-0">→</span>
          <PipeNode variant="success" delay={0.95}>
            <span className="w-[16px] h-[16px] rounded-full bg-green-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[9px] font-bold">✓</span>
            </span>
            Livré
          </PipeNode>
        </div>

        {/* Sous-titre */}
        <p
          className="font-body text-[15px] text-brand-sub leading-relaxed max-w-[500px] mb-7"
          style={{ animation: 'fadeUp 0.6s ease 0.5s both' }}
        >
          Des casiers intelligents accessibles 24h/24. Pas de rendez-vous.
          Pas d&apos;attente. Juste votre code et votre colis.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 flex-wrap mb-10"
          style={{ animation: 'fadeUp 0.6s ease 0.65s both' }}
        >
          <Link
            href="/reserver"
            className="bg-green-primary text-white font-body text-sm font-medium px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-green-dark hover:scale-[1.02] transition-all duration-200"
            style={{ animation: 'pulseRing 2.5s ease 2s infinite' }}
          >
            Réserver un locker →
          </Link>

          <a
            href="https://wa.me/2250789444441"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1a1a1a] font-body text-sm font-medium px-6 py-3.5 rounded-full border-[1.5px] border-[#E0E0E0] inline-flex items-center justify-center gap-2 hover:border-[#25D366] transition-colors duration-200"
          >
            <span className="w-[18px] h-[18px] rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageCircle size={10} color="white" />
            </span>
            WhatsApp
          </a>
        </div>

        {/* Feature cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          style={{ animation: 'fadeUp 0.6s ease 0.8s both' }}
        >
          {[
            { icon: Clock,       title: '24h / 24', desc: 'Sans rendez-vous'      },
            { icon: ShieldCheck, title: 'Sécurisé', desc: 'Code unique par colis' },
            { icon: Smartphone,  title: 'Mobile',   desc: 'App · Web · WhatsApp'  },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#F7F9F7] border border-[#EBEBEB] rounded-[14px] p-3.5 flex items-center gap-3"
            >
              <span className="w-[34px] h-[34px] rounded-[10px] bg-green-bg flex items-center justify-center text-green-primary flex-shrink-0">
                <Icon size={16} />
              </span>
              <span>
                <span className="block font-heading font-bold text-[13px] text-[#1a1a1a]">
                  {title}
                </span>
                <span className="block font-body text-[11px] text-brand-mid mt-0.5">
                  {desc}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker défilant */}
      <div className="relative border-t border-[#EBEBEB] mt-8 py-3 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div
          className="flex whitespace-nowrap w-max"
          style={{ animation: 'tickerMove 18s linear infinite' }}
        >
          {[...tickerItems, ...tickerItems].map(({ icon: Icon, label }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-7 font-body text-xs text-[#999]"
            >
              <span className="w-1 h-1 rounded-full bg-[#C0C0C0] flex-shrink-0" />
              <Icon size={13} className="text-[#BDBDBD]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
