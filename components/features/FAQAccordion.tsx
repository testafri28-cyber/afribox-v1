'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faq } from '@/lib/constants'

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-brand-border border-y border-brand-border">
      {faq.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
            >
              <span className="font-heading font-semibold text-lg md:text-xl text-brand-gray group-hover:text-green-primary transition">
                {item.q}
              </span>
              <span
                className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition ${
                  isOpen
                    ? 'bg-green-primary text-white'
                    : 'bg-brand-off text-brand-gray group-hover:bg-green-soft group-hover:text-green-dark'
                }`}
              >
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-brand-sub leading-relaxed pb-6 max-w-3xl">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
