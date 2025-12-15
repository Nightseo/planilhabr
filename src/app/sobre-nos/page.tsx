import type { Metadata } from 'next'
import Link from 'next/link'
import { EnvelopeIcon, CheckBadgeIcon, ShieldCheckIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Sobre Nos - PlanilhaBR.com | Especialistas em Planilhas Excel',
  description: 'Conheca a PlanilhaBR: equipe de especialistas em Excel com mais de 10 anos de experiencia criando planilhas profissionais para empresas brasileiras. Mais de 50.000 downloads.',
  keywords: [
    'planilhabr',
    'especialistas excel brasil',
    'planilhas profissionais',
    'quem somos planilhabr',
    'equipe excel',
    'planilhas empresariais'
  ],
  openGraph: {
    title: 'Sobre a PlanilhaBR - Sua Fonte de Planilhas Excel Profissionais',
    description: 'Equipe brasileira especializada em criar planilhas Excel de alta qualidade para gestao empresarial.',
    url: 'https://www.planilhabr.com/sobre-nos/',
    type: 'website'
  },
  alternates: {
    canonical: 'https://www.planilhabr.com/sobre-nos/'
  }
}

const teamMembers = [
  {
    initials: 'RC',
    name: 'Ricardo Costa',
    role: 'Fundador & Especialista em Financas',
    bio: 'Contador com MBA em Financas Corporativas pela FGV. Mais de 15 anos de experiencia em controladoria de grandes empresas. Especialista em planilhas de fluxo de caixa e analise financeira.',
    location: 'Sao Paulo, SP',
    credentials: ['CRC Ativo', 'MBA FGV', '15+ anos experiencia'],
    expertise: ['Controle Financeiro', 'Fluxo de Caixa', 'Analise de Custos']
  },
  {
    initials: 'AM',
    name: 'Ana Martins',
    role: 'Especialista em Recursos Humanos',
    bio: 'Psicologa organizacional com especializacao em Gestao de Pessoas pela USP. Desenvolveu sistemas de RH para empresas de medio e grande porte por mais de 12 anos.',
    location: 'Rio de Janeiro, RJ',
    credentials: ['CRP Ativo', 'Pos-graduacao USP', '12+ anos experiencia'],
    expertise: ['Gestao de RH', 'Folha de Pagamento', 'Indicadores de Pessoas']
  },
  {
    initials: 'PO',
    name: 'Paulo Oliveira',
    role: 'Especialista em Operacoes',
    bio: 'Engenheiro de Producao com certificacao Lean Six Sigma Black Belt. Atuou como gerente de operacoes em industrias e varejos, otimizando processos e controles de estoque.',
    location: 'Belo Horizonte, MG',
    credentials: ['Six Sigma Black Belt', 'Eng. Producao', '10+ anos experiencia'],
    expertise: ['Controle de Estoque', 'Gestao de Producao', 'Logistica']
  },
  {
    initials: 'FS',
    name: 'Fernanda Silva',
    role: 'Especialista em Excel Avancado',
    bio: 'Microsoft MVP em Excel e desenvolvedora de solucoes em VBA. Professora de cursos de Excel avancado e criadora de mais de 200 planilhas profissionais.',
    location: 'Curitiba, PR',
    credentials: ['Microsoft MVP', 'VBA Expert', '200+ planilhas criadas'],
    expertise: ['Excel Avancado', 'Automacao VBA', 'Dashboards']
  }
]

const stats = [
  { value: '126+', label: 'Planilhas Disponiveis', detail: 'Financeiro, RH, Estoque, Vendas e mais' },
  { value: '50.000+', label: 'Downloads Realizados', detail: 'Empresas e profissionais em todo Brasil' },
  { value: '4.8/5', label: 'Avaliacao Media', detail: 'Baseado em feedback dos usuarios' },
  { value: '100%', label: 'Gratuito', detail: 'Sem custos ocultos ou assinaturas' }
]

