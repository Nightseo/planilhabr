/**
 * PlanilhasFilters Component
 * Search and category filters for templates
 */

'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { getCategoryIcon } from '@/lib/categoryIcons'

interface Category {
  id: string
  name: string
  slug: string
}

interface PlanilhasFiltersProps {
  categories: Category[]
  onSearch: (query: string) => void
  onCategoryChange: (categoryId: string | null) => void
  selectedCategory: string | null
}

export default function PlanilhasFilters({
  categories,
  onSearch,
  onCategoryChange,
  selectedCategory
}: PlanilhasFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  return (
    <section className="border-b border-green-200 bg-green-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar planilhas..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-md text-[15px] text-green-900 placeholder:text-green-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FunnelIcon className="w-4 h-4 text-green-400" />
            <span className="text-[13px] font-medium text-green-700">Categoria</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`px-4 py-2 text-[14px] font-medium rounded-md transition-all duration-150 ${
                selectedCategory === null
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-green-700 border border-green-200 hover:border-green-600 hover:text-green-600'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.id)
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-[14px] font-medium rounded-md transition-all duration-150 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-green-700 border border-green-200 hover:border-green-600 hover:text-green-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
