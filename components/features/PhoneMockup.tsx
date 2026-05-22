'use client'

import { motion } from 'framer-motion'

const capsules = [
  { text: 'Code : 4821',    icon: '🔑', top:  48, left: -20,  delay: 0,    color: '#27ae60', light: false },
  { text: 'Colis reçu !',   icon: '✅', top:  30, left: 230,  delay: 0.5,  color: '#fff',    light: true  },
  { text: '24h / 24',       icon: '⏰', top: 190, left: -30,  delay: 0.9,  color: '#fff',    light: true  },
  { text: 'Casier ouvert',  icon: '📦', top: 210, left: 228,  delay: 0.3,  color: '#1b5e20', light: false },
  { text: 'Sécurisé',       icon: '🔒', top: 370, left:  10,  delay: 0.7,  color: '#fff',    light: true  },
  { text: 'WhatsApp ↗',     icon: '💬', top: 390, left: 210,  delay: 1.1,  color: '#25d366', light: false },
]

export default function PhoneMockup() {
  return (
    <div style={{ position: 'relative', width: 360, height: 500 }}>

      {/* Floating capsules */}
      {capsules.map(({ text, icon, top, left, delay, color, light }) => (
        <motion.div
          key={text}
          style={{ position: 'absolute', top, left, zIndex: 10 }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.8 + delay * 0.6, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: color,
            color: light ? '#1b5e20' : '#fff',
            border: light ? '1.5px solid rgba(39,174,96,0.3)' : 'none',
            borderRadius: 999,
            padding: '7px 14px',
            fontSize: 11.5,
            fontWeight: 700,
            whiteSpace: 'nowrap' as const,
            boxShadow: light
              ? '0 4px 16px rgba(0,0,0,0.08)'
              : `0 4px 20px ${color}55`,
            letterSpacing: '0.01em',
          }}>
            <span style={{ fontSize: 13 }}>{icon}</span>
            {text}
          </div>
        </motion.div>
      ))}

      {/* Phone */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          translateX: '-50%',
          width: 180,
          height: 380,
          borderRadius: 36,
          background: 'linear-gradient(160deg, #1a2a1c 0%, #0d1f0f 100%)',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(39,174,96,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
          overflow: 'hidden',
          zIndex: 5,
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 6, borderRadius: 999,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 2,
        }}/>

        {/* Screen */}
        <div style={{
          position: 'absolute', inset: 6,
          borderRadius: 30,
          background: '#f8faf8',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Status bar */}
          <div style={{
            height: 24, background: '#27ae60',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 7, color: '#fff', fontWeight: 700, letterSpacing: '0.1em' }}>AFRIBOX</span>
          </div>

          {/* App content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 12px 10px', gap: 10 }}>

            {/* Avatar / locker icon */}
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'linear-gradient(135deg, #27ae60, #1b5e20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(39,174,96,0.4)',
            }}>
              <span style={{ fontSize: 22 }}>📦</span>
            </div>

            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#1b5e20', letterSpacing: '0.06em' }}>VOTRE CASIER EST PRÊT</div>
              <div style={{ fontSize: 7.5, color: '#888', marginTop: 2 }}>Casier #07 — Ivoire Trade Center</div>
            </div>

            {/* Code card */}
            <div style={{
              width: '100%', background: '#fff',
              borderRadius: 12, padding: '10px 8px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              border: '1.5px solid rgba(39,174,96,0.2)',
              textAlign: 'center' as const,
            }}>
              <div style={{ fontSize: 7, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Code d'accès</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#1b5e20', letterSpacing: '0.15em', fontFamily: 'monospace' }}>4821</div>
              <div style={{ fontSize: 6.5, color: '#27ae60', marginTop: 3 }}>Valide 48h · Utilisable 1 fois</div>
            </div>

            {/* Steps mini */}
            {[
              { n: '1', t: 'Dirigez-vous au casier' },
              { n: '2', t: 'Entrez votre code' },
              { n: '3', t: 'Récupérez votre colis' },
            ].map(({ n, t }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', background: '#27ae60',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 7, color: '#fff', fontWeight: 800 }}>{n}</span>
                </div>
                <span style={{ fontSize: 7.5, color: '#444' }}>{t}</span>
              </div>
            ))}

            {/* WhatsApp button */}
            <div style={{
              marginTop: 'auto',
              width: '100%', background: '#25d366', borderRadius: 8, padding: '7px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            }}>
              <svg viewBox="0 0 32 32" width={11} height={11} fill="white">
                <path d="M16 3.2C9 3.2 3.2 9 3.2 16c0 2.26.59 4.46 1.73 6.4L3.2 28.8l6.58-1.71A12.74 12.74 0 0016 28.68h.005C23.07 28.68 28.8 22.95 28.8 16c0-3.42-1.33-6.63-3.75-9.05A12.71 12.71 0 0016 3.2zm7.52 18.31c-.32.9-1.84 1.71-2.57 1.82-.66.1-1.49.14-2.41-.15-.55-.18-1.27-.41-2.18-.8-3.83-1.65-6.33-5.51-6.52-5.76-.19-.26-1.56-2.08-1.56-3.96 0-1.89.99-2.81 1.34-3.2.35-.38.76-.48 1.02-.48.25 0 .51 0 .73.013.23.011.55-.089.86.66.32.76 1.08 2.65 1.18 2.84.1.19.16.41.03.67-.13.26-.19.41-.38.64-.19.22-.4.5-.57.67-.19.19-.39.4-.17.78.22.38.99 1.63 2.12 2.64 1.46 1.3 2.69 1.7 3.07 1.89.38.19.61.16.83-.1.22-.25.95-1.11 1.21-1.49.25-.38.51-.32.86-.19.35.13 2.22 1.05 2.6 1.24.38.19.64.29.73.45.1.16.1.93-.22 1.82z"/>
              </svg>
              <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>Contacter le support</span>
            </div>
          </div>
        </div>

        {/* Home bar */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 50, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.2)',
        }}/>
      </motion.div>

      {/* Glow sous le phone */}
      <div style={{
        position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)',
        width: 140, height: 30, borderRadius: '50%',
        background: 'rgba(39,174,96,0.25)',
        filter: 'blur(18px)',
        zIndex: 0,
      }}/>
    </div>
  )
}
