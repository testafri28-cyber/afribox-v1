'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { lockers, type Locker } from '@/lib/constants'

// React-Leaflet ne peut pas être rendu côté serveur (utilise window).
// On charge dynamiquement avec ssr:false.
const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false },
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false },
)
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false,
})
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), {
  ssr: false,
})

type LockersMapProps = {
  selectedId?: number
  onSelect?: (l: Locker) => void
  height?: string
}

export default function LockersMap({
  selectedId,
  onSelect,
  height = '420px',
}: LockersMapProps) {
  const [mounted, setMounted] = useState(false)
  const [iconReady, setIconReady] = useState(false)

  useEffect(() => {
    setMounted(true)
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })
        ._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })
      setIconReady(true)
    })
  }, [])

  if (!mounted || !iconReady) {
    return (
      <div
        style={{ height }}
        className="w-full bg-green-bg border border-brand-border rounded-2xl flex items-center justify-center"
      >
        <p className="font-mono text-xs tracking-widest text-brand-mid uppercase">
          Chargement de la carte…
        </p>
      </div>
    )
  }

  return (
    <div
      style={{ height }}
      className="w-full overflow-hidden rounded-2xl border border-brand-border"
    >
      <MapContainer
        center={[5.345, -4.024]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lockers.map((l) => (
          <Marker
            key={l.id}
            position={[l.lat, l.lng]}
            eventHandlers={
              onSelect ? { click: () => onSelect(l) } : undefined
            }
          >
            <Popup>
              <div className="font-body">
                <p className="font-semibold text-brand-gray mb-1">{l.name}</p>
                <p className="text-xs text-brand-sub mb-2">{l.address}</p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest ${
                    l.available
                      ? 'bg-green-soft text-green-dark'
                      : 'bg-brand-off text-brand-mid'
                  }`}
                >
                  {l.available ? 'Disponible' : 'Complet'}
                </span>
                {selectedId === l.id && (
                  <p className="text-xs text-green-primary mt-2 font-medium">
                    ✓ Sélectionné
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
