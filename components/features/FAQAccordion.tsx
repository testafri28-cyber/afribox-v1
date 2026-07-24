'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faq } from '@/lib/constants'

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {faq.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.q}
            className={`rounded-2xl border bg-white transition-colors ${
              isOpen
                ? 'border-green-primary shadow-[0_18px_40px_-26px_rgba(11,61,27,0.4)]'
                : 'border-brand-border hover:border-green-primary/40'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-5 p-5 md:p-6 text-left group"
            >
              <span
                className={`font-heading font-semibold text-base md:text-lg transition-colors ${
                  isOpen ? 'text-green-dark' : 'text-brand-gray group-hover:text-green-primary'
                }`}
              >
                {item.q}
              </span>
              <span
                className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
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
                  <p className="font-body text-brand-sub leading-relaxed px-5 md:px-6 pb-5 md:pb-6 -mt-1">
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
