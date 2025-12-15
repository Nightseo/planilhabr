/**
 * Sistema de monitoreo de rendimiento
 * Métricas, benchmarks y optimización
 */

// ===============================
// TIPOS PARA PERFORMANCE
// ===============================

export interface PerformanceMetric {
  readonly name: string
  readonly value: number
  readonly unit: 'ms' | 'bytes' | 'count' | 'percent'
  readonly timestamp: number
  readonly category: 'rendering' | 'api' | 'memory' | 'network' | 'computation'
}

export interface BenchmarkResult {
  readonly name: string
  readonly iterations: number
  readonly totalTime: number
  readonly averageTime: number
  readonly minTime: number
  readonly maxTime: number
  readonly opsPerSecond: number
}

export interface MemoryUsage {
  readonly used: number
  readonly total: number
  readonly free: number
  readonly percentage: number
}

// ===============================
// CLASE PRINCIPAL DE MONITOREO
// ===============================

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private timers: Map<string, number> = new Map()

  // Iniciar medición de tiempo
  startTimer(name: string): void {
    this.timers.set(name, performance.now())
  }

  // Finalizar medición y registrar métrica
  endTimer(name: string, category: PerformanceMetric['category'] = 'computation'): number {
    const startTime = this.timers.get(name)
    if (!startTime) {
      console.warn(`Timer ${name} not found`)
      return 0
    }

    const duration = performance.now() - startTime
    this.timers.delete(name)

    this.addMetric({
      name,
      value: duration,
      unit: 'ms',
      timestamp: Date.now(),
      category
    })

    return duration
  }

  // Agregar métrica manualmente
  addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric)
    
    // Mantener solo las últimas 1000 métricas
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000)
    }
  }

  // Obtener métricas filtradas
  getMetrics(options: {
    category?: PerformanceMetric['category']
    since?: number
    limit?: number
  } = {}): PerformanceMetric[] {
    let filtered = [...this.metrics]

    if (options.category) {
      filtered = filtered.filter(m => m.category === options.category)
    }

    if (options.since) {
      filtered = filtered.filter(m => m.timestamp >= options.since)
    }

    if (options.limit) {
      filtered = filtered.slice(-options.limit)
    }

    return filtered
  }

  // Obtener estadísticas de métricas
  getStats(metricName: string): {
    count: number
    average: number
    min: number
    max: number
    latest: number
  } | null {
    const metrics = this.metrics.filter(m => m.name === metricName)
    
    if (metrics.length === 0) return null

    const values = metrics.map(m => m.value)
    
    return {
      count: metrics.length,
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      latest: values[values.length - 1]
    }
  }

  // Limpiar métricas
  clearMetrics(): void {
    this.metrics = []
    this.timers.clear()
  }
}

// ===============================
// INSTANCIA GLOBAL
// ===============================

export const performanceMonitor = new PerformanceMonitor()

// ===============================
// UTILIDADES DE BENCHMARKING
// ===============================

export const benchmark = async (
  name: string,
  fn: () => void | Promise<void>,
  iterations: number = 1000
): Promise<BenchmarkResult> => {
  const times: number[] = []
  
  console.log(`🚀 Benchmarking: ${name} (${iterations} iterations)`)
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now()
    
    const result = fn()
    if (result instanceof Promise) {
      await result
    }
    
    const end = performance.now()
    times.push(end - start)
  }
  
  const totalTime = times.reduce((sum, time) => sum + time, 0)
  const averageTime = totalTime / iterations
  const minTime = Math.min(...times)
  const maxTime = Math.max(...times)
  const opsPerSecond = 1000 / averageTime
  
  const result: BenchmarkResult = {
    name,
    iterations,
    totalTime,
    averageTime,
    minTime,
    maxTime,
    opsPerSecond
  }
  
  console.log(`✅ ${name}: ${opsPerSecond.toFixed(0)} ops/sec (avg: ${averageTime.toFixed(2)}ms)`)
  
  return result
}

// ===============================
// MEDICIÓN DE MEMORIA
// ===============================

