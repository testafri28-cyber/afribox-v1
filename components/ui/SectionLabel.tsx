type SectionLabelProps = {
  children: string
  className?: string
  tone?: 'green' | 'white'
}

const tones = {
  green: { bar: 'bg-green-primary', text: 'text-green-primary' },
  white: { bar: 'bg-white', text: 'text-white' },
} as const

export default function SectionLabel({
  children,
  className = '',
  tone = 'green',
}: SectionLabelProps) {
  const { bar, text } = tones[tone]
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-4 h-px ${bar}`} />
      <span className={`font-mono text-xs tracking-widest uppercase ${text}`}>
        {children}
      </span>
    </div>
  )
}
