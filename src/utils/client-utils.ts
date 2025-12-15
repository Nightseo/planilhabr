/**
 * Client-safe utility functions for plantillas
 */

/**
 * Formatea una fecha en formato legible en alemán
 */
export function formatDateGerman(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return 'Kürzlich'
  }
}

/**
 * Obtiene el nombre de categoría en alemán
 */
export function getCategoryDisplayName(category: string): string {
  const categoryNames: { [key: string]: string } = {
    'Buchhaltung': 'Buchhaltung',
    'Dokumentation': 'Dokumentation',
    'Datenverwaltung': 'Datenverwaltung',
    'Logistik': 'Logistik',
    'Personalmanagement': 'Personalmanagement',
    'Projektmanagement': 'Projektmanagement',
    'Qualitätsmanagement': 'Qualitätsmanagement',
    'Sicherheit': 'Sicherheit',
    'Spezial': 'Spezial',
    'Verwaltung': 'Verwaltung',
    'Technik': 'Technik'
  }
  
  return categoryNames[category] || category
}
