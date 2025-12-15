'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, ChartBarIcon, WalletIcon, ArrowTrendingUpIcon, CpuChipIcon, CheckCircleIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

interface Template {
  slug: string
  title: string
  description: string
  category: string
  rating?: number
}

interface Props {
  featuredTemplates: Template[]
  totalModels: number
}

export default function InteractiveHomepage({ featuredTemplates, totalModels }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const elements = document.querySelectorAll('.fade-in-section')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Animated grain texture */}
      <div className="grain-overlay" />

      {/* Gradient mesh background */}
      <div
        className="gradient-mesh"
        style={{
          background: `
            radial-gradient(at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
            radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
            radial-gradient(at 100% 100%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Mouse-follow spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.12), transparent 40%)`
          }}
        />

        {/* Floating geometric shapes with parallax */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -top-20 -right-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -bottom-20 -left-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-32 lg:py-40 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="max-w-2xl space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-green-200 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-800">Planilhas Excel Profissionais</span>
              </div>

              <h1 className="text-[56px] lg:text-[72px] font-bold leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-[#0A0A0F] to-[#0A0A0F] bg-clip-text text-transparent">
                  Planilhas Excel
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  para Gestao Financeira
                </span>
              </h1>

              <p className="text-xl text-green-800 leading-[1.6] max-w-xl">
                Planilhas profissionais para orcamento, analise de fluxo de caixa e relatorios de KPI.
                Desenvolvidas por controllers e CFOs. Gratuitas e prontas para uso.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/planilhas"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explorar planilhas
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="#templates"
                  className="inline-flex items-center justify-center px-8 py-4 text-green-600 font-semibold hover:text-green-700 transition-colors group"
                >
                  Planilhas populares
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-green-700 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gray-600" />
                  <span>100% gratuito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-gray-600" />
                  <span>Desde 2024</span>
                </div>
              </div>
            </div>

            {/* Right: Floating card preview */}
            <div className="relative lg:block hidden">
              <div
                className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-green-200 p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              >
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Popular
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Orcamento e Previsao</span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl">⭐</span>
                      <span className="text-sm font-bold text-green-900">4.9</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Modelo de Fluxo de Caixa 13 Semanas</h3>
                  <p className="text-green-800 leading-relaxed">
                    Planejamento de fluxo de caixa com atualizacoes automaticas. Perfeito para gestao de liquidez.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">Previsao</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">Tesouraria</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">Liquidez</span>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATE CATEGORIES - Glassmorphism Cards */}
      <section id="templates" className="relative py-32 fade-in-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-green-900 mb-4 relative inline-block">
              Biblioteca de Planilhas
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </h2>
            <p className="text-xl text-green-700 mt-6">
              {totalModels}+ planilhas profissionais para sua gestao financeira
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ChartBarIcon className="w-8 h-8" />, title: 'Modelagem Financeira', desc: 'DCF, Avaliacoes, Previsoes', gradient: 'from-blue-500 to-cyan-500' },
              { icon: <WalletIcon className="w-8 h-8" />, title: 'Planejamento Orcamentario', desc: 'Orcamentos anuais, OPEX/CAPEX', gradient: 'from-purple-500 to-pink-500' },
              { icon: <ArrowTrendingUpIcon className="w-8 h-8" />, title: 'Analise de Fluxo de Caixa', desc: 'Planejamento 13 semanas, Capital de Giro', gradient: 'from-green-500 to-emerald-500' },
              { icon: <ChartBarIcon className="w-8 h-8" />, title: 'Dashboard de KPIs', desc: 'Relatorios Gerenciais, Metricas', gradient: 'from-orange-500 to-red-500' },
              { icon: <CpuChipIcon className="w-8 h-8" />, title: 'Controle de Investimentos', desc: 'Gestao de Portfolio, ROI', gradient: 'from-indigo-500 to-blue-500' },
              { icon: <WalletIcon className="w-8 h-8" />, title: 'Controle de Despesas', desc: 'Custos de Viagem, Comprovantes', gradient: 'from-teal-500 to-cyan-500' }
            ].map((category, index) => (
              <Link
                key={category.title}
                href="/planilhas"
                className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-green-200 p-8 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2 group-hover:text-green-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-green-700 mb-4">{category.desc}</p>
                <div className="flex items-center text-green-800 font-medium group-hover:gap-2 transition-all">
                  <span>Explorar</span>
                  <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
                {/* Border gradient on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-600/20 to-purple-600/20 -z-10 blur-xl" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Remaining sections would continue in a similar fashion... */}

      <style jsx>{`
        .grain-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 50;
        }

        .gradient-mesh {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 0.3s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  )
}