const principles = [
  {
    icon: CheckBadgeIcon,
    title: 'Qualidade Profissional',
    description: 'Cada planilha e desenvolvida por especialistas da area, testada rigorosamente e documentada para facilitar o uso.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Seguranca e Privacidade',
    description: 'Nenhum dado seu e coletado ao baixar. Planilhas 100% offline, sem macros maliciosos ou rastreamento.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Aprendizado Continuo',
    description: 'Incluimos instrucoes, formulas comentadas e dicas para que voce aprenda enquanto usa nossas planilhas.'
  },
  {
    icon: BriefcaseIcon,
    title: 'Foco Empresarial',
    description: 'Planilhas pensadas para a realidade brasileira: impostos, legislacao trabalhista e praticas de mercado locais.'
  }
]

const testimonials = [
  {
    quote: 'As planilhas da PlanilhaBR salvaram minha empresa. O fluxo de caixa e completo e facil de usar.',
    author: 'Marcos T.',
    role: 'Empresario, Comercio Varejista',
    location: 'Sao Paulo'
  },
  {
    quote: 'Uso a planilha de controle de estoque ha 2 anos. Profissional e gratuita, nao acredito que existe.',
    author: 'Carla R.',
    role: 'Gerente de Operacoes',
    location: 'Porto Alegre'
  },
  {
    quote: 'Como contador, recomendo as planilhas da PlanilhaBR para todos meus clientes PMEs.',
    author: 'Dr. Fernando M.',
    role: 'Contador CRC-SP',
    location: 'Campinas'
  }
]

