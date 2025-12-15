'use client'

import React, { useState, useMemo, useCallback } from 'react'
// Temporarily removing react-window dependency to fix import error
import { DocumentArrowDownIcon, SparklesIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useKeywordFiltering } from '@/hooks/useKeywordFiltering'
import type { Keyword, KeywordFilters } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

// ===============================
// KOMPONENTEN-TYPEN
// ===============================

export interface KeywordTableProps {
  readonly keywords: readonly Keyword[]
  readonly onGenerateExcel: (keyword: Keyword) => void
  readonly onGenerateSEO: (keyword: Keyword) => void
  readonly onBulkGenerateExcel: (keywords: readonly Keyword[]) => void
  readonly onBulkGenerateSEO: (keywords: readonly Keyword[]) => void
  readonly loading?: Record<string, boolean>
  readonly className?: string
}

interface KeywordRowProps {
  readonly index: number
  readonly style: React.CSSProperties
  readonly data: {
    readonly keywords: readonly Keyword[]
    readonly onGenerateExcel: (keyword: Keyword) => void
    readonly onGenerateSEO: (keyword: Keyword) => void
    readonly loading: Record<string, boolean>
    readonly selectedKeywords: Set<string>
    readonly onSelectKeyword: (id: string) => void
  }
}

interface BulkActionsProps {
  readonly selectedCount: number
  readonly bulkExcelCount: number
  readonly bulkSEOCount: number
  readonly onBulkGenerateExcel: () => void
  readonly onBulkGenerateSEO: () => void
}

interface TableHeaderProps {
  readonly totalCount: number
  readonly filteredCount: number
  readonly filters: KeywordFilters
  readonly onFiltersChange: (filters: KeywordFilters) => void
  readonly selectedCount: number
  readonly onSelectAll: () => void
}

interface StatusIconProps {
  readonly status: Keyword['status']
  readonly className?: string
}

// ===============================
// STATUS ICON KOMPONENTE
// ===============================

const StatusIcon: React.FC<StatusIconProps> = ({ status, className }) => {
  const icons = {
    pending: <ClockIcon className={cn('w-5 h-5 text-gray-400', className)} />,
    excel_generated: <DocumentArrowDownIcon className={cn('w-5 h-5 text-gray-600', className)} />,
    seo_generated: <SparklesIcon className={cn('w-5 h-5 text-purple-500', className)} />,
    completed: <CheckCircleIcon className={cn('w-5 h-5 text-gray-600', className)} />
  }
  
  return icons[status]
}

// ===============================
// STATUS BADGE COMPONENT
// ===============================

const StatusBadge: React.FC<{ status: Keyword['status'] }> = ({ status }) => {
  const config = {
    pending: { style: 'bg-gray-100 text-gray-800', label: 'Pendente' },
    new: { style: 'bg-orange-100 text-orange-800', label: 'Novo' },
    excel_generated: { style: 'bg-green-100 text-green-800', label: 'Excel criado' },
    seo_generated: { style: 'bg-purple-100 text-purple-800', label: 'SEO criado' },
    completed: { style: 'bg-green-100 text-green-800', label: 'Concluido' }
  }

  const { style, label } = config[status]

  return (
    <span className={cn('px-2 py-1 text-xs font-medium rounded-full', style)}>
      {label}
    </span>
  )
}

// ===============================
// DIFFICULTY BADGE COMPONENT
// ===============================

const DifficultyBadge: React.FC<{ difficulty: number }> = ({ difficulty }) => {
  if (difficulty === 0) {
    return <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">Facil</span>
  }
  if (difficulty <= 3) {
    return <span className="px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">Medio</span>
  }
  return <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">Dificil</span>
}

// ===============================
// KEYWORD ROW KOMPONENTE
// ===============================

