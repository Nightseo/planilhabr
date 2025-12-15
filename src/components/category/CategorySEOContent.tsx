/**
 * CategorySEOContent Component
 * SEO-optimized content for category pages with green theme
 */

'use client'

import { CheckCircleIcon, SparklesIcon, DocumentCheckIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

interface CategorySEOContentProps {
  categoryName: string
  focusPoints: string[]
}

export default function CategorySEOContent({ categoryName, focusPoints }: CategorySEOContentProps) {
  const features = [
    {
      icon: DocumentCheckIcon,
      title: 'Pronto para auditoria',
      description: 'Cada planilha inclui notas de aprovacao, campos de comentarios e somas de verificacao para auditorias.'
    },
    {
      icon: SparklesIcon,
      title: 'Pronto para uso',
      description: 'Registros, indicadores e relatorios pre-definidos economizam tempo de configuracao para equipes de gestao.'
    },
    {
      icon: AdjustmentsHorizontalIcon,
      title: 'Facil de adaptar',
      description: 'Sem macros, formulas claras - para que equipes de controladoria e gestao possam fazer ajustes rapidamente.'
    }
  ]

  return (
    <div className="bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* O que esta incluido */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
              O que nossas planilhas de {categoryName} oferecem?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada categoria reune planilhas Excel desenvolvidas com base em necessidades reais de empresas e profissionais brasileiros.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-green-200 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pontos focais - UNICO POR CATEGORIA */}
          {focusPoints.length > 0 && (
            <div className="bg-white border border-green-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900">
                  Destaques exclusivos de {categoryName}
                </h3>
              </div>
              <ul className="space-y-4">
                {focusPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    </span>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Por que nos escolher */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
              Por que escolher PlanilhaBR para {categoryName}?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossas planilhas sao desenvolvidas com base nas melhores praticas do mercado brasileiro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">👥</span>
                </span>
                Para quem e indicado?
              </h3>
              <ul className="space-y-3">
                {[
                  'Gestores, diretores e coordenadores',
                  'Profissionais autonomos e MEIs',
                  'Pequenas e medias empresas',
                  'Consultores e contadores'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">📦</span>
                </span>
                O que voce recebe
              </h3>
              <ul className="space-y-3">
                {[
                  'Planilhas Excel profissionais sem macros',
                  'Formulas comentadas e dependencias claras',
                  'Dados de exemplo e cenarios com indicadores',
                  'Compativel com Excel, LibreOffice e Google Sheets'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
