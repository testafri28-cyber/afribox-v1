type GridBackgroundProps = {
  /** Opacité des lignes (0–1). Défaut 0.08 pour white, 0.06 pour green. */
  opacity?: number
  /** Taille des cellules en px. Défaut 48. */
  size?: number
  /** Masque radial pour fade sur les bords ('radial') ou plein ('none'). */
  mask?: 'radial' | 'none'
  /** Couleur des lignes : 'white' pour fonds sombres, 'green' pour cartes claires. */
  tone?: 'white' | 'green'
}

// Grille fine décorative à poser dans un parent `relative overflow-hidden`.
// - tone="white" : lignes blanches, pensé pour fonds colorés/sombres
// - tone="green" : lignes vert primaire, pensé pour cartes claires
export default function GridBackground({
  opacity,
  size = 48,
  mask = 'radial',
  tone = 'white',
}: GridBackgroundProps) {
  // Valeurs RGB des couleurs de base
  const rgb = tone === 'green' ? '39, 174, 96' : '255, 255, 255'
  const actualOpacity = opacity ?? (tone === 'green' ? 0.06 : 0.08)

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
        backgroundImage: `linear-gradient(to right, rgba(${rgb},${actualOpacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(${rgb},${actualOpacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        ...maskStyle,
      }}
    />
  )
}