const KeywordRow: React.FC<KeywordRowProps> = ({ index, style, data }) => {
  const { keywords, onGenerateExcel, onGenerateSEO, loading, selectedKeywords, onSelectKeyword } = data
  const keyword = keywords[index]
  
  if (!keyword) return null
  
  const isSelected = selectedKeywords.has(keyword.id)
  const isLoading = loading[keyword.id] || false
  
  return (
    <div
      style={style}
      className={cn(
        'flex items-center border-b border-gray-200 hover:bg-gray-50 transition-colors px-4',
        isSelected && 'bg-green-50'
      )}
    >
      {/* Checkbox */}
      <div className="w-12 flex-shrink-0">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelectKeyword(keyword.id)}
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          aria-label={`Selecionar keyword ${keyword.keyword}`}
        />
      </div>
      
      {/* Index */}
      <div className="w-16 flex-shrink-0">
        <span className="text-sm text-gray-500 font-mono">{index + 1}</span>
      </div>
      
      {/* Keyword */}
      <div className="flex-1 min-w-0 px-2">
        <div className="font-medium text-green-900 text-sm truncate" title={keyword.keyword}>
          {keyword.keyword}
        </div>
      </div>
      
      {/* Volume */}
      <div className="w-20 flex-shrink-0 px-2">
        <span className="font-semibold text-green-900 text-sm">{keyword.volume || 0}</span>
      </div>

      {/* Difficulty */}
      <div className="w-24 flex-shrink-0 px-2">
        <DifficultyBadge difficulty={keyword.difficulty || 0} />
      </div>
      
      {/* CPC */}
      <div className="w-20 flex-shrink-0 px-2">
        <span className="text-gray-700 text-sm">€{(keyword.cpc || 0).toFixed(2)}</span>
      </div>
      
      {/* Status */}
      <div className="w-40 flex-shrink-0 px-2">
        <div className="flex items-center gap-2">
          <StatusIcon status={keyword.status} className="w-4 h-4" />
          <StatusBadge status={keyword.status} />
        </div>
      </div>
      
      {/* Actions */}
      <div className="w-48 flex-shrink-0 px-2">
        <KeywordActions
          keyword={keyword}
          isLoading={isLoading}
          onGenerateExcel={onGenerateExcel}
          onGenerateSEO={onGenerateSEO}
        />
      </div>
    </div>
  )
}

// ===============================
// KEYWORD ACTIONS KOMPONENTE
// ===============================

const KeywordActions: React.FC<{
  keyword: Keyword
  isLoading: boolean
  onGenerateExcel: (keyword: Keyword) => void
  onGenerateSEO: (keyword: Keyword) => void
}> = ({ keyword, isLoading, onGenerateExcel, onGenerateSEO }) => {
  const { status, excelUrl, seoUrl } = keyword

  const LoadingSpinner = () => (
    <div className="w-3 h-3 border border-gray-300 border-t-transparent rounded-full animate-spin" />
  )

  if (status === 'pending' || status === 'new') {
    return (
      <Button
        variant={isLoading ? 'outline' : 'primary'}
        size="sm"
        disabled={isLoading}
        onClick={() => onGenerateExcel(keyword)}
        className="text-xs"
        title="Generiert automatisch Excel + SEO-Content"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Generiert...
          </>
        ) : (
          <>
            <SparklesIcon className="w-3 h-3 mr-1" />
            Generieren
          </>
        )}
      </Button>
    )
  }
  
  if (status === 'excel_generated') {
    return (
      <div className="flex gap-2">
        {excelUrl && (
          <a
            href={excelUrl}
            download
            className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
          >
            <DocumentArrowDownIcon className="w-3 h-3 inline mr-1" />
            Download
          </a>
        )}
        <Button
          variant={isLoading ? 'outline' : 'secondary'}
          size="sm"
          disabled={isLoading}
          onClick={() => onGenerateSEO(keyword)}
          className="text-xs bg-purple-600 text-white hover:bg-purple-700"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Erstellt...
            </>
          ) : (
            <>
              <SparklesIcon className="w-3 h-3 mr-1" />
              SEO
            </>
          )}
        </Button>
      </div>
    )
  }
  
  if (status === 'seo_generated' || status === 'completed') {
    return (
      <div className="flex gap-2">
        {excelUrl && (
          <a
            href={excelUrl}
            download
            className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
          >
            <DocumentArrowDownIcon className="w-3 h-3 inline mr-1" />
            Excel
          </a>
        )}
        {seoUrl && (
          <a
            href={seoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
            title={`SEO-Artikel ansehen: ${seoUrl}`}
          >
            <SparklesIcon className="w-3 h-3 inline mr-1" />
            {status === 'completed' ? 'Ansehen' : 'SEO-Artikel'}
          </a>
        )}
        {status === 'completed' && <CheckCircleIcon className="w-4 h-4 text-gray-600" />}
      </div>
    )
  }
  
  return null
}

