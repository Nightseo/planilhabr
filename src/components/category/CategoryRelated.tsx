/**
 * CategoryRelated Component
 * Display related categories with green theme
 */

'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { getCategoryIcon } from '@/lib/categoryIcons'

interface RelatedCategory {
  slug: string
  name: string
  description: string
  icon: string
  id?: string
}

interface CategoryRelatedProps {
  categories: RelatedCategory[]
}

export default function CategoryRelated({ categories }: CategoryRelatedProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-3">
            Categorias Relacionadas
          </h2>
          <p className="text-lg text-gray-600">
            Descubra outras planilhas Excel que frequentemente sao usadas em conjunto
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.id || category.slug)
            return (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-white hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                  <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-green-900 group-hover:text-green-600 transition-colors mb-2 flex items-center gap-2">
                    {category.name}
                    <ArrowRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-gray-600 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
