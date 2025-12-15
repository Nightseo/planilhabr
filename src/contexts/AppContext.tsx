/**
 * Robuste Context API für globalen Anwendungszustand
 * Implementiert fortgeschrittene Muster mit Reducern und Middleware
 */

'use client'

import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import { 
  AppState, 
  UserPreferences, 
  Category, 
  Plantilla, 
  Keyword,
  AsyncOperationState 
} from '@/types'
import { CATEGORIES, STORAGE_KEYS } from '@/config/constants'
import { keywords as initialKeywords } from '@/data/keywords'
import { getLocalStorage, setLocalStorage, handleError } from '@/lib/utils'

// ===============================
// KONTEXT-TYPEN
// ===============================

interface AppContextType {
  // Zustand
  state: AppState
  userPreferences: UserPreferences

  // Aktionen für Kategorien
  loadCategories: () => Promise<void>

  // Aktionen für Plantillas
  loadPlantillas: () => Promise<void>
  addPlantilla: (plantilla: Plantilla) => void
  updatePlantilla: (slug: string, updates: Partial<Plantilla>) => void

  // Aktionen für Keywords
  loadKeywords: () => Promise<void>
  addKeyword: (keyword: Keyword) => void
  updateKeyword: (id: string, updates: Partial<Keyword>) => void
  bulkUpdateKeywords: (updates: Array<{ id: string; updates: Partial<Keyword> }>) => void

  // Aktionen für Benutzerpräferenzen
  updateUserPreferences: (updates: Partial<UserPreferences>) => void

  // Hilfsfunktionen
  clearErrors: () => void
  setLoading: (key: keyof AppState['loading'], loading: boolean) => void
}

// ===============================
// REDUCER-AKTIONEN
// ===============================

type AppAction =
  // Kategorien
  | { type: 'LOAD_CATEGORIES_START' }
  | { type: 'LOAD_CATEGORIES_SUCCESS'; payload: Category[] }
  | { type: 'LOAD_CATEGORIES_ERROR'; payload: string }

  // Plantillas
  | { type: 'LOAD_PLANTILLAS_START' }
  | { type: 'LOAD_PLANTILLAS_SUCCESS'; payload: Plantilla[] }
  | { type: 'LOAD_PLANTILLAS_ERROR'; payload: string }
  | { type: 'ADD_PLANTILLA'; payload: Plantilla }
  | { type: 'UPDATE_PLANTILLA'; payload: { slug: string; updates: Partial<Plantilla> } }
  
  // Keywords
  | { type: 'LOAD_KEYWORDS_START' }
  | { type: 'LOAD_KEYWORDS_SUCCESS'; payload: Keyword[] }
  | { type: 'LOAD_KEYWORDS_ERROR'; payload: string }
  | { type: 'ADD_KEYWORD'; payload: Keyword }
  | { type: 'UPDATE_KEYWORD'; payload: { id: string; updates: Partial<Keyword> } }
  | { type: 'BULK_UPDATE_KEYWORDS'; payload: Array<{ id: string; updates: Partial<Keyword> }> }

  // Hilfsfunktionen
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['loading']; loading: boolean } }

// ===============================
// INITIALER ZUSTAND
// ===============================

const initialAppState: AppState = {
  categories: [],
  plantillas: [],
  keywords: [],
  loading: {
    categories: false,
    plantillas: false,
    keywords: false
  },
  error: {
    categories: null,
    plantillas: null,
    keywords: null
  }
}

const initialUserPreferences: UserPreferences = {
  theme: 'light',
  language: 'pt',
  cookiesAccepted: false,
  favoriteCategories: []
}

