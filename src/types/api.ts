/**
 * Tipos TypeScript específicos para APIs
 * Tipado robusto para requests y responses
 */

import type { Keyword, PlantillaMetadata, CategoryId } from './index'

// ===============================
// TIPOS BASE DE API
// ===============================

export interface BaseAPIResponse<T = unknown> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
  readonly message?: string
  readonly timestamp: string
  readonly requestId?: string
}

export interface PaginatedAPIResponse<T = unknown> extends BaseAPIResponse<T[]> {
  readonly pagination: {
    readonly page: number
    readonly limit: number
    readonly total: number
    readonly totalPages: number
    readonly hasNextPage: boolean
    readonly hasPreviousPage: boolean
  }
}

export interface APIError {
  readonly code: string
  readonly message: string
  readonly details?: Record<string, unknown>
  readonly field?: string
  readonly timestamp: string
}

// ===============================
// TIPOS PARA KEYWORD APIs
// ===============================

export interface GetKeywordsParams {
  readonly page?: number
  readonly limit?: number
  readonly search?: string
  readonly status?: Keyword['status'] | 'all'
  readonly sortBy?: 'keyword' | 'volume' | 'difficulty' | 'cpc' | 'status' | 'createdAt'
  readonly sortOrder?: 'asc' | 'desc'
  readonly category?: CategoryId
}

export interface CreateKeywordRequest {
  readonly keyword: string
  readonly volume: number
  readonly difficulty: number
  readonly cpc: number
  readonly category?: CategoryId
}

export interface UpdateKeywordRequest {
  readonly id: string
  readonly updates: Partial<Omit<Keyword, 'id' | 'createdAt'>>
}

export interface BulkUpdateKeywordsRequest {
  readonly ids: readonly string[]
  readonly updates: Partial<Omit<Keyword, 'id' | 'createdAt'>>
}

export interface GenerateExcelRequest {
  readonly keywordId: string
  readonly language?: 'de' | 'en'
  readonly country?: 'DE' | 'AT' | 'CH'
  readonly template?: 'basic' | 'advanced' | 'professional'
}

export interface GenerateExcelResponse {
  readonly success: boolean
  readonly downloadUrl: string
  readonly filename: string
  readonly excelSize: number
  readonly generatedAt: string
  readonly metadata: {
    readonly modelUsed: string
    readonly systemUsed: string
    readonly libraryUsed: string
    readonly nativeCharts: boolean
    readonly processingTime: number
  }
}

export interface GenerateSEORequest {
  readonly keywordId: string
  readonly language?: 'de' | 'en'
  readonly targetAudience?: 'business' | 'personal' | 'professional'
  readonly contentLength?: 'short' | 'medium' | 'long'
}

export interface GenerateSEOResponse {
  readonly success: boolean
  readonly url: string
  readonly slug: string
  readonly metadata: PlantillaMetadata
  readonly generatedAt: string
  readonly seoMetrics: {
    readonly estimatedReadingTime: number
    readonly keywordDensity: number
    readonly readabilityScore: number
  }
}

// ===============================
// TIPOS PARA PLANTILLA APIs
// ===============================

export interface GetPlantillasParams {
  readonly page?: number
  readonly limit?: number
  readonly category?: CategoryId | 'all'
  readonly search?: string
  readonly sortBy?: 'title' | 'category' | 'downloadCount' | 'rating' | 'createdAt'
  readonly sortOrder?: 'asc' | 'desc'
  readonly featured?: boolean
}

export interface CreatePlantillaRequest {
  readonly slug: string
  readonly keyword: string
  readonly category: CategoryId
  readonly title: string
  readonly description: string
  readonly metaTitle: string
  readonly metaDescription: string
  readonly excelUrl: string
  readonly content: {
    readonly introduction: string
    readonly benefits: readonly string[]
    readonly howToUse: string
    readonly features: readonly string[]
    readonly conclusions: string
  }
}

export interface UpdatePlantillaRequest {
  readonly slug: string
  readonly updates: Partial<CreatePlantillaRequest>
}

