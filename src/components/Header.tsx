/**
 * PlanilhaBR Header - Clean & Professional
 * Responsive design with mobile menu
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
  ArchiveBoxIcon,
  TruckIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/config/constants'
import PlanilhaBRLogo from '@/components/PlanilhaBRLogo'
import { getAllCategories } from '@/data/categories'

interface TemplateMenuItem {
  id: string
  label: string
  href: string
  icon?: string
}

interface SearchDataItem {
  slug: string
  title: string
  category: string
}

interface HeaderProps {
  className?: string
  latestTemplates?: TemplateMenuItem[]
  searchData?: SearchDataItem[]
}

const iconMap: Record<string, any> = {
  financeiro: BanknotesIcon,
  estoque: ArchiveBoxIcon,
  vendas: DocumentTextIcon,
  rh: UsersIcon,
  projetos: ClipboardDocumentListIcon,
  produtividade: SparklesIcon,
  marketing: ClipboardDocumentCheckIcon,
  contabilidade: BanknotesIcon,
  logistica: TruckIcon,
  qualidade: ShieldCheckIcon,
  compras: BuildingOfficeIcon,
  administracao: WrenchScrewdriverIcon
}

interface SearchResult {
  slug: string
  title: string
  category: string
}

const Header = React.memo(function Header({ className, latestTemplates = [], searchData = [] }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [templatesOpen, setTemplatesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)

  const categories = getAllCategories()

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setTemplatesOpen(false)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Client-side search (sin API calls)
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const results = searchData
      .filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      )
      .slice(0, 8)

    setSearchResults(results)
  }, [searchQuery, searchData])

  const handleResultClick = (slug: string) => {
    setSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
    window.location.href = `/${slug}`
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileCategoriesOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'bg-white/95 backdrop-blur-md border-b border-green-200/80',
          'shadow-sm',
          className
        )}
        role="navigation"
        aria-label="Navegacao principal"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
              aria-label={`${SITE_CONFIG.NAME} Inicio`}
            >
              <PlanilhaBRLogo size="lg" showText={true} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Planilhas Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setTemplatesOpen(true)
                  setSearchOpen(false)
                }}
                onMouseLeave={() => setTemplatesOpen(false)}
              >
                <Link
                  href="/planilhas"
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium rounded-lg",
                    "text-green-900 hover:text-green-700 hover:bg-green-50",
                    "transition-all duration-200",
                    templatesOpen && "text-green-700 bg-green-50"
                  )}
                >
                  Planilhas
                  <ChevronDownIcon className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    templatesOpen && "rotate-180"
                  )} />
                </Link>

                {templatesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[800px] z-[101]">
                    <div className="bg-white border border-green-200 rounded-xl shadow-xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-2 gap-8">
                        {/* Categorias */}
                        <div>
                          <div className="text-xs font-semibold text-green-700 mb-3 uppercase tracking-wider">
                            Categorias
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {categories.slice(0, 8).map((category) => {
                              const Icon = iconMap[category.id] || ClipboardDocumentListIcon
                              return (
                                <Link
                                  key={category.id}
                                  href={`/${category.slug}/`}
                                  onClick={() => setTemplatesOpen(false)}
                                  className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-green-900 hover:text-green-700 hover:bg-green-50 transition-all duration-150 rounded-lg group"
                                >
                                  <Icon className="w-4 h-4 text-green-400 group-hover:text-gray-600 transition-colors" />
                                  <span className="font-medium">{category.name}</span>
                                </Link>
                              )
                            })}
                          </div>
                          <div className="mt-4 pt-3 border-t border-green-100">
                            <Link
                              href="/planilhas"
                              onClick={() => setTemplatesOpen(false)}
                              className="inline-flex items-center gap-1 text-[13px] text-green-700 hover:text-green-800 font-medium transition-colors"
                            >
                              Ver todas as categorias
                              <ChevronDownIcon className="w-3 h-3 -rotate-90" />
                            </Link>
                          </div>
                        </div>

                        {/* Planilhas Recentes */}
                        <div>
                          <div className="text-xs font-semibold text-green-700 mb-3 uppercase tracking-wider">
                            Planilhas Recentes
                          </div>
                          <div className="space-y-1">
                            {latestTemplates.slice(0, 6).map((template) => (
                              <Link
                                key={template.id}
                                href={template.href}
                                onClick={() => setTemplatesOpen(false)}
                                className="block px-3 py-2.5 text-[13px] text-green-900 hover:text-green-700 hover:bg-green-50 transition-all duration-150 rounded-lg truncate"
                                title={template.label}
                              >
                                {template.label}
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-green-100">
                            <Link
                              href="/planilhas"
                              onClick={() => setTemplatesOpen(false)}
                              className="inline-flex items-center gap-1 text-[13px] text-green-700 hover:text-green-800 font-medium transition-colors"
                            >
                              Ver todas as planilhas
                              <ChevronDownIcon className="w-3 h-3 -rotate-90" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/sobre-nos"
                className="px-4 py-2 text-[14px] font-medium text-green-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                Sobre nos
              </Link>

              <Link
                href="/contato"
                className="px-4 py-2 text-[14px] font-medium text-green-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                Contato
              </Link>

              {/* Desktop Search */}
              <div className="relative ml-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(!searchOpen)
                    setTemplatesOpen(false)
                  }}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg",
                    "text-green-600 hover:text-green-600 hover:bg-green-50",
                    "transition-all duration-200",
                    searchOpen && "text-green-600 bg-green-50"
                  )}
                  aria-label="Buscar"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>

                {searchOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[100]"
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery('')
                        setSearchResults([])
                      }}
                    />
                    <div className="absolute right-0 top-full mt-2 z-[101] animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-white border border-green-200 rounded-xl shadow-xl overflow-hidden w-80">
                        <div className="flex items-center border-b border-green-100">
                          <div className="pl-4">
                            <MagnifyingGlassIcon className="w-5 h-5 text-green-400" />
                          </div>
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar planilhas..."
                            className="flex-1 px-3 py-3.5 text-[14px] text-green-900 placeholder:text-green-400 focus:outline-none bg-transparent"
                          />
                        </div>
                        {searchResults.length > 0 && (
                          <div className="max-h-80 overflow-y-auto">
                            {searchResults.map((result) => (
                              <button
                                key={result.slug}
                                onClick={() => handleResultClick(result.slug)}
                                className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors border-b border-green-50 last:border-0"
                              >
                                <div className="text-[14px] font-medium text-green-900 truncate">
                                  {result.title}
                                </div>
                                <div className="text-[12px] text-gray-500">
                                  {result.category}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        {searchQuery.length >= 2 && searchResults.length === 0 && (
                          <div className="px-4 py-6 text-center text-[14px] text-gray-500">
                            Nenhuma planilha encontrada
                          </div>
                        )}
                        {searchQuery.length < 2 && (
                          <div className="px-4 py-4 text-center text-[13px] text-gray-400">
                            Digite pelo menos 2 caracteres
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(!searchOpen)
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  "text-green-700 hover:text-green-600 hover:bg-green-50",
                  "transition-all duration-200",
                  searchOpen && "text-green-600 bg-green-50"
                )}
                aria-label="Buscar"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen)
                  setSearchOpen(false)
                }}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg",
                  "text-green-700 hover:text-green-600 hover:bg-green-50",
                  "transition-all duration-200",
                  mobileMenuOpen && "text-green-600 bg-green-50"
                )}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search (under header) */}
          {searchOpen && (
            <div className="lg:hidden pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-white border border-green-200 rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center bg-green-50">
                  <div className="pl-4">
                    <MagnifyingGlassIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <input
                    ref={mobileSearchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar planilhas..."
                    className="flex-1 px-3 py-3 text-[14px] text-green-900 placeholder:text-green-400 focus:outline-none bg-transparent"
                    autoFocus
                  />
                </div>
                {searchResults.length > 0 && (
                  <div className="max-h-60 overflow-y-auto border-t border-green-100">
                    {searchResults.map((result) => (
                      <button
                        key={result.slug}
                        onClick={() => handleResultClick(result.slug)}
                        className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors border-b border-green-50 last:border-0"
                      >
                        <div className="text-[14px] font-medium text-green-900 truncate">
                          {result.title}
                        </div>
                        <div className="text-[12px] text-gray-500">
                          {result.category}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {searchQuery.length >= 2 && searchResults.length === 0 && (
                  <div className="px-4 py-4 text-center text-[14px] text-gray-500 border-t border-green-100">
                    Nenhuma planilha encontrada
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 bottom-0 z-50 lg:hidden",
          "bg-white overflow-y-auto",
          "transition-all duration-300 ease-out",
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        role="menu"
        aria-orientation="vertical"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="p-4 space-y-2">
          {/* Planilhas with submenu */}
          <div>
            <button
              type="button"
              onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] font-medium text-green-900 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200"
              aria-expanded={mobileCategoriesOpen}
            >
              <span>Planilhas</span>
              <ChevronDownIcon className={cn(
                "w-5 h-5 transition-transform duration-200",
                mobileCategoriesOpen && "rotate-180"
              )} />
            </button>

            <div className={cn(
              "overflow-hidden transition-all duration-300",
              mobileCategoriesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}>
              <div className="pl-4 py-2 space-y-1">
                <Link
                  href="/planilhas"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-green-900 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                >
                  Ver todas as planilhas
                </Link>

                <div className="h-px bg-green-50 my-2" />

                {categories.slice(0, 8).map((category) => {
                  const Icon = iconMap[category.id] || ClipboardDocumentListIcon
                  return (
                    <Link
                      key={category.id}
                      href={`/${category.slug}/`}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 text-[14px] text-green-900 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                    >
                      <Icon className="w-5 h-5 text-green-400" />
                      <span>{category.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Other Links */}
          <Link
            href="/sobre-nos"
            onClick={closeMobileMenu}
            className="flex items-center px-4 py-3.5 text-[15px] font-medium text-green-900 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200"
          >
            Sobre nos
          </Link>

          <Link
            href="/contato"
            onClick={closeMobileMenu}
            className="flex items-center px-4 py-3.5 text-[15px] font-medium text-green-900 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200"
          >
            Contato
          </Link>

          {/* Mobile CTA */}
          <div className="pt-4 mt-4 border-t border-green-100">
            <Link
              href="/planilhas"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full px-4 py-4 text-[15px] font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Explorar Planilhas
            </Link>
          </div>

          {/* Recent Templates on Mobile */}
          {latestTemplates.length > 0 && (
            <div className="pt-4 mt-4 border-t border-green-100">
              <div className="px-4 text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">
                Planilhas Recentes
              </div>
              <div className="space-y-1">
                {latestTemplates.slice(0, 4).map((template) => (
                  <Link
                    key={template.id}
                    href={template.href}
                    onClick={closeMobileMenu}
                    className="block px-4 py-2.5 text-[14px] text-green-900 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 truncate"
                  >
                    {template.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
});

export default Header;
