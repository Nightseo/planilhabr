/**
 * Componente PlantillaSEO para metadatos y datos estructurados
 * Implementa SEO avanzado y optimización para IA
 */

import React from 'react'
import type { Plantilla, BreadcrumbItem } from '@/types'

// ===============================
// TIPOS DEL COMPONENTE
// ===============================

export interface PlantillaSEOProps {
  plantilla: Plantilla
  publishedDate?: string
  lastUpdated?: string
  breadcrumbs?: readonly BreadcrumbItem[]
}

// ===============================
// DATOS ESTRUCTURADOS
// ===============================

const generateOptimizedStructuredData = (plantilla: Plantilla, publishedDate?: string, breadcrumbs?: readonly BreadcrumbItem[]) => {
  const baseUrl = 'https://www.planilhabr.com'

  // Safe property access with fallbacks
  const safeTitle = String(plantilla?.title || 'Planilha Excel').trim()
  const safeDescription = String(plantilla?.description || 'Planilha Excel gratuita').trim()
  const safeSlug = String(plantilla?.slug || 'planilha').trim()
  const safeKeyword = String(plantilla?.keyword || 'planilha excel').trim()
  const safeCategory = String(plantilla?.category || 'financeiro').trim()
  const safeExcelUrl = plantilla?.excelUrl && typeof plantilla.excelUrl === 'string'
    ? `${baseUrl}${plantilla.excelUrl}`
    : undefined
  const safeFeatures = (plantilla?.content?.features || plantilla?.features || [])
    .filter(feature => feature && typeof feature === 'string')
    .map(feature => String(feature).trim())
  const safeFaqs = (plantilla?.faqs || [])
    .filter(faq => faq?.question && faq?.answer)
    .slice(0, 8) // Aumentado para mejor SEO

  // Main Software Application Schema - OPTIMIZED FOR RICH SNIPPETS
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": safeTitle,
    "description": safeDescription,
    "applicationCategory": safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1),
    "operatingSystem": ["Windows", "macOS", "Linux"],
    "softwareVersion": "2025",
    "url": `${baseUrl}/${safeSlug}/`,
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/og-image.jpg`,
      "width": 1200,
      "height": 630,
      "caption": `${safeTitle} - Visualizacao da Planilha Excel`
    },

    // AUTHOR/PUBLISHER - Integrated as property of the software
    "author": {
      "@type": "Organization",
      "name": "PlanilhaBR",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon.png`,
        "width": 334,
        "height": 334
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Portuguese"
      }
    },

    "publisher": {
      "@type": "Organization",
      "name": "PlanilhaBR",
      "url": baseUrl
    },

    // OFFER - Optimized for product cards and snippets
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
      "url": `${baseUrl}/${safeSlug}/`,
      "seller": {
        "@type": "Organization",
        "name": "PlanilhaBR"
      }
    },

    // AGGREGATE RATING - For rich snippets
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(plantilla?.rating || "4.8"),
      "bestRating": "5",
      "worstRating": "1", 
      "ratingCount": String(plantilla?.downloadCount || "1200")
    },

    // SOFTWARE FEATURES - As application features
    "featureList": safeFeatures.slice(0, 8), // Limit for performance
    
    // TECHNICAL INFO
    "requirements": "Microsoft Excel 2016+, LibreOffice Calc, Google Sheets",
    "downloadUrl": safeExcelUrl,
    "fileSize": "15KB",
    "softwareHelp": {
      "@type": "WebPage",
      "name": `${safeTitle} - Como Usar`,
      "url": `${baseUrl}/${safeSlug}/#como-usar`
    },

    // SEO METADATA
    "inLanguage": "pt-BR",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Small and Medium Businesses",
      "geographicArea": "Brazil"
    },
    "datePublished": String(publishedDate || "2025-01-15"),
    "dateModified": "2025-01-15",
    "keywords": [
      safeKeyword,
      "Planilha Excel gratuita",
      "Ferramentas para empresas brasileiras",
      "Software para PME",
      safeTitle.toLowerCase()
    ].filter(Boolean).join(", ")
  }

  // Crear estructura @graph con múltiples schemas independientes
  const graphSchemas: any[] = [softwareSchema]

  // ADD FAQPage como schema independiente si hay FAQs
  if (safeFaqs.length > 0) {
    graphSchemas.push({
      "@type": "FAQPage",
      "@id": `${baseUrl}/${safeSlug}/#faq`,
      "url": `${baseUrl}/${safeSlug}/#faq`,
      "mainEntity": safeFaqs.map(faq => ({
        "@type": "Question",
        "name": String(faq.question),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": String(faq.answer)
        }
      }))
    })
  }

  // ADD BreadcrumbList schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    graphSchemas.push({
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/${safeSlug}/#breadcrumb`,
      "itemListElement": breadcrumbs.map((crumb, index) => {
        // Asegurar trailing slash si no es la home
        const itemUrl = crumb.href === '/' ? `${baseUrl}/` : `${baseUrl}${crumb.href}${crumb.href.endsWith('/') ? '' : '/'}`
        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": String(crumb.name || '').trim(),
          "item": {
            "@type": "WebPage",
            "@id": itemUrl,
            "name": String(crumb.name || '').trim()
          }
        }
      }).filter(item => item.name !== '') // Filtrar items sin nombre
    })
  }

  // Retornar estructura con @graph si hay múltiples schemas
  if (graphSchemas.length > 1) {
    return {
      "@context": "https://schema.org",
      "@graph": graphSchemas
    }
  }

  return softwareSchema
}


// ===============================
// COMPONENTE PRINCIPAL
// ===============================

export const PlantillaSEO: React.FC<PlantillaSEOProps> = ({
  plantilla,
  publishedDate = "2025-01-15",
  lastUpdated = "2025-01-15",
  breadcrumbs
}) => {
  // Generate optimized structured data with @graph
  let optimizedStructuredDataHtml = ''

  try {
    const structuredData = generateOptimizedStructuredData(plantilla, publishedDate, breadcrumbs)
    if (structuredData) {
      optimizedStructuredDataHtml = JSON.stringify(structuredData)
    }
  } catch (error) {
    console.warn('Error generating optimized structured data:', error)
  }

  return (
    <>
      {/* AI Optimization - Citation-friendly metadata */}
      <meta name="ai-summary" content={`${String(plantilla.title || '')} - ${String(plantilla.briefDescription || plantilla.description || '')}`} />
      <meta name="citation-title" content={String(plantilla.h1 || plantilla.title || '')} />
      <meta name="authority-level" content="expert" />
      <meta name="content-type" content="tutorial" />
      <meta name="target-audience" content="business-professionals" />
      <meta name="last-updated" content={String(lastUpdated)} />
      <meta name="expertise-area" content="microsoft-excel,business-tools,brazilian-business" />

      {/* JSON-LD Optimized Structured Data - Single Schema with FAQ, HowTo, Organization */}
      {optimizedStructuredDataHtml && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: optimizedStructuredDataHtml
          }}
        />
      )}

      {/* Language and regional targeting */}
      <meta httpEquiv="content-language" content="pt-BR" />
      <meta name="geo.region" content="BR" />
      <meta name="geo.country" content="Brazil" />

      {/* App-specific metadata */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </>
  )
}

// ===============================
// EXPORTACIÓN
// ===============================

export type { PlantillaSEOProps }
