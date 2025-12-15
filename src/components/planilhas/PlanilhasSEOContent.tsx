/**
 * PlanilhasSEOContent Component
 * SEO-optimized content section for ranking "planilhas excel gratuitas"
 */

'use client'

import { CheckCircleIcon, DocumentTextIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function PlanilhasSEOContent() {
  const benefits = [
    {
      icon: CheckCircleIcon,
      title: '100% Gratuitas',
      description: 'Baixe, use e compartilhe todas as planilhas sem nenhum custo. Sem cadastro, sem publicidade invasiva, sem custos escondidos.'
    },
    {
      icon: ClockIcon,
      title: 'Prontas para Uso',
      description: 'Planilhas com formulas pre-configuradas, exemplos praticos e instrucoes claras. Comece a usar em minutos.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Feitas por Especialistas',
      description: 'Desenvolvidas por contadores, administradores e especialistas em gestao com experiencia real em empresas brasileiras.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Seguras e Confiaveis',
      description: 'Sem macros, sem virus, sem codigo executavel. Formulas visiveis e documentadas - perfeito para auditorias e compliance.'
    }
  ]

  return (
    <div className="bg-green-50 border-t border-green-200">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Why use our templates */}
        <div className="mb-20">
          <h2 className="text-[32px] font-semibold text-green-900 mb-4">
            Por que escolher as planilhas da PlanilhaBR?
          </h2>
          <p className="text-[16px] leading-[1.8] text-gray-600 mb-12 max-w-3xl">
            Nossas planilhas sao desenvolvidas pensando nas necessidades reais de empresas brasileiras.
            Cada modelo e testado, documentado e otimizado para facilitar sua gestao empresarial.
          </p>

          {/* Benefits grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex gap-4 p-6 bg-white border border-green-200 rounded-md">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-green-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-green-800">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Types of templates */}
        <div className="mb-20">
          <h2 className="text-[32px] font-semibold text-green-900 mb-4">
            Quais planilhas voce encontra aqui?
          </h2>
          <div className="prose prose-green max-w-none">
            <p className="text-[16px] leading-[1.8] text-gray-600 mb-6">
              Nossa biblioteca inclui planilhas para todas as areas de gestao empresarial:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-[18px] font-semibold text-green-900 mb-3">Financeiro e Contabil</h3>
                <ul className="space-y-2 text-[15px] text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">-</span>
                    <span>Fluxo de caixa, controle de despesas, orcamento empresarial e contas a pagar/receber</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">-</span>
                    <span>DRE, balanco patrimonial, livro caixa e controle fiscal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">-</span>
                    <span>Calculadoras de juros, emprestimos e investimentos</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-green-900 mb-3">Operacional e RH</h3>
                <ul className="space-y-2 text-[15px] text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">-</span>
                    <span>Controle de estoque, inventario, entrada e saida de produtos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">-</span>
                    <span>Folha de pagamento, controle de ferias, banco de horas e ponto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">-</span>
                    <span>Gestao de projetos, cronogramas, Gantt e acompanhamento de tarefas</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-[16px] leading-[1.8] text-green-800">
              Todas as planilhas seguem as melhores praticas de gestao e sao adaptadas para a realidade brasileira.
            </p>
          </div>
        </div>

        {/* How to use */}
        <div className="bg-white border border-green-200 rounded-md p-8">
          <h2 className="text-[28px] font-semibold text-green-900 mb-4">
            Como usar nossas planilhas
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-[14px] font-semibold">
                1
              </span>
              <div>
                <h3 className="text-[16px] font-semibold text-green-900 mb-1">Escolha sua planilha</h3>
                <p className="text-[15px] text-green-800">
                  Navegue por categorias ou use a busca para encontrar a planilha ideal para sua necessidade.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-[14px] font-semibold">
                2
              </span>
              <div>
                <h3 className="text-[16px] font-semibold text-green-900 mb-1">Baixe gratuitamente</h3>
                <p className="text-[15px] text-green-800">
                  Clique no botao de download. O arquivo .xlsx sera baixado direto no seu computador.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-[14px] font-semibold">
                3
              </span>
              <div>
                <h3 className="text-[16px] font-semibold text-green-900 mb-1">Personalize e use</h3>
                <p className="text-[15px] text-green-800">
                  Abra no Excel, Google Sheets ou LibreOffice. Adapte conforme sua necessidade e comece a organizar seu negocio.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
