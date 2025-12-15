/**
 * HowItWorksSection Component
 * Simple 3-step process section for PlanilhaBR
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownTrayIcon, PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function HowItWorksSection() {
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

  const steps = [
    {
      number: '01',
      icon: ArrowDownTrayIcon,
      title: 'Escolha sua planilha',
      desc: 'Navegue por nossas categorias e encontre a planilha ideal para sua necessidade. Temos opcoes para financas, estoque, RH, vendas e muito mais.'
    },
    {
      number: '02',
      icon: PencilSquareIcon,
      title: 'Baixe gratuitamente',
      desc: 'Clique em "Baixar" e pronto! O arquivo .xlsx sera baixado direto para seu computador. Sem cadastro, sem email, sem complicacao.'
    },
    {
      number: '03',
      icon: CheckCircleIcon,
      title: 'Personalize e use',
      desc: 'Abra no Excel, Google Sheets ou LibreOffice. Adapte as colunas, cores e formulas conforme sua necessidade. Comece a organizar seu negocio!'
    }
  ]

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-green-950 via-green-900 to-green-900">
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`}>
          <h2 className="text-[36px] font-semibold text-white mb-3 leading-[1.2]">
            Como funciona?
          </h2>
          <p className="text-[18px] text-green-400 leading-[1.6]">
            Em tres passos simples, voce tera uma planilha profissional pronta para usar na sua empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`text-center transition-all duration-700 ${
                  isVisible ? 'translate-y-0' : 'translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600/90 mb-6 shadow-soft-lg shadow-green-900/30">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-[13px] font-mono text-green-300 mb-3">{step.number}</div>
                <h3 className="text-[20px] font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] text-green-400 leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust indicator */}
        <div className={`mt-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`} style={{ transitionDelay: '700ms' }}>
          <p className="text-[14px] text-green-200">
            Mais de <span className="text-green-300 font-semibold">50.000 empresarios e profissionais</span> ja baixaram nossas planilhas
          </p>
        </div>
      </div>
    </section>
  )
}
