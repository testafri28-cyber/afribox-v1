import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
}

export default function Card({ children, className = '', as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={`bg-white border border-brand-border rounded-2xl p-6 md:p-8 ${className}`}
    >
      {children}
    </Tag>
  )
}
