/**
 * Utilidades centralizadas del sistema
 * Funciones helper tipadas y optimizadas
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ===============================
// UTILIDADES DE CSS
// ===============================

/**
 * Combina clases de CSS de forma inteligente
 * Resuelve conflictos de Tailwind automáticamente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ===============================
// UTILIDADES DE FORMATEO
// ===============================

/**
 * Formatea números con separadores de miles
 */
export function formatNumber(
  num: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    ...options
  }).format(num)
}

/**
 * Formata precos em reais
 */
export function formatPrice(price: number): string {
  return formatNumber(price, {
    style: 'currency',
    currency: 'BRL'
  })
}

/**
 * Formata precos em reais (alias para compatibilidade)
 */
export function formatCurrency(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

/**
 * Formata datas em formato brasileiro
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  }).format(dateObj)
}

/**
 * Formata datas em formato relativo (ha X dias)
 */
export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Hoje'
  if (diffInDays === 1) return 'Ontem'
  if (diffInDays < 7) return `ha ${diffInDays} dias`
  if (diffInDays < 30) return `ha ${Math.floor(diffInDays / 7)} semanas`
  if (diffInDays < 365) return `ha ${Math.floor(diffInDays / 30)} meses`

  return `ha ${Math.floor(diffInDays / 365)} anos`
}

// ===============================
// UTILIDADES DE STRINGS
// ===============================

/**
 * Converte string para slug URL-friendly
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Capitaliza la primera letra de cada palabra
 */
export function capitalize(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Trunca texto con ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

/**
 * Extrae texto plano de HTML
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Sanitiza strings para prevenir XSS (alias para compatibility)
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
}

// ===============================
// UTILIDADES DE ARRAYS
// ===============================

/**
 * Agrupa array por una propiedad
 */
export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Ordena array por múltiples propiedades
 */
export function sortBy<T>(
  array: T[],
  ...selectors: ((item: T) => any)[]
): T[] {
  return [...array].sort((a, b) => {
    for (const selector of selectors) {
      const aVal = selector(a)
      const bVal = selector(b)
      
      if (aVal < bVal) return -1
      if (aVal > bVal) return 1
    }
    return 0
  })
}

/**
 * Elimina duplicados de array
 */
export function unique<T>(array: T[], keySelector?: (item: T) => any): T[] {
  if (!keySelector) {
    return [...new Set(array)]
  }
  
  const seen = new Set()
  return array.filter(item => {
    const key = keySelector(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// ===============================
// UTILIDADES DE VALIDACIÓN
// ===============================

/**
 * Valida si es una URL válida
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

/**
 * Valida si es un email válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida se e uma palavra-chave valida
 */
export function isValidKeyword(keyword: string): boolean {
  if (keyword.length < 3 || keyword.length > 100) return false
  return /^[a-zA-ZáéíóúàèìòùãõâêîôûçÁÉÍÓÚÀÈÌÒÙÃÕÂÊÎÔÛÇ\s\-]+$/.test(keyword)
}

// ===============================
// UTILIDADES DE PERFORMANCE
// ===============================

/**
 * Debounce function para optimizar búsquedas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function para eventos frecuentes
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// ===============================
// UTILIDADES DE SCROLL
// ===============================

/**
 * Scroll suave hacia un elemento
 */
export function scrollToElement(
  elementId: string,
  options: ScrollIntoViewOptions = {}
): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    })
  }
}

/**
 * Scroll suave hacia arriba
 */
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// ===============================
// UTILIDADES DE LOCAL STORAGE
// ===============================

/**
 * Guarda datos en localStorage de forma segura
 */
export function setLocalStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Obtiene datos de localStorage de forma segura
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * Elimina datos de localStorage
 */
export function removeLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

// ===============================
// UTILIDADES DE METADATA
// ===============================

/**
 * Gera URL canonica
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://www.planilhabr.com'
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Gera metadados seguros com fallbacks
 */
export function generateSafeMetadata(data: any) {
  return {
    title: data?.metaTitle || data?.title || 'Planilha Excel',
    description: data?.metaDescription || data?.description || 'Baixar planilha Excel gratuita',
    keywords: data?.keyword || data?.keywords || 'planilha excel',
    category: data?.category || 'Ferramentas Empresariais',
    alt: data?.title || 'Planilha Excel'
  }
}

// ===============================
// UTILIDADES DE ERROR HANDLING
// ===============================

/**
 * Trata erros de forma segura
 */
export function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Ocorreu um erro desconhecido'
}

/**
 * Retry function para operaciones que pueden fallar
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === attempts - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
    }
  }
  throw new Error('Retry failed')
}