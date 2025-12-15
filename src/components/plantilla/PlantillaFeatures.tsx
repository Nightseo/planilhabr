/**
 * PlantillaFeatures Component
 * Clean, minimalist features display
 */

import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export interface PlantillaFeaturesProps {
  features: readonly string[]
  title?: string
  className?: string
  columns?: 1 | 2 | 3 | 4
  showIcons?: boolean
  variant?: 'default' | 'compact' | 'highlighted'
}

export function PlantillaFeatures({
  features,
  title = 'O que esta planilha inclui?',
  className = '',
  columns = 2,
  showIcons = true,
  variant = 'default'
}: PlantillaFeaturesProps) {
  if (features.length === 0) {
    return null
  }

  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className={`bg-green-50 border-t border-green-200 ${className}`}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Title */}
        {title && (
          <div className="mb-10">
            <h2 className="text-[28px] font-semibold text-green-900 mb-3">
              {title}
            </h2>
            <p className="text-[16px] text-green-800">
              Planilha Excel profissional com recursos pensados para suas necessidades
            </p>
          </div>
        )}

        {/* Features Grid */}
        <div className={`grid gap-4 ${gridColumns[columns]}`}>
          {features.map((feature, index) => (
            <div
              key={`feature-${index}`}
              className="flex items-start gap-3 p-5 bg-white border border-green-200 rounded-md"
            >
              {showIcons && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center mt-0.5">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                </div>
              )}
              <span className="text-[15px] text-green-800 leading-[1.6]">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Additional info */}
        {variant === 'highlighted' && (
          <div className="mt-8 p-4 bg-white border border-green-200 rounded-md">
            <p className="text-[14px] text-gray-600 text-center">
              <strong className="font-medium text-green-900">Download imediato</strong> • 100% Gratuito • Compativel com Excel, LibreOffice e Google Sheets
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export function PlantillaFeaturesCompact({
  features,
  className = ''
}: {
  features: readonly string[]
  className?: string
}) {
  if (features.length === 0) return null

  return (
    <PlantillaFeatures
      features={features}
      className={className}
      columns={2}
      variant="compact"
      showIcons={true}
      title=""
    />
  )
}

export type { PlantillaFeaturesProps }
