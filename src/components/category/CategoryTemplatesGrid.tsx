/**
 * CategoryTemplatesGrid Component
 * Display templates in this category with green theme
 */

'use client'

import Link from 'next/link'
import { DocumentTextIcon, ArrowDownTrayIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

interface Template {
  slug: string
  title: string
  description: string
  downloadCount?: number
}

interface CategoryTemplatesGridProps {
  templates: Template[]
  categoryName: string
}

export default function CategoryTemplatesGrid({ templates, categoryName }: CategoryTemplatesGridProps) {
  if (templates.length === 0) {
    return (
      <section className="bg-gradient-to-b from-white to-green-50/50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DocumentTextIcon className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
              Planilhas em Preparacao
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Estamos desenvolvendo planilhas Excel profissionais para <strong>{categoryName}</strong>.
              Todas as planilhas sao revisadas por especialistas e incluem dados de exemplo.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-base font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/25"
            >
              Notifique-me quando disponivel
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-3">
            Planilhas Disponiveis
          </h2>
          <p className="text-lg text-gray-600">
            <span className="text-green-600 font-semibold">{templates.length}</span> {templates.length === 1 ? 'planilha Excel profissional' : 'planilhas Excel profissionais'} para {categoryName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={`/${template.slug}`}
              className="group block p-6 bg-white border border-gray-200 rounded-2xl hover:border-green-400 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                  <DocumentTextIcon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-green-900 group-hover:text-green-600 transition-colors line-clamp-2">
                    {template.title}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                {template.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 group-hover:gap-2 transition-all">
                  Ver detalhes
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
                {template.downloadCount && template.downloadCount > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>{template.downloadCount.toLocaleString('pt-BR')}+ downloads</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
