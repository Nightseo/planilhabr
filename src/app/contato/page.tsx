import type { Metadata } from 'next'
import Link from 'next/link'
import { EnvelopeIcon, ClockIcon, UserGroupIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Contato - PlanilhaBR.com | Fale com Nossa Equipe',
  description: 'Entre em contato com a equipe PlanilhaBR. Suporte para planilhas Excel, sugestoes de novas planilhas e duvidas. Resposta em ate 24 horas uteis.',
  keywords: 'contato planilhabr, suporte planilhas excel, ajuda planilhas, duvidas excel brasil',
  openGraph: {
    title: 'Contato - PlanilhaBR | Suporte Especializado',
    description: 'Fale com nossa equipe de especialistas em Excel. Resposta rapida e atendimento personalizado.',
    url: 'https://www.planilhabr.com/contato/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]
  },
  alternates: {
    canonical: 'https://www.planilhabr.com/contato/'
  }
}

const faqs = [
  {
    question: 'As planilhas sao realmente gratuitas?',
    answer: 'Sim, 100% gratuitas. Nao cobramos nada pelo download ou uso das planilhas. Nosso modelo se sustenta atraves de parcerias educacionais.'
  },
  {
    question: 'Preciso de conhecimento avancado em Excel?',
    answer: 'Nao! Nossas planilhas sao desenvolvidas para serem intuitivas. Incluimos instrucoes e as formulas ja vem prontas.'
  },
  {
    question: 'Posso usar as planilhas na minha empresa?',
    answer: 'Sim, todas as planilhas podem ser usadas para fins pessoais ou comerciais. Voce pode editar e personalizar como preferir.'
  },
  {
    question: 'Como solicitar uma planilha especifica?',
    answer: 'Use o formulario ao lado selecionando "Sugestao de Nova Planilha". Avaliamos todas as sugestoes e priorizamos as mais solicitadas.'
  }
]

