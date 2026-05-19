'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Check, Loader2, Send } from 'lucide-react'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  subject: string
  message: string
}

const roles = [
  'Particulier',
  'Marchand / E-commerce',
  'Entreprise',
  'Partenaire / Investisseur',
  'Presse',
  'Autre',
]

const subjects = [
  'Question générale',
  'Devenir partenaire',
  'Support technique',
  'Demande de devis',
  'Presse / Communication',
  'Autre',
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-bg border border-green-soft rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-primary text-white flex items-center justify-center mx-auto mb-5">
          <Check size={28} />
        </div>
        <h3 className="font-heading font-bold text-2xl text-brand-gray mb-2">
          Message bien reçu.
        </h3>
        <p className="font-body text-brand-sub mb-6">
          Notre équipe vous répond sous 24h ouvrées.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-body text-sm font-medium text-green-primary hover:text-green-dark underline transition"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Prénom *" error={errors.firstName?.message}>
          <input
            {...register('firstName', { required: 'Requis' })}
            className="input"
          />
        </Field>
        <Field label="Nom *" error={errors.lastName?.message}>
          <input
            {...register('lastName', { required: 'Requis' })}
            className="input"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Email *" error={errors.email?.message}>
          <input
            type="email"
            {...register('email', {
              required: 'Requis',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Email invalide' },
            })}
            className="input"
          />
        </Field>
        <Field label="Téléphone" error={errors.phone?.message}>
          <input type="tel" {...register('phone')} className="input" />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Vous êtes *" error={errors.role?.message}>
          <select
            {...register('role', { required: 'Requis' })}
            className="input"
            defaultValue=""
          >
            <option value="" disabled>
              Choisir…
            </option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field label="Sujet *" error={errors.subject?.message}>
          <select
            {...register('subject', { required: 'Requis' })}
            className="input"
            defaultValue=""
          >
            <option value="" disabled>
              Choisir…
            </option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message *" error={errors.message?.message}>
        <textarea
          {...register('message', { required: 'Requis', minLength: 10 })}
          rows={5}
          placeholder="Dites-nous comment nous pouvons vous aider…"
          className="input resize-none"
        />
      </Field>

      {status === 'error' && (
        <p className="font-body text-sm text-red-600">
          Une erreur est survenue. Merci de réessayer.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-primary text-white font-body font-medium hover:bg-green-dark transition disabled:opacity-50"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            Envoyer le message
            <Send size={16} />
          </>
        )}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #ebebeb;
          background-color: #fff;
          font-family: inherit;
          color: #2f2f2f;
          transition: border-color 0.15s;
        }
        .input:focus {
          outline: none;
          border-color: #27ae60;
        }
      `}</style>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="font-mono text-xs tracking-widest text-brand-mid uppercase mb-2 block">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}
