/**
 * PlanilhasContent Component
 * Main container with filtering logic
 */

'use client'

import { useState, useMemo } from 'react'
import PlanilhasFilters from './PlanilhasFilters'
import PlanilhasGrid from './PlanilhasGrid'

interface Template {
  slug: string
  title: string
  h1?: string
  category: string
  description: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface PlanilhasContentProps {
  templates: Template[]
  categories: Category[]
}

export default function PlanilhasContent({ templates, categories }: PlanilhasContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      if (selectedCategory && template.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = template.title.toLowerCase().includes(query)
        const matchesH1 = template.h1?.toLowerCase().includes(query) || false
        const matchesDescription = template.description.toLowerCase().includes(query)
        const matchesCategory = template.category.toLowerCase().includes(query)

        return matchesTitle || matchesH1 || matchesDescription || matchesCategory
      }

      return true
    })
  }, [templates, searchQuery, selectedCategory])

  return (
    <>
      <PlanilhasFilters
        categories={categories}
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <PlanilhasGrid templates={filteredTemplates} />
    </>
  )
}
