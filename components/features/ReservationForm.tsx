'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Package,
  PackageOpen,
  Boxes,
  CreditCard,
  Smartphone,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import LazyMount from '@/components/ui/LazyMount'
import { lockers, type Locker, type LockerSize } from '@/lib/constants'

// Chargée à la demande : la carte (Leaflet + tuiles) ne pèse plus sur l'entrée
// dans le tunnel, surtout en données mobiles.
const LockersMap = dynamic(() => import('@/components/features/LockersMap'), {
  ssr: false,
})
import { submitLead, whatsappUrl } from '@/lib/leads'

type Duration = '48h'
type Payment = 'orange' | 'wave' | 'mtn' | 'card'

type Reservation = {
  locker: Locker | null
  size: LockerSize | null
  duration: Duration | null
  phone: string
  message: string
  payment: Payment | null
}

const sizesInfo: Record<
  LockerSize,
  { label: string; icon: typeof Package; desc: string; price: string }
> = {
  S: { label: 'Petit', icon: Package, desc: 'Documents, accessoires', price: '500 FCFA' },
  M: { label: 'Moyen', icon: PackageOpen, desc: 'Vêtements, électronique', price: '750 FCFA' },
  L: { label: 'Grand', icon: Boxes, desc: 'Équipements volumineux', price: '1 250 FCFA' },
}

// Durée unique : dépôt de 48h (tarif fixe par taille).
const durationsInfo: Record<Duration, { label: string; multiplier: number }> = {
  '48h': { label: '48 heures', multiplier: 1 },
}

const paymentMethods: { id: Payment; label: string; icon: typeof Smartphone }[] = [
  { id: 'orange', label: 'Orange Money', icon: Smartphone },
  { id: 'wave', label: 'Wave', icon: Smartphone },
  { id: 'mtn', label: 'MTN Mobile Money', icon: Smartphone },
  { id: 'card', label: 'Carte bancaire', icon: CreditCard },
]

function generateCode(): string {
  // Code de dépôt simulé — 6 chiffres groupés 3 par 3
  const num = Math.floor(100000 + Math.random() * 900000).toString()
  return num.slice(0, 3) + ' ' + num.slice(3)
}

