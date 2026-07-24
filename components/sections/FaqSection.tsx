'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import FAQAccordion from '@/components/features/FAQAccordion'
import { fadeInUp } from '@/lib/animations'
import { contact } from '@/lib/constants'

export default function FaqSection() {
  return (
    <section id="faq" className="bg-brand-off">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Rail gauche — titre + carte support (collant au scroll en desktop) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
            className="lg:col-span-1 lg:sticky lg:top-28 self-start"
          >
            <SectionLabel className="mb-4">FAQ</SectionLabel>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-brand-gray">
              Questions fréquentes.
            </h2>
            <p className="font-body text-brand-sub mt-4 leading-relaxed">
              Tout ce qu&apos;il faut savoir avant de réserver un locker.
            </p>

            <div className="mt-7 rounded-2xl border border-brand-border bg-white p-5">
              <p className="font-heading font-semibold text-brand-gray">
                Une autre question&nbsp;?
              </p>
              <p className="font-body text-sm text-brand-sub mt-1 mb-4 leading-relaxed">
                Notre équipe répond sous 24h — ou tout de suite sur WhatsApp.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green-bg px-4 py-2 font-body text-sm font-medium text-green-dark hover:bg-green-soft transition-colors"
                >
                  <Image
                    src="/images/whatsapp.png"
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  WhatsApp
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-brand-border px-4 py-2 font-body text-sm font-medium text-brand-gray hover:border-green-primary/40 hover:text-green-dark transition-colors"
                >
                  Nous écrire
                </a>
              </div>
            </div>
          </motion.div>

          {/* Accordéon en cartes */}
          <div className="lg:col-span-2">
            <FAQAccordion />
          </div>
        </div>
      </Container>
    </section>
  )
}
