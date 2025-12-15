/**
 * Hook personalizado para manejo de localStorage
 * Incluye validación, serialización y manejo de errores
 */

import { useState, useEffect, useCallback } from 'react'

// ===============================
// TIPOS
// ===============================

type SetValue<T> = T | ((val: T) => T)

interface UseLocalStorageOptions {
  readonly serialize?: (value: unknown) => string
  readonly deserialize?: (value: string) => unknown
  readonly validator?: (value: unknown) => boolean
  readonly onError?: (error: Error) => void
}

// ===============================
// HOOK PRINCIPAL
// ===============================

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): readonly [T, (value: SetValue<T>) => void, () => void] => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    validator,
    onError
  } = options

  // Estado interno
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      if (item === null) {
        return initialValue
      }

      const parsed = deserialize(item)
      
      // Validar si se proporciona validador
      if (validator && !validator(parsed)) {
        return initialValue
      }

      return parsed as T
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      onError?.(err)
      return initialValue
    }
  })

  // Función para establecer valor
  const setValue = useCallback((value: SetValue<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore))
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      onError?.(err)
    }
  }, [key, serialize, storedValue, onError])

  // Función para eliminar valor
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      onError?.(err)
    }
  }, [key, initialValue, onError])

  // Sincronizar con cambios externos
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = deserialize(e.newValue)
          if (!validator || validator(newValue)) {
            setStoredValue(newValue as T)
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error))
          onError?.(err)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, deserialize, validator, onError])

  return [storedValue, setValue, removeValue] as const
}

// ===============================
// HOOKS ESPECIALIZADOS
// ===============================

// Hook para preferencias del usuario
export const useUserPreferences = () => {
  return useLocalStorage('user-preferences', {
    theme: 'light' as 'light' | 'dark',
    language: 'de' as 'de' | 'en',
    cookiesAccepted: false,
    favoriteCategories: [] as string[]
  }, {
    validator: (value): value is typeof value => {
      return (
        typeof value === 'object' &&
        value !== null &&
        'theme' in value &&
        'language' in value &&
        'cookiesAccepted' in value &&
        'favoriteCategories' in value
      )
    }
  })
}

// Hook para filtros de tabla
export const useTableFilters = (tableKey: string) => {
  return useLocalStorage(`table-filters-${tableKey}`, {
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc',
    filters: {} as Record<string, unknown>
  })
}