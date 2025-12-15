/**
 * Hook personalizado para Intersection Observer API
 * Optimiza rendimiento detectando visibilidad de elementos
 */

import { useEffect, useState, useRef, useCallback } from 'react'

// ===============================
// TIPOS
// ===============================

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  readonly freezeOnceVisible?: boolean
  readonly onChange?: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void
}

interface UseIntersectionObserverReturn {
  readonly ref: (node?: Element | null) => void
  readonly entry: IntersectionObserverEntry | undefined
  readonly isIntersecting: boolean
  readonly isVisible: boolean
}

// ===============================
// HOOK PRINCIPAL
// ===============================

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    onChange
  } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isVisible, setIsVisible] = useState(false)
  
  const elementRef = useRef<Element | null>(null)
  const observerRef = useRef<IntersectionObserver>()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = useCallback(([entry]: IntersectionObserverEntry[]): void => {
    const isIntersecting = entry.isIntersecting
    setEntry(entry)
    setIsVisible(isIntersecting)
    
    onChange?.(entry, observerRef.current!)

    if (freezeOnceVisible && isIntersecting && observerRef.current && elementRef.current) {
      observerRef.current.unobserve(elementRef.current)
    }
  }, [freezeOnceVisible, onChange])

  const ref = useCallback((node: Element | null) => {
    if (elementRef.current) {
      observerRef.current?.unobserve(elementRef.current)
    }

    elementRef.current = node

    if (!node || frozen) return

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(updateEntry, {
        threshold,
        root,
        rootMargin
      })
    }

    observerRef.current.observe(node)
  }, [updateEntry, threshold, root, rootMargin, frozen])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return {
    ref,
    entry,
    isIntersecting: entry?.isIntersecting ?? false,
    isVisible
  }
}

// ===============================
// HOOKS ESPECIALIZADOS
// ===============================

// Hook para lazy loading de imágenes
export const useLazyImage = (src: string, placeholder?: string) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  })

  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (isVisible && src) {
      const img = new Image()
      img.onload = () => {
        setImageSrc(src)
        setImageLoaded(true)
      }
      img.src = src
    }
  }, [isVisible, src])

  return {
    ref,
    src: imageSrc,
    isLoaded: imageLoaded,
    isVisible
  }
}

// Hook para animaciones en scroll
// NOTA: No usar opacity-0 para SEO - googlebot no ve contenido invisible
export const useScrollAnimation = (
  animationClass = 'animate-fadeInUp',
  options: UseIntersectionObserverOptions = {}
) => {
  const [hasAnimated, setHasAnimated] = useState(true) // Start visible for SEO

  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true,
    ...options
  })

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isVisible, hasAnimated])

  return {
    ref,
    className: animationClass, // Always visible for SEO
    isVisible,
    hasAnimated
  }
}

// Hook para tracking de vistas
export const useViewTracking = (
  trackingId: string,
  onView?: (id: string) => void
) => {
  const [hasBeenViewed, setHasBeenViewed] = useState(false)
  
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: true,
    onChange: (entry) => {
      if (entry.isIntersecting && !hasBeenViewed) {
        setHasBeenViewed(true)
        onView?.(trackingId)
      }
    }
  })

  return {
    ref,
    isVisible,
    hasBeenViewed
  }
}