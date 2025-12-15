import { Metadata } from 'next'
import Link from 'next/link'
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
  CheckIcon,
  UserGroupIcon,
  ServerIcon,
  DocumentCheckIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Politica de Privacidade | PlanilhaBR - LGPD Compliant',
  description: 'Politica de Privacidade do PlanilhaBR.com. Saiba como protegemos seus dados pessoais em total conformidade com a LGPD (Lei 13.709/2018). Transparencia e seguranca garantidas.',
  openGraph: {
    title: 'Politica de Privacidade | PlanilhaBR',
    description: 'Como protegemos seus dados pessoais - LGPD Compliant',
    url: 'https://www.planilhabr.com/politica-privacidade/',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://www.planilhabr.com/politica-privacidade/'
  }
}

export default function PoliticaPrivacidadePage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-yellow-500/5" />
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-24 relative">
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-4">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>LGPD Compliant</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            Politica de Privacidade
          </h1>
          <p className="text-lg text-green-800 leading-relaxed max-w-2xl">
            Sua privacidade e nossa prioridade. Esta politica descreve como coletamos,
            usamos e protegemos suas informacoes em conformidade com a LGPD.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <DocumentCheckIcon className="w-4 h-4" />
              Ultima atualizacao: Janeiro de {currentYear}
            </span>
            <span className="flex items-center gap-1">
              <LockClosedIcon className="w-4 h-4" />
              Lei 13.709/2018 (LGPD)
            </span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">

            {/* Compromisso */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <LockClosedIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Nosso Compromisso
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 sm:p-8">
                <p className="text-green-800 leading-relaxed text-lg">
                  O <strong>PlanilhaBR</strong> valoriza profundamente sua privacidade. Adotamos uma politica de
                  <strong> coleta minima de dados</strong>, transparencia total e <strong>nunca vendemos suas informacoes</strong>.
                  Estamos em total conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018).
                </p>
              </div>
            </section>

            {/* O que coletamos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <EyeSlashIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Dados que Coletamos
                </h2>
              </div>
              <div className="grid gap-4">
                <div className="bg-white border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-2">Downloads de Planilhas</h3>
                      <p className="text-green-800 leading-relaxed">
                        <strong className="text-emerald-600">Nenhum dado pessoal e coletado.</strong> Todas as planilhas
                        estao disponiveis para download gratuito sem necessidade de cadastro, email ou qualquer informacao pessoal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-2">Formulario de Contato</h3>
                      <p className="text-green-800 leading-relaxed mb-3">
                        Ao entrar em contato conosco, coletamos apenas o necessario para responder sua solicitacao:
                      </p>
                      <ul className="space-y-2 text-sm text-green-600">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Nome (para personalizacao)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Email (para resposta)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Mensagem (conteudo da solicitacao)
                        </li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600 bg-green-50 rounded-lg p-3">
                        Dados excluidos automaticamente apos 90 dias do atendimento.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ServerIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-2">Dados Anonimos de Navegacao</h3>
                      <p className="text-green-800 leading-relaxed mb-3">
                        Com seu consentimento, podemos coletar dados <strong>anonimos e agregados</strong> para melhorar nosso site:
                      </p>
                      <ul className="space-y-2 text-sm text-green-600">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          Paginas mais visitadas
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          Tempo medio de permanencia
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          Tipo de dispositivo utilizado
                        </li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600 bg-green-50 rounded-lg p-3">
                        Esses dados nao identificam voce pessoalmente e sao usados apenas para analises estatisticas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* O que NAO fazemos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <EyeSlashIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  O que NAO Fazemos
                </h2>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 sm:p-8">
                <ul className="space-y-4">
                  {[
                    'Venda de dados pessoais para terceiros',
                    'Compartilhamento de emails com parceiros de marketing',
                    'Publicidade direcionada ou retargeting',
                    'Rastreamento de atividades em outros sites',
                    'Criacao de perfis comportamentais para fins comerciais',
                    'Transferencia de dados para empresas no exterior sem protecao'
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

            {/* Seus direitos */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Seus Direitos (LGPD)
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                A Lei Geral de Protecao de Dados garante os seguintes direitos aos titulares:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Confirmacao', desc: 'Saber se tratamos seus dados' },
                  { title: 'Acesso', desc: 'Acessar todos os dados que temos' },
                  { title: 'Correcao', desc: 'Corrigir dados incorretos' },
                  { title: 'Exclusao', desc: 'Solicitar remocao dos dados' },
                  { title: 'Portabilidade', desc: 'Receber dados em formato estruturado' },
                  { title: 'Revogacao', desc: 'Revogar consentimento a qualquer momento' },
                  { title: 'Informacao', desc: 'Saber com quem compartilhamos' },
                  { title: 'Oposicao', desc: 'Opor-se a tratamento irregular' }
                ].map((right, index) => (
                  <div key={index} className="bg-white border border-green-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                    <h4 className="font-semibold text-green-900 mb-1 flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-amber-500" />
                      {right.title}
                    </h4>
                    <p className="text-sm text-green-600">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-600 bg-green-50 rounded-xl p-4">
                Para exercer qualquer direito, envie um email para <strong>privacidade@planilhabr.com</strong> ou
                utilize nossa <Link href="/contato" className="text-green-600 hover:underline">pagina de contato</Link>.
                Prazo de resposta: ate 15 dias uteis.
              </p>
            </section>

            {/* Seguranca */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Seguranca dos Dados
                </h2>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6 sm:p-8">
                <p className="text-gray-600 mb-6">
                  Implementamos medidas tecnicas e organizacionais para proteger seus dados:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🔒', text: 'Criptografia SSL/TLS em todas as conexoes' },
                    { icon: '🛡️', text: 'Servidores com protecao DDoS' },
                    { icon: '🔐', text: 'Acesso restrito a dados senseiveis' },
                    { icon: '🗑️', text: 'Exclusao periodica de dados desnecessarios' },
                    { icon: '📋', text: 'Auditorias regulares de seguranca' },
                    { icon: '👥', text: 'Treinamento de equipe em privacidade' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm text-green-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Controlador */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <DocumentCheckIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-900">
                  Controlador dos Dados
                </h2>
              </div>
              <div className="bg-white border border-green-200 rounded-2xl p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Empresa</h4>
                    <p className="text-green-800">PlanilhaBR.com</p>
                    <p className="text-green-800">CNPJ: Em processo de registro</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Contato para Privacidade</h4>
                    <p className="text-green-800">Email: privacidade@planilhabr.com</p>
                    <p className="text-green-800">Resposta em ate 15 dias uteis</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Duvidas sobre Privacidade?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Nossa equipe esta disponivel para esclarecer qualquer questao sobre o tratamento dos seus dados
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 text-base font-semibold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
          >
            Entrar em Contato
          </Link>
        </div>
      </section>
    </div>
  )
}