// ===============================
// BULK ACTIONS KOMPONENTE
// ===============================

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  bulkExcelCount,
  bulkSEOCount,
  onBulkGenerateExcel,
  onBulkGenerateSEO
}) => {
  if (selectedCount === 0) return null
  
  return (
    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <span className="text-sm font-medium text-green-800">
          {selectedCount} keywords selecionados
        </span>
        
        <div className="flex gap-2">
          {bulkExcelCount > 0 && (
            <Button
              variant="primary"
              size="sm"
              onClick={onBulkGenerateExcel}
              className="bg-green-600 hover:bg-green-700"
              title="Gera automaticamente Excel + SEO para todas as keywords selecionadas"
            >
              Gerar {bulkExcelCount} completo(s)
            </Button>
          )}

          {bulkSEOCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onBulkGenerateSEO}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              {bulkSEOCount} SEO generieren
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ===============================
// TABLE HEADER KOMPONENTE
// ===============================

const TableHeader: React.FC<TableHeaderProps> = ({
  totalCount,
  filteredCount,
  filters,
  onFiltersChange,
  selectedCount,
  onSelectAll
}) => {
  const handleSortClick = useCallback((field: KeywordFilters['sortBy']) => {
    const newOrder = filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc'
    onFiltersChange({
      ...filters,
      sortBy: field,
      sortOrder: newOrder
    })
  }, [filters, onFiltersChange])
  
  const getSortIcon = (field: KeywordFilters['sortBy']) => {
    if (filters.sortBy !== field) return null
    return (
      <span className="text-green-600 ml-1">
        {filters.sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    )
  }
  
  return (
    <>
      {/* Filter Controls */}
      <div className="p-6 border-b border-green-200/40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-green-900">Gerenciamento de Keywords</h2>
            <p className="text-gray-600 text-sm">
              {filteredCount} de {totalCount} keywords
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Buscar keywords..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="min-w-[200px]"
              aria-label="Buscar keywords"
            />

            <select
              value={filters.status}
              onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as KeywordFilters['status'] })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              aria-label="Filtrar por status"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="new">Novo</option>
              <option value="excel_generated">Excel criado</option>
              <option value="seo_generated">SEO criado</option>
              <option value="completed">Concluido</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Column Headers */}
      <div className="flex items-center bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700">
        <div className="w-12 flex-shrink-0">
          <input
            type="checkbox"
            checked={selectedCount > 0}
            onChange={onSelectAll}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            aria-label="Selecionar todas as keywords"
          />
        </div>
        <div className="w-16 flex-shrink-0">#</div>
        <div className="flex-1 min-w-0 px-2">Keyword</div>
        <div 
          className="w-20 flex-shrink-0 px-2 cursor-pointer hover:bg-gray-100 transition-colors rounded"
          onClick={() => handleSortClick('volume')}
        >
          Volume{getSortIcon('volume')}
        </div>
        <div 
          className="w-24 flex-shrink-0 px-2 cursor-pointer hover:bg-gray-100 transition-colors rounded"
          onClick={() => handleSortClick('difficulty')}
        >
          Difficulty{getSortIcon('difficulty')}
        </div>
        <div 
          className="w-20 flex-shrink-0 px-2 cursor-pointer hover:bg-gray-100 transition-colors rounded"
          onClick={() => handleSortClick('cpc')}
        >
          CPC{getSortIcon('cpc')}
        </div>
        <div 
          className="w-40 flex-shrink-0 px-2 cursor-pointer hover:bg-gray-100 transition-colors rounded"
          onClick={() => handleSortClick('status')}
        >
          Status{getSortIcon('status')}
        </div>
        <div className="w-48 flex-shrink-0 px-2">Aktionen</div>
      </div>
    </>
  )
}

