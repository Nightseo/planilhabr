/**
 * HeroSection Component
 * Clean, minimalist hero section with subtle gradient effect
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, ShieldCheckIcon, UsersIcon, BanknotesIcon } from '@heroicons/react/24/outline'

interface HeroSectionProps {
  totalModules?: number
  recentTemplates?: {
    slug: string
    title: string
    category?: string
  }[]
}

export default function HeroSection({ totalModules = 0, recentTemplates = [] }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get relative position within the viewport
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const pillars = [
    {
      icon: BanknotesIcon,
      title: 'Controle Financeiro',
      desc: 'Planilhas completas para fluxo de caixa, orcamento, despesas e receitas. Organize suas financas de forma profissional.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Gestao de Estoque',
      desc: 'Controle seu inventario com planilhas de entrada, saida, movimentacao e alertas de reposicao.'
    },
    {
      icon: UsersIcon,
      title: 'Recursos Humanos',
      desc: 'Planilhas para controle de funcionarios, ferias, folha de pagamento e indicadores de RH.'
    }
  ]

  return (
    <section className="relative border-b border-green-200 overflow-hidden bg-gradient-to-b from-white via-green-50 to-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(at ${mousePosition.x * 0.25}px ${mousePosition.y * 0.25}px, rgba(22, 163, 74, 0.15), transparent 45%),
            radial-gradient(at ${100 - mousePosition.x * 0.15}% ${mousePosition.y * 0.1}%, rgba(34, 197, 94, 0.12), transparent 55%),
            linear-gradient(180deg, #f0fdf4 0%, #dcfce7 60%, #ffffff 100%)
          `,
          transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'soft-light'
      }} />

      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-white/80 text-[13px] font-medium text-green-700">
            Planilhas Excel Profissionais · 100% Gratuitas
          </span>
          <h1 className="mt-6 text-[40px] sm:text-[54px] font-semibold leading-[1.15] text-green-900 tracking-tight">
            Planilhas Excel prontas para impulsionar seu negocio.
          </h1>
          <p className="mt-6 text-[18px] leading-[1.6] text-green-800">
            PlanilhaBR oferece planilhas Excel profissionais para controle financeiro, gestao de estoque, RH e muito mais.
            Todas as planilhas sao gratuitas, editaveis e prontas para uso imediato.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
          <Link
            href="/planilhas"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-[16px] font-medium rounded-md hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            Ver todas as planilhas
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Link>
          <Link
            href="#templates"
            className="inline-flex items-center text-[16px] font-medium text-green-700 hover:underline transition-all duration-150"
          >
            Explorar categorias →
          </Link>
        </div>

        {recentTemplates.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-2 text-[14px] font-medium text-gray-600 uppercase tracking-wide mb-3">
              Planilhas Recentes
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {recentTemplates.map(template => (
                <Link
                  key={template.slug}
                  href={`/${template.slug}`}
                  className="group p-5 rounded-xl border border-green-200 bg-white/90 hover:border-green-600 hover:shadow-soft transition-all duration-200"
                >
                  <div className="text-[12px] font-medium text-green-600 uppercase tracking-wide mb-2">
                    {template.category || 'Financeiro'}
                  </div>
                  <div className="text-[16px] font-semibold text-green-900 leading-[1.4] group-hover:text-green-700">
                    {template.title}
                  </div>
                  <p className="text-[13px] text-gray-600 mt-3">
                    Baixar agora →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {pillars.map(pillar => {
            const Icon = pillar.icon
            return (
              <div key={pillar.title} className="p-5 rounded-xl border border-green-200 bg-white/90">
                <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-[17px] font-semibold text-green-900 mb-2">{pillar.title}</h3>
                <p className="text-[14px] text-green-800 leading-[1.6]">{pillar.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
