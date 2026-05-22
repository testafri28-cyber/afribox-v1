'use client'

import { useEffect, useRef } from 'react'

/* ─── static data ─────────────────────────────────────────── */
const CELLS = [
  { id: 'c1', row: 1 }, { id: 'c2', row: 2 }, { id: 'c3', row: 3 },
  { id: 'c4', row: 4 }, { id: 'c5', row: 5 }, { id: 'c6', row: 6 },
]

const BADGE_LABELS = ['XS', 'S', 'M', 'L', 'XL', '2XL']
const LEFT_LABELS  = ['STOCKEZ', 'DÉPOSEZ', 'RÉCUPÉREZ']

const QR_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 21'><rect width='21' height='21' fill='%23f0fdf4'/><rect x='2' y='2' width='7' height='7' fill='none' stroke='%2327ae60' stroke-width='1'/><rect x='3' y='3' width='5' height='5' fill='%2327ae60'/><rect x='12' y='2' width='7' height='7' fill='none' stroke='%2327ae60' stroke-width='1'/><rect x='13' y='3' width='5' height='5' fill='%2327ae60'/><rect x='2' y='12' width='7' height='7' fill='none' stroke='%2327ae60' stroke-width='1'/><rect x='3' y='13' width='5' height='5' fill='%2327ae60'/><rect x='12' y='12' width='3' height='3' fill='%2327ae60'/><rect x='16' y='12' width='3' height='3' fill='%2327ae60'/><rect x='12' y='16' width='3' height='3' fill='%2327ae60'/><rect x='16' y='16' width='3' height='3' fill='%2327ae60'/></svg>`

