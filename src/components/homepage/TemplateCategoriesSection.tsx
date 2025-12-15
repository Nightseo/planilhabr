/**
 * TemplateCategoriesSection Component
 * Categories with subtle animations for PlanilhaBR
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  BanknotesIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  BoltIcon,
  MegaphoneIcon,
  CalculatorIcon,
  TruckIcon,
  CheckBadgeIcon,
  ShoppingCartIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { getAllCategories } from '@/data/categories'

interface TemplateCategoriesSectionProps {
  totalModels: number
}

const iconMap: Record<string, any> = {
  financeiro: BanknotesIcon,
  estoque: ArchiveBoxIcon,
  vendas: ChartBarIcon,
  rh: UsersIcon,
  projetos: ClipboardDocumentCheckIcon,
  produtividade: BoltIcon,
  marketing: MegaphoneIcon,
  contabilidade: CalculatorIcon,
  logistica: TruckIcon,
  qualidade: CheckBadgeIcon,
  compras: ShoppingCartIcon,
  administracao: BuildingOfficeIcon
}

export default function TemplateCategoriesSection({ totalModels }: TemplateCategoriesSectionProps) {
  const [isVisible, setIsVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const categories = getAllCategories()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="templates" className="border-b border-green-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
        <div className={`mb-16 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="text-[36px] font-semibold text-green-900 mb-3 leading-[1.2]">
            Categorias de Planilhas
          </h2>
          <p className="text-[18px] text-gray-600 leading-[1.6]">
            {totalModels}+ planilhas organizadas por area de atuacao. Encontre rapidamente o modelo ideal para
            controle financeiro, gestao de estoque, recursos humanos, vendas e muito mais.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const Icon = iconMap[category.id] || BuildingOfficeIcon
            return (
              <Link
                key={category.id}
                href={`/${category.slug}/`}
                className={`group block p-6 border border-green-200 rounded-2xl bg-white hover:border-green-600 hover:shadow-soft-md transition-all duration-300 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 40 + 200}ms` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold text-green-900 group-hover:text-green-700 transition-colors duration-150">
                      {category.name}
                    </h3>
                    <p className="text-[13px] text-green-800 font-medium">
                      Planilhas Excel
                    </p>
                  </div>
                </div>
                <p className="text-[15px] text-gray-600 leading-[1.5]">
                  {category.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(12px);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: slide-up 0.4s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: slide-up 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
