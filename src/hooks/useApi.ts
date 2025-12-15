/**
 * Hook personalizado para llamadas a la API
 * Manejo de estado, errores y cache integrado
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import type { AsyncOperationState } from '@/types'

// ===============================
// TIPOS
// ===============================

interface UseApiOptions<T> {
  readonly immediate?: boolean
  readonly onSuccess?: (data: T) => void
  readonly onError?: (error: Error) => void
  readonly cacheKey?: string
  readonly cacheTTL?: number // milliseconds
}

interface ApiResponse<T> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
  readonly timestamp: string
}

interface CacheEntry<T> {
  readonly data: T
  readonly timestamp: number
  readonly ttl: number
}

// ===============================
// CACHE SIMPLE
// ===============================

const cache = new Map<string, CacheEntry<unknown>>()

const getCachedData = <T>(key: string, ttl: number): T | null => {
  const entry = cache.get(key) as CacheEntry<T> | undefined
  if (!entry) return null
  
  const now = Date.now()
  if (now - entry.timestamp > ttl) {
    cache.delete(key)
    return null
  }
  
  return entry.data
}

const setCachedData = <T>(key: string, data: T, ttl: number): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
}

// ===============================
// HOOK PRINCIPAL
// ===============================

export const useApi = <T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
): AsyncOperationState<T> & {
  readonly execute: () => Promise<void>
  readonly reset: () => void
} => {
  const {
    immediate = false,
    onSuccess,
    onError,
    cacheKey,
    cacheTTL = 5 * 60 * 1000 // 5 minutes default
  } = options

  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const execute = useCallback(async () => {
    // Verificar cache si está habilitado
    if (cacheKey) {
      const cachedData = getCachedData<T>(cacheKey, cacheTTL)
      if (cachedData) {
        setState({ data: cachedData, loading: false, error: null })
        onSuccess?.(cachedData)
        return
      }
    }

    // Cancelar solicitud anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiCall()
      
      if (!isMountedRef.current) return

      if (response.success && response.data !== undefined) {
        const newState = { data: response.data, loading: false, error: null }
        setState(newState)
        
        // Guardar en cache si está habilitado
        if (cacheKey) {
          setCachedData(cacheKey, response.data, cacheTTL)
        }
        
        onSuccess?.(response.data)
      } else {
        const error = new Error(response.error || 'API call failed')
        setState({ data: null, loading: false, error: error.message })
        onError?.(error)
      }
    } catch (error) {
      if (!isMountedRef.current) return
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setState({ data: null, loading: false, error: errorMessage })
      onError?.(error instanceof Error ? error : new Error(errorMessage))
    }
  }, [apiCall, cacheKey, cacheTTL, onSuccess, onError])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
    if (cacheKey) {
      cache.delete(cacheKey)
    }
  }, [cacheKey])

  // Ejecutar inmediatamente si está habilitado
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    ...state,
    execute,
    reset
  }
}

// ===============================
// HOOKS ESPECIALIZADOS
// ===============================

// Hook para generar Excel
export const useExcelGeneration = () => {
  return useApi(async () => {
    throw new Error('Excel generation API not implemented yet')
  })
}

// Hook para generar SEO
export const useSEOGeneration = () => {
  return useApi(async () => {
    throw new Error('SEO generation API not implemented yet')
  })
}

// Hook para obtener keywords
export const useKeywords = () => {
  return useApi(async () => {
    const response = await fetch('/api/keywords')
    return response.json()
  }, {
    immediate: true,
    cacheKey: 'keywords',
    cacheTTL: 10 * 60 * 1000 // 10 minutes
  })
}