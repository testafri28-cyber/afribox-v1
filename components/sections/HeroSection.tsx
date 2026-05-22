'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, ShieldCheck, Smartphone } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const features = [
  { icon: Clock,       title: '24h / 24',  sub: 'Sans rendez-vous' },
  { icon: ShieldCheck, title: 'Sécurisé',  sub: 'Code unique par colis' },
  { icon: Smartphone,  title: 'Mobile',    sub: 'App · Web · WhatsApp' },
]

const WORDS        = ['no stress,', '24h/24 & 7j/7,', 'Sécurisée.']
const TYPE_SPEED   = 75    // ms par caractère
const ERASE_SPEED  = 42    // ms par caractère (effacement plus rapide)
const PAUSE_AFTER  = 2400  // ms d'attente après mot complet

function useTypewriter(words: string[]) {
  const [wordIdx, setWordIdx]   = useState(0)
  const [text, setText]         = useState(words[0])
  const [erasing, setErasing]   = useState(false)
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

export default function HeroSection() {
  const typedText = useTypewriter(WORDS)

  return (
    <section id="hero" className="relative bg-white overflow-hidden pt-14 md:pt-20 pb-0">

      {/* Lignes SVG animées */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 0 130 L 200 130 L 200 360"
          stroke="#27AE60" strokeWidth="1.5" fill="none" strokeLinecap="round"
          opacity={0.18}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
        />
        <motion.path
          d="M 1440 100 L 1240 100 L 1240 310"
          stroke="#27AE60" strokeWidth="1.5" fill="none" strokeLinecap="round"
          opacity={0.13}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
        />
        <motion.circle r={3.5} fill="#27AE60"
          animate={{ cx: [0, 200, 200, 200], cy: [130, 130, 360, 360], opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.6, ease: 'linear', times: [0, 0.46, 0.9, 1] }}
        />
        <motion.circle r={3.5} fill="#27AE60"
          animate={{ cx: [1440, 1240, 1240, 1240], cy: [100, 100, 310, 310], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.6, ease: 'linear', delay: 0.9, times: [0, 0.49, 0.9, 1] }}
        />
        <motion.circle cx={200} cy={130} fill="#27AE60"
          animate={{ r: [3, 5, 3], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.circle cx={1240} cy={100} fill="#27AE60"
          animate={{ r: [3, 5, 3], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        />
      </svg>

      <Container className="relative z-10 pb-20 md:pb-28">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* H1 avec mot cyclique */}
          <motion.h1
            variants={fadeInUp}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray mb-5"
          >
            <span className="block">AFRIBOX, la livraison</span>
            <span className="block text-green-primary italic whitespace-nowrap">
              {typedText}
              {/* Curseur clignotant */}
              <span
                className="inline-block w-[3px] h-[0.85em] bg-green-primary ml-1 align-middle rounded-sm"
                style={{ animation: 'cursorBlink 1s step-end infinite' }}
              />
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p variants={fadeInUp} className="font-body text-sm sm:text-base md:text-lg text-brand-sub leading-relaxed max-w-xl mx-auto mb-8 md:mb-10">
            Des casiers intelligents accessibles 24h/24.
            Pas de rendez-vous. Pas d&apos;attente.
            Juste votre code et votre colis.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <div className="relative inline-flex">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-green-primary opacity-30 pointer-events-none" />
              <Button href="/reserver" variant="primary" size="lg">
                Réserver un locker
                <ArrowRight size={18} className="ml-1" />
              </Button>
            </div>
            <Button href="/#app-mobile" variant="secondary" size="lg">
              Télécharger l&apos;appli
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div variants={staggerContainer} className="flex flex-wrap gap-3 justify-center">
            {features.map(({ icon: Icon, title, sub }, i) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="inline-flex items-center gap-3 bg-brand-off border border-brand-border rounded-2xl px-4 py-3"
              >
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    transition: { duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 },
                  }}
                  whileHover={{
                    scale: 1.2, rotate: 8, y: 0,
                    transition: { type: 'spring', stiffness: 380, damping: 12 },
                  }}
                  className="w-9 h-9 bg-green-bg rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <Icon size={16} className="text-green-primary" />
                </motion.div>
                <div className="text-left">
                  <p className="font-heading font-bold text-sm text-brand-gray leading-none">{title}</p>
                  <p className="font-body text-xs text-brand-sub mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Animation curseur */}
      <style jsx>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
