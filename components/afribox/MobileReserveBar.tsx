'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { contact } from '@/lib/constants'

/**
 * Barre d'action permanente sur mobile.
 *
 * Le menu étant replié en hamburger sous md, le bouton « Réserver » du header
 * n'est plus visible pendant le défilement : cette barre prend le relais.
 * Elle n'apparaît qu'une fois le hero passé, pour ne pas doubler son bouton.
 */
export default function MobileReserveBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const apresHero = window.scrollY > window.innerHeight * 0.75
      // On s'efface tout en bas pour ne pas masquer la fin du footer
      // (mentions légales, liens de bas de page).
      const restant =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight
      setVisible(apresHero && restant > 140)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      // z-40 : passe sous le chat Locky (z-60), qui est remonté au-dessus.
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand-off/95 px-4 pt-3 backdrop-blur-lg transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous écrire sur WhatsApp"
          className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl border border-brand-border bg-brand-white active:scale-[0.97]"
        >
          <Image
            src="/images/whatsapp.png"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] flex-shrink-0"
          />
        </a>

        {/* Marge à droite : laisse respirer la bulle de chat Locky. */}
        <Link
          href="/reserver"
          tabIndex={visible ? undefined : -1}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-green-dark text-[15px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(27,94,32,0.45)] active:scale-[0.99]"
        >
          Réserver un locker
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
