/**
 * CategoryHero Component
 * SEO-optimized hero for category pages with Brazilian green theme
 */

'use client'

import { getCategoryIcon } from '@/lib/categoryIcons'

interface CategoryHeroProps {
  name: string
  description: string
  icon: string
  templateCount: number
  categoryId: string
}

export default function CategoryHero({ name, description, icon, templateCount, categoryId }: CategoryHeroProps) {
  const Icon = getCategoryIcon(categoryId)

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50/30" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-100/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-100/30 to-transparent rounded-full blur-2xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Breadcrumb simple */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <a href="/" className="hover:underline">Inicio</a>
            <span>/</span>
            <a href="/planilhas" className="hover:underline">Planilhas</a>
            <span>/</span>
            <span className="text-green-800 font-medium">{name}</span>
          </div>

          {/* Icon + Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-green-900">
                Planilhas Excel de {name}
              </h1>
              {templateCount > 0 && (
                <p className="text-green-800 font-medium mt-1">
                  {templateCount} {templateCount === 1 ? 'planilha disponivel' : 'planilhas disponiveis'} para download
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-green-800 leading-relaxed mb-8">
            {description}
          </p>

          {/* Features inline */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-green-700">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Download gratuito
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Sem cadastro
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Formulas prontas
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Excel compativel
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