const contactReasons = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Duvidas sobre Planilhas',
    description: 'Ajuda para usar ou personalizar nossas planilhas'
  },
  {
    icon: EnvelopeIcon,
    title: 'Sugestoes de Planilhas',
    description: 'Proponha novas planilhas que voce precisa'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Reportar Problemas',
    description: 'Encontrou um erro? Nos avise para corrigir'
  },
  {
    icon: UserGroupIcon,
    title: 'Parcerias',
    description: 'Propostas de colaboracao e parcerias'
  }
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-green-200 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-[40px] sm:text-[56px] font-semibold leading-[1.2] text-green-900 mb-6">
              Fale Conosco
            </h1>
            <p className="text-[18px] leading-[1.7] text-green-800">
              Precisa de ajuda com uma planilha, quer sugerir um novo modelo ou tem alguma duvida?
              Nossa equipe de especialistas esta pronta para ajudar.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2 text-[14px] text-green-800">
                <ClockIcon className="w-5 h-5 text-green-600" />
                <span>Resposta em ate <strong className="text-green-900">24h uteis</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[14px] text-green-800">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span>Atendimento <strong className="text-green-900">em portugues</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT REASONS */}
      <section className="border-b border-green-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-4 gap-4">
            {contactReasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-green-900 mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-[12px] text-green-600">
                    {reason.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">

            {/* LEFT - CONTACT FORM */}
            <div>
              <h2 className="text-[28px] font-semibold text-green-900 mb-2">
                Envie sua Mensagem
              </h2>
              <p className="text-[15px] text-gray-600 mb-8">
                Preencha o formulario abaixo e retornaremos o mais breve possivel.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nome" className="block text-[14px] font-medium text-green-900 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      className="w-full px-4 py-3 border border-green-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[14px] font-medium text-green-900 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-green-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telefone" className="block text-[14px] font-medium text-green-900 mb-2">
                      Telefone/WhatsApp <span className="text-gray-600">(Opcional)</span>
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      className="w-full px-4 py-3 border border-green-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label htmlFor="empresa" className="block text-[14px] font-medium text-green-900 mb-2">
                      Empresa <span className="text-gray-600">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      className="w-full px-4 py-3 border border-green-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="assunto" className="block text-[14px] font-medium text-green-900 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    required
                    className="w-full px-4 py-3 border border-green-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                  >
                    <option value="">Selecione o assunto</option>
                    <option value="duvida-planilha">Duvida sobre uma planilha</option>
                    <option value="sugestao-planilha">Sugestao de nova planilha</option>
                    <option value="erro-planilha">Reportar erro em planilha</option>
                    <option value="parceria">Proposta de parceria</option>
                    <option value="feedback">Feedback ou elogio</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="planilha" className="block text-[14px] font-medium text-green-900 mb-2">
                    Planilha Relacionada <span className="text-gray-600">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="planilha"
                    name="planilha"
                    className="w-full px-4 py-3 border border-green-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    placeholder="Nome da planilha (se aplicavel)"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-[14px] font-medium text-green-900 mb-2">
                    Sua Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-green-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                    placeholder="Descreva sua duvida ou sugestao em detalhes..."
                  ></textarea>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacidade"
                      name="privacidade"
                      required
                      className="mt-1 w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-600"
                    />
                    <label htmlFor="privacidade" className="text-[14px] text-green-800 leading-[1.6]">
                      Li e concordo com a{' '}
                      <Link href="/politica-privacidade" className="text-green-600 hover:text-green-700 underline font-medium">
                        Politica de Privacidade
                      </Link>{' '}
                      da PlanilhaBR. *
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-medium py-4 px-6 rounded-lg hover:bg-green-700 transition-colors text-[15px]"
                >
                  Enviar Mensagem
                </button>

                <p className="text-[13px] text-gray-600 text-center">
                  * Campos obrigatorios
                </p>
              </form>
            </div>

            {/* RIGHT - CONTACT INFO & FAQ */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <div className="bg-green-600 text-white rounded-lg p-6">
                <h3 className="text-[18px] font-semibold mb-4">
                  Contato Direto
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:contato@planilhabr.com"
                    className="flex items-center gap-3 text-[15px] hover:text-green-200 transition-colors"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    contato@planilhabr.com
                  </a>
                </div>
                <div className="mt-6 pt-4 border-t border-green-500">
                  <p className="text-[14px] text-green-100">
                    Horario de atendimento:<br />
                    <strong className="text-white">Segunda a Sexta, 9h as 18h</strong>
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-green-900 mb-1">
                      Tempo de Resposta
                    </h3>
                    <p className="text-[14px] text-green-800 leading-[1.6]">
                      Respondemos todas as mensagens em ate <strong className="text-green-900">24 horas uteis</strong>.
                      Em dias de alta demanda, pode levar ate 48h.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-[15px] font-semibold text-green-900 mb-4">
                  Por que confiar na PlanilhaBR?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[14px] text-green-700">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Mais de 50.000 downloads realizados</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-green-700">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Equipe de especialistas certificados</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-green-700">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Planilhas testadas e documentadas</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-green-700">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>100% gratuito, sem surpresas</span>
                  </div>
                </div>
              </div>

              {/* Mini FAQ */}
              <div className="bg-white border border-green-200 rounded-lg p-6">
                <h3 className="text-[15px] font-semibold text-green-900 mb-4">
                  Perguntas Frequentes
                </h3>
                <div className="space-y-4">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <div key={index} className="pb-4 border-b border-green-100 last:border-0 last:pb-0">
                      <h4 className="text-[14px] font-medium text-green-900 mb-1">
                        {faq.question}
                      </h4>
                      <p className="text-[13px] text-green-800 leading-[1.6]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FULL FAQ */}
      <section className="py-20 bg-green-50 border-t border-green-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-semibold text-green-900 mb-3">
              Duvidas Frequentes
            </h2>
            <p className="text-[16px] text-green-600">
              Respostas rapidas para as perguntas mais comuns
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-green-200 rounded-lg p-6">
                <h3 className="text-[16px] font-semibold text-green-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-[15px] text-green-800 leading-[1.7]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-green-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[28px] font-semibold text-green-900 mb-4">
            Prefere Explorar por Conta Propria?
          </h2>
          <p className="text-[16px] text-gray-600 mb-8">
            Navegue por nossa biblioteca completa de planilhas profissionais
          </p>
          <Link
            href="/planilhas"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-[15px] font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Ver Todas as Planilhas
          </Link>
        </div>
      </section>

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contato - PlanilhaBR",
            "description": "Entre em contato com a equipe PlanilhaBR para suporte, sugestoes ou duvidas sobre planilhas Excel.",
            "mainEntity": {
              "@type": "Organization",
              "name": "PlanilhaBR",
              "url": "https://www.planilhabr.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contato@planilhabr.com",
                "contactType": "customer service",
                "availableLanguage": ["Portuguese"],
                "areaServed": "BR",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sao Paulo",
                "addressRegion": "SP",
                "addressCountry": "BR"
              }
            }
          })
        }}
      />

      {/* FAQ STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  )
}
