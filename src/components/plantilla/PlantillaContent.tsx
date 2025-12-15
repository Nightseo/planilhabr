/**
 * PlantillaContent Component
 * Clean, minimalist content sections with optional sidebar
 */

import React from 'react'
import Link from 'next/link'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { TableOfContents, type TableOfContentsSection } from '@/components/ui/TableOfContents'
import type { Plantilla } from '@/types'

// ===============================
// TYPES
// ===============================

export interface ContentSection {
  readonly id: string
  readonly title: string
  readonly content: string
}

export interface PlantillaContentProps {
  sections: readonly ContentSection[]
  plantilla?: Plantilla
  className?: string
  showTableOfContents?: boolean
  maxWidth?: 'default' | 'wide' | 'full'
}

export interface ContentSectionProps {
  section: ContentSection
  index: number
  className?: string
}

// ===============================
// CONTENT SECTION COMPONENT
// ===============================

const ContentSectionComponent: React.FC<ContentSectionProps> = ({
  section,
  index,
  className
}) => {
  return (
    <div
      className={cn('mb-8 rounded-md bg-white border border-green-200 p-6', className)}
      id={section.id}
    >
      <div className="border-l-2 border-green-600 pl-4 mb-6">
        <h2
          className="text-[24px] font-semibold text-green-900"
          tabIndex={-1}
        >
          {section.title}
        </h2>
      </div>

      <div
        className="prose prose-green max-w-none text-[15px] text-green-800 leading-[1.7] [&>p]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc [&>ol]:ml-6 [&>ol]:list-decimal [&>h3]:font-semibold [&>h3]:text-green-900 [&>h3]:text-[18px] [&>h3]:mt-6 [&>h3]:mb-3 [&>strong]:text-green-900 [&>strong]:font-semibold"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  )
}

// ===============================
// PREVIEW COMPONENT
// ===============================

