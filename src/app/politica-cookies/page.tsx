import { Metadata } from 'next'
import Link from 'next/link'
import {
  ShieldCheckIcon,
  CheckIcon,
  XMarkIcon,
  CogIcon,
  GlobeAltIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Politica de Cookies | PlanilhaBR - Transparencia Total',
  description: 'Saiba como o PlanilhaBR.com utiliza cookies. Uso minimo, transparencia total e controle nas suas maos. Sem rastreamento invasivo.',
  openGraph: {
    title: 'Politica de Cookies | PlanilhaBR',
    description: 'Como utilizamos cookies - transparencia e controle.',
    url: 'https://www.planilhabr.com/politica-cookies/',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://www.planilhabr.com/politica-cookies/'
  }
}

export default function PoliticaCookiesPage() {
  const currentYear = new Date().getFullYear()

  const browserLinks = [
    { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
    { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop' },
    { name: 'Safari', url: 'https://support.apple.com/pt-br/guide/safari/sfri11471/mac' },
    { name: 'Microsoft Edge', url: 'https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-yellow-500/5" />
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-24 relative">
          <div className="flex items-center gap-2 text-sm text-green-800 font-medium mb-4">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>Uso Minimo de Cookies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            Politica de Cookies
          </h1>
          <p className="text-lg text-green-800 leading-relaxed max-w-2xl">
            Transparencia total sobre como utilizamos cookies.
            Voce tem controle total sobre suas preferencias.
          </p>
          <div className="mt-6 text-sm text-gray-600">
            Ultima atualizacao: Janeiro de {currentYear}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">

            {/* O que sao cookies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <CogIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  O que sao Cookies?
                </h2>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6 sm:p-8">
                <p className="text-green-800 leading-relaxed mb-4">
                  Cookies sao <strong>pequenos arquivos de texto</strong> armazenados no seu navegador quando voce
                  visita um site. Eles permitem que o site lembre suas preferencias e melhore sua experiencia.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-800 text-sm">
                    <strong>No PlanilhaBR:</strong> Utilizamos cookies de forma minima e transparente,
                    sempre respeitando sua privacidade e dando a voce o controle total.
                  </p>
                </div>
              </div>
            </section>

            {/* Tipos de cookies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <GlobeAltIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Cookies que Utilizamos
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-green-900">Cookies Essenciais</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Sempre Ativos
                        </span>
                      </div>
                      <p className="text-green-800 leading-relaxed">
                        Necessarios para o funcionamento basico do site. Incluem preferencias de consentimento
                        e sessao de navegacao. <strong>Nao podem ser desativados</strong> pois o site nao funcionaria corretamente sem eles.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ChartBarIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-green-900">Cookies de Analytics</h3>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                          Com Consentimento
                        </span>
                      </div>
                      <p className="text-green-800 leading-relaxed mb-3">
                        Nos ajudam a entender como visitantes usam o site, coletando <strong>dados anonimos</strong> sobre
                        paginas visitadas e tempo de permanencia.
                      </p>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          <strong>Google Analytics:</strong> Utilizado apenas com seu consentimento explicito.
                          Dados anonimizados e agregados.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* O que NAO utilizamos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                  <XMarkIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  O que NAO Utilizamos
                </h2>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 sm:p-8">
                <p className="text-emerald-800 font-medium mb-4">
                  Comprometidos com sua privacidade, NAO utilizamos:
                </p>
                <ul className="space-y-3">
                  {[
                    'Cookies de publicidade ou remarketing',
                    'Rastreamento entre sites (cross-site tracking)',
                    'Cookies de redes sociais (Facebook, Twitter, etc.)',
                    'Venda de dados para anunciantes',
                    'Perfis de comportamento para marketing'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-emerald-700">
                      <span className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <XMarkIcon className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Como gerenciar */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                  <CogIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Gerenciar seus Cookies
                </h2>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6 sm:p-8">
                <p className="text-green-800 leading-relaxed mb-6">
                  Voce pode controlar e excluir cookies a qualquer momento pelo seu navegador:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {browserLinks.map((browser, index) => (
                    <a
                      key={index}
                      href={browser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm font-medium text-green-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
                    >
                      {browser.name}
                    </a>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Nota:</strong> Bloquear todos os cookies pode afetar a funcionalidade de alguns sites.
                    No PlanilhaBR, apenas os cookies essenciais sao necessarios para navegacao basica.
                  </p>
                </div>
              </div>
            </section>

            {/* Atualizacoes */}
            <section>
              <div className="bg-green-100 border border-green-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Atualizacoes desta Politica</h3>
                <p className="text-green-800 leading-relaxed">
                  Podemos atualizar esta politica periodicamente. Recomendamos visitar esta pagina
                  regularmente. Alteracoes significativas serao destacadas.
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
            Duvidas sobre Cookies?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Entre em contato se tiver alguma pergunta sobre como usamos cookies
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
