import fs from 'fs'
import path from 'path'

// ===============================
// TYPEN-DEFINITIONEN
// ===============================

export interface PlantillaContent {
  introduction?: string
  howToUse?: string
  conclusions?: string
  features?: string[]
  benefits?: string[]
}

export interface PlantillaFAQ {
  question: string
  answer: string
}

export interface PlantillaSEOSection {
  id: string
  title: string
  content: string
}

export interface PlantillaSEOContent {
  sections?: PlantillaSEOSection[]
}

export interface PlantillaData {
  slug: string
  keyword?: string
  category: string
  title: string
  description: string
  metaTitle?: string
  metaDescription?: string
  h1?: string
  excelUrl?: string
  downloadCount?: number
  rating?: number
  createdAt?: string
  updatedAt?: string
  content?: PlantillaContent
  faqs?: PlantillaFAQ[]
  seoContent?: PlantillaSEOContent
  features?: string[]
}

/**
 * Obtém todas as planilhas disponíveis dos arquivos JSON
 */
export async function getAllPlantillas(): Promise<PlantillaData[]> {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data')
    
    if (!fs.existsSync(dataDir)) {
      return []
    }

    const files = fs.readdirSync(dataDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    
    const plantillas: PlantillaData[] = []
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(dataDir, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(content)
        
        plantillas.push({
          slug: data.slug,
          keyword: data.keyword,
          category: data.category,
          title: data.title,
          description: data.description,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          h1: data.h1,
          excelUrl: data.excelUrl,
          downloadCount: data.downloadCount,
          rating: data.rating,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          content: data.content,
          faqs: data.faqs,
          seoContent: data.seoContent,
          features: data.features
        })
      } catch (error) {
        console.error(`Error loading plantilla from ${file}:`, error)
      }
    }
    
    return plantillas
  } catch (error) {
    console.error('Error loading plantillas:', error)
    return []
  }
}

/**
 * Obtém 3 planilhas relacionadas por categoria (excluindo a atual)
 */
export async function getRelatedPlantillas(currentSlug: string, category: string): Promise<PlantillaData[]> {
  const allPlantillas = await getAllPlantillas()

  // Filtrar por categoria e excluir a planilha atual
  const relatedPlantillas = allPlantillas
    .filter(plantilla => 
      plantilla.category === category && 
      plantilla.slug !== currentSlug
    )
    .sort((a, b) => {
      // Ordenar primeiro por rating, depois por downloadCount
      const ratingDiff = (b.rating || 0) - (a.rating || 0)
      if (ratingDiff !== 0) return ratingDiff
      return (b.downloadCount || 0) - (a.downloadCount || 0)
    })
    .slice(0, 3)
  
  return relatedPlantillas
}

/**
 * Ruft die 3 neuesten Plantillas ab (aktuelle ausgeschlossen)
 */
export async function getLatestPlantillas(currentSlug: string): Promise<PlantillaData[]> {
  const allPlantillas = await getAllPlantillas()

  const latestPlantillas = allPlantillas
    .filter(plantilla => plantilla.slug !== currentSlug)
    .sort((a, b) => {
      // Ordenar por data de criacao (mais recentes primeiro)
      const dateA = new Date(a.createdAt || a.updatedAt || '2025-01-01')
      const dateB = new Date(b.createdAt || b.updatedAt || '2025-01-01')
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 3)
  
  return latestPlantillas
}

/**
 * Formata uma data em formato brasileiro legivel (client-safe)
 */
export function formatDateBrazilian(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return 'Recentemente'
  }
}