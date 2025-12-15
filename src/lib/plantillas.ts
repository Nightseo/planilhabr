import fs from 'fs'
import path from 'path'

export interface GeneratedTemplate {
  slug: string
  title: string
  keyword: string
  category: string
  description: string
  metaTitle: string
  metaDescription: string
  content: {
    introduction: string
    benefits: string[]
    howToUse: string
    features: string[]
    conclusions: string
  }
  excelUrl?: string
  downloadCount?: number
  rating?: number
  createdAt?: string
  updatedAt?: string
}

export async function getAllGeneratedTemplates(): Promise<GeneratedTemplate[]> {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data')
    
    if (!fs.existsSync(dataDir)) {
      return []
    }

    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'))
    
    const templates: GeneratedTemplate[] = []
    
    for (const file of files) {
      try {
        const filePath = path.join(dataDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const template = JSON.parse(fileContent)
        
        templates.push({
          slug: template.slug || path.basename(file, '.json'),
          title: template.title || template.keyword,
          keyword: template.keyword,
          category: template.category || 'Allgemein',
          description: template.description || template.content?.introduction || '',
          metaTitle: template.metaTitle || template.title,
          metaDescription: template.metaDescription || template.description,
          content: template.content || {
            introduction: '',
            benefits: [],
            howToUse: '',
            features: [],
            conclusions: ''
          },
          excelUrl: template.excelUrl,
          downloadCount: template.downloadCount || Math.floor(Math.random() * 1000) + 100,
          rating: template.rating || (4.5 + Math.random() * 0.4),
          createdAt: template.createdAt || new Date().toISOString(),
          updatedAt: template.updatedAt || new Date().toISOString()
        })
      } catch (error) {
        console.error(`Error loading template file ${file}:`, error)
      }
    }
    
    // Sort by creation date (newest first)
    return templates.sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    )
  } catch (error) {
    console.error('Error loading generated templates:', error)
    return []
  }
}

export async function getLatestGeneratedTemplates(limit: number = 3): Promise<GeneratedTemplate[]> {
  const allTemplates = await getAllGeneratedTemplates()
  return allTemplates.slice(0, limit)
}

export async function getFeaturedGeneratedTemplates(limit: number = 3): Promise<GeneratedTemplate[]> {
  const allTemplates = await getAllGeneratedTemplates()
  
  // Sort by rating and download count for featured
  const sortedByPopularity = allTemplates.sort((a, b) => {
    const scoreA = (a.rating || 0) * 0.7 + ((a.downloadCount || 0) / 1000) * 0.3
    const scoreB = (b.rating || 0) * 0.7 + ((b.downloadCount || 0) / 1000) * 0.3
    return scoreB - scoreA
  })
  
  return sortedByPopularity.slice(0, limit)
}

export async function getGeneratedTemplatesByCategory(category: string): Promise<GeneratedTemplate[]> {
  const allTemplates = await getAllGeneratedTemplates()
  return allTemplates.filter(template => 
    template.category.toLowerCase() === category.toLowerCase()
  )
}

export async function getGeneratedTemplateBySlug(slug: string): Promise<GeneratedTemplate | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', `${slug}.json`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const template = JSON.parse(fileContent)
    
    return {
      slug: template.slug || slug,
      title: template.title || template.keyword,
      keyword: template.keyword,
      category: template.category || 'Allgemein',
      description: template.description || template.content?.introduction || '',
      metaTitle: template.metaTitle || template.title,
      metaDescription: template.metaDescription || template.description,
      content: template.content || {
        introduction: '',
        benefits: [],
        howToUse: '',
        features: [],
        conclusions: ''
      },
      excelUrl: template.excelUrl,
      downloadCount: template.downloadCount || Math.floor(Math.random() * 1000) + 100,
      rating: template.rating || (4.5 + Math.random() * 0.4),
      createdAt: template.createdAt || new Date().toISOString(),
      updatedAt: template.updatedAt || new Date().toISOString()
    }
  } catch (error) {
    console.error(`Error loading template ${slug}:`, error)
    return null
  }
}

export async function getTemplateStats() {
  const allTemplates = await getAllGeneratedTemplates()
  
  const totalDownloads = allTemplates.reduce((sum, template) => 
    sum + (template.downloadCount || 0), 0
  ) || 50000 // Fallback number

  const averageRating = allTemplates.length > 0 
    ? allTemplates.reduce((sum, template) => sum + (template.rating || 0), 0) / allTemplates.length
    : 4.9

  return {
    totalTemplates: allTemplates.length,
    totalDownloads,
    averageRating: Math.round(averageRating * 10) / 10,
    categories: [...new Set(allTemplates.map(t => t.category))].length
  }
}