type GridBackgroundProps = {
  opacity?: number
  size?: number
  mask?: 'radial' | 'none'
  tone?: 'white' | 'green'
}

export default function GridBackground({
  opacity,
  mask = 'radial',
  tone = 'white',
}: GridBackgroundProps) {
  const actualOpacity = opacity ?? (tone === 'green' ? 0.03 : 0.18)

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
        backgroundImage: "url('/adinkra-pattern.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '700px auto',
        opacity: actualOpacity,
        mixBlendMode: tone === 'green' ? 'multiply' : 'screen',
        ...maskStyle,
      }}
    />
  )
}
