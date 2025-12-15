/**
 * Hook personalizado para debouncing de valores
 * Optimiza rendimiento evitando llamadas excesivas
 */

import { useState, useEffect } from 'react'

// ===============================
// HOOK DEBOUNCE
// ===============================

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// ===============================
// HOOK DEBOUNCE CON CALLBACK
// ===============================

export const useDebounceCallback = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const debouncedCallback = (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      callback(...args)
    }, delay)

    setTimeoutId(newTimeoutId)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return debouncedCallback
}