/**
 * Componente PlantillaTemplate com arquitetura moderna
 * Usa componentes especializados e separacao de responsabilidades
 */

'use client'

import React, { useEffect } from 'react'
import { getCategoryDisplayName } from '@/utils/client-utils'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PlantillaSEO } from '@/components/plantilla/PlantillaSEO'
import { PlantillaHero } from '@/components/plantilla/PlantillaHero'
import { PlantillaFeatures } from '@/components/plantilla/PlantillaFeatures'
import { PlantillaContent, PlantillaPreview, PlantillaCTA } from '@/components/plantilla/PlantillaContent'
import { OpenFAQ } from '@/components/ui/OpenFAQ'
import { RelatedPlantillas } from '@/components/plantilla/RelatedPlantillas'
import type { Plantilla, BreadcrumbItem } from '@/types'

// ===============================
// TIPOS DE COMPONENTES
// ===============================

export interface PlantillaData {
  readonly slug: string
  readonly keyword?: string
  readonly category: string
  readonly title: string
  readonly description: string
  readonly metaTitle?: string
  readonly metaDescription?: string
  readonly h1?: string
  readonly excelUrl?: string
  readonly downloadCount?: number
  readonly rating?: number
  readonly createdAt?: string
  readonly updatedAt?: string
}

export interface PlantillaTemplateProps {
  plantilla: Plantilla
  breadcrumbs: readonly BreadcrumbItem[]
  slug: string
  relatedPlantillas?: readonly PlantillaData[]
  latestPlantillas?: readonly PlantillaData[]
}

// ===============================
// FUNCOES AUXILIARES
// ===============================

const createDynamicSections = (plantilla: Plantilla) => {
  return plantilla.seoContent?.sections || [
    {
      id: 'introduction',
      title: 'O que esta planilha Excel gratuita contem',
      content: `<p>${plantilla.content?.introduction || ''}</p>`
    },
    {
      id: 'how-to-use',
      title: 'Como usar esta planilha para melhorar seu negocio',
      content: `<p>${plantilla.content?.howToUse || ''}</p>`
    },
    {
      id: 'conclusion',
      title: 'Conclusao',
      content: `<p>${plantilla.content?.conclusions || ''}</p>`
    }
  ].filter(section => section.content && section.content !== '<p></p>')
  .map((section, index) => ({
    ...section,
    id: section.id || `section-${index}`
  }))
}

const formatPublishedDate = (plantilla: Plantilla): string | null => {
  if (!plantilla.schema?.datePublished || typeof plantilla.schema.datePublished !== 'string') {
    return null
  }

  try {
    return new Date(plantilla.schema.datePublished).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return String(plantilla.schema.datePublished)
  }
}

const formatUpdatedDate = (plantilla: Plantilla): string | null => {
  if (!plantilla.updatedAt || typeof plantilla.updatedAt !== 'string') {
    return null
  }

  try {
    return new Date(plantilla.updatedAt).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return String(plantilla.updatedAt)
  }
}

// ===============================
// COMPONENTE PRINCIPAL
// ===============================

const PlantillaTemplate = React.memo(function PlantillaTemplate({
  plantilla,
  breadcrumbs,
  slug,
  relatedPlantillas = [],
  latestPlantillas = []
}: PlantillaTemplateProps) {
  // Rolar para o topo ao montar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Processar dados
  const publishedDate = formatPublishedDate(plantilla)
  const updatedDate = formatUpdatedDate(plantilla)
  const dynamicSections = createDynamicSections(plantilla)
  const features = plantilla.features || plantilla.content?.features || plantilla.content?.benefits || []
  const categoryName = getCategoryDisplayName(plantilla.category)
  return (
    <>
      {/* SEO e dados estruturados */}
      <PlantillaSEO
        plantilla={plantilla}
        publishedDate={plantilla.schema?.datePublished as string || new Date().toISOString()}
        lastUpdated={plantilla.updatedAt || new Date().toISOString()}
        breadcrumbs={breadcrumbs}
      />

      {/* Layout da pagina */}
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-green-200">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <Breadcrumb
              items={breadcrumbs}
              maxItems={4}
            />
          </div>
        </div>

        {/* Secao Hero */}
        <PlantillaHero
          plantilla={plantilla}
          slug={slug}
          publishedDate={publishedDate}
          updatedDate={updatedDate}
        />

        {/* Secao de Recursos */}
        {features.length > 0 && (
          <PlantillaFeatures
            features={features}
            title={plantilla.texts?.featuresTitle || 'O que esta planilha contem?'}
            variant="highlighted"
            columns={3}
          />
        )}

        {/* Secao de Preview */}
        <PlantillaPreview plantilla={plantilla} />

        {/* Conteudo Principal */}
        {dynamicSections.length > 0 && (
          <PlantillaContent
            sections={dynamicSections}
            plantilla={plantilla}
            showTableOfContents={true}
          />
        )}

        {/* Secao de FAQ */}
        {plantilla.faqs && plantilla.faqs.length > 0 && (
          <OpenFAQ
            items={plantilla.faqs}
            title={plantilla.texts?.faqsTitle || 'Perguntas Frequentes'}
            variant="highlighted"
          />
        )}

        {/* Secao de Planilhas Relacionadas */}
        {relatedPlantillas.length > 0 && (
          <RelatedPlantillas
            plantillas={relatedPlantillas.map(p => ({ ...p, category: getCategoryDisplayName(p.category) }))}
            title={`Planilhas de ${categoryName} Relacionadas`}
            categoryName={categoryName}
            variant="related"
            maxItems={6}
          />
        )}

        {/* Secao de Planilhas Recentes */}
        {latestPlantillas.length > 0 && (
          <RelatedPlantillas
            plantillas={latestPlantillas.map(p => ({ ...p, category: getCategoryDisplayName(p.category) }))}
            title="Planilhas Excel Mais Recentes"
            variant="latest"
            maxItems={6}
          />
        )}

        {/* CTA Final */}
        <PlantillaCTA plantilla={plantilla} />
      </div>
    </>
  )
});

export default PlantillaTemplate; 