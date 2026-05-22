'use client'

import { useEffect, useRef } from 'react'

function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)) }

function setDoor(el: HTMLElement | null, open: boolean) {
  if (el) el.style.transform = open ? 'rotateY(-118deg)' : 'rotateY(0deg)'
}
function activateCell(el: HTMLElement | null | undefined, on: boolean) {
  if (el) el.style.boxShadow = on
    ? 'inset 0 0 0 2px #27ae60, 0 0 18px 4px rgba(39,174,96,0.28)'
    : ''
}
function showToast(el: HTMLElement | null, show: boolean) {
  if (!el) return
  el.style.opacity = show ? '1' : '0'
  el.style.transform = show
    ? 'translateX(-50%) translateY(0)'
    : 'translateX(-50%) translateY(-8px)'
}
function movePkg(el: HTMLElement | null, inside: boolean) {
  if (!el) return
  el.style.opacity = inside ? '1' : '0'
  el.style.transform = inside
    ? 'translateY(-50%) translateX(110px)'
    : 'translateY(-50%) translateX(0px)'
}

/* ── QR code SVG ─────────────────────────────────────── */
function QRCode() {
  return (
    <svg viewBox="0 0 21 21" width={38} height={38} xmlns="http://www.w3.org/2000/svg">
      <rect width={21} height={21} fill="#f0fdf4"/>
      <rect x={2} y={2} width={7} height={7} fill="none" stroke="#27ae60" strokeWidth={1}/>
      <rect x={3} y={3} width={5} height={5} fill="#27ae60"/>
      <rect x={12} y={2} width={7} height={7} fill="none" stroke="#27ae60" strokeWidth={1}/>
      <rect x={13} y={3} width={5} height={5} fill="#27ae60"/>
      <rect x={2} y={12} width={7} height={7} fill="none" stroke="#27ae60" strokeWidth={1}/>
      <rect x={3} y={13} width={5} height={5} fill="#27ae60"/>
      <rect x={12} y={12} width={3} height={3} fill="#27ae60"/>
      <rect x={16} y={12} width={3} height={3} fill="#27ae60"/>
      <rect x={12} y={16} width={3} height={3} fill="#27ae60"/>
      <rect x={16} y={16} width={3} height={3} fill="#27ae60"/>
    </svg>
  )
}

/* ── word cell (STOCKEZ / DÉPOSEZ / RÉCUPÉREZ) ───────── */
function WordCell({ id, word, withPkg, pkgInitIn }: {
  id?: string
  word: string
  withPkg?: boolean
  pkgInitIn?: boolean
}) {
  return (
    <div
      id={id}
      style={{
        position: 'relative',
        height: 52,
        background: '#0d3b1d',
        borderRadius: 6,
        border: '1.5px solid rgba(255,255,255,0.08)',
        perspective: '500px',
        flexShrink: 0,
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Interior shown when door opens */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 5,
        background: 'linear-gradient(135deg, rgba(39,174,96,0.1) 0%, rgba(39,174,96,0.03) 100%)',
      }}/>
      {/* Door */}
      <div
        data-door
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1a4a2a 0%, #0f3320 100%)',
          borderRadius: 5,
          transformOrigin: 'left center',
          transform: 'rotateY(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{
          fontSize: word.length > 7 ? 8 : 10,
          fontWeight: 800,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
        }}>
          {word}
        </span>
      </div>
      {/* Package */}
      {withPkg && (
        <div
          data-pkg
          style={{
            position: 'absolute',
            left: -90,
            top: '50%',
            width: 30, height: 24,
            transform: pkgInitIn
              ? 'translateY(-50%) translateX(110px)'
              : 'translateY(-50%) translateX(0px)',
            opacity: pkgInitIn ? 1 : 0,
            background: '#fff3e0',
            border: '1.5px solid #ffb74d',
            borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12,
            zIndex: 1,
            transition: 'opacity 0.4s, transform 0.9s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          📦
        </div>
      )}
    </div>
  )
}

