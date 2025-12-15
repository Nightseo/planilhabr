/**
 * PlanilhaBR SearchInput Component
 * Busqueda con diseño cuadrado y minimalista
 */

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input } from './Input'
import { cn, debounce } from '@/lib/utils'
import type { SearchResult } from '@/types'

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface SearchInputProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
  onResultSelect?: (result: SearchResult) => void
  results?: SearchResult[]
  loading?: boolean
  minQueryLength?: number
  debounceMs?: number
  showNoResults?: boolean
}

export interface SearchResultItemProps {
  result: SearchResult
  onSelect: (result: SearchResult) => void
  className?: string
}

// ===============================
// COMPONENTE DE RESULTADO
// ===============================

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  result,
  onSelect,
  className
}) => {
  return (
    <button
      type="button"
      className={cn(
        'w-full text-left px-4 py-3 hover:bg-primary-50',
        'transition-colors border-b-2 border-green-200 last:border-b-0',
        'focus:bg-primary-50 focus:outline-none focus:ring-3 focus:ring-primary-500/30',
        className
      )}
      onClick={() => onSelect(result)}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-primary-900 line-clamp-1">
            {result.title}
          </h4>
          {result.description && (
            <p className="text-xs text-gray-600 line-clamp-1 mt-1">
              {result.description}
            </p>
          )}
          {result.category && (
            <span className="inline-block mt-1 px-2 py-1 text-xs bg-accent-100 text-accent-800 border border-accent-300 font-medium">
              {result.category}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar planilhas Excel...',
  className,
  onSearch,
  onResultSelect,
  results = [],
  loading = false,
  minQueryLength = 2,
  debounceMs = 300,
  showNoResults = true
}) => {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= minQueryLength) {
        onSearch?.(searchQuery)
      }
    }, debounceMs),
    [onSearch, minQueryLength, debounceMs]
  )

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setShowResults(newQuery.length >= minQueryLength)
    setFocusedIndex(-1)
    debouncedSearch(newQuery)
  }

  // Handle input focus
  const handleInputFocus = () => {
    if (query.length >= minQueryLength) {
      setShowResults(true)
    }
  }

  // Handle input blur
  const handleInputBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200)
  }

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    setQuery('')
    setShowResults(false)
    setFocusedIndex(-1)
    onResultSelect?.(result)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && results[focusedIndex]) {
          handleResultSelect(results[focusedIndex])
        }
        break
      case 'Escape':
        setShowResults(false)
        setFocusedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const shouldShowResults = showResults && query.length >= minQueryLength
  const hasResults = results.length > 0
  const showNoResultsMessage = showNoResults && !hasResults && !loading

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        leftIcon={<MagnifyingGlassIcon />}
        loading={loading}
        className="pl-10"
        role="combobox"
        aria-expanded={shouldShowResults}
        aria-haspopup="listbox"
        aria-autocomplete="list"
      />
      
      {shouldShowResults && (
        <div
          ref={resultsRef}
          className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-green-200 z-50 overflow-hidden"
          role="listbox"
        >
          {hasResults && (
            <>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  role="option"
                  aria-selected={index === focusedIndex}
                  className={cn(
                    index === focusedIndex && 'bg-green-50'
                  )}
                >
                  <SearchResultItem
                    result={result}
                    onSelect={handleResultSelect}
                  />
                </div>
              ))}
            </>
          )}
          
          {showNoResultsMessage && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              Nenhum resultado encontrado para &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===============================
// EXPORTACIÓN
// ===============================

export type { SearchInputProps, SearchResultItemProps }