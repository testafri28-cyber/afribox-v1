'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { appFeatures } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const phoneItem = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.6 + i * 0.12 },
  }),
}

export default function AppDownloadSection() {
  return (
    <section id="app-mobile" className="bg-white">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel className="mb-4">L&apos;application</SectionLabel>
              <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight text-brand-gray mb-4">
                Vos lockers dans votre poche.
              </h2>
              <p className="font-body text-lg text-brand-sub leading-relaxed mb-8">
                Gérez vos envois, suivez vos colis et récupérez vos codes directement depuis l&apos;appli Afribox.
              </p>
            </motion.div>

            <motion.ul variants={staggerContainer} className="space-y-4 mb-8">
              {appFeatures.map(({ icon: Icon, label }) => (
                <motion.li
                  key={label}
                  variants={fadeInUp}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    className="w-9 h-9 rounded-xl bg-green-bg flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={16} className="text-green-primary" />
                  </motion.div>
                  <span className="font-body text-brand-gray">{label}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-brand-gray text-white font-body text-sm font-medium rounded-full px-5 py-2.5 hover:bg-brand-gray/90 transition"
              >
                <Download size={16} />
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-green-primary text-white font-body text-sm font-medium rounded-full px-5 py-2.5 hover:bg-green-dark transition"
              >
                <Download size={16} />
                Google Play
              </a>
            </motion.div>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-[480px] bg-brand-gray rounded-[3rem] border-4 border-brand-gray shadow-2xl overflow-hidden">
              <div className="absolute inset-2 rounded-[2.5rem] bg-green-bg flex flex-col items-center justify-center p-5 text-center overflow-hidden">

                {/* Logo du téléphone — pop in */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
                  className="w-16 h-16 rounded-2xl bg-green-primary text-white flex items-center justify-center mb-4"
                >
                  <span className="font-heading font-bold text-2xl">A</span>
                </motion.div>

                {/* Titre */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.45 }}
                  className="font-heading font-bold text-xl text-brand-gray mb-0.5"
                >
                  Afribox
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.52 }}
                  className="font-mono text-[9px] tracking-widest text-green-primary uppercase mb-6"
                >
                  Smart Locker Network
                </motion.p>

                {/* Feature cards — défilent un par un */}
                <div className="w-full space-y-2.5">
                  {appFeatures.map(({ icon: Icon, label }, i) => (
                    <motion.div
                      key={label}
                      custom={i}
                      variants={phoneItem}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-center gap-2 bg-white rounded-xl p-2.5"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{
                          duration: 1.8,
                          delay: 1 + i * 0.25,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'easeInOut',
                        }}
                        className="w-7 h-7 rounded-lg bg-green-bg flex items-center justify-center flex-shrink-0"
                      >
                        <Icon size={12} className="text-green-primary" />
                      </motion.div>
                      <span className="font-body text-xs text-brand-gray truncate">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
