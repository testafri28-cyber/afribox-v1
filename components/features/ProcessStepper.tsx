'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, ShoppingBag, Package, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

// Les 6 étapes du parcours regroupées en 3 temps lisibles.
const phases = [
  {
    n: '01',
    icon: ShoppingBag,
    title: 'Commande & réservation',
    text: "Vous commandez chez un marchand partenaire ; il réserve le casier. Un seul paiement couvre le produit, la livraison et le locker.",
    steps: ['Commande', 'Réservation & paiement'],
  },
  {
    n: '02',
    icon: Package,
    title: 'Dépôt du colis',
    text: "Le livreur reçoit un code d'ouverture par SMS, ouvre le casier, dépose le colis et referme — 60 secondes.",
    steps: ['Code au livreur', 'Dépôt du colis'],
    code: '842 631',
  },
  {
    n: '03',
    icon: CheckCircle2,
    title: 'Retrait 24h/24',
    text: "Vous recevez aussitôt votre code par SMS et retirez votre colis quand vous voulez, à toute heure.",
    steps: ['Code au consommateur', 'Récupération'],
    code: '975 214',
  },
]

const VIEW = { once: true, amount: 0.5 } as const

export default function ProcessStepper() {
  return (
    <div>
      {/* ---------- Desktop : rail animé reliant les 3 phases ---------- */}
      <div className="relative mb-6 hidden h-14 md:block">
        {/* Rail de base */}
        <div
          aria-hidden
          className="absolute left-[16.666%] right-[16.666%] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand-border"
        />
        {/* Remplissage vert : la connexion reste affichée en permanence */}
        <div
          aria-hidden
          className="absolute left-[16.666%] right-[16.666%] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-green-dark via-green-primary to-green-light"
        />
        {/* Le colis qui voyage le long du rail — en boucle continue */}
        <motion.div
          aria-hidden
          initial={{ left: '16.666%', opacity: 0 }}
          animate={{ left: ['16.666%', '83.333%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-[3px] ring-green-primary shadow-[0_0_14px_rgba(39,174,96,0.85),-8px_0_10px_rgba(39,174,96,0.35)]"
        />
        {/* Badges numérotés, posés sur le rail (apparition en séquence) */}
        <div className="grid grid-cols-3">
          {phases.map((p, i) => (
            <div key={p.n} className="flex justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VIEW}
                transition={{ delay: 0.2 + i * 0.4, type: 'spring', stiffness: 240, damping: 16 }}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-primary to-green-dark font-heading text-xl font-bold text-white ring-4 ring-white shadow-[0_12px_26px_-8px_rgba(11,61,27,0.65)]"
              >
                {p.n}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Cartes ---------- */}
      <div className="grid gap-5 md:grid-cols-3">
        {phases.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 + i * 0.15 }}
              className="relative flex flex-col rounded-3xl border border-brand-border bg-white p-6 shadow-[0_10px_40px_-24px_rgba(11,61,27,0.4)] transition-shadow hover:shadow-[0_24px_50px_-24px_rgba(11,61,27,0.45)] md:p-7"
            >
              <div className="mb-4 flex items-center gap-3">
                {/* Numéro : mobile uniquement (sur desktop il est dans le rail) */}
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-primary to-green-dark font-heading text-lg font-bold text-white shadow-[0_8px_20px_-6px_rgba(11,61,27,0.6)] md:hidden">
                  {p.n}
                </span>
                {/* Icône */}
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-bg text-green-primary">
                  <Icon size={20} />
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-brand-gray">{p.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-brand-sub">{p.text}</p>

              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {p.steps.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-brand-off px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-sub"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {p.code && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-green-soft bg-green-bg px-3 py-1.5">
                    <MessageSquare size={14} className="text-green-primary" />
                    <span className="font-mono text-base font-bold tracking-widest text-green-primary">{p.code}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* CTA final */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/reserver"
          style={{ '--fill': '#1B5E20' } as React.CSSProperties}
          className="btn-fill inline-flex items-center gap-2 rounded-full bg-green-primary px-6 py-3 font-body font-medium text-white"
        >
          Réserver un locker
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