// ===============================
// HAUPT-REDUCER
// ===============================

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // Kategorien
    case 'LOAD_CATEGORIES_START':
      return {
        ...state,
        loading: { ...state.loading, categories: true },
        error: { ...state.error, categories: null }
      }
    
    case 'LOAD_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload,
        loading: { ...state.loading, categories: false }
      }
    
    case 'LOAD_CATEGORIES_ERROR':
      return {
        ...state,
        loading: { ...state.loading, categories: false },
        error: { ...state.error, categories: action.payload }
      }
    
    // Plantillas
    case 'LOAD_PLANTILLAS_START':
      return {
        ...state,
        loading: { ...state.loading, plantillas: true },
        error: { ...state.error, plantillas: null }
      }
    
    case 'LOAD_PLANTILLAS_SUCCESS':
      return {
        ...state,
        plantillas: action.payload,
        loading: { ...state.loading, plantillas: false }
      }
    
    case 'LOAD_PLANTILLAS_ERROR':
      return {
        ...state,
        loading: { ...state.loading, plantillas: false },
        error: { ...state.error, plantillas: action.payload }
      }
    
    case 'ADD_PLANTILLA':
      return {
        ...state,
        plantillas: [...state.plantillas, action.payload]
      }
    
    case 'UPDATE_PLANTILLA':
      return {
        ...state,
        plantillas: state.plantillas.map(p => 
          p.slug === action.payload.slug 
            ? { ...p, ...action.payload.updates }
            : p
        )
      }
    
    // Keywords
    case 'LOAD_KEYWORDS_START':
      return {
        ...state,
        loading: { ...state.loading, keywords: true },
        error: { ...state.error, keywords: null }
      }
    
    case 'LOAD_KEYWORDS_SUCCESS':
      return {
        ...state,
        keywords: action.payload,
        loading: { ...state.loading, keywords: false }
      }
    
    case 'LOAD_KEYWORDS_ERROR':
      return {
        ...state,
        loading: { ...state.loading, keywords: false },
        error: { ...state.error, keywords: action.payload }
      }
    
    case 'ADD_KEYWORD':
      return {
        ...state,
        keywords: [...state.keywords, action.payload]
      }
    
    case 'UPDATE_KEYWORD':
      return {
        ...state,
        keywords: state.keywords.map(k => 
          k.id === action.payload.id 
            ? { ...k, ...action.payload.updates }
            : k
        )
      }
    
    case 'BULK_UPDATE_KEYWORDS':
      return {
        ...state,
        keywords: state.keywords.map(keyword => {
          const update = action.payload.find(u => u.id === keyword.id)
          return update ? { ...keyword, ...update.updates } : keyword
        })
      }
    
    // Utilidades
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: {
          categories: null,
          plantillas: null,
          keywords: null
        }
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.loading
        }
      }
    
    default:
      return state
  }
}

// ===============================
// KONTEXT-ERSTELLUNG
// ===============================

const AppContext = createContext<AppContextType | null>(null)

