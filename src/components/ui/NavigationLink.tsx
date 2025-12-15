/**
 * Componente NavigationLink para enlaces de navegación consistentes
 * Diseño cuadrado - PlanilhaBR
 */

'use client'

import React from 'react'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface NavigationLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'button'
  active?: boolean
  underline?: boolean
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  children,
  className,
  variant = 'default',
  active = false,
  underline = true,
  ...props
}) => {
  const baseClasses = cn(
    'font-bold transition-all duration-200 relative',
    'focus:outline-none focus:ring-4 focus:ring-accent-500/30',
    variant === 'default' && [
      'text-white hover:text-accent-300',
      'px-3 py-2',
      'uppercase text-sm tracking-wide'
    ],
    variant === 'button' && [
      'bg-accent-500 text-green-900',
      'px-6 py-2.5 border-3 border-accent-600',
      'hover:bg-accent-400',
      'transform hover:scale-105',
      'transition-all duration-200',
      'uppercase text-sm tracking-wider font-black'
    ],
    active && variant === 'default' && 'text-accent-300',
    className
  )

  return (
    <Link
      className={baseClasses}
      {...props}
    >
      {children}
      {underline && variant === 'default' && (
        <span
          className={cn(
            'absolute -bottom-1 left-0 h-1 bg-accent-400',
            'transition-all duration-300',
            active ? 'w-full' : 'w-0 group-hover:w-full'
          )}
        />
      )}
    </Link>
  )
}

// ===============================
// EXPORTACIÓN
// ===============================

export type { NavigationLinkProps }
