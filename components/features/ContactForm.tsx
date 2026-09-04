'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Check, Loader2, Send, MessageCircle, ChevronDown, ShieldCheck } from 'lucide-react'
import { submitLead, whatsappUrl } from '@/lib/leads'
import { useDict } from '@/lib/i18n/LocaleProvider'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  subject: string
  message: string
}

// Rôles et sujets viennent du dictionnaire (voir plus bas dans le composant).

export default function ContactForm() {
  const d = useDict()
  const roles = d.ui.contactForm.roles
  const subjects = d.ui.contactForm.subjects
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  )
  const [waHref, setWaHref] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus('sending')

    // Message WhatsApp pré-rempli (canal immédiat + secours).
    const waText = [
      d.ui.contactWa.greeting,
      d.ui.contactWa.intro,
      `• ${d.ui.contactWa.name} : ${data.firstName} ${data.lastName}`,
      `• ${d.ui.contactWa.email} : ${data.email}`,
      data.phone ? `• ${d.ui.contactForm.phone} : ${data.phone}` : null,
      `• ${d.ui.contactWa.profile} : ${data.role}`,
      `• ${d.ui.contactWa.subject} : ${data.subject}`,
      '',
      data.message,
    ]
      .filter((l) => l !== null)
      .join('\n')
    setWaHref(whatsappUrl(waText))

    // Persistance côté serveur (Google Sheet). Best-effort : même en cas
    // d'échec on affiche le succès, WhatsApp restant proposé.
    await submitLead({ type: 'contact', ...data })
    setStatus('success')
    reset()
  }

  if (status === 'success') {
    return (
      <div className="bg-green-bg border border-green-soft rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-primary text-white flex items-center justify-center mx-auto mb-5">
          <Check size={28} />
        </div>
        <h3 className="font-heading font-bold text-2xl text-brand-gray mb-2">
          {d.ui.contactForm.sentTitle}
        </h3>
        <p className="font-body text-brand-sub mb-6">
          {d.ui.contactForm.sentLede}
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-fill [--fill:#1B5E20] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-primary text-white font-body font-medium"
        >
          <MessageCircle size={16} />
          {d.ui.contactForm.continueWhatsApp}
        </a>
        <div className="mt-5">
          <button
            onClick={() => setStatus('idle')}
            className="font-body text-sm font-medium text-green-primary hover:text-green-dark underline transition"
          >
            {d.ui.contactForm.sendAnother}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 space-y-5 shadow-[0_28px_70px_-38px_rgba(11,61,27,0.45)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={d.ui.contactForm.firstName} error={errors.firstName?.message}>
          <input
            {...register('firstName', { required: d.ui.contactForm.required })}
            className="input"
          />
        </Field>
        <Field label={d.ui.contactForm.lastName} error={errors.lastName?.message}>
          <input
            {...register('lastName', { required: d.ui.contactForm.required })}
            className="input"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={d.ui.contactForm.email} error={errors.email?.message}>
          <input
            type="email"
            {...register('email', {
              required: d.ui.contactForm.required,
              pattern: { value: /\S+@\S+\.\S+/, message: d.ui.contactForm.invalidEmail },
            })}
            className="input"
          />
        </Field>
        <Field label={d.ui.contactForm.phone} error={errors.phone?.message}>
          <input type="tel" {...register('phone')} className="input" />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label={d.ui.contactForm.role} error={errors.role?.message}>
          <div className="relative">
            <select
              {...register('role', { required: d.ui.contactForm.required })}
              className="input select"
              defaultValue=""
            >
              <option value="" disabled>
                {d.ui.contactForm.choose}
              </option>
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-mid"
            />
          </div>
        </Field>
        <Field label={d.ui.contactForm.subject} error={errors.subject?.message}>
          <div className="relative">
            <select
              {...register('subject', { required: d.ui.contactForm.required })}
              className="input select"
              defaultValue=""
            >
              <option value="" disabled>
                {d.ui.contactForm.choose}
              </option>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-mid"
            />
          </div>
        </Field>
      </div>

      <Field label={d.ui.contactForm.message} error={errors.message?.message}>
        <textarea
          {...register('message', { required: d.ui.contactForm.required, minLength: 10 })}
          rows={5}
          placeholder={d.ui.contactForm.messagePlaceholder}
          className="input resize-none"
        />
      </Field>

      {status === 'error' && (
        <p className="font-body text-sm text-red-600">
          {d.ui.contactForm.error}
        </p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-fill [--fill:#1B5E20] group inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3.5 rounded-full bg-green-primary text-white font-body font-semibold shadow-[0_14px_30px_-12px_rgba(11,61,27,0.6)] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:pointer-events-none"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              {d.ui.contactForm.sending}
            </>
          ) : (
            <>
              {d.ui.contactForm.submit}
              <Send size={17} className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <p className="mt-3.5 flex items-center gap-1.5 font-body text-xs text-brand-mid">
          <ShieldCheck size={14} className="text-green-primary" />
          {d.ui.contactForm.footnote}
        </p>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 0.75rem;
          border: 1.5px solid #ebebeb;
          background-color: #f7f9f7;
          font-family: inherit;
          font-size: 0.95rem;
          color: #2f2f2f;
          transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
        }
        .input::placeholder {
          color: #9aa39d;
        }
        .input:hover {
          border-color: #d8ddd8;
        }
        .input:focus {
          outline: none;
          background-color: #ffffff;
          border-color: #27ae60;
          box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.12);
        }
        .select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          padding-right: 2.5rem;
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
  const required = label.trim().endsWith('*')
  const text = required ? label.replace(/\s*\*\s*$/, '') : label
  return (
    <div>
      <label className="font-mono text-[11px] tracking-widest text-brand-mid uppercase mb-2 flex items-center gap-1">
        {text}
        {required && <span className="text-green-primary">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}