const ZIGZAG_SVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='14'><polyline points='0,14 5,4 10,14 15,4 20,14' fill='none' stroke='%2327ae60' stroke-width='1.5'/></svg>`

/* ─── helpers ─────────────────────────────────────────────── */
function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms))
}

/* ─── component ───────────────────────────────────────────── */
export default function LockerMockup() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const cancelRef  = useRef(false)

  useEffect(() => {
    cancelRef.current = false
    const root = wrapRef.current
    if (!root) return

    /* grab DOM handles */
    const cells      = Array.from(root.querySelectorAll<HTMLElement>('[data-cell]'))
    const doors      = Array.from(root.querySelectorAll<HTMLElement>('[data-door]'))
    const pkgs       = Array.from(root.querySelectorAll<HTMLElement>('[data-pkg]'))
    const toastDep   = root.querySelector<HTMLElement>('[data-toast="deposit"]')
    const toastPick  = root.querySelector<HTMLElement>('[data-toast="pickup"]')

    function setDoor(idx: number, open: boolean) {
      if (doors[idx]) doors[idx].style.transform = open ? 'rotateY(-118deg)' : 'rotateY(0deg)'
    }
    function setCell(idx: number, active: boolean) {
      if (cells[idx]) cells[idx].style.boxShadow = active
        ? 'inset 0 0 0 2px #27ae60, 0 0 12px 0 rgba(39,174,96,0.35)'
        : ''
    }
    function setPkg(idx: number, visible: boolean) {
      if (pkgs[idx]) pkgs[idx].style.opacity = visible ? '1' : '0'
    }
    function showToast(el: HTMLElement | null, show: boolean) {
      if (!el) return
      el.style.opacity    = show ? '1' : '0'
      el.style.transform  = show ? 'translateY(0)' : 'translateY(-8px)'
    }

    async function runDeposit(idx: number) {
      setCell(idx, true)
      showToast(toastDep, true)
      await sleep(700)
      setDoor(idx, true)
      await sleep(600)
      setPkg(idx, true)
      await sleep(800)
      setDoor(idx, false)
      await sleep(500)
      showToast(toastDep, false)
      setCell(idx, false)
    }

    async function runPickup(idx: number) {
      setCell(idx, true)
      showToast(toastPick, true)
      await sleep(700)
      setDoor(idx, true)
      await sleep(600)
      setPkg(idx, false)
      await sleep(800)
      setDoor(idx, false)
      await sleep(500)
      showToast(toastPick, false)
      setCell(idx, false)
    }

    let running = true
    async function loop() {
      await sleep(800)
      let dep = 0
      let pick = 3
      while (running && !cancelRef.current) {
        await runDeposit(dep % cells.length)
        await sleep(1100)
        await runPickup(pick % cells.length)
        await sleep(1400)
        dep++
        pick++
      }
    }
    loop()

    return () => {
      running = false
      cancelRef.current = true
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{ width: 540, position: 'relative', isolation: 'isolate', fontFamily: 'inherit' }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 28,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(39,174,96,0.22) 0%, transparent 72%)',
        animation: 'af-glow-locker 3s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Toast — deposit */}
      <div
        data-toast="deposit"
        style={{
          position: 'absolute', top: -44, left: '50%', transform: 'translateX(-50%) translateY(-8px)',
          background: '#27ae60', color: '#fff', borderRadius: 999,
          padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.3s, transform 0.3s',
          zIndex: 20, boxShadow: '0 4px 16px rgba(39,174,96,0.4)',
        }}
      >
        📦 Colis déposé !
      </div>

      {/* Toast — pickup */}
      <div
        data-toast="pickup"
        style={{
          position: 'absolute', top: -44, left: '50%', transform: 'translateX(-50%) translateY(-8px)',
          background: '#1b5e20', color: '#fff', borderRadius: 999,
          padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.3s, transform 0.3s',
          zIndex: 20, boxShadow: '0 4px 16px rgba(27,94,32,0.4)',
        }}
      >
        ✅ Colis récupéré !
      </div>

      {/* Locker body */}
      <div style={{
        position: 'relative', zIndex: 1,
        animation: 'af-float 5s ease-in-out infinite',
        display: 'grid', gridTemplateColumns: '140px 1fr 178px',
        background: 'linear-gradient(155deg, #f8fff9 0%, #e8f5e9 100%)',
        borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(27,94,32,0.18), 0 2px 8px rgba(27,94,32,0.08)',
        border: '1.5px solid rgba(39,174,96,0.18)',
        minHeight: 420,
      }}>

        {/* ── LEFT COLUMN ─────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(175deg,#0a2e14 0%,#1a4a2a 100%)',
          display: 'flex', flexDirection: 'column',
          borderRight: '1.5px solid rgba(255,255,255,0.07)',
        }}>
          {/* Badge row + pin */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '12px 10px 8px' }}>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {BADGE_LABELS.slice(0, 3).map((b) => (
                <span key={b} style={{
                  background: 'rgba(39,174,96,0.18)', color: '#6fcf97',
                  borderRadius: 6, padding: '2px 5px', fontSize: 8, fontWeight: 700,
                  border: '1px solid rgba(39,174,96,0.25)',
                }}>{b}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {BADGE_LABELS.slice(3).map((b) => (
                <span key={b} style={{
                  background: 'rgba(39,174,96,0.18)', color: '#6fcf97',
                  borderRadius: 6, padding: '2px 5px', fontSize: 8, fontWeight: 700,
                  border: '1px solid rgba(39,174,96,0.25)',
                }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div style={{ padding: '6px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LEFT_LABELS.map((l) => (
              <div key={l} style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)' }}>
                {l}
              </div>
            ))}
          </div>

          {/* 4 icon pills */}
          <div style={{ padding: '8px 10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { emoji: '🔒', label: 'Sécurisé' },
              { emoji: '📱', label: 'Mobile' },
              { emoji: '⏰', label: '24h/24' },
              { emoji: '🌍', label: 'CI · SN · CM' },
            ].map(({ emoji, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '4px 8px',
              }}>
                <span style={{ fontSize: 10 }}>{emoji}</span>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MIDDLE — LOCKERS ────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 10px' }}>
          {/* Brand strip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
            paddingBottom: 8, borderBottom: '1px solid rgba(39,174,96,0.15)',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, background: '#27ae60',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: 14, flexShrink: 0,
            }}>A</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 11, color: '#0a2e14', lineHeight: 1 }}>Afribox</div>
              <div style={{ fontSize: 7, letterSpacing: '0.15em', color: '#27ae60', textTransform: 'uppercase', marginTop: 1 }}>
                Smart Locker
              </div>
            </div>
            {/* status led */}
            <div style={{
              marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%',
              background: '#27ae60', animation: 'af-led 1.8s ease-out infinite',
            }} />
          </div>

          {/* Cell grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
            {CELLS.map((cell, i) => (
              <div
                key={cell.id}
                data-cell
                style={{
                  position: 'relative',
                  background: '#fff', borderRadius: 8,
                  border: '1.5px solid rgba(39,174,96,0.2)',
                  height: 46, overflow: 'hidden',
                  transition: 'box-shadow 0.3s',
                  perspective: 800,
                }}
              >
                {/* Door */}
                <div
                  data-door
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                    borderRadius: 7,
                    transformOrigin: 'left center',
                    transform: 'rotateY(0deg)',
                    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 10px',
                    backfaceVisibility: 'hidden',
                    zIndex: 2,
                  }}
                >
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#27ae60' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {/* handle */}
                    <div style={{
                      width: 16, height: 6, borderRadius: 3,
                      background: 'rgba(39,174,96,0.35)', border: '1px solid rgba(39,174,96,0.5)',
                    }} />
                    {/* keyhole */}
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      border: '1.5px solid rgba(39,174,96,0.6)',
                    }} />
                  </div>
                </div>

                {/* Package inside */}
                <div
                  data-pkg
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.4s',
                    zIndex: 1,
                  }}
                >
                  <div style={{
                    width: 28, height: 22, background: '#fff3e0',
                    border: '1.5px solid #ffb74d', borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11,
                  }}>📦</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────── */}
        <div style={{
          background: '#fff',
          borderLeft: '1.5px solid rgba(39,174,96,0.12)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Network map placeholder */}
          <div style={{
            height: 178, padding: 10,
            background: 'linear-gradient(155deg, #f0fdf4 0%, #dcfce7 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 6, borderBottom: '1px solid rgba(39,174,96,0.12)',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#27ae60', textTransform: 'uppercase' }}>
              Réseau
            </div>
            {/* Simplified city-dot map */}
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="40" x2="60" y2="20" stroke="#27ae60" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3"/>
              <line x1="60" y1="20" x2="100" y2="35" stroke="#27ae60" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3"/>
              <line x1="60" y1="20" x2="50" y2="60" stroke="#27ae60" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3"/>
              <line x1="50" y1="60" x2="90" y2="65" stroke="#27ae60" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3"/>
              <circle cx="60" cy="20" r="5" fill="#27ae60"/>
              <circle cx="20" cy="40" r="3" fill="#6fcf97"/>
              <circle cx="100" cy="35" r="3" fill="#6fcf97"/>
              <circle cx="50" cy="60" r="3" fill="#6fcf97"/>
              <circle cx="90" cy="65" r="3" fill="#6fcf97"/>
              <text x="60" y="14" textAnchor="middle" fontSize="6" fill="#0a2e14" fontWeight="bold">ABJ</text>
            </svg>
            <div style={{ fontSize: 8, color: '#27ae60', fontWeight: 600 }}>+120 casiers actifs</div>
          </div>

          {/* QR cells */}
          {[
            { label: 'Déposer', sub: 'Scanner pour déposer' },
            { label: 'Récupérer', sub: 'Scanner pour récupérer' },
          ].map(({ label, sub }) => (
            <div key={label} style={{
              height: 56, padding: '6px 10px',
              display: 'flex', alignItems: 'center', gap: 8,
              borderBottom: '1px solid rgba(39,174,96,0.1)',
            }}>
              <img src={QR_SVG} alt="QR" style={{ width: 36, height: 36, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#0a2e14' }}>{label}</div>
                <div style={{ fontSize: 7.5, color: '#6fcf97', marginTop: 2 }}>{sub}</div>
              </div>
            </div>
          ))}

          {/* Help cell */}
          <div style={{
            flex: 1, padding: '8px 10px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, background: '#f0fdf4',
              border: '1.5px solid rgba(39,174,96,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, flexShrink: 0,
            }}>💬</div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#0a2e14' }}>Assistance</div>
              <div style={{ fontSize: 7.5, color: '#6fcf97', marginTop: 1 }}>WhatsApp · 24h/24</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — zigzag */}
      <div style={{
        height: 14, borderRadius: '0 0 24px 24px', overflow: 'hidden',
        backgroundImage: `url("${ZIGZAG_SVG}")`,
        backgroundRepeat: 'repeat-x', backgroundSize: '20px 14px',
        marginTop: -1, position: 'relative', zIndex: 1,
        opacity: 0.7,
      }} />
    </div>
  )
}
