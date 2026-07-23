'use client'

import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'hover' | 'button' | 'image'
type Magnet = { cx: number; cy: number; w: number; h: number; r: number }

/* Curseur personnalisé — l'anneau suit avec un léger retard et « épouse » les
   boutons au survol (snap) ; un point exact marque la position réelle.
   Désactivé sur écrans tactiles et si l'utilisateur réduit les animations. */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const labelRef  = useRef<HTMLDivElement>(null)

  const pos       = useRef({ x: -100, y: -100 })
  const ring      = useRef({ x: -100, y: -100 })
  const magnet    = useRef<Magnet | null>(null)
  const labelText = useRef('')
  const rafId     = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.documentElement.style.cursor = 'none'

    const setXY = (el: HTMLElement | null, x: number, y: number) => {
      if (el) el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY - 8}px)`
      }
    }

    const animate = () => {
      // Le point suit le pointeur au pixel près.
      setXY(cursorRef.current, pos.current.x, pos.current.y)
      // L'anneau suit avec retard, ou se cale au centre du bouton aimanté.
      const t = magnet.current ? { x: magnet.current.cx, y: magnet.current.cy } : pos.current
      const speed = magnet.current ? 0.25 : 0.18
      ring.current.x = lerp(ring.current.x, t.x, speed)
      ring.current.y = lerp(ring.current.y, t.y, speed)
      setXY(ringRef.current, ring.current.x, ring.current.y)
      rafId.current = requestAnimationFrame(animate)
    }

    // La taille/forme du snap est posée en JS (dépend du bouton survolé).
    const clearShape = () => {
      const r = ringRef.current
      if (r) { r.style.width = ''; r.style.height = ''; r.style.borderRadius = '' }
    }
    const applySnap = () => {
      const mg = magnet.current
      const r = ringRef.current
      if (!mg || !r) return
      r.style.width = `${mg.w + 6}px`
      r.style.height = `${mg.h + 6}px`
      r.style.borderRadius = `${mg.r + 3}px`
    }

    const setState = (s: CursorState) => {
      const c = cursorRef.current
      const r = ringRef.current
      if (!c || !r) return
      c.className = 'afribox-cursor'
      r.className = 'afribox-cursor-ring'
      clearShape()
      if (s === 'button') {
        c.classList.add('state-snap')
        r.classList.add('state-snap')
        applySnap()
      } else if (s === 'hover' || s === 'image') {
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
      if (labelRef.current) labelRef.current.style.opacity = '0'
    }

    const applyHover = (el: Element) => {
      const tag  = el.tagName.toLowerCase()
      const role = el.getAttribute('role')
      const data = el.getAttribute('data-cursor')
      const lbl  = el.getAttribute('data-cursor-label')

      if (tag === 'button' || tag === 'a' || role === 'button' || data === 'button') {
        const rect = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        magnet.current = {
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
          w: rect.width,
          h: rect.height,
          r: parseFloat(cs.borderRadius) || 8,
        }
        setState('button')
      } else if (tag === 'img' || data === 'image') {
        magnet.current = null
        setState('image')
        if (lbl) showLabel(lbl)
      } else if (el.classList.contains('cursor-hover') || data === 'hover' || tag === 'article') {
        magnet.current = null
        setState('hover')
      }
      if (lbl && !labelText.current) showLabel(lbl)
    }

    const onEnter = (e: MouseEvent) => {
      let el: Element | null = e.target as Element
      while (el && el !== document.body) {
        const tag  = el.tagName.toLowerCase()
        const data = el.getAttribute('data-cursor')
        if (
          tag === 'button' || tag === 'a' || tag === 'img' ||
          el.getAttribute('role') === 'button' || data !== null
        ) {
          applyHover(el)
          return
        }
        el = el.parentElement
      }
    }
    const onLeave = () => {
      magnet.current = null
      setState('default')
      hideLabel()
    }

    // Feedback au clic : léger pincement de l'anneau.
    const onDown = () => ringRef.current?.classList.add('is-down')
    const onUp   = () => ringRef.current?.classList.remove('is-down')

    const bind = (el: Element) => {
      el.addEventListener('mouseenter', onEnter as EventListener)
      el.addEventListener('mouseleave', onLeave)
    }
    const targets = document.querySelectorAll('button, a, [data-cursor], [role="button"], .cursor-hover')
    targets.forEach(bind)

    // Éléments ajoutés dynamiquement (contenu révélé au scroll, etc.).
    const observer = new MutationObserver(() => {
      document.querySelectorAll(
        'button:not([data-cursor-bound]), a:not([data-cursor-bound])',
      ).forEach((el) => {
        bind(el)
        el.setAttribute('data-cursor-bound', 'true')
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
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
      <div ref={cursorRef} className="afribox-cursor" aria-hidden="true" />
      <div ref={ringRef} className="afribox-cursor-ring" aria-hidden="true" />
      <div ref={labelRef} className="afribox-cursor-label" aria-hidden="true" />
    </>
  )
}
