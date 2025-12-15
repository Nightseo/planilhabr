/**
 * RelatedPlantillas Component
 * Clean, minimalist related templates display
 */

import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon, TagIcon } from '@heroicons/react/24/outline'

export interface RelatedPlantilla {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly category: string
  readonly downloadCount?: number
  readonly rating?: number
  readonly createdAt?: string
}

export interface RelatedPlantillasProps {
  plantillas: readonly RelatedPlantilla[]
  title: string
  categoryName?: string
  className?: string
  variant?: 'related' | 'latest'
  maxItems?: number
}

export function RelatedPlantillas({
  plantillas,
  title,
  categoryName,
  className = '',
  variant = 'related',
  maxItems = 6
}: RelatedPlantillasProps) {
  const displayPlantillas = plantillas.slice(0, maxItems)

  if (displayPlantillas.length === 0) {
    return null
  }

  return (
    <section className={`bg-white border-t border-green-200 ${className}`}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-[28px] font-semibold text-green-900 mb-2">
              {title}
            </h2>
            {categoryName && (
              <p className="text-[16px] text-green-800">
                Mais planilhas profissionais de {categoryName}
              </p>
            )}
          </div>
          <Link
            href="/planilhas"
            className="hidden sm:inline-flex items-center gap-1 text-[14px] font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            Ver todas
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPlantillas.map((plantilla) => (
            <Link
              key={plantilla.slug}
              href={`/${plantilla.slug}`}
              className="group block p-5 bg-white border border-green-200 rounded-md hover:border-green-600 hover:shadow-md transition-all duration-200"
            >
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-[11px] font-medium rounded">
                  <TagIcon className="w-3 h-3" />
                  {plantilla.category}
                </span>
                {variant === 'latest' && (
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-medium rounded">
                    Novo
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-semibold text-green-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
                {plantilla.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed mb-4">
                {plantilla.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-green-100">
                <span className="text-[13px] font-medium text-green-600 group-hover:text-green-700">
                  Ver detalhes →
                </span>
                {plantilla.downloadCount && plantilla.downloadCount > 0 && (
                  <span className="text-[12px] text-gray-600">
                    {plantilla.downloadCount.toLocaleString('pt-BR')}+ Downloads
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/planilhas"
            className="inline-flex items-center gap-1 px-6 py-3 bg-white border border-green-200 text-green-700 text-[15px] font-medium rounded-md hover:border-green-600 hover:text-green-600 transition-colors"
          >
            Ver todas as planilhas
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export type { RelatedPlantillasProps, RelatedPlantilla }
