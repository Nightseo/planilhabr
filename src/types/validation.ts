/**
 * Sistema de validación TypeScript robusto
 * Validaciones runtime y compile-time unificadas
 */

import type { Keyword, PlantillaMetadata, CategoryId } from './index'

// ===============================
// UTILITY TYPES AVANZADOS
// ===============================

// Tipo para hacer propiedades opcionales profundamente
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Tipo para hacer propiedades requeridas profundamente
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

// Tipo para extraer tipos de propiedades anidadas
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

// Tipo para operaciones CRUD
export type CRUDOperation = 'create' | 'read' | 'update' | 'delete'

// Tipo para estados de entidades
export type EntityStatus = 'draft' | 'published' | 'archived' | 'deleted'

// ===============================
// ESQUEMAS DE VALIDACIÓN
// ===============================

export interface ValidationRule<T = unknown> {
  readonly test: (value: T) => boolean
  readonly message: string
  readonly type: 'required' | 'format' | 'range' | 'custom'
}

export type ValidationSchema<T extends Record<string, unknown>> = {
  readonly [K in keyof T]?: readonly ValidationRule<T[K]>[]
}

// ===============================
// VALIDADORES BÁSICOS
// ===============================

export const validators = {
  required: <T>(message = 'Campo requerido'): ValidationRule<T> => ({
    test: (value: T) => value != null && value !== '' && value !== undefined,
    message,
    type: 'required'
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    test: (value: string) => (value || '').length >= min,
    message: message || `Mínimo ${min} caracteres`,
    type: 'range'
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    test: (value: string) => (value || '').length <= max,
    message: message || `Máximo ${max} caracteres`,
    type: 'range'
  }),

  email: (message = 'Email inválido'): ValidationRule<string> => ({
    test: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !value || emailRegex.test(value)
    },
    message,
    type: 'format'
  }),

  url: (message = 'URL inválida'): ValidationRule<string> => ({
    test: (value: string) => {
      if (!value) return true
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },
    message,
    type: 'format'
  }),

  positiveNumber: (message = 'Debe ser un número positivo'): ValidationRule<number> => ({
    test: (value: number) => typeof value === 'number' && value > 0,
    message,
    type: 'range'
  }),

  slug: (message = 'Formato de slug inválido'): ValidationRule<string> => ({
    test: (value: string) => {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      return !value || slugRegex.test(value)
    },
    message,
    type: 'format'
  }),

  categoryId: (message = 'Categoría inválida'): ValidationRule<CategoryId> => ({
    test: (value: CategoryId) => {
      const validCategories: CategoryId[] = [
        'buchhaltung', 'dokumentation', 'datenverwaltung',
        'logistik', 'personalmanagement', 'projektmanagement', 'qualitaetsmanagement',
        'sicherheit', 'spezial', 'verwaltung', 'technik'
      ]
      return validCategories.includes(value)
    },
    message,
    type: 'custom'
  })
}

// ===============================
// ESQUEMAS ESPECÍFICOS
// ===============================

export const keywordValidationSchema: ValidationSchema<Keyword> = {
  keyword: [
    validators.required('Keyword es requerido'),
    validators.minLength(2, 'Keyword debe tener al menos 2 caracteres'),
    validators.maxLength(100, 'Keyword no puede exceder 100 caracteres')
  ],
  volume: [
    validators.required('Volume es requerido'),
    validators.positiveNumber('Volume debe ser un número positivo')
  ],
  difficulty: [
    validators.required('Difficulty es requerido'),
    {
      test: (value: number) => value >= 0 && value <= 10,
      message: 'Difficulty debe estar entre 0 y 10',
      type: 'range'
    }
  ],
  cpc: [
    validators.required('CPC es requerido'),
    {
      test: (value: number) => value >= 0,
      message: 'CPC debe ser mayor o igual a 0',
      type: 'range'
    }
  ]
}

export const plantillaValidationSchema: ValidationSchema<PlantillaMetadata> = {
  slug: [
    validators.required('Slug es requerido'),
    validators.slug('Formato de slug inválido')
  ],
  keyword: [
    validators.required('Keyword es requerido'),
    validators.minLength(2, 'Keyword debe tener al menos 2 caracteres')
  ],
  category: [
    validators.required('Categoría es requerida'),
    validators.categoryId('Categoría inválida')
  ],
  title: [
    validators.required('Título es requerido'),
    validators.minLength(10, 'Título debe tener al menos 10 caracteres'),
    validators.maxLength(100, 'Título no puede exceder 100 caracteres')
  ],
  description: [
    validators.required('Descripción es requerida'),
    validators.minLength(50, 'Descripción debe tener al menos 50 caracteres'),
    validators.maxLength(500, 'Descripción no puede exceder 500 caracteres')
  ],
  excelUrl: [
    validators.required('URL de Excel es requerida'),
    validators.url('URL de Excel inválida')
  ]
}

// ===============================
// FUNCIÓN DE VALIDACIÓN
// ===============================

export interface ValidationResult {
  readonly isValid: boolean
  readonly errors: Record<string, string[]>
  readonly firstError?: string
}

export const validateObject = <T extends Record<string, unknown>>(
  data: T,
  schema: ValidationSchema<T>
): ValidationResult => {
  const errors: Record<string, string[]> = {}
  let firstError: string | undefined

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key]
    const fieldErrors: string[] = []

    for (const rule of rules || []) {
      if (!rule.test(value)) {
        fieldErrors.push(rule.message)
        if (!firstError) {
          firstError = rule.message
        }
      }
    }

    if (fieldErrors.length > 0) {
      errors[key] = fieldErrors
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    firstError
  }
}

// ===============================
// TYPE GUARDS
// ===============================

export const isValidKeyword = (data: unknown): data is Keyword => {
  if (typeof data !== 'object' || data === null) return false
  
  const obj = data as Record<string, unknown>
  return (
    typeof obj.id === 'string' &&
    typeof obj.keyword === 'string' &&
    typeof obj.volume === 'number' &&
    typeof obj.difficulty === 'number' &&
    typeof obj.cpc === 'number' &&
    typeof obj.status === 'string' &&
    ['pending', 'excel_generated', 'seo_generated', 'completed'].includes(obj.status as string)
  )
}

export const isValidCategoryId = (value: unknown): value is CategoryId => {
  const validCategories: CategoryId[] = [
    'buchhaltung', 'dokumentation', 'datenverwaltung',
    'logistik', 'personalmanagement', 'projektmanagement', 'qualitaetsmanagement',
    'sicherheit', 'spezial', 'verwaltung', 'technik'
  ]
  return typeof value === 'string' && validCategories.includes(value as CategoryId)
}
