'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ArrowRight } from 'lucide-react'

const WA_URL = 'https://wa.me/2250789444441'

type Msg = { role: 'user' | 'assistant'; content: string }

/* Réponses rapides. `prompt` → envoyé à Locky (IA). `href` → action directe. */
type Quick =
  | { label: string; prompt: string }
  | { label: string; href: string; external?: boolean }

const QUICKS: Quick[] = [
  { label: 'Comment ça marche', prompt: 'Comment fonctionne Afribox, en bref ?' },
  { label: 'Tarifs', prompt: 'Quels sont vos tarifs ?' },
  { label: 'Moyens de paiement', prompt: 'Comment puis-je payer ?' },
  { label: 'Trouver un locker', prompt: 'Comment trouver le locker le plus proche de moi ?' },
  { label: 'Réserver un locker', href: '/reserver' },
  { label: 'Parler à un humain', href: WA_URL, external: true },
]

const GREETING: Msg = {
  role: 'assistant',
  content:
    'Bonjour, je suis Locky 👋 votre concierge Afribox. Une question sur les lockers, les tarifs ou une livraison ? Je suis là pour vous aider.',
}

export default function LockyChat() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Le tiroir burger (Navbar) émet cet événement : on masque le lanceur tant
  // qu'il est ouvert pour éviter le chevauchement avec son CTA « Réserver ».
  useEffect(() => {
    const handler = (e: Event) => setMenuOpen(Boolean((e as CustomEvent).detail))
    window.addEventListener('afribox:menu', handler)
    return () => window.removeEventListener('afribox:menu', handler)
  }, [])

  // Auto-scroll vers le bas à chaque nouveau contenu.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const history = [...messages, { role: 'user' as const, content: trimmed }]
    // On ajoute un message assistant vide dans lequel on va streamer la réponse.
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // On n'envoie pas le message de bienvenue (rôle assistant initial).
        body: JSON.stringify({ messages: history.filter((m, i) => !(i === 0 && m === GREETING)) }),
      })

      if (!res.body) throw new Error('no body')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: acc }
          return copy
        })
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'assistant',
          content:
            'Souci de connexion 😅 Réessayez, ou écrivez-nous sur WhatsApp au +225 07 89 44 44 41.',
        }
        return copy
      })
    } finally {
      setLoading(false)
    }
  }

  const showQuicks = messages.length <= 1

  return (
    <>
      {/* ---------- Bulle flottante ---------- */}
      <AnimatePresence>
        {!open && !menuOpen && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le chat avec Locky"
            className="group fixed bottom-4 right-3 z-[60] flex items-end gap-1"
          >
            {/* Bulle façon phylactère, pointe vers Locky. Vert foncé pour un
                contraste texte blanc lisible (blanc sur #1B5E20 ≈ 5,7:1). */}
            <span
              className="relative mb-9 rounded-2xl rounded-br-md px-4 py-2.5 text-white shadow-[0_18px_45px_-12px_rgba(11,61,27,0.6)]"
              style={{ backgroundImage: 'linear-gradient(135deg, #0B3D1B 0%, #1B5E20 100%)' }}
            >
              <span className="block text-left font-heading font-bold text-[13px] leading-tight">
                Comment puis-je
                <br />
                vous aider&nbsp;?
              </span>
              <span
                className="absolute -right-1 bottom-2.5 h-3 w-3 rotate-45 rounded-[2px]"
                style={{ backgroundColor: '#1B5E20' }}
              />
            </span>
            {/* Locky en pied */}
            <Image
              src="/locky.webp"
              alt="Locky, votre concierge Afribox"
              width={146}
              height={320}
              priority
              className="h-[118px] w-auto flex-shrink-0 drop-shadow-[0_12px_20px_rgba(11,61,27,0.35)] transition-transform duration-200 group-hover:-translate-y-1"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---------- Panneau de chat ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto z-[60] flex h-[70vh] max-h-[560px] w-auto sm:w-[380px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_28px_70px_-18px_rgba(11,61,27,0.55)] ring-1 ring-green-dark/[0.08]"
          >
            {/* En-tête */}
            <div
              className="flex items-center gap-3 px-4 py-3 text-white"
              style={{ backgroundImage: 'linear-gradient(135deg, #0B3D1B 0%, #1B5E20 100%)' }}
            >
              <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white/15 ring-1 ring-white/20">
                <Image
                  src="/mascotte.webp"
                  alt="Locky"
                  width={80}
                  height={80}
                  className="absolute left-1/2 top-1 h-[64px] w-[64px] max-w-none -translate-x-[46%] object-cover"
                />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block font-heading font-bold text-[15px]">Locky</span>
                <span className="flex items-center gap-1.5 font-body text-[11px] text-white/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-light animate-pulse" />
                  Concierge Afribox · en ligne
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="rounded-full p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-brand-off/60 px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 font-body text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-green-primary text-white rounded-br-md'
                        : 'bg-white text-brand-gray ring-1 ring-brand-border rounded-bl-md'
                    }`}
                  >
                    {m.content || (
                      <span className="inline-flex gap-1 py-0.5" aria-label="Locky écrit…">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-primary/60 [animation-delay:-0.2s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-primary/60 [animation-delay:-0.1s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-green-primary/60" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Réponses rapides (au début de la conversation) */}
              {showQuicks && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICKS.map((q) =>
                    'href' in q ? (
                      <Link
                        key={q.label}
                        href={q.href}
                        target={q.external ? '_blank' : undefined}
                        rel={q.external ? 'noopener noreferrer' : undefined}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 rounded-full bg-green-primary/10 px-3 py-1.5 font-body text-[13px] font-medium text-green-dark hover:bg-green-primary/15 transition-colors"
                      >
                        {q.label}
                        <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <button
                        key={q.label}
                        onClick={() => send(q.prompt)}
                        className="rounded-full bg-white px-3 py-1.5 font-body text-[13px] text-brand-gray ring-1 ring-brand-border hover:border-green-primary/40 hover:text-green-dark transition-colors"
                      >
                        {q.label}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Saisie */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-brand-border bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre question…"
                aria-label="Votre message"
                className="min-w-0 flex-1 rounded-full bg-brand-off px-4 py-2.5 font-body text-sm text-brand-gray placeholder:text-brand-mid outline-none focus:ring-2 focus:ring-green-primary/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Envoyer"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-primary text-white transition-all hover:bg-green-dark disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <Send size={17} />
              </button>
            </form>

            <p className="bg-white px-4 pb-2 text-center font-body text-[10px] text-brand-mid">
              Locky peut se tromper — vérifiez les infos importantes.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
