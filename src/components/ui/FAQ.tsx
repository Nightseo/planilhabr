/**
 * Componente FAQ para preguntas frecuentes
 * Implementa acordeón con animaciones y accesibilidad
 */

'use client'

import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface FAQItem {
  readonly question: string
  readonly answer: string
}

export interface FAQProps {
  items: readonly FAQItem[]
  title?: string
  className?: string
  allowMultiple?: boolean
  variant?: 'default' | 'bordered' | 'minimal'
}

export interface FAQItemProps {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void
  variant: 'default' | 'bordered' | 'minimal'
}

// ===============================
// COMPONENTE FAQ ITEM
// ===============================

const FAQItemComponent: React.FC<FAQItemProps> = ({
  item,
  index,
  isOpen,
  onToggle,
  variant
}) => {
  const baseClasses = cn(
    'transition-all duration-200',
    variant === 'default' && 'bg-teal-50 rounded-2xl p-8 hover:bg-teal-100',
    variant === 'bordered' && 'border border-gray-200 rounded-lg p-6 hover:border-teal-300',
    variant === 'minimal' && 'border-b border-gray-200 pb-6 last:border-b-0'
  )

  return (
    <div className={baseClasses}>
      <button
        type="button"
        className="flex justify-between items-start w-full text-left focus:outline-none focus:ring-2 focus:ring-teal-500/20 rounded-lg"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <h3 className="text-xl font-semibold text-green-900 mr-4">
          {item.question}
        </h3>
        <ChevronDownIcon
          className={cn(
            'w-6 h-6 text-teal-600 flex-shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
          aria-hidden="true"
        />
      </button>
      
      <div
        className={cn(
          'mt-4 overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
        id={`faq-answer-${index}`}
        aria-labelledby={`faq-question-${index}`}
        role="region"
      >
        <p className="text-gray-700 leading-relaxed pr-8">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

export const FAQ: React.FC<FAQProps> = ({
  items,
  title = 'Häufig gestellte Fragen',
  className,
  allowMultiple = false,
  variant = 'default'
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  if (items.length === 0) {
    return null
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev)
      
      if (newOpenItems.has(index)) {
        // Close the item
        newOpenItems.delete(index)
      } else {
        // Open the item
        if (!allowMultiple) {
          // If only one item allowed, close all others
          newOpenItems.clear()
        }
        newOpenItems.add(index)
      }
      
      return newOpenItems
    })
  }

  return (
    <section 
      className={cn('py-16 bg-white', className)}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="faq-heading"
          className="text-3xl font-bold text-center text-green-900 mb-12"
        >
          {title}
        </h2>
        
        <div 
          className={cn(
            variant === 'default' && 'space-y-8',
            variant === 'bordered' && 'space-y-4',
            variant === 'minimal' && 'space-y-6'
          )}
        >
          {items.map((item, index) => (
            <FAQItemComponent
              key={`faq-${index}`}
              item={item}
              index={index}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
              variant={variant}
            />
          ))}
        </div>

        {/* Schema.org structured data removed - now handled by PlantillaSEO component */}
      </div>
    </section>
  )
}

// ===============================
// COMPONENTE COMPACTO
// ===============================

export const FAQMinimal: React.FC<{
  items: readonly FAQItem[]
  className?: string
}> = ({ items, className }) => {
  return (
    <FAQ
      items={items}
      className={className}
      variant="minimal"
      allowMultiple={true}
      title=""
    />
  )
}

// ===============================
// EXPORTACIÓN
// ===============================

export type { FAQProps, FAQItem }