/**
 * Componente MobileMenu para navegación móvil
 * Implementa drawer pattern con animaciones y accesibilidad
 */

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { SearchInput } from './SearchInput'
import type { NavigationMenuItem, SearchResult } from '@/types'

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface MobileMenuProps {
  className?: string
  triggerClassName?: string
  children: React.ReactNode
}

export interface MobileMenuTriggerProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export interface MobileMenuContentProps {
  isOpen: boolean
  onClose: () => void
  className?: string
  children: React.ReactNode
}

export interface MobileMenuItemProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export interface MobileSubMenuProps {
  title: string
  items: NavigationMenuItem[]
  onItemClick: (item: NavigationMenuItem) => void
  className?: string
}

// ===============================
// COMPONENTE TRIGGER
// ===============================

const MobileMenuTrigger: React.FC<MobileMenuTriggerProps> = ({
  isOpen,
  onToggle,
  className
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'relative z-50 p-2 rounded-xl bg-white text-gray-700 hover:text-teal-800',
        'border border-gray-200 hover:border-teal-300 shadow-sm',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20',
        'lg:hidden',
        className
      )}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      {isOpen ? (
        <XMarkIcon className="w-6 h-6" />
      ) : (
        <Bars3Icon className="w-6 h-6" />
      )}
    </button>
  )
}

// ===============================
// COMPONENTE CONTENT
// ===============================

const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  isOpen,
  onClose,
  className,
  children
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Menu Content */}
      <div
        className={cn(
          'lg:hidden fixed left-0 right-0 top-14 z-50',
          'bg-white border-b border-teal-200/60 shadow-lg',
          'transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
          className
        )}
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!isOpen}
      >
        <div className="py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}

// ===============================
// COMPONENTE ITEM
// ===============================

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  href,
  children,
  onClick,
  className
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'block px-4 py-2 text-gray-700 hover:text-teal-800',
        'hover:bg-teal-50 rounded-xl transition-all duration-200',
        'focus:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20',
        className
      )}
      onClick={onClick}
      role="menuitem"
    >
      {children}
    </Link>
  )
}

// ===============================
// COMPONENTE SUBMENU
// ===============================

const MobileSubMenu: React.FC<MobileSubMenuProps> = ({
  title,
  items,
  onItemClick,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = (item: NavigationMenuItem) => {
    onItemClick(item)
    setIsOpen(false)
  }

  return (
    <div className={cn('space-y-1', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-2',
          'text-gray-700 hover:text-teal-800 hover:bg-teal-50',
          'rounded-xl transition-all duration-200',
          'focus:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20'
        )}
        aria-expanded={isOpen}
        role="menuitem"
      >
        <span>{title}</span>
        <ChevronDownIcon 
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          )} 
        />
      </button>
      
      <div 
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="pl-4 mt-2 space-y-1">
          {items.map((item, index) => (
            <button
              key={item.id || `mobile-submenu-item-${index}`}
              type="button"
              onClick={() => handleItemClick(item)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-2',
                'text-sm text-gray-600 hover:text-emerald-700',
                'hover:bg-teal-50 rounded-xl transition-all duration-200',
                'focus:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20',
                'text-left'
              )}
              role="menuitem"
            >
              {item.icon && (
                <span className="text-lg" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===============================
// COMPONENTE SEARCH MOBILE
// ===============================

const MobileMenuSearch: React.FC<{
  onSearch?: (query: string) => void
  onResultSelect?: (result: SearchResult) => void
  results?: SearchResult[]
  loading?: boolean
}> = ({ onSearch, onResultSelect, results, loading }) => {
  return (
    <div className="relative px-4 mb-4">
      <SearchInput
        placeholder="Buscar planilhas Excel..."
        onSearch={onSearch}
        onResultSelect={onResultSelect}
        results={results}
        loading={loading}
        className="w-full"
      />
    </div>
  )
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

export const MobileMenu: React.FC<MobileMenuProps> = ({
  className,
  triggerClassName,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)
  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <div className={className}>
      <MobileMenuTrigger
        isOpen={isOpen}
        onToggle={handleToggle}
        className={triggerClassName}
      />
      <MobileMenuContent
        isOpen={isOpen}
        onClose={handleClose}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
              key: child.key || `mobile-child-${index}`,
              onClose: handleClose,
              ...child.props 
            })
          }
          return child
        })}
      </MobileMenuContent>
    </div>
  )
}

// ===============================
// EXPORTACIONES
// ===============================

export {
  MobileMenuTrigger,
  MobileMenuContent,
  MobileMenuItem,
  MobileSubMenu,
  MobileMenuSearch
}

export type {
  MobileMenuProps,
  MobileMenuTriggerProps,
  MobileMenuContentProps,
  MobileMenuItemProps,
  MobileSubMenuProps
}