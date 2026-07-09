'use client'

import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'hover' | 'button' | 'image'

export default function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const trailsRef  = useRef<HTMLDivElement[]>([])

  const pos        = useRef({ x: -100, y: -100 })
  const ring       = useRef({ x: -100, y: -100 })
  const trails     = useRef<Array<{ x: number; y: number }>>([])
  const state      = useRef<CursorState>('default')
  const labelText  = useRef('')
  const rafId      = useRef<number>(0)
  const TRAIL_N    = 6

  // Initialise les positions de traîne
  for (let i = 0; i < TRAIL_N; i++) trails.current[i] = { x: -100, y: -100 }

  useEffect(() => {
    // Ne pas activer sur touch devices
    if (window.matchMedia('(hover: none)').matches) return
    // Respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Cacher le curseur natif sur tout le site
    document.documentElement.style.cursor = 'none'

    // Suivi souris
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform =
          `translate(${e.clientX + 14}px, ${e.clientY - 10}px)`
      }
    }

    // Boucle d'animation fluide
    const animate = () => {
      // Anneau avec lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      }

      // Traîne
      let px = pos.current.x
      let py = pos.current.y
      trails.current.forEach((t, i) => {
        const lag = 0.35 - i * 0.04
        t.x += (px - t.x) * lag
        t.y += (py - t.y) * lag
        const el = trailsRef.current[i]
        if (el) {
          el.style.transform = `translate(${t.x - 2}px, ${t.y - 2}px)`
        }
        px = t.x
        py = t.y
      })

      rafId.current = requestAnimationFrame(animate)
    }

    const setState = (s: CursorState) => {
      state.current = s
      const c = cursorRef.current
      const r = ringRef.current
      if (!c || !r) return

      // Reset classes
      c.className = 'afribox-cursor'
      r.className = 'afribox-cursor-ring'

      if (s === 'hover') {
        c.classList.add('state-hover')
        r.classList.add('state-hover')
      } else if (s === 'button') {
        c.classList.add('state-button')
        r.classList.add('state-button')
      } else if (s === 'image') {
        c.classList.add('state-hover')
        r.classList.add('state-hover')
      }
    }

    const showLabel = (text: string) => {
      labelText.current = text
      if (labelRef.current) {
        labelRef.current.textContent = text
        labelRef.current.style.opacity = '1'
      }
    }

    const hideLabel = () => {
      labelText.current = ''
      if (labelRef.current) {
        labelRef.current.style.opacity = '0'
      }
    }

    // Gestion des états hover
    const applyHover = (el: Element) => {
      const tag  = el.tagName.toLowerCase()
      const role = el.getAttribute('role')
      const data = el.getAttribute('data-cursor')
      const lbl  = el.getAttribute('data-cursor-label')

      // Boutons et liens
      if (tag === 'button' || tag === 'a' || role === 'button' || data === 'button') {
        setState('button')
      }
      // Images et zones avec label
      else if (tag === 'img' || data === 'image') {
        setState('image')
        if (lbl) showLabel(lbl)
      }
      // Cards, sections interactives
      else if (
        el.classList.contains('cursor-hover') ||
        data === 'hover' ||
        tag === 'article'
      ) {
        setState('hover')
      }
      // Label custom sur n'importe quel élément
      if (lbl && !labelText.current) showLabel(lbl)
    }

    // Event delegation sur tous les éléments interactifs
    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element
      // Remonter dans le DOM pour trouver l'élément interactif
      let el: Element | null = target
      while (el && el !== document.body) {
        const tag  = el.tagName.toLowerCase()
        const data = el.getAttribute('data-cursor')
        if (
          tag === 'button' || tag === 'a' || tag === 'img' ||
          el.getAttribute('role') === 'button' ||
          data !== null
        ) {
          applyHover(el)
          return
        }
        el = el.parentElement
      }
    }

    const onLeave = () => {
      setState('default')
      hideLabel()
    }

    // Éléments à surveiller
    const targets = document.querySelectorAll(
      'button, a, [data-cursor], [role="button"], .cursor-hover'
    )
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter as EventListener)
      el.addEventListener('mouseleave', onLeave)
    })

    // MutationObserver pour les éléments ajoutés dynamiquement
    const observer = new MutationObserver(() => {
      document.querySelectorAll(
        'button:not([data-cursor-bound]), a:not([data-cursor-bound])'
      ).forEach((el) => {
        el.addEventListener('mouseenter', onEnter as EventListener)
        el.addEventListener('mouseleave', onLeave)
        el.setAttribute('data-cursor-bound', 'true')
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
      document.documentElement.style.cursor = ''
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter as EventListener)
        el.removeEventListener('mouseleave', onLeave)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Point central */}
      <div ref={cursorRef} className="afribox-cursor" aria-hidden="true" />

      {/* Anneau suiveur */}
      <div ref={ringRef} className="afribox-cursor-ring" aria-hidden="true" />

      {/* Label contextuel */}
      <div ref={labelRef} className="afribox-cursor-label" aria-hidden="true" />

      {/* Traîne */}
      {Array.from({ length: TRAIL_N }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailsRef.current[i] = el }}
          className="afribox-cursor-trail"
          style={{
            opacity: (1 - i / TRAIL_N) * 0.35,
            width:  `${4 - i * 0.4}px`,
            height: `${4 - i * 0.4}px`,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}