export default function ReservationForm() {
  const [step, setStep] = useState(1)
  const [reservation, setReservation] = useState<Reservation>({
    locker: null,
    size: null,
    duration: '48h', // durée unique
    phone: '',
    message: '',
    payment: null,
  })
  const [code] = useState(generateCode())

  // Pré-sélection d'un locker via l'URL (?locker=id) — depuis la carte du réseau
  // sur la page d'accueil : on saute directement à l'étape « Configurer ».
  useEffect(() => {
    const id = parseInt(
      new URLSearchParams(window.location.search).get('locker') || '',
      10,
    )
    if (!id) return
    const l = lockers.find((x) => x.id === id && x.available)
    if (l) {
      setReservation((r) => ({ ...r, locker: l }))
      setStep(2)
    }
  }, [])

  const totalPrice = () => {
    if (!reservation.size || !reservation.duration) return 0
    const base = parseInt(sizesInfo[reservation.size].price.replace(/\D/g, ''), 10)
    return Math.round(base * durationsInfo[reservation.duration].multiplier)
  }

  const canProceed = () => {
    if (step === 1) return reservation.locker !== null
    if (step === 2)
      return (
        reservation.size !== null &&
        reservation.duration !== null &&
        reservation.phone.length >= 8
      )
    if (step === 3) return reservation.payment !== null
    return true
  }

  // Étape 1 : choisir un locker fait avancer tout seul (le bouton « Suivant »
  // n'est pas toujours visible selon la hauteur d'écran). Court délai pour que
  // la sélection soit visible avant la transition.
  const selectLocker = (l: Locker) => {
    setReservation((r) => ({ ...r, locker: l }))
    setStep((s) => (s === 1 ? 2 : s))
  }

  const handleNext = () => {
    // À la confirmation (3 → 4), on enregistre la demande dans le Google Sheet.
    // Best-effort : l'utilisateur finalise ensuite sur WhatsApp (écran suivant).
    if (step === 3) {
      submitLead({
        type: 'reservation',
        locker: reservation.locker?.name,
        address: reservation.locker?.address,
        size: reservation.size,
        duration: reservation.duration,
        phone: reservation.phone,
        message: reservation.message,
        payment: reservation.payment,
        total: totalPrice(),
        ref: code,
      })
    }
    setStep((s) => s + 1)
  }

  // Pas d'overflow-hidden sur la carte : il casserait le `sticky` de la barre
  // de navigation. Les coins sont arrondis sur l'en-tête et le pied.
  return (
    <div className="bg-white border border-brand-border rounded-2xl">
      {/* Progression — les étapes déjà franchies sont cliquables (retour). */}
      <div className="bg-brand-off border-b border-brand-border p-4 md:p-6 rounded-t-2xl">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                onClick={() => n < step && setStep(n)}
                disabled={n >= step}
                aria-label={`Revenir à l'étape ${n}`}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm transition ${
                  step >= n
                    ? 'bg-green-primary text-white'
                    : 'bg-white border border-brand-border text-brand-mid'
                } ${n < step ? 'cursor-pointer hover:bg-green-dark hover:scale-105' : 'cursor-default'}`}
              >
                {step > n ? <Check size={16} /> : n}
              </button>
              {n < 4 && (
                <div
                  className={`flex-1 h-px mx-2 transition ${
                    step > n ? 'bg-green-primary' : 'bg-brand-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between max-w-2xl mx-auto mt-3">
          {['Locker', 'Configurer', 'Paiement', 'Confirmation'].map((l, i) => (
            <p
              key={l}
              className={`font-mono text-[10px] tracking-widest uppercase ${
                step === i + 1 ? 'text-green-primary' : 'text-brand-mid'
              }`}
            >
              {l}
            </p>
          ))}
        </div>
      </div>

      {/* Contenu étape */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="p-6 md:p-10"
        >
          {step === 1 && (
            <StepLocker
              selected={reservation.locker}
              onSelect={selectLocker}
            />
          )}
          {step === 2 && (
            <StepConfigure
              reservation={reservation}
              setReservation={setReservation}
            />
          )}
          {step === 3 && (
            <StepPayment
              reservation={reservation}
              setReservation={setReservation}
              total={totalPrice()}
            />
          )}
          {step === 4 && (
            <StepConfirmation
              reservation={reservation}
              code={code}
              total={totalPrice()}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation bas — masquée à l'étape 1 : « Précédent » y est désactivé et
          choisir un casier passe déjà à l'étape suivante, la barre n'y offrait
          donc aucune action. Cibles portées à 48px (confort tactile). */}
      {step > 1 && step < 4 && (
        <div className="border-t border-brand-border p-4 md:p-6 flex items-center justify-between gap-3 bg-white sticky bottom-0 rounded-b-2xl z-20">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="btn-fill [--fill:#F7F9F7] inline-flex min-h-[48px] items-center gap-2 px-5 rounded-full text-sm font-body text-brand-gray transition-transform"
          >
            <ArrowLeft size={16} />
            Précédent
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-fill [--fill:#1B5E20] inline-flex min-h-[48px] items-center gap-2 px-6 rounded-full bg-green-primary text-white text-sm font-body font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-transform"
          >
            {step === 3 ? 'Confirmer la demande' : 'Suivant'}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Étape 1 — choisir un locker
// ---------------------------------------------------------------------------
function StepLocker({
  selected,
  onSelect,
}: {
  selected: Locker | null
  onSelect: (l: Locker) => void
}) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-gray mb-2">
        Choisissez un locker
      </h2>
      <p className="font-body text-brand-sub mb-8">
        Sélectionnez le casier le plus proche de vous ou de votre destinataire —
        vous passerez directement à l&apos;étape suivante.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LazyMount
          className="h-[380px]"
          placeholder={<div className="h-full w-full animate-pulse rounded-2xl bg-brand-off" aria-hidden />}
        >
          <LockersMap selectedId={selected?.id} onSelect={onSelect} height="100%" />
        </LazyMount>
        <div className="space-y-3 lg:max-h-[380px] lg:overflow-y-auto pr-1">
          {lockers.map((l) => {
            const isSelected = selected?.id === l.id
            return (
              <button
                key={l.id}
                onClick={() => onSelect(l)}
                disabled={!l.available}
                className={`w-full text-left rounded-xl border p-4 transition ${
                  isSelected
                    ? 'border-green-primary bg-green-bg'
                    : l.available
                    ? 'border-brand-border bg-white hover:border-green-primary/40'
                    : 'border-brand-border bg-brand-off opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-green-primary" />
                    <p className="font-body font-semibold text-brand-gray">
                      {l.name}
                    </p>
                  </div>
                  <span
                    className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full ${
                      l.available
                        ? 'bg-green-soft text-green-dark'
                        : 'bg-brand-off text-brand-mid border border-brand-border'
                    }`}
                  >
                    {l.available ? 'Bientôt' : 'Complet'}
                  </span>
                </div>
                <p className="font-body text-sm text-brand-sub mb-3">
                  {l.address}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-brand-mid">
                    {l.available ? 'Bientôt' : 'Complet'}
                  </p>
                  <div className="flex gap-1">
                    {(['S', 'M', 'L'] as LockerSize[]).map((s) => (
                      <span
                        key={s}
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
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Étape 2 — configuration
// ---------------------------------------------------------------------------
function StepConfigure({
  reservation,
  setReservation,
}: {
  reservation: Reservation
  setReservation: (r: Reservation) => void
}) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-gray mb-2">
        Configurez votre réservation
      </h2>
      <p className="font-body text-brand-sub mb-6">
        Taille, durée et informations du destinataire.
      </p>

      {/* Rappel du locker choisi (utile après « Réserver ce locker »). */}
      {reservation.locker && (
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-soft bg-green-bg px-3.5 py-1.5">
          <MapPin size={14} className="text-green-primary" />
          <span className="font-body text-sm font-medium text-green-dark">
            {reservation.locker.name}
          </span>
        </div>
      )}

      {/* Taille */}
      <p className="font-mono text-xs tracking-widest text-brand-mid uppercase mb-3">
        Taille
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {(['S', 'M', 'L'] as LockerSize[]).map((s) => {
          const info = sizesInfo[s]
          const isSelected = reservation.size === s
          const isAvailable =
            !reservation.locker || reservation.locker.sizes.includes(s)
          return (
            <button
              key={s}
              onClick={() => isAvailable && setReservation({ ...reservation, size: s })}
              disabled={!isAvailable}
              className={`text-left rounded-xl border p-4 transition ${
                isSelected
                  ? 'border-green-primary bg-green-bg'
                  : isAvailable
                  ? 'border-brand-border bg-white hover:border-green-primary/40'
                  : 'border-brand-border bg-brand-off opacity-50 cursor-not-allowed'
              }`}
            >
              <info.icon
                size={24}
                className={isSelected ? 'text-green-primary' : 'text-brand-gray'}
              />
              <p className="font-heading font-bold text-lg text-brand-gray mt-3">
                {info.label}
              </p>
              <p className="font-body text-sm text-brand-sub mb-2">{info.desc}</p>
              <p className="font-mono text-xs text-green-primary">
                {info.price} / 48h
              </p>
            </button>
          )
        })}
      </div>

      {/* Durée — unique : dépôt de 48h. */}
      <p className="font-mono text-xs tracking-widest text-brand-mid uppercase mb-3">
        Durée
      </p>
      <div className="mb-8 inline-flex items-center gap-2.5 rounded-xl border border-green-primary bg-green-bg px-4 py-3">
        <span className="font-body font-medium text-green-dark">48 heures</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-mid">
          durée unique
        </span>
      </div>

      {/* Téléphone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="tel-destinataire"
            className="font-mono text-xs tracking-widest text-brand-mid uppercase mb-2 block"
          >
            Téléphone destinataire *
          </label>
          <input
            id="tel-destinataire"
            name="tel"
            type="tel"
            // Clavier numérique et remplissage automatique sur mobile.
            inputMode="tel"
            autoComplete="tel"
            value={reservation.phone}
            onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
            placeholder="+225 07 00 00 00 00"
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white font-body text-base text-brand-gray focus:border-green-primary focus:outline-none transition"
          />
        </div>
        <div>
          <label className="font-mono text-xs tracking-widest text-brand-mid uppercase mb-2 block">
            Message (optionnel)
          </label>
          <input
            type="text"
            value={reservation.message}
            onChange={(e) => setReservation({ ...reservation, message: e.target.value })}
            placeholder="Bonjour, votre colis est prêt"
            className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white font-body text-brand-gray focus:border-green-primary focus:outline-none transition"
          />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Étape 3 — paiement
// ---------------------------------------------------------------------------
function StepPayment({
  reservation,
  setReservation,
  total,
}: {
  reservation: Reservation
  setReservation: (r: Reservation) => void
  total: number
}) {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-gray mb-2">
        Paiement
      </h2>
      <p className="font-body text-brand-sub mb-8">
        Indiquez votre moyen de paiement préféré. Le règlement est finalisé avec
        notre équipe à la confirmation de votre créneau.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Méthodes */}
        <div className="md:col-span-2 space-y-3">
          {paymentMethods.map((m) => {
            const isSelected = reservation.payment === m.id
            return (
              <button
                key={m.id}
                onClick={() => setReservation({ ...reservation, payment: m.id })}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition text-left ${
                  isSelected
                    ? 'border-green-primary bg-green-bg'
                    : 'border-brand-border bg-white hover:border-green-primary/40'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-green-primary text-white' : 'bg-brand-off text-brand-gray'
                  }`}
                >
                  <m.icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-body font-semibold text-brand-gray">{m.label}</p>
                  <p className="font-mono text-[11px] text-brand-mid uppercase tracking-widest">
                    Réglé à la confirmation
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-green-primary bg-green-primary'
                      : 'border-brand-border'
                  }`}
                >
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Récapitulatif */}
        <aside className="bg-brand-off rounded-2xl p-6 border border-brand-border h-fit">
          <p className="font-mono text-xs tracking-widest text-brand-mid uppercase mb-4">
            Récapitulatif
          </p>
          <Summary label="Locker" value={reservation.locker?.name ?? '—'} />
          <Summary
            label="Taille"
            value={reservation.size ? sizesInfo[reservation.size].label : '—'}
          />
          <Summary
            label="Durée"
            value={
              reservation.duration ? durationsInfo[reservation.duration].label : '—'
            }
          />
          <div className="border-t border-brand-border my-4" />
          <div className="flex items-center justify-between">
            <p className="font-body font-semibold text-brand-gray">Total TTC</p>
            <p className="font-heading font-bold text-2xl text-green-primary">
              {total.toLocaleString('fr-FR')} FCFA
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="font-body text-sm text-brand-sub">{label}</p>
      <p className="font-body text-sm text-brand-gray font-medium">{value}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Étape 4 — confirmation
// ---------------------------------------------------------------------------
function StepConfirmation({
  reservation,
  code,
  total,
}: {
  reservation: Reservation
  code: string
  total: number
}) {
  // Message WhatsApp pré-rempli pour finaliser la demande avec un conseiller.
  const waText = [
    'Bonjour Afribox 👋',
    'Je souhaite finaliser ma réservation de locker :',
    `• Locker : ${reservation.locker?.name} — ${reservation.locker?.address}`,
    `• Taille : ${reservation.size ? sizesInfo[reservation.size].label : '—'}`,
    `• Durée : ${reservation.duration ? durationsInfo[reservation.duration].label : '—'}`,
    `• Total : ${total.toLocaleString('fr-FR')} FCFA`,
    `• Tél. destinataire : ${reservation.phone}`,
    reservation.message ? `• Message : ${reservation.message}` : null,
    `• Réf. demande : ${code}`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  return (
    <div className="text-center max-w-xl mx-auto py-6">
      <div className="w-16 h-16 rounded-full bg-green-primary text-white flex items-center justify-center mx-auto mb-6">
        <Check size={32} />
      </div>
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-gray mb-3">
        Votre demande est envoyée.
      </h2>
      <p className="font-body text-brand-sub mb-8">
        Finalisez votre réservation en un clic sur WhatsApp : notre équipe
        confirme votre créneau et vous envoie le code de dépôt.
      </p>

      <div className="bg-green-bg border border-green-soft rounded-2xl p-8 mb-6">
        <p className="font-mono text-xs tracking-widest text-green-dark uppercase mb-4">
          Numéro de demande
        </p>
        <p className="font-mono text-5xl md:text-6xl font-bold text-green-primary tracking-widest">
          {code}
        </p>
      </div>

      <div className="bg-brand-off rounded-2xl p-6 border border-brand-border mb-8 text-left">
        <p className="font-mono text-xs tracking-widest text-brand-mid uppercase mb-3">
          Adresse du locker
        </p>
        <p className="font-body font-semibold text-brand-gray mb-1">
          {reservation.locker?.name}
        </p>
        <p className="font-body text-sm text-brand-sub">
          {reservation.locker?.address}
        </p>
      </div>

      <a
        href={whatsappUrl(waText)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-fill [--fill:#1B5E20] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-green-primary text-white font-body font-medium"
      >
        <Image
          src="/images/whatsapp.png"
          alt=""
          width={20}
          height={20}
          className="w-5 h-5 flex-shrink-0"
        />
        Finaliser sur WhatsApp
      </a>

      <div className="mt-5">
        <a
          href="/reserver"
          className="font-body text-sm text-brand-sub hover:text-green-primary underline transition"
        >
          Nouvelle réservation
        </a>
      </div>
    </div>
  )
}
