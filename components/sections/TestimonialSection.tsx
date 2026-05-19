'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import GridBackground from '@/components/ui/GridBackground'
import { testimonials, type Testimonial } from '@/lib/constants'

export default function TestimonialSection() {
  // Duplique la liste pour un défilement seamless.
  // L'animation va de 0 à -50%, ce qui aligne exactement le 2e bloc sur le 1er.
  const loop = [...testimonials, ...testimonials]

  return (
    <section className="bg-brand-off overflow-hidden">
      <Container className="pt-16 md:pt-24 mb-12 md:mb-16">
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
    <article className="relative overflow-hidden flex-shrink-0 w-[320px] md:w-[380px] bg-white border border-brand-border rounded-2xl p-6 md:p-7 shadow-sm">
      <GridBackground tone="green" />
      <div className="relative">
        {/* Étoiles */}
        <div className="flex gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-green-primary"
              fill="currentColor"
            />
          ))}
        </div>

        {/* Citation */}
        <p className="font-body text-brand-gray leading-relaxed mb-6 min-h-[6rem]">
          &laquo;&nbsp;{testimonial.quote}&nbsp;&raquo;
        </p>

        {/* Auteur */}
        <div className="flex items-center gap-3 pt-5 border-t border-brand-border">
          <div className="w-10 h-10 rounded-full bg-green-primary text-white font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
            {testimonial.initials}
          </div>
          <div className="min-w-0">
            <p className="font-body font-semibold text-brand-gray text-sm truncate">
              {testimonial.name}
            </p>
            <p className="font-body text-xs text-brand-sub truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
