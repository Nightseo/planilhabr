import fs from 'fs'
import path from 'path'

/**
 * Valida que un archivo Excel existe y retorna la URL correcta
 */
export function validateExcelFile(keyword: string, filename?: string, downloadUrl?: string): string | null {
  try {
    // Si ya tenemos un downloadUrl válido, verificar que el archivo existe
    if (downloadUrl) {
      const filePath = path.join(process.cwd(), 'public', downloadUrl)
      if (fs.existsSync(filePath)) {
        return downloadUrl
      }
    }
    
    // Si se proporciona un filename, verificar que existe
    if (filename) {
      const proposedPath = path.join(process.cwd(), 'public', 'downloads', filename)
      if (fs.existsSync(proposedPath)) {
        return `/downloads/${filename}`
      }
    }
    
    // Buscar por keyword
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads')
    if (!fs.existsSync(downloadsDir)) {
      return null
    }
    
    const safeKeyword = keyword.replace(/[^a-zA-Z0-9.-]/g, '_')
    const files = fs.readdirSync(downloadsDir)
    
    // Buscar archivos que contengan la keyword (más flexible)
    const matchingFiles = files.filter(f => {
      if (!f.endsWith('.xlsx')) return false
      // Buscar tanto el patrón exacto como archivos que contengan la keyword
      return f.startsWith(`excel-${safeKeyword}`) || 
             f.includes(`${safeKeyword}`) ||
             f.includes(keyword.replace(/[^a-zA-Z0-9]/g, '_'))
    }).sort((a, b) => {
      // Ordenar por timestamp descendente (más reciente primero)
      const aTimestamp = a.match(/-(\d+)\.xlsx$/)?.[1]
      const bTimestamp = b.match(/-(\d+)\.xlsx$/)?.[1]
      return parseInt(bTimestamp || '0') - parseInt(aTimestamp || '0')
    })
    
    if (matchingFiles.length > 0) {
      return `/downloads/${matchingFiles[0]}`
    }
    
    return null
  } catch (error) {
    console.error('Error validando archivo Excel:', error)
    return null
  }
}

/**
 * Obtiene la URL de Office Online para previsualizar un archivo Excel
 */
export function getOfficePreviewUrl(excelUrl: string, baseUrl?: string): string {
  const fullUrl = baseUrl ? `${baseUrl}${excelUrl}` : `https://www.planilhabr.com${excelUrl}`
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fullUrl)}`
}

/**
 * Verifica si un archivo Excel existe físicamente
 */
export function excelFileExists(excelUrl: string): boolean {
  try {
    const filePath = path.join(process.cwd(), 'public', excelUrl)
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}