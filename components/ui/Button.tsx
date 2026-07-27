'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

type ButtonAsLink = CommonProps & {
  href: string
  type?: never
  disabled?: never
  onClick?: () => void
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const base =
  'btn-fill inline-flex items-center justify-center font-body font-medium rounded-full transition-transform duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'

// Le remplissage montant (--fill) reprend la couleur de survol de chaque variante.
const variants: Record<Variant, string> = {
  primary: 'bg-green-primary text-white [--fill:#1B5E20]',
  secondary:
    'bg-white text-brand-gray border border-brand-border [--fill:#F7F9F7]',
  ghost:
    'bg-transparent text-brand-gray border border-brand-border [--fill:#F7F9F7]',
  white: 'bg-white text-green-dark [--fill:#F7F9F7]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', children, className = '', fullWidth, ...rest },
  ref,
) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`

  if ('href' in rest && rest.href) {
    const { href, ...linkRest } = rest
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  const { href: _ignored, ...buttonRest } = rest as ButtonAsButton
  return (
    <button ref={ref} className={classes} {...buttonRest}>
      {children}
    </button>
  )
})

export default Button
