/**
 * Sistema de testing y validación robusto
 * Tests unitarios para validadores y utilidades
 */

import { validateObject, validators, isValidKeyword, isValidCategoryId } from '@/types/validation'
import { formatCurrency, formatDate, sanitizeString, debounce } from '@/lib/utils'
import type { Keyword, CategoryId } from '@/types'

// ===============================
// TIPOS PARA TESTING
// ===============================

export interface TestResult {
  readonly name: string
  readonly passed: boolean
  readonly error?: string
  readonly duration: number
}

export interface TestSuite {
  readonly name: string
  readonly results: readonly TestResult[]
  readonly summary: {
    readonly total: number
    readonly passed: number
    readonly failed: number
    readonly duration: number
  }
}

// ===============================
// UTILIDAD DE TESTING
// ===============================

export const runTest = (name: string, testFn: () => void | Promise<void>): TestResult => {
  const startTime = performance.now()
  
  try {
    const result = testFn()
    if (result instanceof Promise) {
      throw new Error('Async tests not supported in sync runner')
    }
    
    const duration = performance.now() - startTime
    return { name, passed: true, duration }
  } catch (error) {
    const duration = performance.now() - startTime
    return {
      name,
      passed: false,
      error: error instanceof Error ? error.message : String(error),
      duration
    }
  }
}

export const runTestSuite = (name: string, tests: (() => TestResult)[]): TestSuite => {
  const startTime = performance.now()
  const results = tests.map(test => test())
  const duration = performance.now() - startTime
  
  const passed = results.filter(r => r.passed).length
  const failed = results.length - passed
  
  return {
    name,
    results,
    summary: {
      total: results.length,
      passed,
      failed,
      duration
    }
  }
}

// ===============================
// TESTS PARA VALIDADORES
// ===============================

export const validationTests = (): TestSuite => {
  return runTestSuite('Validation Tests', [
    () => runTest('validators.required should accept non-empty values', () => {
      const rule = validators.required('Field required')
      if (!rule.test('valid value')) throw new Error('Should accept non-empty string')
      if (!rule.test(123)) throw new Error('Should accept number')
      if (!rule.test(true)) throw new Error('Should accept boolean')
    }),
    
    () => runTest('validators.required should reject empty values', () => {
      const rule = validators.required('Field required')
      if (rule.test('')) throw new Error('Should reject empty string')
      if (rule.test(null)) throw new Error('Should reject null')
      if (rule.test(undefined)) throw new Error('Should reject undefined')
    }),
    
    () => runTest('validators.email should validate email format', () => {
      const rule = validators.email('Invalid email')
      if (!rule.test('test@example.com')) throw new Error('Should accept valid email')
      if (!rule.test('user+tag@domain.co.uk')) throw new Error('Should accept complex email')
      if (rule.test('invalid.email')) throw new Error('Should reject invalid email')
      if (rule.test('test@')) throw new Error('Should reject incomplete email')
    }),
    
    () => runTest('validators.url should validate URL format', () => {
      const rule = validators.url('Invalid URL')
      if (!rule.test('https://example.com')) throw new Error('Should accept HTTPS URL')
      if (!rule.test('http://test.local:3000/path')) throw new Error('Should accept HTTP URL with port')
      if (rule.test('not-a-url')) throw new Error('Should reject invalid URL')
      if (rule.test('ftp://example.com')) throw new Error('Should reject non-HTTP protocols')
    }),
    
    () => runTest('validators.minLength should validate string length', () => {
      const rule = validators.minLength(5, 'Too short')
      if (!rule.test('exactly')) throw new Error('Should accept string of exact length')
      if (!rule.test('longer string')) throw new Error('Should accept longer string')
      if (rule.test('short')) throw new Error('Should reject shorter string')
    }),
    
    () => runTest('validators.positiveNumber should validate positive numbers', () => {
      const rule = validators.positiveNumber('Must be positive')
      if (!rule.test(1)) throw new Error('Should accept positive integer')
      if (!rule.test(0.1)) throw new Error('Should accept positive decimal')
      if (rule.test(0)) throw new Error('Should reject zero')
      if (rule.test(-1)) throw new Error('Should reject negative number')
    }),
    
    () => runTest('validateObject should validate complete objects', () => {
      const schema = {
        name: [validators.required('Name required'), validators.minLength(2, 'Too short')],
        email: [validators.required('Email required'), validators.email('Invalid email')],
        age: [validators.required('Age required'), validators.positiveNumber('Must be positive')]
      }
      
      const validData = { name: 'John', email: 'john@example.com', age: 25 }
      const result = validateObject(validData, schema)
      
      if (!result.isValid) throw new Error('Should validate correct object')
      if (Object.keys(result.errors).length > 0) throw new Error('Should have no errors for valid data')
    }),
    
    () => runTest('validateObject should catch validation errors', () => {
      const schema = {
        name: [validators.required('Name required')],
        email: [validators.email('Invalid email')]
      }
      
      const invalidData = { name: '', email: 'invalid-email' }
      const result = validateObject(invalidData, schema)
      
      if (result.isValid) throw new Error('Should mark invalid object as invalid')
      if (!result.errors.name) throw new Error('Should have name error')
      if (!result.errors.email) throw new Error('Should have email error')
      if (!result.firstError) throw new Error('Should have firstError')
    })
  ])
}

// ===============================
// TESTS PARA TYPE GUARDS
// ===============================