// ===============================
// HAUPTKOMPONENTE
// ===============================

export const KeywordTable: React.FC<KeywordTableProps> = ({
  keywords,
  onGenerateExcel,
  onGenerateSEO,
  onBulkGenerateExcel,
  onBulkGenerateSEO,
  loading = {},
  className
}) => {
  // Estado local
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<KeywordFilters>({
    status: 'all',
    search: '',
    sortBy: 'volume',
    sortOrder: 'desc'
  })
  
  // Filtrado y ordenamiento con hook personalizado
  const { filteredKeywords, totalCount, filteredCount } = useKeywordFiltering(keywords, filters)

  // Handlers memoizados
  const handleSelectAll = useCallback(() => {
    if (selectedKeywords.size === filteredKeywords.length && filteredKeywords.length > 0) {
      setSelectedKeywords(new Set())
    } else {
      setSelectedKeywords(new Set(filteredKeywords.map(k => k.id)))
    }
  }, [selectedKeywords.size, filteredKeywords])
  
  const handleSelectKeyword = useCallback((id: string) => {
    setSelectedKeywords(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }, [])
  
  // Datos derivados memoizados
  const selectedKeywordsList = useMemo(() => {
    return keywords.filter(k => selectedKeywords.has(k.id))
  }, [keywords, selectedKeywords])
  
  const bulkExcelCount = useMemo(() => {
    return selectedKeywordsList.filter(k => k.status === 'pending' || k.status === 'new').length
  }, [selectedKeywordsList])

  const bulkSEOCount = useMemo(() => {
    return selectedKeywordsList.filter(k => k.status === 'excel_generated').length
  }, [selectedKeywordsList])

  // Handlers para acciones bulk
  const handleBulkGenerateExcel = useCallback(() => {
    const pendingKeywords = selectedKeywordsList.filter(k => k.status === 'pending' || k.status === 'new')
    onBulkGenerateExcel(pendingKeywords)
  }, [selectedKeywordsList, onBulkGenerateExcel])
  
  const handleBulkGenerateSEO = useCallback(() => {
    const readyKeywords = selectedKeywordsList.filter(k => k.status === 'excel_generated')
    onBulkGenerateSEO(readyKeywords)
  }, [selectedKeywordsList, onBulkGenerateSEO])
  
  // Datos para el componente de filas virtualizadas
  const rowData = useMemo(() => ({
    keywords: filteredKeywords,
    onGenerateExcel,
    onGenerateSEO,
    loading,
    selectedKeywords,
    onSelectKeyword: handleSelectKeyword
  }), [filteredKeywords, onGenerateExcel, onGenerateSEO, loading, selectedKeywords, handleSelectKeyword])

  // Altura de fila constante para virtualización
  const ROW_HEIGHT = 64

  return (
    <div className={cn('bg-white rounded-xl shadow-lg border border-green-200/40', className)}>
      {/* Header con controles */}
      <TableHeader
        totalCount={totalCount}
        filteredCount={filteredCount}
        filters={filters}
        onFiltersChange={setFilters}
        selectedCount={selectedKeywords.size}
        onSelectAll={handleSelectAll}
      />
      
      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedKeywords.size}
        bulkExcelCount={bulkExcelCount}
        bulkSEOCount={bulkSEOCount}
        onBulkGenerateExcel={handleBulkGenerateExcel}
        onBulkGenerateSEO={handleBulkGenerateSEO}
      />
      
      {/* Simple Table */}
      {filteredKeywords.length > 0 ? (
        <div className="border-t border-gray-200 max-h-96 overflow-y-auto">
          {filteredKeywords.map((keyword, index) => (
            <KeywordRow
              key={keyword.id}
              index={index}
              style={{ height: ROW_HEIGHT }}
              data={rowData}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <ExclamationTriangleIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Nenhuma keyword encontrada com os filtros aplicados.</p>
        </div>
      )}
    </div>
  )
}

// ===============================
// STANDARD EXPORT
// ===============================

export default KeywordTable