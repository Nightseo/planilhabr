/**
 * PlanilhaBR Input Component
 * Diseño cuadrado, minimalista
 * Estilo profesional
 */

import React, { forwardRef, useId, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

// ===============================
// CONFIGURACIÓN DE VARIANTES
// ===============================

const inputVariants = cva(
  [
    'flex w-full border-2 px-4 py-2',
    'text-sm transition-all duration-200',
    'placeholder:text-green-400',
    'focus:outline-none focus:ring-3 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'disabled:bg-green-50'
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-green-300 bg-white',
          'hover:border-primary-500',
          'focus:border-primary-600 focus:ring-primary-500/30'
        ].join(' '),
        error: [
          'border-red-400 bg-red-50',
          'text-red-900 placeholder:text-red-400',
          'focus:border-red-600 focus:ring-red-500/30'
        ].join(' '),
        success: [
          'border-primary-400 bg-primary-50',
          'text-primary-900',
          'focus:border-primary-600 focus:ring-primary-500/30'
        ].join(' ')
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-13 px-5 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showPasswordToggle?: boolean
  loading?: boolean
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      loading = false,
      type = 'text',
      disabled,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = useId()
    const finalId = id || inputId
    const helperId = `${finalId}-helper`
    const errorId = `${finalId}-error`

    // Determinar variante basada en error
    const finalVariant = error ? 'error' : variant

    // Determinar tipo de input
    const inputType = showPasswordToggle 
      ? (showPassword ? 'text' : 'password')
      : type

    // Calcular aria-describedby
    const describedBy = [
      ariaDescribedBy,
      helperText && helperId,
      error && errorId
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="space-y-1">
        {/* Label */}
        {label && (
          <label
            htmlFor={finalId}
            className="block text-sm font-semibold text-primary-800 uppercase tracking-wide"
          >
            {label}
            {props.required && (
              <span className="text-red-600 ml-1 font-bold" aria-label="Pflichtfeld">
                *
              </span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {React.cloneElement(leftIcon as React.ReactElement, {
                className: cn('w-5 h-5', (leftIcon as any)?.props?.className)
              })}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            id={finalId}
            className={cn(
              inputVariants({ variant: finalVariant, size }),
              leftIcon && 'pl-10',
              (rightIcon || showPasswordToggle || loading || error) && 'pr-10',
              className
            )}
            disabled={disabled || loading}
            aria-describedby={describedBy}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />

          {/* Right Side Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {/* Loading Spinner */}
            {loading && (
              <div className="w-5 h-5">
                <svg
                  className="animate-spin w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
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
              </div>
            )}

            {/* Error Icon */}
            {error && !loading && (
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            )}

            {/* Success Icon */}
            {finalVariant === 'success' && !loading && !error && (
              <CheckCircleIcon className="w-5 h-5 text-gray-600" />
            )}

            {/* Password Toggle */}
            {showPasswordToggle && !loading && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            )}

            {/* Right Icon */}
            {rightIcon && !loading && !error && finalVariant !== 'success' && (
              <div className="text-gray-400">
                {React.cloneElement(rightIcon as React.ReactElement, {
                  className: cn('w-5 h-5', (rightIcon as any)?.props?.className)
                })}
              </div>
            )}
          </div>
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={helperId}
            className="text-sm text-gray-600"
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600 flex items-center space-x-1"
            role="alert"
          >
            <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// ===============================
// EXPORTACIÓN
// ===============================

export { Input, inputVariants }
export type { InputProps }