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

export default function ProcessStepper() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {phases.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
              className="relative flex flex-col rounded-3xl border border-brand-border bg-white p-6 shadow-[0_10px_40px_-24px_rgba(11,61,27,0.4)] transition-shadow hover:shadow-[0_24px_50px_-24px_rgba(11,61,27,0.45)] md:p-7"
            >
              {/* Connecteur vers la phase suivante (desktop, dans le gap). */}
              {i < phases.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[14px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-white text-green-primary shadow-sm md:flex"
                >
                  <ArrowRight size={15} />
                </span>
              )}

              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-primary to-green-dark font-heading text-lg font-bold text-white shadow-[0_10px_24px_-8px_rgba(11,61,27,0.6)]">
                  {p.n}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-bg text-green-primary">
                  <Icon size={20} />
                </span>
              </div>

              <h3 className="mt-5 font-heading text-xl font-bold text-brand-gray">{p.title}</h3>
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