export const typeGuardTests = (): TestSuite => {
  return runTestSuite('Type Guard Tests', [
    () => runTest('isValidKeyword should accept valid keyword objects', () => {
      const validKeyword: Keyword = {
        id: '1',
        keyword: 'test keyword',
        volume: 1000,
        difficulty: 2,
        cpc: 0.5,
        status: 'pending'
      }
      
      if (!isValidKeyword(validKeyword)) throw new Error('Should accept valid keyword')
    }),
    
    () => runTest('isValidKeyword should reject invalid objects', () => {
      const invalidKeywords = [
        null,
        undefined,
        'string',
        123,
        {},
        { id: '1' }, // missing required fields
        { id: '1', keyword: 'test', volume: 'invalid' }, // wrong types
        { id: '1', keyword: 'test', volume: 1000, difficulty: 2, cpc: 0.5, status: 'invalid' } // invalid status
      ]
      
      for (const invalid of invalidKeywords) {
        if (isValidKeyword(invalid)) {
          throw new Error(`Should reject invalid keyword: ${JSON.stringify(invalid)}`)
        }
      }
    }),
    
    () => runTest('isValidCategoryId should validate category IDs', () => {
      const validCategories: CategoryId[] = [
        'buchhaltung', 'dokumentation', 'datenverwaltung',
        'logistik', 'personalmanagement', 'projektmanagement', 'qualitaetsmanagement',
        'sicherheit', 'spezial', 'verwaltung', 'technik'
      ]
      
      for (const category of validCategories) {
        if (!isValidCategoryId(category)) {
          throw new Error(`Should accept valid category: ${category}`)
        }
      }
      
      const invalidCategories = ['invalid', 'test', '', null, undefined, 123]
      for (const invalid of invalidCategories) {
        if (isValidCategoryId(invalid)) {
          throw new Error(`Should reject invalid category: ${invalid}`)
        }
      }
    })
  ])
}

// ===============================
// TESTS PARA UTILITIES
// ===============================

export const utilityTests = (): TestSuite => {
  return runTestSuite('Utility Tests', [
    () => runTest('formatCurrency should format German currency', () => {
      const result1 = formatCurrency(1234.56)
      if (result1 !== '1.234,56 €') throw new Error(`Expected "1.234,56 €", got "${result1}"`)
      
      const result2 = formatCurrency(0)
      if (result2 !== '0,00 €') throw new Error(`Expected "0,00 €", got "${result2}"`)
      
      const result3 = formatCurrency(-500.25)
      if (result3 !== '-500,25 €') throw new Error(`Expected "-500,25 €", got "${result3}"`)
    }),
    
    () => runTest('formatDate should format German dates', () => {
      const date = new Date('2025-01-15T10:30:00Z')
      const result = formatDate(date)
      
      // Should be in German format DD.MM.YYYY
      if (!result.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
        throw new Error(`Expected German date format DD.MM.YYYY, got "${result}"`)
      }
    }),
    
    () => runTest('sanitizeString should remove dangerous characters', () => {
      const dangerous = '<script>alert("xss")</script><div>safe content</div>'
      const result = sanitizeString(dangerous)
      
      if (result.includes('<script>')) throw new Error('Should remove script tags')
      if (result.includes('<') || result.includes('>')) throw new Error('Should remove angle brackets')
      if (!result.includes('safe content')) throw new Error('Should preserve safe content')
    }),
    
    () => runTest('debounce should delay function execution', (done) => {
      let callCount = 0
      const debouncedFn = debounce(() => { callCount++ }, 50)
      
      // Call multiple times quickly
      debouncedFn()
      debouncedFn()
      debouncedFn()
      
      // Should not have called yet
      if (callCount !== 0) throw new Error('Should not call immediately')
      
      // Wait and check if called once
      setTimeout(() => {
        if (callCount !== 1) throw new Error('Should call exactly once after delay')
      }, 60)
    })
  ])
}

// ===============================
// EJECUTAR TODOS LOS TESTS
// ===============================

export const runAllTests = (): TestSuite[] => {
  return [
    validationTests(),
    typeGuardTests(),
    utilityTests()
  ]
}

// ===============================
// REPORTE DE TESTS
// ===============================

export const generateTestReport = (suites: TestSuite[]): string => {
  const totalTests = suites.reduce((sum, suite) => sum + suite.summary.total, 0)
  const totalPassed = suites.reduce((sum, suite) => sum + suite.summary.passed, 0)
  const totalFailed = suites.reduce((sum, suite) => sum + suite.summary.failed, 0)
  const totalDuration = suites.reduce((sum, suite) => sum + suite.summary.duration, 0)
  
  let report = '🧪 TEST RESULTS\n'
  report += '='.repeat(50) + '\n\n'
  
  for (const suite of suites) {
    report += `📋 ${suite.name}\n`
    report += `   Tests: ${suite.summary.total} | Passed: ${suite.summary.passed} | Failed: ${suite.summary.failed}\n`
    report += `   Duration: ${suite.summary.duration.toFixed(2)}ms\n`
    
    if (suite.summary.failed > 0) {
      report += '   ❌ Failed tests:\n'
      for (const result of suite.results.filter(r => !r.passed)) {
        report += `      - ${result.name}: ${result.error}\n`
      }
    }
    report += '\n'
  }
  
  report += `📊 SUMMARY\n`
  report += `   Total Tests: ${totalTests}\n`
  report += `   Passed: ${totalPassed} (${((totalPassed / totalTests) * 100).toFixed(1)}%)\n`
  report += `   Failed: ${totalFailed} (${((totalFailed / totalTests) * 100).toFixed(1)}%)\n`
  report += `   Total Duration: ${totalDuration.toFixed(2)}ms\n`
  
  return report
}
