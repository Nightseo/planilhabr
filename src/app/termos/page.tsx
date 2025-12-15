import { Metadata } from 'next'
import Link from 'next/link'
import {
  ScaleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Termos de Uso | PlanilhaBR - Planilhas Excel Gratuitas',
  description: 'Termos e condicoes de uso do PlanilhaBR.com. Saiba como utilizar nossas planilhas Excel gratuitas de forma correta, legal e profissional.',
  openGraph: {
    title: 'Termos de Uso | PlanilhaBR',
    description: 'Termos e condicoes para uso das planilhas Excel gratuitas.',
    url: 'https://www.planilhabr.com/termos/',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://www.planilhabr.com/termos/'
  }
}

export default function TermosPage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-yellow-500/5" />
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-24 relative">
          <div className="flex items-center gap-2 text-sm text-green-800 font-medium mb-4">
            <ScaleIcon className="w-5 h-5" />
            <span>Termos Legais</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            Termos de Uso
          </h1>
          <p className="text-lg text-green-800 leading-relaxed max-w-2xl">
            Condicoes para uso das planilhas Excel gratuitas do PlanilhaBR.
            Leia com atencao para aproveitar ao maximo nossos recursos.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <DocumentTextIcon className="w-4 h-4" />
              Ultima atualizacao: Janeiro de {currentYear}
            </span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">

            {/* Aceitacao */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <DocumentTextIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Aceitacao dos Termos
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 sm:p-8">
                <p className="text-green-800 leading-relaxed text-lg">
                  Ao acessar e utilizar o <strong>PlanilhaBR.com</strong>, voce concorda com estes Termos de Uso.
                  Nosso objetivo e fornecer <strong>planilhas Excel gratuitas e de qualidade</strong> para ajudar
                  empresarios, autonomos e profissionais brasileiros em sua gestao.
                </p>
              </div>
            </section>

            {/* Uso permitido */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Uso Permitido
                </h2>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 sm:p-8">
                <p className="text-emerald-800 font-medium mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                  Voce PODE usar nossas planilhas para:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Uso pessoal e familiar',
                    'Uso comercial em sua empresa',
                    'Modificar e adaptar as planilhas',
                    'Compartilhar com colegas de trabalho',
                    'Usar como base para novas planilhas',
                    'Uso educacional (cursos, universidades)',
                    'MEI, ME, EPP e empresas de qualquer porte',
                    'Organizacoes sem fins lucrativos'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-emerald-700 bg-white/60 rounded-lg p-3">
                      <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Uso nao permitido */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <XCircleIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Uso NAO Permitido
                </h2>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 sm:p-8">
                <ul className="space-y-4">
                  {[
                    'Revender as planilhas como se fossem de sua autoria',
                    'Disponibilizar para download em outros sites sem autorizacao',
                    'Remover creditos ou referencias ao PlanilhaBR.com',
                    'Usar para fins ilegais, fraudulentos ou antiéticos',
                    'Incluir em produtos comerciais sem autorizacao previa'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-red-800">
                      <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold text-sm">X</span>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Propriedade intelectual */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <BuildingOfficeIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Propriedade Intelectual
                </h2>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <p className="text-green-800 leading-relaxed">
                  Todo o conteudo do PlanilhaBR.com, incluindo textos, imagens, logotipos e planilhas,
                  e protegido por <strong>direitos autorais</strong> e pertence ao PlanilhaBR ou seus licenciadores.
                </p>
                <p className="text-green-800 leading-relaxed">
                  As planilhas sao disponibilizadas sob uma <strong>licenca de uso gratuito</strong> que permite
                  uso pessoal e comercial, mas <strong>nao transfere a propriedade intelectual</strong>.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-800">
                    <strong>Licenca:</strong> Uso livre para fins pessoais e comerciais, desde que mantidos os creditos
                    ao PlanilhaBR.com e nao seja revendido como produto proprio.
                  </p>
                </div>
              </div>
            </section>

            {/* Isencao de garantias */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Isencao de Garantias
                </h2>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
                <p className="text-amber-800 leading-relaxed mb-4">
                  As planilhas sao fornecidas <strong>"como estao"</strong>, sem garantias de qualquer tipo.
                  Embora nos esforcemos para manter qualidade e precisao:
                </p>
                <ul className="space-y-3 text-amber-700">
                  {[
                    'Nao garantimos adequacao para todas as situacoes',
                    'Nao nos responsabilizamos por decisoes baseadas nas planilhas',
                    'Recomendamos validar calculos importantes com profissional'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 bg-amber-100 border border-amber-300 rounded-xl p-4">
                  <p className="text-sm text-amber-900">
                    <strong>Importante:</strong> Para questoes fiscais, contabeis ou trabalhistas, sempre consulte
                    um contador ou advogado. Nossas planilhas sao ferramentas de apoio, nao substituem assessoria profissional.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitacao de responsabilidade */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                  <ScaleIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Limitacao de Responsabilidade
                </h2>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6 sm:p-8">
                <p className="text-green-800 leading-relaxed">
                  Em nenhuma circunstancia o PlanilhaBR sera responsavel por quaisquer danos diretos,
                  indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade
                  de uso das planilhas ou do site, incluindo, mas nao se limitando a, perda de lucros,
                  dados ou outras perdas intangiveis.
                </p>
              </div>
            </section>

            {/* Lei aplicavel */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                  <ScaleIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Lei Aplicavel e Foro
                </h2>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6 sm:p-8">
                <p className="text-green-800 leading-relaxed mb-4">
                  Estes Termos de Uso sao regidos pelas leis da <strong>Republica Federativa do Brasil</strong>.
                </p>
                <p className="text-green-800 leading-relaxed">
                  Qualquer disputa relacionada a estes termos sera submetida ao foro da comarca
                  de <strong>Sao Paulo, SP</strong>, com exclusao de qualquer outro, por mais privilegiado que seja.
                </p>
              </div>
            </section>

            {/* Modificacoes */}
            <section>
              <div className="bg-green-100 border border-green-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Modificacoes dos Termos</h3>
                <p className="text-green-800 leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
                  As alteracoes entrarao em vigor imediatamente apos publicacao. Recomendamos
                  revisao periodica desta pagina.
                </p>
              </div>
            </section>

          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Duvidas sobre os Termos?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Entre em contato conosco para esclarecer qualquer questao
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 text-base font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  )
}
