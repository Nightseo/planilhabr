/**
 * Componente NavigationMenu para menús desplegables
 * Diseño cuadrado - PlanilhaBR
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import type { Category } from '@/types'

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface NavigationMenuItem {
  id: string
  label: string
  href: string
  icon?: string
  description?: string
}

export interface NavigationMenuProps {
  trigger: string
  items: NavigationMenuItem[]
  className?: string
  menuClassName?: string
  columns?: 1 | 2 | 3
  showAllLink?: {
    label: string
    href: string
  }
  onItemClick?: (item: NavigationMenuItem) => void
}

export interface DropdownTriggerProps {
  label: string
  isOpen: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  className?: string
}

// ===============================
// COMPONENTE TRIGGER
// ===============================

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  label,
  isOpen,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'text-white hover:text-accent-300 font-bold',
        'transition-all duration-200 relative group',
        'flex items-center space-x-1 px-3 py-2',
        'focus:outline-none focus:ring-4 focus:ring-accent-500/30',
        'uppercase text-sm tracking-wide',
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <span>{label}</span>
      <ChevronDownIcon
        className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen ? 'rotate-180' : ''
        )}
      />
      <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent-400 transition-all duration-300 group-hover:w-full" />
    </button>
  )
}

// ===============================
// COMPONENTE DE ITEM
// ===============================

const NavigationMenuItemComponent: React.FC<{
  item: NavigationMenuItem
  onClick: (item: NavigationMenuItem) => void
}> = ({ item, onClick }) => {
  return (
    <Link
      href={item.href}
      className={cn(
        'group block p-3 border-2 border-primary-200 hover:border-accent-500',
        'hover:bg-primary-50',
        'transition-all duration-200',
        'focus:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-accent-500/30'
      )}
      onClick={() => onClick(item)}
    >
      <div className="font-bold text-green-900 group-hover:text-primary-700 text-sm uppercase tracking-wide">
        {item.label}
      </div>
    </Link>
  )
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  trigger,
  items,
  className,
  menuClassName,
  columns = 2,
  showAllLink,
  onItemClick
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle mouse enter (open menu)
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  // Handle mouse leave (close menu with delay)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  // Handle item click
  const handleItemClick = (item: NavigationMenuItem) => {
    setIsOpen(false)
    onItemClick?.(item)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isOpen])

  return (
    <div
      ref={menuRef}
      className={cn('relative group', className)}
      onKeyDown={handleKeyDown}
    >
      <DropdownTrigger
        label={trigger}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'absolute top-full left-0 mt-2 w-80 bg-white',
          'border-3 border-primary-600 shadow-xl overflow-hidden',
          'transition-all duration-300 z-50',
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible translate-y-2',
          menuClassName
        )}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="p-4">
          <div
            className={cn(
              'grid gap-3',
              columns === 1 && 'grid-cols-1',
              columns === 2 && 'grid-cols-2',
              columns === 3 && 'grid-cols-3'
            )}
          >
            {items.map((item, index) => (
              <div key={item.id || `nav-item-${index}`} role="menuitem">
                <NavigationMenuItemComponent
                  item={item}
                  onClick={handleItemClick}
                />
              </div>
            ))}
          </div>

          {showAllLink && (
            <div className="mt-4 pt-4 border-t-3 border-primary-200">
              <Button
                asChild
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <Link href={showAllLink.href}>
                  {showAllLink.label}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ===============================
// HOOK PARA CONVERTIR CATEGORÍAS
// ===============================

export const useCategoriesAsMenuItems = (categories: Category[]): NavigationMenuItem[] => {
  return categories.map(category => ({
    id: category.id,
    label: category.name,
    href: `/${category.slug}`,
    icon: category.icon,
    description: category.description
  }))
}

// ===============================
// EXPORTACIÓN
// ===============================

export type { NavigationMenuItem, NavigationMenuProps }
