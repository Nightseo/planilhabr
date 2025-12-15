import fs from 'fs'
import path from 'path'

export interface LatestPlantilla {
  slug: string
  title: string
  category: string
  downloadCount?: number
  createdAt?: string
}

/**
 * Obtiene las plantillas más recientes para mostrar en el footer
 */
export function getLatestPlantillas(limit: number = 4): LatestPlantilla[] {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data')
    
    if (!fs.existsSync(dataDir)) {
      return []
    }

    const jsonFiles = fs.readdirSync(dataDir)
      .filter(f => f.endsWith('.json'))
      .slice(0, 20) // Limitar lectura para performance

    const plantillas: LatestPlantilla[] = []

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(dataDir, file)
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        
        if (data.slug && data.title) {
          plantillas.push({
            slug: data.slug,
            title: data.title.length > 40 ? data.title.substring(0, 40) + '...' : data.title,
            category: data.category || 'General',
            downloadCount: data.downloadCount || 0,
            createdAt: data.createdAt || data.schema?.datePublished
          })
        }
      } catch (error) {
        console.warn(`Error leyendo ${file}:`, error)
      }
    }

    // Ordenar por fecha de creación descendente
    plantillas.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime()
      const dateB = new Date(b.createdAt || 0).getTime()
      return dateB - dateA
    })

    return plantillas.slice(0, limit)
  } catch (error) {
    console.error('Error obteniendo plantillas más recientes:', error)
    return []
  }
}