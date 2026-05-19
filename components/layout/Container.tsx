import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'main' | 'header' | 'footer'
}

export default function Container({
  children,
  className = '',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={`max-w-container mx-auto px-4 md:px-10 lg:px-20 ${className}`}>
      {children}
    </Tag>
  )
}
