/**
 * Robuste Hilfsfunktionen für Server-APIs
 * Fehlerbehandlung, Validierung und Leistungsoptimierung
 */

import { NextRequest, NextResponse } from 'next/server'
import type { BaseAPIResponse, APIError } from '@/types/api'

// ===============================
// MIDDLEWARE-TYPEN
// ===============================

export interface APIRoute {
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  readonly path: string
  readonly handler: (request: NextRequest) => Promise<NextResponse>
  readonly rateLimitPerMinute?: number
  readonly requireAuth?: boolean
  readonly cacheMaxAge?: number
}

export interface ErrorDetails {
  readonly code: string
  readonly message: string
  readonly details?: Record<string, unknown>
  readonly statusCode?: number
}

// ===============================
// ZENTRALISIERTE FEHLERBEHANDLUNG
// ===============================

export class APIError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export const createErrorResponse = (error: ErrorDetails): NextResponse<BaseAPIResponse<never>> => {
  const response: BaseAPIResponse<never> = {
    success: false,
    error: error.message,
    timestamp: new Date().toISOString(),
    requestId: generateRequestId()
  }

  return NextResponse.json(response, {
    status: error.statusCode || 500,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  })
}

export const createSuccessResponse = <T>(
  data: T,
  options: {
    readonly message?: string
    readonly cacheMaxAge?: number
    readonly customHeaders?: Record<string, string>
  } = {}
): NextResponse<BaseAPIResponse<T>> => {
  const response: BaseAPIResponse<T> = {
    success: true,
    data,
    message: options.message,
    timestamp: new Date().toISOString(),
    requestId: generateRequestId()
  }

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...options.customHeaders
  })

  if (options.cacheMaxAge) {
    headers.set('Cache-Control', `public, max-age=${options.cacheMaxAge}`)
  } else {
    headers.set('Cache-Control', 'no-cache')
  }

  return NextResponse.json(response, {
    status: 200,
    headers
  })
}

// ===============================
// REQUEST-VALIDIERUNG
// ===============================

export const validateRequestBody = <T>(
  request: NextRequest,
  validator: (data: unknown) => data is T
): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = await request.json()

      if (!validator(body)) {
        reject(new APIError('INVALID_REQUEST_BODY', 'Ungültige Request-Daten', 400))
        return
      }

      resolve(body)
    } catch (error) {
      reject(new APIError(
        'MALFORMED_JSON',
        'Fehlerhaftes JSON im Request-Body',
        400,
        { originalError: error instanceof Error ? error.message : String(error) }
      ))
    }
  })
}

export const validateQueryParams = (
  request: NextRequest,
  schema: Record<string, { required?: boolean; type: 'string' | 'number' | 'boolean' }>
): Record<string, string | number | boolean> => {
  const { searchParams } = new URL(request.url)
  const params: Record<string, string | number | boolean> = {}

  for (const [key, config] of Object.entries(schema)) {
    const value = searchParams.get(key)

    if (config.required && !value) {
      throw new APIError('MISSING_PARAMETER', `Erforderlicher Parameter fehlt: ${key}`, 400)
    }

    if (value) {
      switch (config.type) {
        case 'number':
          const numValue = Number(value)
          if (isNaN(numValue)) {
            throw new APIError('INVALID_PARAMETER', `Parameter ${key} muss eine Zahl sein`, 400)
          }
          params[key] = numValue
          break
        case 'boolean':
          params[key] = value.toLowerCase() === 'true'
          break
        default:
          params[key] = value
      }
    }
  }

  return params
}

// ===============================
// RATE-LIMITING-MIDDLEWARE
// ===============================

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export const checkRateLimit = (
  identifier: string,
  limitPerMinute: number = 60
): boolean => {
  const now = Date.now()
  const windowStart = Math.floor(now / 60000) * 60000 // Start der aktuellen Minute
  const key = `${identifier}:${windowStart}`

  const current = rateLimitStore.get(key)

  if (!current) {
    rateLimitStore.set(key, { count: 1, resetTime: windowStart + 60000 })
    return true
  }

  if (current.count >= limitPerMinute) {
    return false
  }

  current.count++
  return true
}

// Alte Rate-Limit-Einträge bereinigen
setInterval(() => {
  const now = Date.now()
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60000) // Jede Minute bereinigen

// ===============================
// CACHE-HILFSFUNKTIONEN
// ===============================

interface CacheEntry<T> {
  readonly data: T
  readonly timestamp: number
  readonly ttl: number
}

const apiCache = new Map<string, CacheEntry<unknown>>()

export const getCachedResponse = <T>(key: string): T | null => {
  const entry = apiCache.get(key) as CacheEntry<T> | undefined

  if (!entry) return null

  const now = Date.now()
  if (now - entry.timestamp > entry.ttl) {
    apiCache.delete(key)
    return null
  }

  return entry.data
}

export const setCachedResponse = <T>(
  key: string, 
  data: T, 
  ttlSeconds: number = 300
): void => {
  apiCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlSeconds * 1000
  })
}

export const generateCacheKey = (
  endpoint: string,
  params: Record<string, unknown> = {}
): string => {
  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
    
  return `${endpoint}:${paramString}`
}

// ===============================
// HILFSFUNKTIONEN
// ===============================

export const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')
  const cloudflare = request.headers.get('cf-connecting-ip')
  
  return cloudflare || forwarded?.split(',')[0] || real || 'unknown'
}

export const sanitizeInput = (input: unknown): string => {
  if (typeof input !== 'string') return ''

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
}

// ===============================
// ROUTE-WRAPPER
// ===============================

export const withErrorHandling = (
  handler: (request: NextRequest) => Promise<NextResponse>
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(request)
    } catch (error) {
      console.error('API Error:', error)

      if (error instanceof APIError) {
        return createErrorResponse({
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
          details: error.details
        })
      }

      // Unbehandelter Fehler
      return createErrorResponse({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Interner Serverfehler',
        statusCode: 500,
        details: {
          error: error instanceof Error ? error.message : String(error)
        }
      })
    }
  }
}

export const withRateLimit = (
  handler: (request: NextRequest) => Promise<NextResponse>,
  limitPerMinute: number = 60
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    const clientIP = getClientIP(request)

    if (!checkRateLimit(clientIP, limitPerMinute)) {
      return createErrorResponse({
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Request-Limit überschritten. Versuchen Sie es in einer Minute erneut.',
        statusCode: 429
      })
    }

    return handler(request)
  }
}

export const withCache = (
  handler: (request: NextRequest) => Promise<NextResponse>,
  cacheSeconds: number = 300
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    const cacheKey = generateCacheKey(request.nextUrl.pathname, Object.fromEntries(request.nextUrl.searchParams))
    const cached = getCachedResponse(cacheKey)

    if (cached) {
      return NextResponse.json(cached, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${cacheSeconds}`,
          'X-Cache': 'HIT'
        }
      })
    }

    const response = await handler(request)
    
    if (response.ok) {
      const data = await response.clone().json()
      setCachedResponse(cacheKey, data, cacheSeconds)
    }

    return response
  }
}