export const PlantillaPreview: React.FC<{
  plantilla: Plantilla
  className?: string
}> = ({ plantilla, className }) => {
  const downloadUrl = plantilla.excelUrl

  if (!downloadUrl) {
    return (
      <section
        className={cn('py-16 bg-green-50 border-t border-green-200', className)}
        aria-labelledby="preview-heading"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="rounded-md border border-dashed border-green-300 bg-white p-10">
            <DocumentTextIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-600 mb-3">
              Em breve
            </p>
            <h2 className="text-[28px] font-semibold text-green-900 mb-3">
              Pre-visualizacao ainda nao disponivel
            </h2>
            <p className="text-[15px] text-gray-600 mb-6">
              Esta planilha esta em producao. Vote na lista de palavras-chave para priorizarmos a pre-visualizacao.
            </p>
            <Link
              href="/keywords"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-[14px] font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Ver pipeline de planilhas
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Obter dominio atual dinamicamente
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.planilhabr.com'
  const previewUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(baseUrl + downloadUrl)}`

  return (
    <section
      className={cn('py-16 bg-green-50 border-t border-green-200', className)}
      aria-labelledby="preview-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h2
            id="preview-heading"
            className="text-[28px] font-semibold text-green-900 mb-2"
          >
            Pre-visualizacao Interativa
          </h2>
          <p className="text-[15px] text-green-800">
            Visualize o arquivo Excel em uma visualizacao segura do Office antes de baixar.
          </p>
        </div>

        <div className="bg-white border border-green-200 p-4 rounded-md">
          <div className="bg-green-50 border border-green-200 overflow-hidden rounded-md">
            <iframe
              src={previewUrl}
              width="100%"
              height="700"
              frameBorder="0"
              loading="lazy"
              className="w-full h-96 md:h-[700px]"
              title={`Pre-visualizacao de ${plantilla.title}`}
              aria-label={`Pre-visualizacao interativa da planilha Excel ${plantilla.title}`}
            />
          </div>

          <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded-md">
            <p className="text-[13px] font-semibold text-green-900 mb-1">
              Pre-visualizacao completa e interativa
            </p>
            <p className="text-[12px] text-green-700">
              Navegue entre as abas, verifique as formulas e certifique-se de que a planilha atende as suas necessidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===============================
// MAIN CONTENT COMPONENT
// ===============================

export const PlantillaContent: React.FC<PlantillaContentProps> = ({
  sections,
  plantilla,
  className,
  showTableOfContents = true,
  maxWidth = 'default'
}) => {
  if (sections.length === 0) {
    return null
  }

  const tableOfContentsSections: TableOfContentsSection[] = sections.map(section => ({
    id: section.id,
    title: section.title
  }))

  const containerClasses = {
    default: 'max-w-5xl',
    wide: 'max-w-6xl',
    full: 'max-w-full'
  }

  return (
    <section
      className={cn('py-16 bg-white border-t border-green-200', className)}
      aria-labelledby="content-heading"
    >
      <div className={cn('mx-auto px-6', containerClasses[maxWidth])}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Conteudo Principal */}
          <div className="lg:w-2/3">
            <div className="sr-only">
              <h2 id="content-heading">Conteudo principal da planilha Excel</h2>
            </div>

            {sections.map((section, index) => (
              <ContentSectionComponent
                key={section.id || `content-section-${index}`}
                section={section}
                index={index}
              />
            ))}
          </div>

          {/* Sidebar */}
          {showTableOfContents && (
            <div className="lg:w-1/3">
              <TableOfContents
                sections={tableOfContentsSections}
                plantilla={plantilla}
                sticky={true}
                showDownloadButton={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ===============================
// FINAL CTA COMPONENT
// ===============================

export const PlantillaCTA: React.FC<{
  plantilla: Plantilla
  className?: string
}> = ({ plantilla, className }) => {
  const downloadUrl = plantilla.excelUrl
  if (!downloadUrl) {
    return null
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Atual';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return 'Atual'
    }
  }

  const featureHighlights = (plantilla.features || [])
    .map(feature => feature?.replace(/^[-•\s]+/, '')?.trim())
    .filter(Boolean)
    .slice(0, 3)

  const descriptionHighlights = (plantilla.description || '')
    .split(/[\n\.]+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 25)
    .slice(0, 3 - featureHighlights.length)

  const fallbackHighlights = [
    'Celulas de entrada comentadas e valores de exemplo',
    'Compativel com Excel, LibreOffice e Google Sheets',
    'Download gratuito sem cadastro'
  ]

  const displayHighlights = [...featureHighlights, ...descriptionHighlights]
  while (displayHighlights.length < 3) {
    displayHighlights.push(fallbackHighlights[displayHighlights.length % fallbackHighlights.length])
  }

  const supportingCopy = plantilla.briefDescription || descriptionHighlights[0] || plantilla.description || 'Baixe o arquivo, ajuste as celulas de entrada e comece a usar imediatamente.'

  const stats = [
    {
      label: 'Ultima atualizacao',
      value: formatDate(plantilla.updatedAt)
    },
    {
      label: 'Downloads',
      value: plantilla.downloadCount ? `${plantilla.downloadCount.toLocaleString('pt-BR')}+` : 'Novo'
    },
    {
      label: 'Formato',
      value: 'XLSX sem macros'
    }
  ]

  return (
    <section
      className={cn('bg-white border-t border-green-200 py-16', className)}
      id="cta-final"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* CTA Principal */}
        <div className="text-center mb-8">
          <h2
            id="cta-heading"
            className="text-[32px] font-semibold text-green-900 mb-4"
          >
            Baixe agora gratuitamente
          </h2>
          <p className="text-[16px] text-gray-600 max-w-2xl mx-auto mb-8">
            Tenha acesso imediato a esta planilha Excel profissional.
            Sem necessidade de cadastro.
          </p>
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-[15px] font-medium rounded-md hover:bg-green-700 transition-colors"
            title={`Baixar ${plantilla.title} gratuitamente`}
          >
            Baixar planilha Excel
          </a>
        </div>

        {/* Grid de Informacoes */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-green-50 rounded-md border border-green-200">
            <p className="text-[13px] text-gray-600 mb-1">Formato</p>
            <p className="text-[15px] font-semibold text-green-900">XLSX sem macros</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-md border border-green-200">
            <p className="text-[13px] text-gray-600 mb-1">Compatibilidade</p>
            <p className="text-[15px] font-semibold text-green-900">Excel, LibreOffice e Sheets</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-md border border-green-200">
            <p className="text-[13px] text-gray-600 mb-1">Downloads</p>
            <p className="text-[15px] font-semibold text-green-900">
              {plantilla.downloadCount ? `${plantilla.downloadCount.toLocaleString('pt-BR')}+` : 'Novo'}
            </p>
          </div>
        </div>

        {/* Lista de Recursos */}
        <div className="bg-green-50 border border-green-100 rounded-md p-6">
          <p className="text-[13px] font-semibold text-green-900 mb-4 text-center">
            O que voce recebe:
          </p>
          <ul className="grid md:grid-cols-2 gap-3 text-[14px] text-green-800">
            {displayHighlights.map((highlight, index) => (
              <li key={`${highlight}-${index}`} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Link de Suporte */}
        <div className="text-center mt-8">
          <p className="text-[14px] text-gray-600 mb-3">
            Tem alguma duvida sobre esta planilha?
          </p>
          <Link
            href="/contato/"
            className="text-[14px] font-medium text-green-600 hover:text-green-700 hover:underline transition-colors"
          >
            Entre em contato
          </Link>
        </div>
      </div>
    </section>
  )
}

// ===============================
// EXPORTE
// ===============================

export type { PlantillaContentProps, ContentSection }
