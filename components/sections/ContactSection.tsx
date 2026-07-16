'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import ContactForm from '@/components/features/ContactForm'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const contactInfo = [
  { icon: Mail,   label: 'Email',     value: 'hello@afribox.co' },
  { icon: Phone,  label: 'Téléphone', value: '+225 07 89 44 44 41' },
  { icon: MapPin, label: 'Adresse',   value: 'Abidjan, Côte d\'Ivoire' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left — info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel className="mb-4">Contact</SectionLabel>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl leading-tight text-brand-gray mb-4">
                Parlons de votre projet.
              </h2>
              <p className="font-body text-base md:text-lg text-brand-sub leading-relaxed mb-8 md:mb-10">
                Marchand, entreprise, investisseur ou simple curieux — notre équipe répond sous 24h ouvrées.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <motion.div key={label} variants={fadeInUp} className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.18, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 12 }}
                    className="w-11 h-11 rounded-xl bg-green-bg flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={18} className="text-green-primary" />
                  </motion.div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-brand-mid uppercase">
                      {label}
                    </p>
                    <p className="font-body text-brand-gray font-medium">{value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
