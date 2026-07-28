'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import LockersMap from '@/components/features/LockersMap'
import { lockers, type Locker, type LockerSize } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'

export default function LockersMapSection() {
  const [selected, setSelected] = useState<Locker | null>(null)
  const availableCount = lockers.filter((l) => l.available).length

  return (
    <section id="lockers" className="bg-white">
      {/* pt réduit : suit L'app (blanc) — évite le vide doublé au joint de même couleur */}
      <Container className="pt-6 md:pt-10 pb-16 md:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="mb-10"
        >
          <SectionLabel className="mb-4">Réseau de lockers</SectionLabel>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray mb-4">
            Trouvez un locker près de vous.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub max-w-xl">
            {availableCount} lockers disponibles à Abidjan. Cliquez sur un point
            pour le sélectionner, puis réservez-le en un geste.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Carte interactive */}
          <div className="h-[300px] sm:h-[400px] lg:h-[480px]">
            <LockersMap
              selectedId={selected?.id}
              onSelect={setSelected}
              height="100%"
            />
          </div>

          {/* Liste des lockers — sélection synchronisée avec la carte */}
          <div className="space-y-3 lg:max-h-[480px] lg:overflow-y-auto lg:pr-1">
            {lockers.map((l) => (
              <LockerCard
                key={l.id}
                locker={l}
                selected={selected?.id === l.id}
                onSelect={() => l.available && setSelected(l)}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function LockerCard({
  locker: l,
  selected,
  onSelect,
}: {
  locker: Locker
  selected: boolean
  onSelect: () => void
}) {
  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl border p-4 md:p-5 transition ${
        selected
          ? 'border-green-primary bg-green-bg'
          : l.available
          ? 'border-brand-border bg-white hover:border-green-primary/40 cursor-pointer'
          : 'border-brand-border bg-brand-off opacity-70'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin size={18} className="text-green-primary flex-shrink-0" />
          <p className="font-heading font-bold text-brand-gray truncate">
            {l.name}
          </p>
        </div>
        <span
          className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
            l.available
              ? 'bg-green-soft text-green-dark'
              : 'bg-white text-brand-mid border border-brand-border'
          }`}
        >
          {l.available ? 'Disponible' : 'Complet'}
        </span>
      </div>

      <p className="font-body text-sm text-brand-sub mb-4 pl-[26px]">
        {l.address}
      </p>

      <div className="flex items-center justify-between gap-3 pl-[26px]">
        {/* Tailles disponibles */}
        <div className="flex gap-1">
          {(['S', 'M', 'L'] as LockerSize[]).map((s) => (
            <span
              key={s}
              title={l.sizes.includes(s) ? `Taille ${s} disponible` : `Taille ${s} indisponible`}
              className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                l.sizes.includes(s)
                  ? 'bg-green-primary text-white'
                  : 'bg-brand-off text-brand-mid border border-brand-border'
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {l.available ? (
          <Link
            href={`/reserver?locker=${l.id}`}
            onClick={(e) => e.stopPropagation()}
            style={{ '--fill': '#1B5E20' } as React.CSSProperties}
            className="btn-fill inline-flex items-center gap-1.5 rounded-full bg-green-primary px-4 py-2 font-body text-sm font-medium text-white"
          >
            Réserver
            <ArrowRight size={15} />
          </Link>
        ) : (
          <span className="font-body text-sm text-brand-mid">Indisponible</span>
        )}
      </div>
    </div>
  )
}
