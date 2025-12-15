/**
 * Componente Breadcrumb para navegación jerárquica
 * Implementa separadores dinámicos y accesibilidad
 * Diseño minimalista con truncate en móvil
 */

import React from 'react'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface BreadcrumbItem {
  readonly name: string
  readonly href: string
  readonly current?: boolean
}

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
  maxItems?: number
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
  separator = <ChevronRightIcon className="w-4 h-4 text-green-400 flex-shrink-0" />,
  maxItems
}) => {
  // Filter and limit items if needed
  let processedItems = [...items]

  if (maxItems && processedItems.length > maxItems) {
    const firstItem = processedItems[0]
    const lastItems = processedItems.slice(-(maxItems - 1))
    processedItems = [firstItem, { name: '...', href: '#', current: false }, ...lastItems]
  }

  return (
    <nav
      className={cn('overflow-x-auto', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 whitespace-nowrap">
        {processedItems.map((item, index) => {
          const isLast = index === processedItems.length - 1
          const isCurrent = item.current || isLast

          return (
            <li key={`${item.href}-${index}`} className="flex items-center flex-shrink-0">
              {index > 0 && (
                <span className="mx-2 flex-shrink-0" aria-hidden="true">
                  {separator}
                </span>
              )}

              {item.name === '...' ? (
                <span
                  className="text-[13px] text-green-400"
                  aria-label="Mais itens"
                >
                  ...
                </span>
              ) : isCurrent ? (
                <span
                  className={cn(
                    'text-[13px] font-medium text-green-900',
                    'max-w-[200px] sm:max-w-none truncate block'
                  )}
                  aria-current="page"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'text-[13px] font-medium transition-colors',
                    'text-green-600 hover:text-green-600',
                    'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm px-1',
                    'max-w-[150px] sm:max-w-none truncate block'
                  )}
                  title={item.name}
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ===============================
// EXPORTACIÓN
// ===============================

export type { BreadcrumbProps, BreadcrumbItem }