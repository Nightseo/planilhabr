/**
 * TableOfContents Component
 * Clean, minimalist navigation with smooth scrolling
 */

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { PlantillaDownloadButton } from '@/components/plantilla/PlantillaHero'
import type { Plantilla } from '@/types'

// ===============================
// TYPES
// ===============================

export interface TableOfContentsSection {
  readonly id: string
  readonly title: string
}

export interface TableOfContentsProps {
  sections: readonly TableOfContentsSection[]
  plantilla?: Plantilla
  className?: string
  sticky?: boolean
  showDownloadButton?: boolean
}

// ===============================
// HOOK PARA SECCIÓN ACTIVA
// ===============================

const useActiveSection = (sectionIds: readonly string[]) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first section that's intersecting
        const visibleSection = entries.find(entry => entry.isIntersecting)
        if (visibleSection) {
          setActiveId(visibleSection.target.id)
        }
      },
      {
        rootMargin: '-20% 0px -35% 0px', // Trigger when section is roughly in center
        threshold: 0.1
      }
    )

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

// ===============================
// SECTION LINK COMPONENT
// ===============================

const SectionLink: React.FC<{
  section: TableOfContentsSection
  isActive: boolean
  onClick: (id: string) => void
}> = ({ section, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(section.id)}
      className={cn(
        'block w-full text-left text-[13px] transition-all duration-150',
        'py-2 px-3 border-l-2 border-transparent rounded-r-md',
        'hover:text-green-600 hover:bg-green-50 hover:border-green-600',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
        isActive
          ? 'text-green-600 bg-green-50 border-green-600 font-medium'
          : 'text-green-700 font-normal'
      )}
    >
      {section.title}
    </button>
  )
}

// ===============================
// MAIN COMPONENT
// ===============================

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  plantilla,
  className,
  sticky = true,
  showDownloadButton = true
}) => {
  const sectionIds = sections.map(s => s.id)
  const activeSection = useActiveSection(sectionIds)

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  if (sections.length === 0) {
    return null
  }

  return (
    <div className={cn(sticky && 'sticky top-24', className)}>
      <div className="bg-white border border-green-200 rounded-md p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-green-200">
          <DocumentTextIcon className="w-5 h-5 text-green-400" />
          <h3 className="text-[14px] font-semibold text-green-900">
            Indice
          </h3>
        </div>

        {/* Navigation */}
        <nav
          className="space-y-1"
          aria-label="Indice"
        >
          {sections.map((section, index) => (
            <SectionLink
              key={section.id || `toc-section-${index}`}
              section={section}
              isActive={activeSection === section.id}
              onClick={scrollToSection}
            />
          ))}
        </nav>

        {/* Download Button */}
        {showDownloadButton && plantilla && (
          <div className="mt-5 pt-5 border-t border-green-200">
            <PlantillaDownloadButton
              plantilla={plantilla}
              buttonText={plantilla.texts?.downloadButton || 'Baixar gratis'}
              size="sm"
              className="w-full justify-center"
            />
            <div className="mt-3 bg-green-50 border border-green-100 rounded-md px-3 py-2">
              <p className="text-[11px] text-green-700 text-center font-medium">
                Download imediato e gratuito
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ===============================
// EXPORTS
// ===============================

export type { TableOfContentsProps, TableOfContentsSection }