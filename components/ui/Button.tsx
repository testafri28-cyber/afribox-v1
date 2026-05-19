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
  'inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-green-primary text-white hover:bg-green-dark',
  secondary:
    'bg-white text-brand-gray border border-brand-border hover:bg-brand-off',
  ghost:
    'bg-transparent text-brand-gray border border-brand-border hover:bg-brand-off',
  white: 'bg-white text-green-dark hover:bg-brand-off',
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
