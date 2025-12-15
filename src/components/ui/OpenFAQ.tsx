/**
 * OpenFAQ Component
 * Clean, minimalist FAQ display without accordion
 */

import React from 'react'
import { cn } from '@/lib/utils'

// ===============================
// TYPES
// ===============================

export interface OpenFAQItem {
  readonly question: string
  readonly answer: string
}

export interface OpenFAQProps {
  items: readonly OpenFAQItem[]
  title?: string
  className?: string
  variant?: 'default' | 'minimal' | 'highlighted'
}

export interface OpenFAQItemProps {
  item: OpenFAQItem
  index: number
  variant: 'default' | 'minimal' | 'highlighted'
}

// ===============================
// FAQ ITEM COMPONENT
// ===============================

const OpenFAQItemComponent: React.FC<OpenFAQItemProps> = ({
  item,
  index,
  variant
}) => {
  return (
    <article className="px-8 py-8 first:pt-8 last:pb-8">
      <h3 className="text-[17px] font-semibold text-green-900 mb-3">
        {item.question}
      </h3>
      <div
        className="text-[15px] text-green-800 leading-[1.7] prose prose-green max-w-none [&>p]:mb-3 [&>ul]:ml-5 [&>ul]:list-disc [&>strong]:text-green-900 [&>strong]:font-medium"
        dangerouslySetInnerHTML={{ __html: item.answer }}
      />
    </article>
  )
}

// ===============================
// MAIN COMPONENT
// ===============================

export const OpenFAQ: React.FC<OpenFAQProps> = ({
  items,
  title = 'Perguntas Frequentes',
  className,
  variant = 'default'
}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section
      className={cn('py-16 bg-green-50 border-t border-green-200', className)}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            id="faq-heading"
            className="text-[32px] font-semibold text-green-900 mb-3"
          >
            {title}
          </h2>
          <p className="text-[16px] text-gray-600 max-w-2xl mx-auto">
            Respostas para as duvidas mais comuns sobre esta planilha Excel
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white border border-green-200 rounded-md divide-y divide-green-200">
          {items.map((item, index) => (
            <OpenFAQItemComponent
              key={`open-faq-${index}`}
              item={item}
              index={index}
              variant={variant}
            />
          ))}
        </div>

        {/*
          Note: FAQPage structured data is handled by PlantillaSEO component
          to avoid duplication and maintain consistency across the site.
        */}
      </div>
    </section>
  )
}

// ===============================
// EXPORTS
// ===============================

export type { OpenFAQProps, OpenFAQItem }
