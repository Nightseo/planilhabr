/**
 * PlanilhasGrid Component
 * Clean grid display for templates
 */

'use client'

import Link from 'next/link'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

interface Template {
  slug: string
  title: string
  h1?: string
  category: string
  description: string
}

interface PlanilhasGridProps {
  templates: Template[]
  isLoading?: boolean
}

export default function PlanilhasGrid({ templates, isLoading = false }: PlanilhasGridProps) {
  if (isLoading) {
    return (
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center text-gray-600">Carregando planilhas...</div>
        </div>
      </section>
    )
  }

  if (templates.length === 0) {
    return (
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center">
            <DocumentTextIcon className="w-12 h-12 text-green-300 mx-auto mb-4" />
            <p className="text-[16px] text-gray-600">
              Nenhuma planilha encontrada. Tente outra busca.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-[14px] text-gray-600">
            {templates.length} {templates.length === 1 ? 'planilha encontrada' : 'planilhas encontradas'}
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={`/${template.slug}`}
              className="group block p-5 bg-white border border-green-200 rounded-md hover:border-green-600 hover:shadow-sm transition-all duration-200"
            >
              {/* Category badge */}
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-[11px] font-medium uppercase tracking-wide rounded">
                  {template.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-semibold text-green-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
                {template.h1 || template.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                {template.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-4 pt-3 border-t border-green-100">
                <span className="text-[13px] font-medium text-green-600 group-hover:underline">
                  Ver planilha e baixar
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
