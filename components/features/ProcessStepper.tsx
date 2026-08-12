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

// Pastille numéro fine : numéro vert sur blanc, cerclé d'un trait léger.
function Badge({ n, className = '' }: { n: string; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full border border-green-primary/45 bg-white font-heading font-bold text-green-primary ${className}`}
    >
      {n}
    </span>
  )
}

// Boucle commune (point, remplissage, badges) — lente et synchronisée.
const LOOP = { duration: 4.5, repeat: Infinity, repeatDelay: 0.4, ease: 'linear' } as const
// Opacité du remplissage de chaque badge au fil du cycle (01 tôt, 02 milieu, 03 quand le point arrive).
const badgeFill = [
  { o: [0, 1, 1, 0], t: [0, 0.1, 0.9, 1] },
  { o: [0, 0, 1, 1, 0], t: [0, 0.44, 0.5, 0.9, 1] },
  { o: [0, 0, 1, 1, 0], t: [0, 0.84, 0.9, 0.95, 1] },
]

export default function ProcessStepper() {
  return (
    <div>
      {/* ---------- Desktop : filet reliant les 3 phases ---------- */}
      <div className="relative mb-7 hidden h-9 md:block">
        {/* Piste légère (rail vide) */}
        <div
          aria-hidden
          className="absolute inset-x-[16.666%] top-[17px] h-[2px] rounded-full bg-green-primary/20"
        />
        {/* Remplissage vert qui progresse derrière le point */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 0, 1, 1], opacity: [0, 1, 1, 0] }}
          transition={{ ...LOOP, times: [0, 0.08, 0.9, 1] }}
          className="absolute inset-x-[16.666%] top-[17px] h-[2px] origin-left rounded-full bg-green-primary"
        />
        {/* Point fin (tête du remplissage) — s'efface en passant sur chaque
            numéro pour ne pas se confondre avec le chiffre. */}
        <motion.div
          aria-hidden
          initial={{ left: '16.666%', opacity: 0 }}
          animate={{
            left: ['16.666%', '16.666%', '16.666%', '24%', '47%', '50%', '53%', '57%', '79%', '83.333%', '83.333%'],
            opacity: [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
          }}
          transition={{ ...LOOP, times: [0, 0.08, 0.1, 0.17, 0.45, 0.49, 0.53, 0.58, 0.85, 0.9, 1] }}
          className="absolute top-1/2 z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-primary shadow-[0_0_6px_rgba(39,174,96,0.6)]"
        />
        {/* Badges : se remplissent au passage du point, en séquence 01 → 02 → 03 */}
        <div className="grid grid-cols-3">
          {phases.map((p, i) => (
            <div key={p.n} className="flex justify-center">
              <div className="relative z-10 h-9 w-9">
                <span className="absolute inset-0 flex items-center justify-center rounded-full border border-green-primary/45 bg-white font-heading text-sm font-bold text-green-primary">
                  {p.n}
                </span>
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: badgeFill[i].o }}
                  transition={{ ...LOOP, times: badgeFill[i].t }}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-green-primary font-heading text-sm font-bold text-white"
                >
                  {p.n}
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Cartes (plates, bord fin) ---------- */}
      <div className="grid gap-4 md:grid-cols-3">
        {phases.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
              className="relative flex flex-col rounded-2xl border border-brand-border bg-white p-5 md:p-6"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <Badge n={p.n} className="h-8 w-8 text-xs md:hidden" />
                <Icon size={18} className="text-green-primary" />
              </div>

              <h3 className="font-heading text-lg font-bold text-brand-gray">{p.title}</h3>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-brand-sub">{p.text}</p>

              <div className="mt-auto pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.steps.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-brand-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-sub"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {p.code && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-green-soft bg-green-bg px-2.5 py-1">
                    <MessageSquare size={13} className="text-green-primary" />
                    <span className="font-mono text-sm font-bold tracking-widest text-green-primary">{p.code}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* CTA final */}
      <div className="mt-10 flex justify-center">
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