// ===============================
// TIPOS PARA ANALYTICS APIs
// ===============================

export interface AnalyticsParams {
  readonly startDate?: string
  readonly endDate?: string
  readonly granularity?: 'day' | 'week' | 'month'
  readonly category?: CategoryId
}

export interface AnalyticsResponse {
  readonly downloads: {
    readonly total: number
    readonly byPeriod: readonly {
      readonly period: string
      readonly count: number
    }[]
    readonly byCategory: readonly {
      readonly category: CategoryId
      readonly count: number
    }[]
  }
  readonly keywords: {
    readonly total: number
    readonly byStatus: readonly {
      readonly status: Keyword['status']
      readonly count: number
    }[]
    readonly topPerforming: readonly {
      readonly keyword: string
      readonly volume: number
      readonly downloads: number
    }[]
  }
  readonly seo: {
    readonly totalPages: number
    readonly avgReadabilityScore: number
    readonly avgKeywordDensity: number
  }
}

// ===============================
// TIPOS PARA BÚSQUEDA
// ===============================

export interface SearchParams {
  readonly query: string
  readonly type?: 'plantilla' | 'category' | 'keyword' | 'all'
  readonly limit?: number
  readonly category?: CategoryId
}

export interface SearchResult {
  readonly id: string
  readonly title: string
  readonly description?: string
  readonly type: 'plantilla' | 'category' | 'keyword'
  readonly url: string
  readonly category?: CategoryId
  readonly relevanceScore: number
  readonly highlightedText?: string
}

export interface SearchResponse extends BaseAPIResponse<SearchResult[]> {
  readonly query: string
  readonly totalResults: number
  readonly searchTime: number
  readonly suggestions?: readonly string[]
}

// ===============================
// TIPOS PARA BATCH OPERATIONS
// ===============================

export interface BatchOperationRequest<T> {
  readonly operation: 'create' | 'update' | 'delete'
  readonly items: readonly T[]
  readonly options?: {
    readonly continueOnError?: boolean
    readonly validateOnly?: boolean
  }
}

export interface BatchOperationResponse<T> {
  readonly success: boolean
  readonly processed: number
  readonly failed: number
  readonly results: readonly {
    readonly item: T
    readonly success: boolean
    readonly error?: string
  }[]
  readonly summary: {
    readonly totalTime: number
    readonly averageTime: number
  }
}

// ===============================
// TIPOS PARA FILE UPLOAD
// ===============================

export interface FileUploadRequest {
  readonly file: File
  readonly category: CategoryId
  readonly metadata?: Record<string, unknown>
}

export interface FileUploadResponse {
  readonly success: boolean
  readonly url: string
  readonly filename: string
  readonly size: number
  readonly mimeType: string
  readonly uploadedAt: string
  readonly metadata: Record<string, unknown>
}

// ===============================
// TIPOS PARA CONFIGURACIÓN
// ===============================

export interface SystemConfigResponse {
  readonly features: {
    readonly excelGeneration: boolean
    readonly seoGeneration: boolean
    readonly bulkOperations: boolean
    readonly analytics: boolean
  }
  readonly limits: {
    readonly maxFileSize: number
    readonly maxBatchSize: number
    readonly maxKeywordsPerUser: number
    readonly rateLimitPerMinute: number
  }
  readonly version: string
  readonly environment: 'development' | 'staging' | 'production'
}

// ===============================
// UTILITY TYPES PARA APIs
// ===============================

// Tipo para extraer el tipo de data de una respuesta API
export type APIResponseData<T> = T extends BaseAPIResponse<infer U> ? U : never

// Tipo para requests que requieren autenticación
export type AuthenticatedRequest<T> = T & {
  readonly userId?: string
  readonly sessionId?: string
}

// Tipo para responses con metadatos de timing
export type TimedResponse<T> = T & {
  readonly timing: {
    readonly requestTime: number
    readonly processingTime: number
    readonly responseTime: number
  }
}