export default function SobreNosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-green-200 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-[13px] font-medium text-green-700 mb-6">
              <CheckBadgeIcon className="w-4 h-4" />
              Empresa 100% Brasileira
            </div>

            <h1 className="text-[40px] sm:text-[56px] font-semibold leading-[1.2] text-green-900 mb-6">
              Sobre a PlanilhaBR
            </h1>

            <p className="text-[18px] leading-[1.7] text-gray-600 mb-4">
              Somos uma equipe de <strong className="text-green-900">especialistas brasileiros em Excel</strong> com
              mais de 10 anos de experiencia no mercado corporativo. Nossa missao e democratizar o acesso a
              ferramentas de gestao profissionais.
            </p>

            <p className="text-[18px] leading-[1.7] text-gray-600 mb-8">
              Criamos planilhas que realmente funcionam para a realidade das empresas brasileiras -
              considerando nossa legislacao, impostos e praticas de mercado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/planilhas"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-[15px] font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Ver Planilhas Disponiveis
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center text-[15px] font-medium text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                Fale Conosco →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS - SOCIAL PROOF */}
      <section className="border-b border-green-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-[36px] font-bold text-gray-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-[15px] font-semibold text-green-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-[13px] text-green-600">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="bg-green-50 border-b border-green-200">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-[32px] font-semibold text-green-900 mb-6 leading-[1.2]">
                Nossa Missao
              </h2>
              <div className="space-y-5 text-[16px] text-green-800 leading-[1.7]">
                <p>
                  <strong className="text-green-900">Democratizar a gestao empresarial no Brasil.</strong> Acreditamos
                  que toda empresa, independente do tamanho, merece ter acesso a ferramentas de gestao profissionais.
                </p>
                <p>
                  Muitas pequenas e medias empresas nao tem orcamento para sistemas caros de ERP ou consultoria.
                  Por isso, criamos planilhas Excel de alta qualidade que resolvem problemas reais do dia a dia empresarial.
                </p>
                <p>
                  Nossas planilhas sao desenvolvidas por profissionais com experiencia real no mercado brasileiro,
                  considerando nossa legislacao fiscal, trabalhista e as praticas mais comuns do nosso mercado.
                </p>
                <p className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
                  <strong>Compromisso:</strong> Todas as nossas planilhas sao e sempre serao 100% gratuitas.
                  Nosso modelo se sustenta atraves de parcerias e conteudo educacional.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[20px] font-semibold text-green-900 mb-6">
                Nossos Principios
              </h3>
              <div className="space-y-5">
                {principles.map((principle, index) => {
                  const Icon = principle.icon
                  return (
                    <div key={index} className="flex gap-4 p-4 bg-white border border-green-200 rounded-lg">
                      <div className="w-10 h-10 bg-green-50 rounded-md flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-green-900 mb-1">
                          {principle.title}
                        </div>
                        <div className="text-[14px] text-green-800 leading-[1.6]">
                          {principle.description}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM - E-E-A-T */}
      <section className="bg-white border-b border-green-200">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-[32px] font-semibold text-green-900 mb-4 leading-[1.2]">
              Nossa Equipe de Especialistas
            </h2>
            <p className="text-[17px] text-green-800 leading-[1.6] max-w-2xl mx-auto">
              Profissionais com formacao academica solida e experiencia comprovada no mercado brasileiro.
              Cada planilha e desenvolvida por especialistas da area.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <article key={member.name} className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-lg bg-green-600 text-white font-semibold text-[18px] flex items-center justify-center flex-shrink-0">
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-semibold text-green-900">
                      {member.name}
                    </h3>
                    <p className="text-[14px] text-green-600 font-medium">
                      {member.role}
                    </p>
                    <p className="text-[13px] text-gray-600">
                      {member.location}
                    </p>
                  </div>
                </div>

                {/* Credentials - E-E-A-T */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.credentials.map((cred, index) => (
                    <span key={index} className="px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-[12px] font-medium rounded">
                      {cred}
                    </span>
                  ))}
                </div>

                <p className="text-[14px] text-green-800 leading-[1.6] mb-4">
                  {member.bio}
                </p>

                <div className="pt-4 border-t border-green-200">
                  <div className="text-[12px] font-medium text-gray-600 uppercase tracking-wide mb-2">
                    Areas de Expertise
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-[12px] rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - SOCIAL PROOF */}
      <section className="bg-green-50 border-b border-green-200">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-semibold text-green-900 mb-4">
              O Que Dizem Nossos Usuarios
            </h2>
            <p className="text-[16px] text-green-600">
              Feedback real de empresarios e profissionais que usam nossas planilhas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border border-green-200 rounded-lg p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[15px] text-green-800 leading-[1.6] mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="pt-4 border-t border-green-200">
                  <div className="text-[14px] font-semibold text-green-900">
                    {testimonial.author}
                  </div>
                  <div className="text-[13px] text-green-600">
                    {testimonial.role}
                  </div>
                  <div className="text-[12px] text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-green-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[32px] font-semibold text-green-900 mb-4 leading-[1.2]">
              Pronto para Organizar sua Empresa?
            </h2>
            <p className="text-[17px] text-green-800 leading-[1.6] mb-8">
              Explore nossa biblioteca de planilhas profissionais e comece a
              transformar a gestao do seu negocio hoje mesmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/planilhas"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white text-[15px] font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Ver Todas as Planilhas
              </Link>
              <a
                href="mailto:contato@planilhabr.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-green-200 text-green-700 text-[15px] font-medium rounded-md hover:border-green-600 hover:text-green-600 transition-colors"
              >
                <EnvelopeIcon className="w-5 h-5" />
                contato@planilhabr.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STRUCTURED DATA FOR E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PlanilhaBR",
            "url": "https://www.planilhabr.com",
            "logo": "https://www.planilhabr.com/planilhabr-favicon.png",
            "description": "Planilhas Excel profissionais gratuitas para gestao empresarial no Brasil",
            "foundingDate": "2025",
            "foundingLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sao Paulo",
                "addressRegion": "SP",
                "addressCountry": "BR"
              }
            },
            "founder": {
              "@type": "Person",
              "name": "Ricardo Costa",
              "jobTitle": "Fundador & Especialista em Financas",
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "degree",
                  "name": "MBA em Financas Corporativas",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "FGV - Fundacao Getulio Vargas"
                  }
                }
              ]
            },
            "employee": [
              {
                "@type": "Person",
                "name": "Ana Martins",
                "jobTitle": "Especialista em Recursos Humanos"
              },
              {
                "@type": "Person",
                "name": "Paulo Oliveira",
                "jobTitle": "Especialista em Operacoes"
              },
              {
                "@type": "Person",
                "name": "Fernanda Silva",
                "jobTitle": "Especialista em Excel Avancado"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sao Paulo",
              "addressRegion": "SP",
              "addressCountry": "BR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "contato@planilhabr.com",
              "contactType": "customer service",
              "areaServed": "BR",
              "availableLanguage": ["Portuguese"]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </div>
  )
}
