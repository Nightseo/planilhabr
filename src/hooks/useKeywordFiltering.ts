/**
 * Hook personalizado para filtrado y ordenamiento de keywords
 * Implementa memoización para optimizar rendimiento
 */

import { useMemo } from 'react'
import type { Keyword, KeywordFilters, KeywordStatus } from '@/types'

// ===============================
// CONSTANTES DE ORDENAMIENTO
// ===============================

const STATUS_ORDER: Record<KeywordStatus, number> = {
  'pending': 0,
  'excel_generated': 1,
  'seo_generated': 2,
  'completed': 3
}

// ===============================
// HOOK PRINCIPAL
// ===============================

export const useKeywordFiltering = (
  keywords: readonly Keyword[],
  filters: KeywordFilters
) => {
  return useMemo(() => {
    // Filtrar keywords
    const filtered = keywords.filter(keyword => {
      // Filtro por estado
      const matchesStatus = filters.status === 'all' || keyword.status === filters.status
      
      // Filtro por búsqueda
      const matchesSearch = keyword.keyword
        .toLowerCase()
        .includes(filters.search.toLowerCase())
      
      return matchesStatus && matchesSearch
    })

    // Ordenar keywords
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'keyword':
          comparison = a.keyword.localeCompare(b.keyword)
          break
        case 'volume':
          comparison = a.volume - b.volume
          break
        case 'difficulty':
          comparison = a.difficulty - b.difficulty
          break
        case 'cpc':
          comparison = a.cpc - b.cpc
          break
        case 'status':
          comparison = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
          break
      }
      
      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    return {
      filteredKeywords: sorted,
      totalCount: keywords.length,
      filteredCount: filtered.length
    }
  }, [keywords, filters])
}

// ===============================
// HOOK PARA ESTADÍSTICAS
// ===============================

export const useKeywordStats = (keywords: readonly Keyword[]) => {
  return useMemo(() => {
    const stats = {
      total: keywords.length,
      pending: 0,
      excelGenerated: 0,
      seoGenerated: 0,
      completed: 0
    }

    keywords.forEach(keyword => {
      switch (keyword.status) {
        case 'pending':
          stats.pending++
          break
        case 'excel_generated':
          stats.excelGenerated++
          break
        case 'seo_generated':
          stats.seoGenerated++
          break
        case 'completed':
          stats.completed++
          break
      }
    })

    return stats
  }, [keywords])
}