export const getMemoryUsage = (): MemoryUsage => {
  if (typeof window !== 'undefined') {
    // Browser environment
    const memory = (performance as any).memory
    if (memory) {
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        free: memory.totalJSHeapSize - memory.usedJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
      }
    }
  } else {
    // Node.js environment
    const memory = process.memoryUsage()
    return {
      used: memory.heapUsed,
      total: memory.heapTotal,
      free: memory.heapTotal - memory.heapUsed,
      percentage: (memory.heapUsed / memory.heapTotal) * 100
    }
  }
  
  return {
    used: 0,
    total: 0,
    free: 0,
    percentage: 0
  }
}

// ===============================
// DECORADOR PARA FUNCIONES
// ===============================

export function measurePerformance<T extends (...args: any[]) => any>(
  target: T,
  name?: string
): T {
  const functionName = name || target.name || 'anonymous'
  
  return ((...args: Parameters<T>) => {
    performanceMonitor.startTimer(functionName)
    
    try {
      const result = target(...args)
      
      if (result instanceof Promise) {
        return result.finally(() => {
          performanceMonitor.endTimer(functionName)
        }) as ReturnType<T>
      } else {
        performanceMonitor.endTimer(functionName)
        return result as ReturnType<T>
      }
    } catch (error) {
      performanceMonitor.endTimer(functionName)
      throw error
    }
  }) as T
}

// ===============================
// ANÁLISIS DE RENDIMIENTO WEB
// ===============================

export const analyzeWebVitals = (): {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
} => {
  if (typeof window === 'undefined') return {}
  
  const vitals: any = {}
  
  // First Contentful Paint
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
  if (fcpEntry) {
    vitals.fcp = fcpEntry.startTime
  }
  
  // Time to First Byte
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  if (navigationEntry) {
    vitals.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
  }
  
  return vitals
}

// ===============================
// REPORTE DE RENDIMIENTO
// ===============================

export const generatePerformanceReport = (): string => {
  const memory = getMemoryUsage()
  const vitals = analyzeWebVitals()
  const recentMetrics = performanceMonitor.getMetrics({ limit: 10 })
  
  let report = '📊 PERFORMANCE REPORT\n'
  report += '='.repeat(50) + '\n\n'
  
  // Memoria
  report += '💾 Memory Usage\n'
  report += `   Used: ${(memory.used / 1024 / 1024).toFixed(1)} MB\n`
  report += `   Total: ${(memory.total / 1024 / 1024).toFixed(1)} MB\n`
  report += `   Percentage: ${memory.percentage.toFixed(1)}%\n\n`
  
  // Web Vitals
  if (Object.keys(vitals).length > 0) {
    report += '🌐 Web Vitals\n'
    if (vitals.fcp) report += `   First Contentful Paint: ${vitals.fcp.toFixed(1)}ms\n`
    if (vitals.ttfb) report += `   Time to First Byte: ${vitals.ttfb.toFixed(1)}ms\n`
    report += '\n'
  }
  
  // Métricas recientes
  if (recentMetrics.length > 0) {
    report += '⏱️ Recent Metrics\n'
    for (const metric of recentMetrics.slice(-5)) {
      report += `   ${metric.name}: ${metric.value.toFixed(2)} ${metric.unit} (${metric.category})\n`
    }
  }
  
  return report
}

// ===============================
// TESTS DE RENDIMIENTO
// ===============================

export const runPerformanceTests = async (): Promise<BenchmarkResult[]> => {
  const results: BenchmarkResult[] = []
  
  // Test: Array operations
  results.push(await benchmark('Array.map()', () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i)
    return arr.map(x => x * 2)
  }, 100))
  
  // Test: Object creation
  results.push(await benchmark('Object creation', () => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `item-${i}`,
      value: Math.random()
    }))
  }, 100))
  
  // Test: String operations
  results.push(await benchmark('String concatenation', () => {
    let result = ''
    for (let i = 0; i < 100; i++) {
      result += `item-${i}-`
    }
    return result
  }, 100))
  
  return results
}