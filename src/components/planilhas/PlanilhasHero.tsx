/**
 * PlanilhasHero Component
 * SEO-optimized hero for templates listing page
 */

'use client'

export default function PlanilhasHero({ totalTemplates }: { totalTemplates: number }) {
  return (
    <section className="relative border-b border-green-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-[40px] sm:text-[48px] font-semibold leading-[1.2] text-green-900 tracking-tight mb-4">
            Biblioteca de Planilhas Excel
          </h1>
          <p className="text-[20px] leading-[1.6] text-gray-600 mb-4 font-medium">
            {totalTemplates} planilhas profissionais para controle financeiro, gestao de estoque, recursos humanos, vendas e muito mais - desenvolvidas por especialistas brasileiros.
          </p>
          <p className="text-[16px] leading-[1.6] text-gray-600">
            Todas as planilhas sao gratuitas, sem macros, com formulas documentadas e prontas para uso imediato.
            Compativeis com Microsoft Excel, Google Sheets e LibreOffice.
          </p>
        </div>
      </div>
    </section>
  )
}
