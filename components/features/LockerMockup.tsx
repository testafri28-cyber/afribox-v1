'use client'

import { useEffect, useRef } from 'react'

function sleep(ms: number) { return new Promise<void>(r => setTimeout(r, ms)) }

function openDoor(el: HTMLElement | null) { if (el) el.style.transform = 'rotateY(-118deg)' }
function closeDoor(el: HTMLElement | null) { if (el) el.style.transform = 'rotateY(0deg)' }
function showPkg(el: HTMLElement | null, v: boolean) {
  if (!el) return
  el.style.opacity = v ? '1' : '0'
  el.style.transform = v ? 'scale(1) translateX(0)' : 'scale(0.7) translateX(-12px)'
}
function glowCell(el: HTMLElement | null, v: boolean) {
  if (el) el.style.boxShadow = v ? 'inset 0 0 0 2px #27ae60, 0 0 12px 2px rgba(39,174,96,0.3)' : ''
}
function showToast(el: HTMLElement | null, v: boolean) {
  if (!el) return
  el.style.opacity = v ? '1' : '0'
  el.style.transform = v ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)'
}

/* ── locker door row (animatable) ─────────────────────── */
function DoorRow({ id, label }: { id?: string; label?: string }) {
  return (
    <div
      id={id}
      style={{
        position: 'relative', height: 38, flexShrink: 0,
        borderTop: '1px solid rgba(0,0,0,0.09)',
        perspective: '600px',
        transition: 'box-shadow 0.3s',
        overflow: 'visible',
      }}
    >
      {/* interior */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, #e8f5e9 0%, #f0fdf4 100%)',
        display: 'flex', alignItems: 'center', paddingLeft: 10,
      }}>
        {/* package */}
        <div
          data-pkg
          style={{
            width: 26, height: 20, background: '#fff3e0',
            border: '1.5px solid #ffb74d', borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, opacity: 0,
            transform: 'scale(0.7) translateX(-12px)',
            transition: 'opacity 0.35s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >📦</div>
      </div>
      {/* door */}
      <div
        data-door
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #f9fafb 0%, #f1f3f2 100%)',
          transformOrigin: 'left center',
          transform: 'rotateY(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingInline: 10,
          borderRight: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {label && <span style={{ fontSize: 7.5, fontWeight: 700, color: '#27ae60', letterSpacing: '0.08em' }}>{label}</span>}
        {/* handle */}
        <div style={{ marginLeft: 'auto', width: 14, height: 5, borderRadius: 2, background: '#e0e0e0', border: '1px solid #bdbdbd' }}/>
      </div>
    </div>
  )
}

/* ── QR code SVG ──────────────────────────────────────── */
function QRCode({ size = 46 }: { size?: number }) {
  return (
    <svg viewBox="0 0 21 21" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect width={21} height={21} fill="white"/>
      <rect x={2} y={2} width={7} height={7} fill="none" stroke="#1B5E20" strokeWidth={1}/>
      <rect x={3} y={3} width={5} height={5} fill="#1B5E20"/>
      <rect x={12} y={2} width={7} height={7} fill="none" stroke="#1B5E20" strokeWidth={1}/>
      <rect x={13} y={3} width={5} height={5} fill="#1B5E20"/>
      <rect x={2} y={12} width={7} height={7} fill="none" stroke="#1B5E20" strokeWidth={1}/>
      <rect x={3} y={13} width={5} height={5} fill="#1B5E20"/>
      <rect x={12} y={12} width={3} height={3} fill="#1B5E20"/>
      <rect x={16} y={12} width={3} height={3} fill="#1B5E20"/>
      <rect x={12} y={16} width={3} height={3} fill="#1B5E20"/>
      <rect x={16} y={16} width={3} height={3} fill="#1B5E20"/>
    </svg>
  )
}

/* ── African zigzag strip ─────────────────────────────── */
function AfriStrip() {
  const W = 20, H = 14
  // 4 colour bands: green, red, yellow, dark-green
  const colors = ['#27ae60', '#e53935', '#f9a825', '#1b5e20']
  return (
    <svg width="100%" height={H * colors.length} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      {colors.map((c, ci) => (
        <g key={ci} transform={`translate(0,${ci * H})`}>
          {Array.from({ length: 30 }).map((_, i) => (
            <polyline key={i}
              points={`${i*W},${H} ${i*W+W/2},0 ${i*W+W},${H}`}
              fill="none" stroke={c} strokeWidth={2}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

/* ── MAIN COMPONENT ───────────────────────────────────── */
export default function LockerMockup() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)

  useEffect(() => {
    cancelRef.current = false
    const root = wrapRef.current
    if (!root) return

    function grab(id: string) {
      const cell = root!.querySelector<HTMLElement>(id)
      return {
        cell,
        door: cell?.querySelector<HTMLElement>('[data-door]') ?? null,
        pkg:  cell?.querySelector<HTMLElement>('[data-pkg]') ?? null,
      }
    }

    const c0   = grab('#lm-c0')
    const c1   = grab('#lm-c1')
    const c2   = grab('#lm-c2')
    const tDep  = root.querySelector<HTMLElement>('#lm-tdep')
    const tPick = root.querySelector<HTMLElement>('#lm-tpick')

    async function deposit(c: ReturnType<typeof grab>) {
      glowCell(c.cell, true)
      showToast(tDep, true)
      await sleep(600)
      openDoor(c.door)
      await sleep(550)
      showPkg(c.pkg, true)
      await sleep(900)
      closeDoor(c.door)
      await sleep(500)
      showToast(tDep, false)
      glowCell(c.cell, false)
    }

    async function pickup(c: ReturnType<typeof grab>) {
      glowCell(c.cell, true)
      showToast(tPick, true)
      await sleep(600)
      openDoor(c.door)
      await sleep(550)
      showPkg(c.pkg, false)
      await sleep(900)
      closeDoor(c.door)
      await sleep(500)
      showToast(tPick, false)
      glowCell(c.cell, false)
    }

    // Pre-fill c2 with a package
    showPkg(c2.pkg, true)

    let running = true

    async function loop() {
      await sleep(1000)
      while (running && !cancelRef.current) {
        await deposit(c0)
        await sleep(700)
        if (!running) break
        await deposit(c1)
        await sleep(700)
        if (!running) break
        await pickup(c2)
        // Reset for next cycle: clear c0/c1, refill c2
        showPkg(c0.pkg, false)
        showPkg(c1.pkg, false)
        await sleep(400)
        if (c2.pkg) {
          c2.pkg.style.transition = 'none'
          showPkg(c2.pkg, true)
          requestAnimationFrame(() => requestAnimationFrame(() => {
            if (c2.pkg) c2.pkg.style.transition = 'opacity 0.35s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)'
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
      style={{ width: 560, position: 'relative', isolation: 'isolate' as const, fontFamily: 'inherit' }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '20px 20px 0 0',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(39,174,96,0.18) 0%, transparent 70%)',
        animation: 'af-glow-locker 3.5s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* Toast — dépôt */}
      <div id="lm-tdep" style={{
        position: 'absolute', top: -40, left: '50%',
        transform: 'translateX(-50%) translateY(-10px)',
        background: '#27ae60', color: '#fff', borderRadius: 999,
        padding: '5px 14px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em',
        whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.28s, transform 0.28s',
        zIndex: 30, boxShadow: '0 4px 14px rgba(39,174,96,0.45)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }}/>
        Dépôt en cours…
      </div>

      {/* Toast — retrait */}
      <div id="lm-tpick" style={{
        position: 'absolute', top: -40, left: '50%',
        transform: 'translateX(-50%) translateY(-10px)',
        background: '#1b5e20', color: '#fff', borderRadius: 999,
        padding: '5px 14px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em',
        whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.28s, transform 0.28s',
        zIndex: 30, boxShadow: '0 4px 14px rgba(27,94,32,0.45)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6fcf97', display: 'inline-block' }}/>
        Retrait en cours…
      </div>

      {/* ── Main locker body ──────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1,
        animation: 'af-float 5s ease-in-out infinite',
        display: 'grid',
        gridTemplateColumns: '220px 110px 1fr',
        background: '#f4f6f4',
        border: '2px solid #2d3a2e',
        borderRadius: '16px 16px 0 0',
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(10,46,20,0.22), 0 2px 8px rgba(10,46,20,0.1)',
      }}>

        {/* ════ LEFT PANEL ════════════════════════════ */}
        <div style={{
          borderRight: '2px solid #2d3a2e',
          display: 'flex', flexDirection: 'column',
          background: '#f8faf8',
          /* subtle horizontal locker lines */
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 37px, rgba(0,0,0,0.07) 37px, rgba(0,0,0,0.07) 38px)',
        }}>

          {/* Badges SÛR / RAPIDE / PRATIQUE */}
          <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(255,255,255,0.85)' }}>
            {[
              { icon: '🛡️', b: 'SÛR',      s: 'VOS COLIS EN SÉCURITÉ' },
              { icon: '⚡', b: 'RAPIDE',    s: 'RÉCUPÉREZ EN TOUTE SIMPLICITÉ' },
              { icon: '🕐', b: 'PRATIQUE', s: 'DISPONIBLE 24H/24 - 7J/7' },
            ].map(({ icon, b, s }) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <span style={{ fontSize: 11 }}>{icon}</span>
                <div>
                  <span style={{ fontSize: 8, fontWeight: 800, color: '#1b5e20' }}>{b} </span>
                  <span style={{ fontSize: 7, color: '#555', letterSpacing: '0.05em' }}>{s}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Big green text */}
          <div style={{ padding: '10px 12px 4px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(255,255,255,0.7)' }}>
            {['DÉPOSEZ', 'STOCKEZ', 'RÉCUPÉREZ'].map(w => (
              <div key={w} style={{ fontSize: 22, fontWeight: 900, color: '#27ae60', lineHeight: 1.1, letterSpacing: '-0.01em' }}>{w}</div>
            ))}
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#1b5e20', marginTop: 4, letterSpacing: '0.04em' }}>
              VOTRE COLIS EN TOUTE SIMPLICITÉ
            </div>
          </div>

          {/* Illustration — simplified figures */}
          <div style={{
            flex: '0 0 90px', position: 'relative', overflow: 'hidden',
            background: 'rgba(255,255,255,0.55)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
            padding: '0 10px 0',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
          }}>
            {/* Woman figure (left) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#5d4037', marginBottom: 1 }}/>
              <div style={{ width: 26, height: 42, background: '#e65100', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 16, height: 12, background: '#fff3e0', border: '1px solid #ffb74d', borderRadius: 2, fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div>
              </div>
            </div>
            {/* WhatsApp bubble center */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 28, height: 28, borderRadius: '50%',
              background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(37,211,102,0.4)',
            }}>
              <svg viewBox="0 0 32 32" width={16} height={16} fill="white">
                <path d="M16 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.58-1.71a12.74 12.74 0 006.22 1.59h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.71 12.71 0 0016 3.2zm7.52 18.31c-.32.9-1.84 1.71-2.57 1.82-.66.1-1.49.14-2.41-.15-.55-.18-1.27-.41-2.18-.8-3.83-1.65-6.33-5.51-6.52-5.76-.19-.26-1.56-2.08-1.56-3.96 0-1.89.99-2.81 1.34-3.2.35-.38.76-.48 1.02-.48.25 0 .51.003.73.013.23.01.55-.09.86.66.32.76 1.08 2.65 1.18 2.84.1.19.16.41.03.67-.13.26-.19.41-.38.64-.19.22-.4.5-.57.67-.19.19-.39.4-.17.78.22.38.99 1.63 2.12 2.64 1.46 1.3 2.69 1.7 3.07 1.89.38.19.61.16.83-.1.22-.25.95-1.11 1.21-1.49.25-.38.51-.32.86-.19.35.13 2.22 1.05 2.6 1.24.38.19.64.29.73.45.1.16.1.93-.22 1.82z"/>
              </svg>
            </div>
            {/* Man figure (right) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#4e342e', marginBottom: 1 }}/>
              <div style={{ width: 26, height: 42, background: '#27ae60', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10 }}>📱</span>
              </div>
            </div>
          </div>

          {/* ── 3 ANIMATED DOOR ROWS ── */}
          <DoorRow id="lm-c0" label="CASIER 04" />
          <DoorRow id="lm-c1" label="CASIER 07" />
          <DoorRow id="lm-c2" label="CASIER 11" />

          {/* Bottom icons */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
            borderTop: '1px solid rgba(0,0,0,0.07)', background: 'rgba(255,255,255,0.8)',
          }}>
            {[
              { e: '🛒', l: 'Commandez\nen ligne' },
              { e: '📋', l: 'Commandez\nsur locker' },
              { e: '📱', l: 'Application\nmobile' },
              { e: '💬', l: 'Whatsapp' },
            ].map(({ e, l }) => (
              <div key={l} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '6px 2px', gap: 2,
                borderRight: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#e8f5e9', border: '1.5px solid #27ae60', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{e}</div>
                <span style={{ fontSize: 5.5, color: '#333', textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre-line' as const }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════ MIDDLE — KIOSK ════════════════════════ */}
        <div style={{
          borderRight: '2px solid #2d3a2e',
          display: 'flex', flexDirection: 'column',
          background: '#ecf0ec',
        }}>
          {/* Brand header */}
          <div style={{ padding: '10px 8px 8px', textAlign: 'center' as const, borderBottom: '1px solid rgba(0,0,0,0.1)', background: '#fff' }}>
            {/* Tree logo (SVG approximation) */}
            <svg width={44} height={36} viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 4px' }}>
              {/* trunk */}
              <line x1={22} y1={36} x2={22} y2={20} stroke="#1b5e20" strokeWidth={1.5}/>
              {/* roots */}
              <line x1={22} y1={36} x2={14} y2={36} stroke="#1b5e20" strokeWidth={1}/>
              <line x1={22} y1={36} x2={30} y2={36} stroke="#1b5e20" strokeWidth={1}/>
              {/* branches */}
              <line x1={22} y1={22} x2={10} y2={14} stroke="#1b5e20" strokeWidth={1}/>
              <line x1={22} y1={22} x2={34} y2={14} stroke="#1b5e20" strokeWidth={1}/>
              <line x1={22} y1={18} x2={22} y2={8} stroke="#1b5e20" strokeWidth={1}/>
              <line x1={10} y1={14} x2={4} y2={8} stroke="#1b5e20" strokeWidth={0.8}/>
              <line x1={34} y1={14} x2={40} y2={8} stroke="#1b5e20" strokeWidth={0.8}/>
              {/* locker boxes at tips */}
              <rect x={19} y={2} width={6} height={6} rx={1} fill="#27ae60"/>
              <rect x={1} y={4} width={6} height={5} rx={1} fill="#6fcf97"/>
              <rect x={37} y={4} width={6} height={5} rx={1} fill="#27ae60"/>
              <rect x={7} y={10} width={5} height={4} rx={1} fill="#1b5e20"/>
              <rect x={32} y={10} width={5} height={4} rx={1} fill="#1b5e20"/>
            </svg>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#1b5e20', letterSpacing: '0.05em', lineHeight: 1 }}>AFRIBOX</div>
            <div style={{ fontSize: 5.5, letterSpacing: '0.18em', color: '#27ae60', textTransform: 'uppercase' as const, marginTop: 1 }}>SMART LOCKER NETWORK</div>
          </div>

          {/* Kiosk screen */}
          <div style={{
            margin: '8px 8px 0',
            background: '#1a1a2e', borderRadius: 6,
            border: '2px solid #444',
            overflow: 'hidden', flexShrink: 0,
          }}>
            {/* AFRIBOX label on machine */}
            <div style={{ background: '#2d3a2e', padding: '3px 6px', textAlign: 'center' as const }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: '#6fcf97', letterSpacing: '0.15em' }}>AFRIBOX</span>
            </div>
            {/* Screen content */}
            <div style={{ padding: '8px 6px', minHeight: 80, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 6, color: '#6fcf97', fontWeight: 700, letterSpacing: '0.1em' }}>BONJOUR !</div>
              {['Réservez un casier', 'Déposez votre colis', 'Récupérez votre colis', 'Scanner QR code'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%' }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === 0 ? '#27ae60' : '#444', flexShrink: 0 }}/>
                  <div style={{ fontSize: 6, color: i === 0 ? '#fff' : '#888' }}>{t}</div>
                </div>
              ))}
            </div>
            {/* LED */}
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#27ae60', animation: 'af-led 1.8s ease-out infinite' }}/>
            </div>
          </div>

          {/* Reader + printer */}
          <div style={{ display: 'flex', gap: 6, padding: '6px 8px' }}>
            {/* fingerprint */}
            <div style={{ width: 32, height: 28, background: '#ccc', borderRadius: 4, border: '2px solid #888', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <path d="M7 2 C4.2 2 2 4.2 2 7" stroke="#555" strokeWidth={1} strokeLinecap="round"/>
                <path d="M7 3.5 C5 3.5 3.5 5 3.5 7" stroke="#555" strokeWidth={1} strokeLinecap="round"/>
                <path d="M7 5 C5.9 5 5 5.9 5 7" stroke="#555" strokeWidth={1} strokeLinecap="round"/>
              </svg>
            </div>
            {/* printer */}
            <div style={{ flex: 1, height: 28, background: '#b0b0b0', borderRadius: 3, border: '1px solid #888', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 2 }}>
              <div style={{ width: '70%', height: 2, background: '#fff', marginBottom: 2, borderRadius: 1 }}/>
              <div style={{ width: '80%', height: 2, background: '#fff', borderRadius: 1 }}/>
            </div>
          </div>

          {/* Steps */}
          <div style={{ padding: '0 8px 10px', flex: 1 }}>
            <div style={{ fontSize: 7, fontWeight: 800, color: '#1b5e20', letterSpacing: '0.1em', marginBottom: 6, textAlign: 'center' as const }}>
              COMMENT ÇA MARCHE ?
            </div>
            {[
              'Réservez votre locker ici,\nen ligne ou via notre application',
              'Sélectionnez le casier\nle plus proche',
              'Recevez un code pour récupérer\nou déposer votre colis',
            ].map((txt, i) => (
              <div key={i} style={{ display: 'flex', gap: 5, marginBottom: 6, alignItems: 'flex-start' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#27ae60', color: '#fff', fontWeight: 800, fontSize: 7, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i+1}</div>
                <span style={{ fontSize: 7, color: '#1b5e20', lineHeight: 1.4, whiteSpace: 'pre-line' as const }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════ RIGHT PANEL — NETWORK + QR ════════════ */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          background: '#f8faf8',
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 37px, rgba(0,0,0,0.07) 37px, rgba(0,0,0,0.07) 38px)',
        }}>
          {/* Tree network SVG */}
          <div style={{ flex: 1, padding: 8, background: 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              {/* trunk + roots */}
              <line x1={100} y1={220} x2={100} y2={170} stroke="#1B5E20" strokeWidth={2}/>
              <line x1={100} y1={210} x2={70} y2={220} stroke="#1B5E20" strokeWidth={1}/>
              <line x1={100} y1={210} x2={130} y2={220} stroke="#1B5E20" strokeWidth={1}/>
              {/* main branches */}
              <line x1={100} y1={170} x2={40} y2={120} stroke="#1B5E20" strokeWidth={1.5}/>
              <line x1={100} y1={170} x2={160} y2={120} stroke="#1B5E20" strokeWidth={1.5}/>
              <line x1={100} y1={155} x2={100} y2={90} stroke="#1B5E20" strokeWidth={1.5}/>
              {/* secondary branches */}
              <line x1={40} y1={120} x2={10} y2={75} stroke="#1B5E20" strokeWidth={1}/>
              <line x1={40} y1={120} x2={70} y2={70} stroke="#1B5E20" strokeWidth={1}/>
              <line x1={160} y1={120} x2={190} y2={75} stroke="#1B5E20" strokeWidth={1}/>
              <line x1={160} y1={120} x2={130} y2={70} stroke="#1B5E20" strokeWidth={1}/>
              <line x1={100} y1={90} x2={80} y2={45} stroke="#1B5E20" strokeWidth={1}/>
              <line x1={100} y1={90} x2={120} y2={45} stroke="#1B5E20" strokeWidth={1}/>
              <line x1={100} y1={90} x2={100} y2={15} stroke="#1B5E20" strokeWidth={1}/>
              {/* locker boxes */}
              {([
                [7,62,'#27AE60'],[34,57,'#6FCF97'],[67,57,'#1B5E20'],
                [127,57,'#27AE60'],[157,57,'#6FCF97'],[187,62,'#1B5E20'],
                [77,32,'#27AE60'],[117,32,'#6FCF97'],[97,2,'#1B5E20'],
                [28,108,'#6FCF97'],[152,108,'#27AE60'],
              ] as [number,number,string][]).map(([x,y,fill],i) => (
                <g key={i}>
                  <rect x={x} y={y} width={16} height={13} rx={2} fill={fill}/>
                  <rect x={x+3} y={y+5} width={10} height={2} rx={0.5} fill="rgba(255,255,255,0.7)"/>
                </g>
              ))}
            </svg>
          </div>

          {/* QR — WhatsApp */}
          <div style={{ padding: '6px 8px', borderTop: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase' as const, lineHeight: 1.3 }}>
              SCANNEZ POUR<br/>NOUS JOINDRE<br/>SUR WHATSAPP
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 9, color: '#555' }}>›</span>
              <QRCode size={44}/>
            </div>
          </div>

          {/* QR — site web */}
          <div style={{ padding: '6px 8px', borderTop: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase' as const, lineHeight: 1.3 }}>
              SCANNEZ POUR<br/>VISITER NOTRE<br/>SITE WEB
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 9, color: '#555' }}>›</span>
              <QRCode size={44}/>
            </div>
          </div>
        </div>

      </div>

      {/* African pattern strip */}
      <div style={{ borderLeft: '2px solid #2d3a2e', borderRight: '2px solid #2d3a2e', borderBottom: '2px solid #2d3a2e', borderRadius: '0 0 16px 16px', overflow: 'hidden' }}>
        <AfriStrip/>
      </div>
    </div>
  )
}
