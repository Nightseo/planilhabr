/**
 * Sistema de tipos TypeScript robusto para PlanilhaBR
 * Tipos centralizados, validados y extensibles
 */

// ===============================
// TIPOS BASE DEL DOMINIO
// ===============================

export interface PlantillaMetadata {
  readonly slug: string
  readonly keyword: string
  readonly category: CategoryId
  readonly title: string
  readonly description: string
  readonly metaTitle: string
  readonly metaDescription: string
  readonly h1: string
  readonly excelUrl: string
  readonly downloadCount: number
  readonly rating: number
  readonly createdAt: string
  readonly updatedAt: string
}

export interface PlantillaContent {
  readonly introduction: string
  readonly benefits: readonly string[]
  readonly howToUse: string
  readonly features: readonly string[]
  readonly conclusions: string
}

export interface PlantillaSEOContent {
  readonly sections: readonly SEOSection[]
}

export interface SEOSection {
  readonly title: string
  readonly content: string
}

export interface PlantillaFAQ {
  readonly question: string
  readonly answer: string
}

export interface Plantilla extends PlantillaMetadata {
  readonly content: PlantillaContent
  readonly seoContent: PlantillaSEOContent
  readonly faqs: readonly PlantillaFAQ[]
  // Legacy and additional fields for backward compatibility
  readonly h1?: string
  readonly briefDescription?: string
  readonly keywords?: string
  readonly downloadUrl?: string
  readonly features?: readonly string[]
  readonly texts?: {
    readonly downloadButton?: string
    readonly featuresTitle?: string
    readonly faqsTitle?: string
    readonly ctaTitle?: string
    readonly ctaSubtitle?: string
    readonly ctaButton?: string
    readonly benefits?: string
  }
  readonly schema?: Record<string, unknown>
}

// ===============================
// CATEGORÍAS Y CLASIFICACIÓN
// ===============================

export type CategoryId =
  | 'financeiro'
  | 'estoque'
  | 'vendas'
  | 'rh'
  | 'projetos'
  | 'produtividade'
  | 'marketing'
  | 'contabilidade'
  | 'logistica'
  | 'qualidade'
  | 'compras'
  | 'administracao'

export interface Category {
  readonly id: CategoryId
  readonly name: string
  readonly description: string
  readonly icon: string
  readonly slug: string
  readonly plantillaCount: number
}

// ===============================
// SISTEMA DE KEYWORDS
// ===============================

export type KeywordStatus =
  | 'pending'
  | 'new'
  | 'excel_generated'
  | 'seo_generated'
  | 'completed'

export type KeywordDifficulty = 
  | 'easy'
  | 'medium'
  | 'hard'

export interface Keyword {
  readonly id: string
  readonly keyword: string
  readonly volume: number
  readonly difficulty: KeywordDifficulty
  readonly cpc: number
  readonly status: KeywordStatus
  readonly excelUrl?: string
  readonly seoUrl?: string
  readonly excelGeneratedAt?: Date
  readonly seoGeneratedAt?: Date
}

// ===============================
// GENERACIÓN DE EXCEL
// ===============================

export interface ExcelGenerationRequest {
  readonly keyword: string
  readonly language: string
  readonly country: string
}

export interface ExcelGenerationResponse {
  readonly success: boolean
  readonly message: string
  readonly downloadUrl: string
  readonly filename: string
  readonly modelUsed: string
  readonly systemUsed: string
  readonly libraryUsed: string
  readonly nativeCharts: boolean
  readonly generatedCode: string
}

export interface ExcelGenerationError {
  readonly success: false
  readonly error: string
  readonly details: string
  readonly systemUsed: string
  readonly libraryUsed: string
}

// ===============================
// COMPONENTES UI
// ===============================

export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'

export type ButtonSize = 
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'

export interface ButtonProps {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly disabled?: boolean
  readonly loading?: boolean
  readonly children: React.ReactNode
  readonly onClick?: () => void
  readonly className?: string
  readonly 'aria-label'?: string
}

export type InputVariant = 
  | 'default'
  | 'error'
  | 'success'

export interface InputProps {
  readonly variant?: InputVariant
  readonly placeholder?: string
  readonly value: string
  readonly onChange: (value: string) => void
  readonly disabled?: boolean
  readonly error?: string
  readonly 'aria-label'?: string
}

// ===============================
// ESTADO DE LA APLICACIÓN
// ===============================

export interface AppState {
  readonly categories: readonly Category[]
  readonly plantillas: readonly Plantilla[]
  readonly keywords: readonly Keyword[]
  readonly loading: {
    readonly categories: boolean
    readonly plantillas: boolean
    readonly keywords: boolean
  }
  readonly error: {
    readonly categories: string | null
    readonly plantillas: string | null
    readonly keywords: string | null
  }
}

export interface UserPreferences {
  readonly theme: 'light' | 'dark'
  readonly language: 'pt' | 'en'
  readonly cookiesAccepted: boolean
  readonly favoriteCategories: readonly CategoryId[]
}

// ===============================
// NAVEGACIÓN Y BREADCRUMBS
// ===============================

export interface BreadcrumbItem {
  readonly name: string
  readonly href: string
  readonly current?: boolean
}

export interface NavigationItem {
  readonly name: string
  readonly href: string
  readonly icon?: string
  readonly children?: readonly NavigationItem[]
}

// ===============================
// UTILIDADES DE TIPO
// ===============================

// Utility types para garantizar inmutabilidad
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Utility type para operaciones asíncronas
export type AsyncOperationState<T> = {
  readonly data: T | null
  readonly loading: boolean
  readonly error: string | null
}

// Utility type para formularios
export type FormState<T> = {
  readonly values: T
  readonly errors: Partial<Record<keyof T, string>>
  readonly touched: Partial<Record<keyof T, boolean>>
  readonly isValid: boolean
  readonly isSubmitting: boolean
}

// ===============================
// METADATOS Y SEO
// ===============================

export interface StructuredData {
  readonly '@context': string
  readonly '@type': string
  readonly [key: string]: unknown
}

export interface PageMetadata {
  readonly title: string
  readonly description: string
  readonly keywords: string
  readonly canonicalUrl: string
  readonly ogImage: string
  readonly structuredData: readonly StructuredData[]
}

// ===============================
// API RESPONSES
// ===============================

export interface APIResponse<T> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
  readonly timestamp: string
}

export interface PaginatedResponse<T> extends APIResponse<T> {
  readonly pagination: {
    readonly page: number
    readonly limit: number
    readonly total: number
    readonly totalPages: number
  }
}

// ===============================
// VALIDACIONES
// ===============================

export interface ValidationRule<T> {
  readonly validate: (value: T) => boolean
  readonly message: string
}

export type ValidationSchema<T> = {
  readonly [K in keyof T]?: readonly ValidationRule<T[K]>[]
}

// ===============================
// TIPOS DE BÚSQUEDA
// ===============================

export interface SearchResult {
  readonly id: string
  readonly title: string
  readonly description?: string
  readonly category?: string
  readonly url: string
  readonly type: 'plantilla' | 'category' | 'page'
}

// ===============================
// FILTROS DE KEYWORDS
// ===============================

export interface KeywordFilters {
  readonly status: 'all' | KeywordStatus
  readonly search: string
  readonly sortBy: 'keyword' | 'volume' | 'difficulty' | 'cpc' | 'status'
  readonly sortOrder: 'asc' | 'desc'
}
