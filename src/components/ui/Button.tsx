/**
 * PlanilhaBR Button Component
 * Diseño cuadrado, minimalista
 * Estilo profesional
 */

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ===============================
// CONFIGURACIÓN DE VARIANTES
// ===============================

const buttonVariants = cva(
  // Estilos base - siempre aplicados - SQUARE DESIGN
  [
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-98 transform',
    'select-none uppercase tracking-wide text-sm'
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600 text-white',
          'border-2 border-primary-700',
          'hover:bg-primary-700 hover:border-primary-800',
          'hover:shadow-lg hover:shadow-primary-500/30',
          'focus-visible:ring-primary-500/50',
          'active:bg-primary-800'
        ].join(' '),
        secondary: [
          'bg-green-100 text-green-900',
          'border-2 border-green-300',
          'hover:bg-green-200 hover:border-green-400',
          'focus-visible:ring-green-500/50'
        ].join(' '),
        outline: [
          'border-3 border-primary-600 text-primary-700',
          'bg-transparent',
          'hover:bg-primary-50 hover:border-primary-700 hover:text-primary-800',
          'focus-visible:ring-primary-500/50'
        ].join(' '),
        accent: [
          'bg-accent-500 text-white',
          'border-2 border-accent-600',
          'hover:bg-accent-600 hover:border-accent-700',
          'hover:shadow-lg hover:shadow-accent-500/30',
          'focus-visible:ring-accent-500/50',
          'active:bg-accent-700'
        ].join(' '),
        ghost: [
          'text-green-700 bg-transparent',
          'border-2 border-transparent',
          'hover:bg-green-100 hover:text-green-900 hover:border-green-200',
          'focus-visible:ring-green-500/50'
        ].join(' '),
        danger: [
          'bg-red-600 text-white',
          'border-2 border-red-700',
          'hover:bg-red-700 hover:border-red-800',
          'focus-visible:ring-red-500/50',
          'active:bg-red-800'
        ].join(' ')
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        xl: 'h-16 px-10 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

// ===============================
// ICONOS DE LOADING
// ===============================

const LoadingSpinner: React.FC<{ size: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }

  return (
    <svg
      className={cn('animate-spin', sizeMap[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface ButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
  asChild?: boolean
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

const Button = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      onClick,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    const buttonClass = cn(buttonVariants({ variant, size, className }))

    const content = (
      <>
        {loading && <LoadingSpinner size={size || 'md'} />}
        {!loading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={loading ? 'ml-2' : ''}>{children}</span>
        {!loading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    )

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(buttonClass, (children as React.ReactElement).props.className),
        ...props
      })
    }

    return (
      <button
        className={buttonClass}
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        aria-disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

// ===============================
// EXPORTACIÓN
// ===============================

export { Button, buttonVariants }
export type { ButtonComponentProps }