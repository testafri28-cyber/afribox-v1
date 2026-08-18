'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type LazyMountProps = {
  children: ReactNode
  /** Affiché tant que le contenu n'est pas monté (réserve la place). */
  placeholder?: ReactNode
  className?: string
  /** Marge d'anticipation : le montage démarre un peu avant l'entrée à l'écran. */
  rootMargin?: string
}

/**
 * Ne monte ses enfants qu'une fois le conteneur réellement visible.
 *
 * Utile pour les blocs lourds (carte Leaflet, iframes) : un élément masqué par
 * CSS — `hidden md:block` par exemple — n'entre jamais en intersection, donc
 * son contenu n'est jamais monté. Les mobiles ne paient pas le coût du desktop.
 */
export default function LazyMount({
  children,
  placeholder = null,
  className,
  rootMargin = '200px',
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return

    // Sans IntersectionObserver (très vieux navigateurs), on monte directement.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder}
    </div>
  )
}
