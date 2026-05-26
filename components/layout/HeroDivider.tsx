import { Clock, ShieldCheck, Zap, MapPin, Smartphone, Package, CheckCircle2 } from 'lucide-react'

/**
 * Marquee separator between the hero and the next section.
 * Items are ghosted by default; on hover the marquee pauses and the
 * pointed item colors in.
 */
const items = [
  { icon: Clock,        label: 'Disponible 24h/24' },
  { icon: Zap,          label: 'Dépôt en 60 secondes' },
  { icon: ShieldCheck,  label: 'Code unique par colis' },
  { icon: MapPin,       label: 'Réseau Côte d’Ivoire' },
  { icon: Smartphone,   label: 'App, Web ou WhatsApp' },
  { icon: Package,      label: 'Tous formats de colis' },
  { icon: CheckCircle2, label: 'Sans rendez-vous' },
]

export default function HeroDivider() {
  // Double the list so the loop scrolls seamlessly (translateX -50%)
  const loop = [...items, ...items]

  return (
    <div className="group/marquee relative bg-white border-y border-brand-border overflow-hidden">
      <div className="flex w-max animate-marquee py-3 md:py-4 group-hover/marquee:[animation-play-state:paused]">
        {loop.map(({ icon: Icon, label }, i) => (
          <div
            key={i}
            className="group/item flex items-center gap-3 px-6 md:px-8 whitespace-nowrap cursor-default"
          >
            <Icon
              size={16}
              className="flex-shrink-0 text-brand-mid/70 transition-colors duration-200 group-hover/item:text-green-primary"
            />
            <span className="font-body text-sm md:text-base font-medium text-brand-mid/70 transition-colors duration-200 group-hover/item:text-green-dark">
              {label}
            </span>
            <span className="ml-6 md:ml-8 w-1.5 h-1.5 rounded-full bg-brand-border" />
          </div>
        ))}
      </div>

      {/* Soft edge fades so items appear to enter/exit smoothly */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  )
}
