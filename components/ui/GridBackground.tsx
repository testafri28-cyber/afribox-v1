type GridBackgroundProps = {
  /** Opacité des lignes (0–1). Défaut 0.08. */
  opacity?: number
  /** Taille des cellules en px. Défaut 48. */
  size?: number
  /** Masque radial pour fade sur les bords ('radial') ou plein ('none'). */
  mask?: 'radial' | 'none'
}

// Grille fine décorative à poser dans un parent `relative overflow-hidden`.
// Les couleurs sont en blanc avec opacité — pensé pour fonds sombres/colorés.
export default function GridBackground({
  opacity = 0.08,
  size = 48,
  mask = 'radial',
}: GridBackgroundProps) {
  const maskStyle =
    mask === 'radial'
      ? {
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 90%)',
        }
      : {}

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        ...maskStyle,
      }}
    />
  )
}
