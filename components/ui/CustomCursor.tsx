'use client'

import { useEffect, useRef } from 'react'

type CursorState = 'default' | 'hover' | 'button' | 'image'

/* Curseur personnalisé — point exact + anneau qui suit avec un léger retard.
   En blanc + mix-blend-mode: difference : la couleur s'inverse selon le fond
   (sombre sur le blanc, clair sur le hero vert) → toujours lisible.
   Désactivé sur écrans tactiles et si l'utilisateur réduit les animations. */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const labelRef  = useRef<HTMLDivElement>(null)

  const pos       = useRef({ x: -100, y: -100 })
  const ring      = useRef({ x: -100, y: -100 })
  const labelText = useRef('')
  const rafId     = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY - 8}px)`
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    const setState = (s: CursorState) => {
      const c = cursorRef.current
      const r = ringRef.current
      if (!c || !r) return
      c.className = 'afribox-cursor'
      r.className = 'afribox-cursor-ring'
      if (s === 'button') {
        c.classList.add('state-button')
        r.classList.add('state-button')
      } else if (s === 'hover' || s === 'image') {
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
      if (labelRef.current) labelRef.current.style.opacity = '0'
    }

    const applyHover = (el: Element) => {
      const tag  = el.tagName.toLowerCase()
      const role = el.getAttribute('role')
      const data = el.getAttribute('data-cursor')
      const lbl  = el.getAttribute('data-cursor-label')

      if (tag === 'button' || tag === 'a' || role === 'button' || data === 'button') {
        setState('button')
      } else if (tag === 'img' || data === 'image') {
        setState('image')
        if (lbl) showLabel(lbl)
      } else if (el.classList.contains('cursor-hover') || data === 'hover' || tag === 'article') {
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
      setState('default')
      hideLabel()
    }

    // Feedback au clic : léger pincement du point et de l'anneau.
    const onDown = () => {
      cursorRef.current?.classList.add('is-down')
      ringRef.current?.classList.add('is-down')
    }
    const onUp = () => {
      cursorRef.current?.classList.remove('is-down')
      ringRef.current?.classList.remove('is-down')
    }

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
