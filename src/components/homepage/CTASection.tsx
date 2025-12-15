/**
 * CTASection Component
 * Final call-to-action section for PlanilhaBR
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'

interface CTASectionProps {
  totalModels: number
}

export default function CTASection({ totalModels }: CTASectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

  const benefits = [
    'Mais de {totalModels}+ planilhas profissionais',
    '100% gratuitas, sem cadastro',
    'Compativeis com Excel e Google Sheets',
    'Atualizadas regularmente'
  ]

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Gradient background with mouse effect - Brazilian green */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(22, 163, 74, 0.25), transparent 60%),
            linear-gradient(135deg, #14532d 0%, #166534 45%, #15803d 100%)
          `,
          transition: 'background 0.3s ease'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`}>
          <h2 className="text-[40px] sm:text-[48px] font-semibold text-white mb-6 leading-[1.2]">
            Comece a organizar seu negocio hoje mesmo
          </h2>
          <p className="text-[18px] text-green-100 leading-[1.6] mb-8">
            Baixe planilhas Excel profissionais gratuitamente e transforme a gestao da sua empresa.
            Sem complicacao, sem cadastro, sem custos escondidos.
          </p>

          {/* Benefits list */}
          <ul className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-green-100">
                <CheckIcon className="w-5 h-5 text-green-400" />
                <span className="text-[14px]">{benefit.replace('{totalModels}', String(totalModels))}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/planilhas"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 text-[16px] font-semibold rounded-md hover:bg-green-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Ver todas as planilhas
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white text-[16px] font-semibold rounded-md hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
