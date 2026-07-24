'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { testimonials, type Testimonial } from '@/lib/constants'

export default function TestimonialSection() {
  // Duplique la liste pour un défilement seamless.
  // L'animation va de 0 à -50%, ce qui aligne exactement le 2e bloc sur le 1er.
  const loop = [...testimonials, ...testimonials]

  return (
    <section className="bg-brand-off overflow-hidden">
      {/* pt réduit : suit Pourquoi (gris) — évite le vide doublé au joint de même couleur */}
      <Container className="pt-6 md:pt-10 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionLabel className="mb-4">Témoignages</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray max-w-3xl">
            Ils nous font confiance.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-sub mt-4 max-w-2xl">
            Marchands, opérateurs et boutiques partenaires — voici ce qu&apos;ils
            en disent.
          </p>
        </motion.div>
      </Container>

      {/* Carrousel — full bleed, dépasse le Container */}
      <div className="relative group pb-16 md:pb-24">
        {/* Fade gauche/droite pour masquer les bords */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #F7F9F7 0%, rgba(247,249,247,0) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, #F7F9F7 0%, rgba(247,249,247,0) 100%)',
          }}
        />

        <div
          className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]"
          // Hint au navigateur — la transformation est animée en continu
          style={{ willChange: 'transform' }}
        >
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="relative flex-shrink-0 w-[340px] md:w-[400px] bg-white border border-brand-border rounded-2xl p-7 md:p-8 shadow-[0_14px_36px_-22px_rgba(11,61,27,0.4)]">
      {/* Guillemet décoratif */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 right-6 font-heading text-6xl leading-none text-green-primary/15 select-none"
      >
        &rdquo;
      </span>

      <div className="relative">
        {/* Note */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="text-green-primary" fill="currentColor" />
            ))}
          </div>
          <span className="font-heading font-bold text-sm text-brand-gray">5,0</span>
        </div>

        {/* Citation */}
        <p className="font-body text-[15px] md:text-base text-brand-gray leading-relaxed mb-7 min-h-[6.5rem]">
          {testimonial.quote}
        </p>

        {/* Auteur */}
        <div className="flex items-center gap-3 pt-5 border-t border-brand-border">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-primary to-green-dark text-white font-heading font-bold text-sm flex items-center justify-center flex-shrink-0 ring-2 ring-green-soft">
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="font-body font-semibold text-brand-gray text-sm">
              {testimonial.name}
            </p>
            <p className="font-body text-xs text-brand-sub">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
