/**
 * FAQSection Component
 * Frequently asked questions with E-E-A-T signals for PlanilhaBR
 */

'use client'

import { useEffect, useRef, useState } from 'react'

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
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

  const faqs = [
    {
      q: 'As planilhas sao realmente gratuitas?',
      a: 'Sim, 100% gratuitas! Todas as planilhas da PlanilhaBR podem ser baixadas sem nenhum custo. Nao exigimos cadastro, email ou qualquer pagamento. Nosso objetivo e democratizar o acesso a ferramentas de gestao profissionais para empresas brasileiras de todos os tamanhos.'
    },
    {
      q: 'Quem cria as planilhas da PlanilhaBR?',
      a: 'Nossas planilhas sao desenvolvidas por uma equipe de especialistas brasileiros, incluindo contadores registrados no CRC, administradores de empresas, analistas financeiros e especialistas em gestao de projetos. Todos com experiencia pratica em empresas brasileiras.'
    },
    {
      q: 'As planilhas funcionam no Google Sheets?',
      a: 'Sim! Todas as nossas planilhas sao compativeis com Microsoft Excel, Google Sheets e LibreOffice Calc. Os arquivos estao em formato .xlsx, que e universalmente aceito. Basta baixar e abrir no seu aplicativo preferido.'
    },
    {
      q: 'Posso usar as planilhas na minha empresa?',
      a: 'Absolutamente! Nossas planilhas sao livres para uso pessoal e comercial. Voce pode usa-las, adapta-las e personaliza-las para as necessidades especificas da sua empresa. Apenas pedimos que nao as revenda como se fossem suas.'
    },
    {
      q: 'As planilhas tem macros ou virus?',
      a: 'Nao! Nenhuma de nossas planilhas contem macros, scripts ou qualquer codigo executavel. Sao arquivos .xlsx puros com apenas formulas e formatacao. Isso garante total seguranca e compatibilidade com qualquer versao do Excel.'
    },
    {
      q: 'Como posso solicitar uma planilha especifica?',
      a: 'Adoramos ouvir sugestoes! Entre em contato conosco atraves da pagina de contato com sua solicitacao. Nossa equipe analisa todas as sugestoes e prioriza as mais pedidas para desenvolvimento. Planilhas novas sao adicionadas regularmente.'
    }
  ]

  return (
    <section ref={sectionRef} className="border-b border-green-200 bg-green-50">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-4'}`}>
          <h2 className="text-[36px] font-semibold text-green-900 mb-3 leading-[1.2]">
            Perguntas Frequentes
          </h2>
          <p className="text-[18px] text-gray-600 leading-[1.6]">
            Tire suas duvidas sobre nossas planilhas e como elas podem ajudar seu negocio.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border border-green-200 rounded-md overflow-hidden transition-all duration-700 ${
                isVisible ? 'translate-y-0' : 'translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-green-50 transition-colors"
              >
                <span className="text-[18px] font-semibold text-green-900 pr-8">
                  {faq.q}
                </span>
                <span className="text-green-400 flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-[16px] text-green-800 leading-[1.6]">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </section>
  )
}
