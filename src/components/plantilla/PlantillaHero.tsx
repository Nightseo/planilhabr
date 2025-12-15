/**
 * PlantillaHero Component
 * Clean, minimalist hero for template detail pages
 */

'use client'

import Link from 'next/link'
import { ArrowDownTrayIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline'
import { getCategoryDisplayName } from '@/utils/client-utils'
import { getCategoryIcon } from '@/lib/categoryIcons'
import type { Plantilla } from '@/types'

export interface PlantillaHeroProps {
  plantilla: Plantilla
  slug: string
  publishedDate?: string | null
  updatedDate?: string | null
}

export function PlantillaHero({
  plantilla,
  slug,
  publishedDate,
  updatedDate
}: PlantillaHeroProps) {
  const title = plantilla.h1 || plantilla.title
  const description = plantilla.briefDescription || plantilla.description
  const downloadButtonText = plantilla.texts?.downloadButton || 'Baixar gratis'
  const categoryName = getCategoryDisplayName(plantilla.category)
  const hasDownload = Boolean(plantilla.excelUrl)

  // Obter icone da categoria
  const CategoryIcon = getCategoryIcon(plantilla.category)

  return (
    <section className="bg-white border-b border-green-200">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
        {/* Badge da categoria */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-md text-[13px] font-medium">
            <CategoryIcon className="w-4 h-4" />
            {categoryName}
          </div>
          {hasDownload && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-[13px] font-medium rounded-md border border-green-200">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Disponivel
            </span>
          )}
        </div>

        {/* Titulo e descricao */}
        <div className="mb-8">
          <h1 className="text-[40px] sm:text-[48px] font-semibold leading-[1.2] text-green-900 tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-[18px] leading-[1.6] text-gray-600 max-w-3xl">
            {description}
          </p>
        </div>

        {/* Estatisticas */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-green-200">
          {plantilla.downloadCount && plantilla.downloadCount > 0 && (
            <div className="flex items-center gap-2">
              <ArrowDownTrayIcon className="w-5 h-5 text-green-400" />
              <span className="text-[14px] text-green-800">
                <strong className="font-semibold text-green-900">{plantilla.downloadCount.toLocaleString('pt-BR')}+</strong> Downloads
              </span>
            </div>
          )}
          {publishedDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-green-400" />
              <span className="text-[14px] text-green-800">
                Publicado: <strong className="font-medium text-green-900">{publishedDate}</strong>
              </span>
            </div>
          )}
          {updatedDate && updatedDate !== publishedDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-green-400" />
              <span className="text-[14px] text-green-800">
                Atualizado: <strong className="font-medium text-green-900">{updatedDate}</strong>
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4">
          {hasDownload ? (
            <a
              href={plantilla.excelUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-[15px] font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              {downloadButtonText}
            </a>
          ) : (
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-[15px] font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Entre em contato
            </Link>
          )}
        </div>

        {/* Caixa de informacao */}
        {hasDownload && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-[14px] text-green-800 leading-relaxed">
              <strong className="font-medium text-green-900">100% gratuito.</strong> Arquivo XLSX sem macros, com formulas comentadas e dados de exemplo. Pronto para uso imediato.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

// Export PlantillaDownloadButton for use in other components
export function PlantillaDownloadButton({
  plantilla,
  buttonText,
  size = 'md',
  className = ''
}: {
  plantilla: Plantilla
  buttonText: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const downloadUrl = plantilla.excelUrl

  if (!downloadUrl) {
    return null
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-[14px]',
    md: 'px-6 py-3 text-[15px]',
    lg: 'px-8 py-4 text-[16px]'
  }

  return (
    <a
      href={downloadUrl}
      download
      className={`inline-flex items-center gap-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors ${sizeClasses[size]} ${className}`}
    >
      <ArrowDownTrayIcon className="w-5 h-5" />
      {buttonText}
    </a>
  )
}
