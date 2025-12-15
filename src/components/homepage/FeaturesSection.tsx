/**
 * FeaturesSection Component
 * Features section with E-E-A-T trust signals for PlanilhaBR
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { SparklesIcon, BoltIcon, ShieldCheckIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: SparklesIcon,
      title: 'Criadas por Especialistas',
      desc: 'Planilhas desenvolvidas por contadores, administradores e especialistas em gestao com experiencia real em empresas brasileiras de todos os portes.'
    },
    {
      icon: BoltIcon,
      title: 'Prontas para Uso Imediato',
      desc: 'Todas as planilhas vem com formulas pre-configuradas, instrucoes em portugues e exemplos praticos. E so baixar, preencher e comecar a usar.'
    },
    {
      icon: ShieldCheckIcon,
      title: '100% Gratuitas e Seguras',
      desc: 'Sem macros suspeitas, sem virus, sem cadastro obrigatorio. Arquivos limpos em formato .xlsx compativeis com Excel, Google Sheets e LibreOffice.'
    },
    {
      icon: CheckBadgeIcon,
      title: 'Atualizadas Regularmente',
      desc: 'Mantemos nossas planilhas atualizadas com as melhores praticas de gestao e mudancas na legislacao brasileira. Versoes novas todo mes.'
    }
  ]

  return (
    <section ref={sectionRef} className="border-b border-green-200 bg-green-50">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`}>
          <h2 className="text-[36px] font-semibold text-green-900 mb-3 leading-[1.2]">
            Por que escolher a PlanilhaBR?
          </h2>
          <p className="text-[18px] text-gray-600 leading-[1.6]">
            Milhares de empresas e profissionais brasileiros ja confiam em nossas planilhas para organizar financas, estoque e operacoes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group p-6 bg-white border border-green-200 rounded-md hover:border-green-600 hover:shadow-md transition-all duration-700 ${
                  isVisible ? 'translate-y-0' : 'translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <Icon className="w-6 h-6 text-gray-600 mb-4" />
                <h3 className="text-[18px] font-semibold text-green-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-gray-600 leading-[1.6]">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust badges */}
        <div className={`mt-12 flex flex-wrap justify-center gap-8 items-center transition-all duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
          <div className="text-center">
            <div className="text-[28px] font-bold text-green-800">126+</div>
            <div className="text-[13px] text-gray-600">Planilhas Disponiveis</div>
          </div>
          <div className="w-px h-10 bg-green-200" />
          <div className="text-center">
            <div className="text-[28px] font-bold text-green-800">50.000+</div>
            <div className="text-[13px] text-gray-600">Downloads Realizados</div>
          </div>
          <div className="w-px h-10 bg-green-200" />
          <div className="text-center">
            <div className="text-[28px] font-bold text-green-800">4.8/5</div>
            <div className="text-[13px] text-gray-600">Avaliacao dos Usuarios</div>
          </div>
          <div className="w-px h-10 bg-green-200" />
          <div className="text-center">
            <div className="text-[28px] font-bold text-green-800">100%</div>
            <div className="text-[13px] text-gray-600">Gratuito</div>
          </div>
        </div>
      </div>
    </section>
  )
}