// ===============================
// KONTEXT-PROVIDER
// ===============================

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  const [userPreferences, setUserPreferences] = React.useState<UserPreferences>(initialUserPreferences)

  // ===============================
  // BENUTZERPRÄFERENZEN LADEN
  // ===============================

  useEffect(() => {
    const savedPreferences = getLocalStorage('user-preferences', initialUserPreferences)
    setUserPreferences(savedPreferences)
  }, [])

  // ===============================
  // AKTIONEN FÜR KATEGORIEN
  // ===============================

  const loadCategories = async (): Promise<void> => {
    try {
      dispatch({ type: 'LOAD_CATEGORIES_START' })

      // Laden von Kategorien simulieren (kann durch echte API ersetzt werden)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const categoriesWithCount = Object.values(CATEGORIES).map(category => ({
        ...category,
        plantillaCount: state.plantillas.filter(p => p.category === category.id).length
      }))
      
      dispatch({ type: 'LOAD_CATEGORIES_SUCCESS', payload: categoriesWithCount })
    } catch (error) {
      dispatch({ type: 'LOAD_CATEGORIES_ERROR', payload: handleError(error) })
    }
  }

  // ===============================
  // AKTIONEN FÜR PLANTILLAS
  // ===============================

  const loadPlantillas = async (): Promise<void> => {
    try {
      dispatch({ type: 'LOAD_PLANTILLAS_START' })

      // Hier würden Plantillas von der API oder aus Dateien geladen
      const response = await fetch('/api/plantillas')
      if (!response.ok) throw new Error('Error loading plantillas')
      
      const plantillas = await response.json()
      dispatch({ type: 'LOAD_PLANTILLAS_SUCCESS', payload: plantillas })
    } catch (error) {
      dispatch({ type: 'LOAD_PLANTILLAS_ERROR', payload: handleError(error) })
    }
  }

  const addPlantilla = (plantilla: Plantilla): void => {
    dispatch({ type: 'ADD_PLANTILLA', payload: plantilla })
  }

  const updatePlantilla = (slug: string, updates: Partial<Plantilla>): void => {
    dispatch({ type: 'UPDATE_PLANTILLA', payload: { slug, updates } })
  }

  // ===============================
  // AKTIONEN FÜR KEYWORDS
  // ===============================

  const loadKeywords = async (): Promise<void> => {
    try {
      dispatch({ type: 'LOAD_KEYWORDS_START' })

      if (typeof window === 'undefined') {
        dispatch({ type: 'LOAD_KEYWORDS_SUCCESS', payload: initialKeywords })
        return
      }

      localStorage.removeItem(STORAGE_KEYS.LEGACY_KEYWORDS)

      const savedKeywords = getLocalStorage<Keyword[]>(STORAGE_KEYS.KEYWORDS, initialKeywords)

      if (!localStorage.getItem(STORAGE_KEYS.KEYWORDS)) {
        setLocalStorage(STORAGE_KEYS.KEYWORDS, initialKeywords)
      }

      dispatch({ type: 'LOAD_KEYWORDS_SUCCESS', payload: savedKeywords })
    } catch (error) {
      dispatch({ type: 'LOAD_KEYWORDS_ERROR', payload: handleError(error) })
    }
  }

  const addKeyword = (keyword: Keyword): void => {
    dispatch({ type: 'ADD_KEYWORD', payload: keyword })

    // In localStorage speichern
    const updatedKeywords = [...state.keywords, keyword]
    setLocalStorage(STORAGE_KEYS.KEYWORDS, updatedKeywords)
  }

  const updateKeyword = (id: string, updates: Partial<Keyword>): void => {
    dispatch({ type: 'UPDATE_KEYWORD', payload: { id, updates } })

    // In localStorage speichern
    const updatedKeywords = state.keywords.map(k =>
      k.id === id ? { ...k, ...updates } : k
    )
    setLocalStorage(STORAGE_KEYS.KEYWORDS, updatedKeywords)
  }

  const bulkUpdateKeywords = (updates: Array<{ id: string; updates: Partial<Keyword> }>): void => {
    dispatch({ type: 'BULK_UPDATE_KEYWORDS', payload: updates })

    // In localStorage speichern
    const updatedKeywords = state.keywords.map(keyword => {
      const update = updates.find(u => u.id === keyword.id)
      return update ? { ...keyword, ...update.updates } : keyword
    })
    setLocalStorage(STORAGE_KEYS.KEYWORDS, updatedKeywords)
  }

  // ===============================
  // AKTIONEN FÜR PRÄFERENZEN
  // ===============================

  const updateUserPreferences = (updates: Partial<UserPreferences>): void => {
    const newPreferences = { ...userPreferences, ...updates }
    setUserPreferences(newPreferences)
    setLocalStorage('user-preferences', newPreferences)
  }

  // ===============================
  // HILFSFUNKTIONEN
  // ===============================

  const clearErrors = (): void => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }

  const setLoading = (key: keyof AppState['loading'], loading: boolean): void => {
    dispatch({ type: 'SET_LOADING', payload: { key, loading } })
  }

  // ===============================
  // MEMOISIERTER KONTEXT-WERT
  // ===============================

  const contextValue = useMemo((): AppContextType => ({
    state,
    userPreferences,
    loadCategories,
    loadPlantillas,
    addPlantilla,
    updatePlantilla,
    loadKeywords,
    addKeyword,
    updateKeyword,
    bulkUpdateKeywords,
    updateUserPreferences,
    clearErrors,
    setLoading
  }), [state, userPreferences])

  // ===============================
  // INITIALES LADEN
  // ===============================

  useEffect(() => {
    loadCategories()
    loadKeywords()
  }, [])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

// ===============================
// BENUTZERDEFINIERTER HOOK
// ===============================

export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  
  return context
}

// ===============================
// SPEZIALISIERTE HOOKS
// ===============================

export function useCategories() {
  const { state, loadCategories } = useAppContext()
  
  return {
    categories: state.categories,
    loading: state.loading.categories,
    error: state.error.categories,
    reload: loadCategories
  }
}

export function usePlantillas() {
  const { state, loadPlantillas, addPlantilla, updatePlantilla } = useAppContext()
  
  return {
    plantillas: state.plantillas,
    loading: state.loading.plantillas,
    error: state.error.plantillas,
    reload: loadPlantillas,
    add: addPlantilla,
    update: updatePlantilla
  }
}

export function useKeywords() {
  const { state, loadKeywords, addKeyword, updateKeyword, bulkUpdateKeywords } = useAppContext()
  
  return {
    keywords: state.keywords,
    loading: state.loading.keywords,
    error: state.error.keywords,
    reload: loadKeywords,
    add: addKeyword,
    update: updateKeyword,
    bulkUpdate: bulkUpdateKeywords
  }
}

export function useUserPreferences() {
  const { userPreferences, updateUserPreferences } = useAppContext()
  
  return {
    preferences: userPreferences,
    update: updateUserPreferences
  }
}