/* ── main component ───────────────────────────────────── */
export default function LockerMockup() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false
    const root = wrapRef.current
    if (!root) return

    const depCell  = root.querySelector<HTMLElement>('#lm-dep')
    const pickCell = root.querySelector<HTMLElement>('#lm-pick')
    const depDoor  = depCell?.querySelector<HTMLElement>('[data-door]') ?? null
    const pickDoor = pickCell?.querySelector<HTMLElement>('[data-door]') ?? null
    const depPkg   = depCell?.querySelector<HTMLElement>('[data-pkg]') ?? null
    const pickPkg  = pickCell?.querySelector<HTMLElement>('[data-pkg]') ?? null
    const tDep     = root.querySelector<HTMLElement>('#lm-tdep')
    const tPick    = root.querySelector<HTMLElement>('#lm-tpick')

    let running = true

    async function runDeposit() {
      activateCell(depCell, true)
      showToast(tDep, true)
      await sleep(700)
      setDoor(depDoor, true)
      await sleep(650)
      movePkg(depPkg, true)
      await sleep(950)
      setDoor(depDoor, false)
      await sleep(500)
      showToast(tDep, false)
      activateCell(depCell, false)
    }

    async function runPickup() {
      activateCell(pickCell, true)
      showToast(tPick, true)
      await sleep(700)
      setDoor(pickDoor, true)
      await sleep(650)
      movePkg(pickPkg, false)
      await sleep(950)
      setDoor(pickDoor, false)
      await sleep(500)
      showToast(tPick, false)
      activateCell(pickCell, false)
    }

    async function loop() {
      await sleep(1000)
      while (running && !cancelRef.current) {
        await runDeposit()
        await sleep(1100)
        if (!running || cancelRef.current) break
        await runPickup()
        // Reset state: clear dep pkg, refill pick pkg (no animation)
        movePkg(depPkg, false)
        await sleep(300)
        if (pickPkg) {
          pickPkg.style.transition = 'none'
          movePkg(pickPkg, true)
          requestAnimationFrame(() => requestAnimationFrame(() => {
            if (pickPkg) pickPkg.style.transition = 'opacity 0.4s, transform 0.9s cubic-bezier(0.4,0,0.2,1)'
          }))
        }
        await sleep(1400)
      }
    }
    loop()

    return () => { running = false; cancelRef.current = true }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{ width: 540, position: 'relative', isolation: 'isolate' as const }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 28,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(39,174,96,0.22) 0%, transparent 72%)',
        animation: 'af-glow-locker 3s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* Toast — dépôt */}
      <div id="lm-tdep" style={{
        position: 'absolute', top: -44, left: '50%',
        transform: 'translateX(-50%) translateY(-8px)',
        background: '#27ae60', color: '#fff', borderRadius: 999,
        padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.3s, transform 0.3s',
        zIndex: 20, boxShadow: '0 4px 16px rgba(39,174,96,0.4)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }}/>
        Dépôt en cours
      </div>

      {/* Toast — retrait */}
      <div id="lm-tpick" style={{
        position: 'absolute', top: -44, left: '50%',
        transform: 'translateX(-50%) translateY(-8px)',
        background: '#1b5e20', color: '#fff', borderRadius: 999,
        padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.3s, transform 0.3s',
        zIndex: 20, boxShadow: '0 4px 16px rgba(27,94,32,0.4)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6fcf97', display: 'inline-block' }}/>
        Retrait en cours
      </div>

      {/* ── Locker body ──────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1,
        animation: 'af-float 5s ease-in-out infinite',
        display: 'grid',
        gridTemplateColumns: '140px 1fr 178px',
        borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(27,94,32,0.18), 0 2px 8px rgba(27,94,32,0.08)',
        border: '1.5px solid rgba(39,174,96,0.18)',
      }}>

        {/* ════ LEFT COLUMN ════════════════════════════ */}
        <div style={{
          background: 'linear-gradient(175deg, #0a2e14 0%, #1a4a2a 100%)',
          display: 'flex', flexDirection: 'column',
          borderRight: '1.5px solid rgba(255,255,255,0.07)',
          padding: '10px 8px', gap: 5,
        }}>
          {/* Row 1 — badges + pin */}
          <div style={{ display: 'flex', gap: 4, height: 96 }}>
            {/* SÛR / RAPIDE / 24/7 */}
            <div style={{
              flex: 1, background: '#0d3b1d', borderRadius: 6,
              border: '1.5px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              gap: 7, padding: '8px 7px',
            }}>
              {[
                { b: 'SÛR',    s: 'vos colis protégés', e: '🔒' },
                { b: 'RAPIDE', s: 'en toute simplicité', e: '⚡' },
                { b: '24/7',   s: 'disponible 24h/24',   e: '⏰' },
              ].map(({ b, s, e }) => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 9 }}>{e}</span>
                  <div>
                    <div style={{ fontSize: 7.5, fontWeight: 800, color: '#6fcf97', letterSpacing: '0.1em' }}>{b}</div>
                    <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)', lineHeight: 1.2 }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pin */}
            <div style={{
              width: 44, background: '#0d3b1d', borderRadius: 6,
              border: '1.5px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
            }}>
              <span style={{ fontSize: 14 }}>📍</span>
              <div style={{ fontSize: 5.5, fontWeight: 700, color: '#6fcf97', textAlign: 'center', letterSpacing: '0.06em', lineHeight: 1.5 }}>
                IVOIRE<br/>TRADE<br/>CENTER
              </div>
            </div>
          </div>

          {/* Row 2 — STOCKEZ (deposit target) */}
          <WordCell id="lm-dep" word="STOCKEZ" withPkg />

          {/* Row 3 — DÉPOSEZ */}
          <WordCell word="DÉPOSEZ" />

          {/* Row 4 — RÉCUPÉREZ (pickup target) */}
          <WordCell id="lm-pick" word="RÉCUPÉREZ" withPkg pkgInitIn />

          {/* Row 5 — illustration */}
          <div style={{
            background: '#0d3b1d', borderRadius: 6,
            border: '1.5px solid rgba(255,255,255,0.08)',
            height: 72, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ width: 22, height: 34, background: '#27ae60', borderRadius: '50% 50% 6px 6px', opacity: 0.85 }}/>
            <div style={{ width: 20, height: 30, background: '#6fcf97', borderRadius: '50% 50% 6px 6px', opacity: 0.65 }}/>
            <span style={{ position: 'absolute', top: 7, left: 8, fontSize: 9, background: '#27ae60', color: '#fff', borderRadius: 4, padding: '1px 4px' }}>✓</span>
            <span style={{ position: 'absolute', top: 7, right: 8, fontSize: 9, background: '#27ae60', color: '#fff', borderRadius: 4, padding: '1px 4px' }}>✓</span>
          </div>

          {/* Row 6 — 4 icons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4, flexShrink: 0 }}>
            {[
              { e: '🛒', l: 'Comm.\nen ligne' },
              { e: '📅', l: 'Comm.\nlocker' },
              { e: '📱', l: 'Appli\nmobile' },
              { e: '💬', l: 'Whats\napp' },
            ].map(({ e, l }) => (
              <div key={l} style={{
                background: '#0d3b1d', borderRadius: 5,
                border: '1.5px solid rgba(255,255,255,0.08)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '5px 2px', gap: 2,
              }}>
                <span style={{ fontSize: 10 }}>{e}</span>
                <span style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre-line' as const }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════ MIDDLE COLUMN — KIOSK ══════════════════ */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(175deg, #f0fdf4 0%, #dcfce7 100%)',
          borderRight: '1px solid rgba(39,174,96,0.12)',
          padding: '12px 10px', gap: 8,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, background: '#27ae60', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 15,
            }}>A</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 12, color: '#0a2e14', lineHeight: 1 }}>AFRIBOX</div>
              <div style={{ fontSize: 6, letterSpacing: '0.18em', color: '#27ae60', textTransform: 'uppercase' as const, marginTop: 2 }}>SMART LOCKER NETWORK</div>
            </div>
          </div>

          {/* Screen */}
          <div style={{
            background: '#0a2e14', borderRadius: 10, height: 140, flexShrink: 0,
            border: '2px solid rgba(39,174,96,0.3)', position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
              width: 8, height: 8, borderRadius: '50%', background: '#27ae60',
              animation: 'af-led 1.8s ease-out infinite',
            }}/>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 9, color: '#6fcf97', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Bienvenue</div>
              <div style={{ fontSize: 26, marginBottom: 6 }}>📦</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>Scannez votre QR code</div>
            </div>
          </div>

          {/* Tools — lens + printer */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              border: '2px solid rgba(39,174,96,0.35)', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(39,174,96,0.18)', border: '1.5px solid rgba(39,174,96,0.4)' }}/>
            </div>
            <div style={{
              flex: 1, height: 18, background: '#fff', borderRadius: 4,
              border: '1.5px solid rgba(39,174,96,0.22)',
              display: 'flex', alignItems: 'center', paddingLeft: 6,
            }}>
              <div style={{ height: 2, background: 'rgba(39,174,96,0.3)', borderRadius: 1, width: '60%' }}/>
            </div>
          </div>

          {/* Steps */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: '0.14em', color: '#27ae60', textTransform: 'uppercase' as const, marginBottom: 8 }}>
              COMMENT ÇA MARCHE ?
            </div>
            {[
              'Réservez votre locker en ligne',
              'Sélectionnez le casier le + proche',
              'Recevez votre code de retrait',
            ].map((txt, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', background: '#27ae60',
                  color: '#fff', fontWeight: 800, fontSize: 8, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{i + 1}</div>
                <span style={{ fontSize: 8, color: '#1b5e20', lineHeight: 1.4 }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════ RIGHT COLUMN — NETWORK + QR ════════════ */}
        <div style={{ background: '#fff', display: 'flex', flexDirection: 'column' }}>
          {/* Network map */}
          <div style={{ height: 178, flexShrink: 0, background: 'linear-gradient(155deg, #f0fdf4 0%, #dcfce7 100%)', borderBottom: '1px solid rgba(39,174,96,0.12)' }}>
            <svg viewBox="0 0 200 178" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
              <g stroke="#1B5E20" strokeWidth={0.8} fill="none" opacity={0.5}>
                <path d="M40 20 L80 30 L130 18 L170 40"/>
                <path d="M40 20 L30 60 L70 75 L120 60 L160 80"/>
                <path d="M70 75 L100 110 L150 115"/>
                <path d="M30 60 L60 130 L110 140 L150 170"/>
                <path d="M100 110 L130 155"/>
              </g>
              {([
                [32,12,'#27AE60'],[73,22,'#6FCF97'],[120,10,'#1B5E20'],[163,32,'#27AE60'],
                [22,52,'#6FCF97'],[62,68,'#1B5E20'],[112,52,'#27AE60'],[154,72,'#6FCF97'],
                [92,102,'#1B5E20'],[142,108,'#27AE60'],[52,122,'#6FCF97'],[102,132,'#27AE60'],
                [142,160,'#1B5E20'],
              ] as [number, number, string][]).map(([x,y,fill], i) => (
                <rect key={i} x={x} y={y} width={18} height={18} rx={2} fill={fill}/>
              ))}
              {([
                [38,22],[79,32],[126,20],[169,42],[28,62],[68,78],
                [118,62],[160,82],[98,112],[148,118],[58,132],[108,142],[148,170],
              ] as [number, number][]).map(([x,y], i) => (
                <rect key={i} x={x} y={y} width={6} height={2} rx={0.5} fill="rgba(255,255,255,0.75)"/>
              ))}
            </svg>
          </div>

          {/* QR cells */}
          {[
            { l1: 'Scannez', l2: 'WhatsApp' },
            { l1: 'Scannez', l2: 'site web' },
          ].map(({ l1, l2 }) => (
            <div key={l2} style={{
              height: 56, padding: '6px 10px', flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 8,
              borderBottom: '1px solid rgba(39,174,96,0.1)',
            }}>
              <QRCode/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                <div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, color: '#0a2e14' }}>{l1}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, color: '#27ae60' }}>{l2}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 14, color: '#27ae60' }}>›</span>
              </div>
            </div>
          ))}

          {/* Help */}
          <div style={{ flex: 1, padding: '10px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
            <div style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: '0.12em', color: '#0a2e14', textTransform: 'uppercase' as const }}>
              BESOIN D&apos;AIDE ?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 12 }}>📞</span>
              <span style={{ fontSize: 9, color: '#27ae60', fontWeight: 600 }}>07 59 59 59 59</span>
            </div>
          </div>
        </div>

      </div>

      {/* Zigzag bottom strip */}
      <div style={{
        height: 14, overflow: 'hidden', marginTop: -1,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='14'><polyline points='0,14 5,4 10,14 15,4 20,14' fill='none' stroke='%2327ae60' stroke-width='1.5'/></svg>")`,
        backgroundRepeat: 'repeat-x', backgroundSize: '20px 14px',
        position: 'relative', zIndex: 1, opacity: 0.7,
      }}/>
    </div>
  )
}
