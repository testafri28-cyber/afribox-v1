'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, ShieldCheck, Smartphone } from 'lucide-react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import PhoneMockup from '@/components/features/PhoneMockup'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const features = [
  { icon: Clock,       title: '24h / 24',  sub: 'Sans rendez-vous' },
  { icon: ShieldCheck, title: 'Sécurisé',  sub: 'Code unique par colis' },
  { icon: Smartphone,  title: 'Mobile',    sub: 'App · Web · WhatsApp' },
]

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left — texte */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-brand-gray mb-5"
            >
              <span className="block">AFRIBOX, la livraison</span>
              <span className="block text-green-primary italic whitespace-nowrap">
                {typedText}
                <span
                  className="inline-block w-[3px] h-[0.85em] bg-green-primary ml-1 align-middle rounded-sm"
                  style={{ animation: 'cursorBlink 1s step-end infinite' }}
                />
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="font-body text-sm sm:text-base md:text-lg text-brand-sub leading-relaxed max-w-xl mb-8 md:mb-10">
              Des casiers intelligents accessibles 24h/24.
              Pas de rendez-vous. Pas d&apos;attente.
              Juste votre code et votre colis.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button href="/reserver" variant="primary" size="lg">
                Réserver un locker
                <ArrowRight size={18} className="ml-1" />
              </Button>
              <Button href="https://wa.me/2250759595959" variant="secondary" size="lg">
                <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" className="mr-1.5 flex-shrink-0">
                  <path d="M16 3.2C9 3.2 3.2 9 3.2 16c0 2.26.59 4.46 1.73 6.4L3.2 28.8l6.58-1.71A12.74 12.74 0 0016 28.68h.005C23.07 28.68 28.8 22.95 28.8 16c0-3.42-1.33-6.63-3.75-9.05A12.71 12.71 0 0016 3.2zm7.52 18.31c-.32.9-1.84 1.71-2.57 1.82-.66.1-1.49.14-2.41-.15-.55-.18-1.27-.41-2.18-.8-3.83-1.65-6.33-5.51-6.52-5.76-.19-.26-1.56-2.08-1.56-3.96 0-1.89.99-2.81 1.34-3.2.35-.38.76-.48 1.02-.48.25 0 .51 0 .73.013.23.011.55-.089.86.66.32.76 1.08 2.65 1.18 2.84.1.19.16.41.03.67-.13.26-.19.41-.38.64-.19.22-.4.5-.57.67-.19.19-.39.4-.17.78.22.38.99 1.63 2.12 2.64 1.46 1.3 2.69 1.7 3.07 1.89.38.19.61.16.83-.1.22-.25.95-1.11 1.21-1.49.25-.38.51-.32.86-.19.35.13 2.22 1.05 2.6 1.24.38.19.64.29.73.45.1.16.1.93-.22 1.82z"/>
                </svg>
                WhatsApp
              </Button>
            </motion.div>

            <motion.div variants={staggerContainer} className="flex flex-nowrap gap-2 sm:gap-3">
              {features.map(({ icon: Icon, title, sub }, i) => (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  className="flex-1 min-w-0 inline-flex items-center gap-2 sm:gap-2.5 bg-brand-off border border-brand-border rounded-2xl px-2.5 sm:px-3 py-2 sm:py-2.5"
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
                    className="w-8 h-8 bg-green-bg rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={14} className="text-green-primary" />
                  </motion.div>
                  <div className="text-left min-w-0">
                    <p className="font-heading font-bold text-xs sm:text-sm text-brand-gray leading-none truncate">{title}</p>
                    <p className="font-body text-[10px] sm:text-xs text-brand-sub mt-0.5 truncate">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — phone animé (desktop only) */}
          <motion.div
            className="hidden lg:flex justify-center items-center py-12"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </Container>

      <style jsx>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
