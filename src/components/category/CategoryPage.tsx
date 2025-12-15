/**
 * CategoryPage Component
 * Main category page layout
 */

import CategoryHero from './CategoryHero'
import CategoryTemplatesGrid from './CategoryTemplatesGrid'
import CategorySEOContent from './CategorySEOContent'
import CategoryRelated from './CategoryRelated'

interface Template {
  slug: string
  title: string
  description: string
  downloadCount?: number
}

interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
}

interface CategoryPageProps {
  category: Category
  templates: Template[]
  relatedCategories: Category[]
  focusPoints: string[]
}

export default function CategoryPage({
  category,
  templates,
  relatedCategories,
  focusPoints
}: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <CategoryHero
        name={category.name}
        description={category.description}
        icon={category.icon}
        templateCount={templates.length}
        categoryId={category.id}
      />

      <CategoryTemplatesGrid
        templates={templates}
        categoryName={category.name}
      />

      <CategorySEOContent
        categoryName={category.name}
        focusPoints={focusPoints}
      />

      <CategoryRelated categories={relatedCategories} />
    </div>
  )
}
