import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PlantillaTemplate from '@/components/PlantillaTemplate'
import CategoryPage from '@/components/category/CategoryPage'
import { getRelatedPlantillas, getLatestPlantillas } from '@/utils/plantillas'
import { getCategoryBySlug, getAllCategories } from '@/data/categories'
import { getGeneratedTemplatesByCategory } from '@/lib/plantillas'
import type { GeneratedTemplate } from '@/lib/plantillas'
import type { CategoryId } from '@/types'
import { promises as fs } from 'fs'
import path from 'path'

export const revalidate = 3600

const DEFAULT_CATEGORY_FOCUS = [
  'Tabelas bem estruturadas com entradas claras e relatorios',
  'Formulas comentadas para transferencias rapidas de conhecimento',
  'Visualizacoes prontas para exportacao para gestao, bancos e orgaos publicos'
]

const CATEGORY_FOCUS_POINTS: Partial<Record<CategoryId, string[]>> = {
  financeiro: [
    'Fluxo de caixa e orcamentos com trilhas de aprovacao claras.',
    'Indicadores de liquidez e modelos de cobranca para relatorios gerenciais.',
    'Comprovantes comentados para auditoria e controladoria.'
  ],
  estoque: [
    'Controle de entrada e saida de produtos com alertas de reposicao.',
    'Inventarios com classificacao ABC e niveis minimo/maximo.',
    'Rastreamento de lotes e validades para gestao de qualidade.'
  ],
  vendas: [
    'Funil de vendas com etapas e taxas de conversao.',
    'Comissoes e metas com calculos automaticos por vendedor.',
    'Relatorios de desempenho e previsoes de faturamento.'
  ],
  rh: [
    'Escalas de trabalho e controle de ponto com calculos de horas extras.',
    'Banco de horas e gestao de ferias com aprovacoes.',
    'Indicadores de turnover e recrutamento com SLAs.'
  ],
  projetos: [
    'Cronogramas com marcos, dependencias e responsaveis.',
    'Registro de riscos e decisoes com caminhos de escalacao.',
    'Relatorios para comites diretivos e stakeholders.'
  ],
  produtividade: [
    'Listas de tarefas com prioridades e prazos.',
    'Agendas e planejadores com metas diarias e semanais.',
    'Trackers de habitos e indicadores de produtividade pessoal.'
  ],
  marketing: [
    'Calendarios editoriais com canais e status de publicacao.',
    'Analise de ROI de campanhas com metricas de desempenho.',
    'Gestao de leads e funil de marketing digital.'
  ],
  contabilidade: [
    'Balanco patrimonial e DRE com formulas automaticas.',
    'Livro caixa e razao contabil em conformidade com normas brasileiras.',
    'Controle fiscal com ICMS, PIS, COFINS e calculo de impostos.'
  ],
  logistica: [
    'Planejamento de rotas e frotas com indicadores de capacidade.',
    'Matriz de entregas e escalacao para materiais criticos.',
    'Rastreamento de documentos (NF-e, CT-e, MDF-e) com status.'
  ],
  qualidade: [
    'Calendario de auditorias com rastreamento de nao conformidades.',
    'Indicadores de qualidade e relatorios de desvios ISO.',
    'Listas de licoes aprendidas e melhorias de processos.'
  ],
  compras: [
    'Cotacoes com comparativo de fornecedores e aprovacoes.',
    'Cadastro de fornecedores com avaliacoes e historico.',
    'Ordens de compra com rastreamento de entregas e pagamentos.'
  ],
  administracao: [
    'Agendas de reunioes com controle de decisoes e acoes.',
    'Modelos de documentos administrativos e contratos.',
    'Dashboards de KPIs para diretoria e conselhos.'
  ]
}

const getCategoryFocusPoints = (categoryId: string) => {
  return CATEGORY_FOCUS_POINTS[categoryId as CategoryId] || DEFAULT_CATEGORY_FOCUS
}

const SUPPORT_CARDS = [
  {
    title: 'Documentado',
    body: 'Cada arquivo contem premissas, dados de exemplo e instrucoes de uso.'
  },
  {
    title: 'Facil de adaptar',
    body: 'Toda a logica e baseada em formulas - sem macros, sem dependencias.'
  },
  {
    title: 'Suporte incluso',
    body: 'Ajudamos com personalizacoes e respondemos duvidas em ate 2 dias uteis.'
  }
]

// Carregar dados do template no servidor com tratamento de erros robusto
async function getTemplateData(slug: string) {
  try {
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')
    if (!sanitizedSlug) {
      console.warn(`Invalid slug: ${slug}`)
      return null
    }

    const dataPath = path.join(process.cwd(), 'public', 'data', `${sanitizedSlug}.json`)

    try {
      await fs.access(dataPath)
    } catch {
      console.log(`Template data not found: ${dataPath}`)
      return null
    }

    const fileContent = await fs.readFile(dataPath, 'utf8')

    if (!fileContent || fileContent.trim() === '') {
      return null
    }

    const data = JSON.parse(fileContent)

    if (!data || typeof data !== 'object') {
      console.warn(`Invalid data structure in: ${dataPath}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error loading template data for slug "${slug}":`, error)
    return null
  }
}

// Gerar metadados para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const resolvedSlug = decodeURIComponent(resolvedParams.slug || '')
      .trim()
      .replace(/^\/+|\/+$/g, '')

    // Primeiro verificar se e uma categoria
    const category = getCategoryBySlug(resolvedSlug)

    if (category) {
      const plantillas = await getGeneratedTemplatesByCategory(category.name)
      const displayPlantillas = plantillas.length > 0 ? plantillas : []
      const lastRefreshedLabel = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date())

      return {
        title: `Planilhas ${category.name} Excel Gratis | PlanilhaBR.com`,
        description: `Baixe planilhas ${category.name} Excel profissionais e gratuitas. ${displayPlantillas.length > 0 ? `${displayPlantillas.length} planilhas disponiveis` : 'Em preparacao'}. ${category.description}`,
        keywords: `planilha ${category.name.toLowerCase()}, planilha excel ${category.name.toLowerCase()} gratis, ${category.slug} excel`,
        openGraph: {
          title: `Planilhas ${category.name} Excel Gratis`,
          description: category.description,
          type: 'website',
          url: `https://www.planilhabr.com/${category.slug}/`
        },
        alternates: {
          canonical: `https://www.planilhabr.com/${category.slug}/`
        }
      }
    }

    // Se nao for categoria, tenta carregar dados da planilha
    const plantillaData = await getTemplateData(resolvedSlug)

    if (!plantillaData) {
      return {
        title: 'Pagina nao encontrada - PlanilhaBR.com',
        description: 'A pagina solicitada nao foi encontrada.'
      }
    }

    const title = String(plantillaData.metaTitle || plantillaData.title || 'Planilha Excel')
    const description = String(plantillaData.metaDescription || plantillaData.description || 'Planilha Excel gratuita')
    const canonicalSlug = String(plantillaData.slug || resolvedSlug)

    return {
      title,
      description,
      keywords: String(plantillaData.keyword || 'planilha excel, brasil'),
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://www.planilhabr.com/${canonicalSlug}/`
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description
      },
      alternates: {
        canonical: `https://www.planilhabr.com/${canonicalSlug}/`
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1
        }
      }
    }
  } catch (error) {
    console.error('Erro ao gerar metadados:', error)
    return {
      title: 'Planilha Excel - PlanilhaBR.com',
      description: 'Planilha Excel gratuita'
    }
  }
}

export async function generateStaticParams() {
  return getAllCategories().map(category => ({ slug: category.slug }))
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params
    const resolvedSlug = decodeURIComponent(resolvedParams.slug || '')
      .trim()
      .replace(/^\/+|\/+$/g, '')

    // Primeiro verificar se e uma categoria
    const category = getCategoryBySlug(resolvedSlug)

    if (category) {
      // Renderizar pagina de categoria
      const plantillas = await getGeneratedTemplatesByCategory(category.name)

      const templates = plantillas.map(p => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        downloadCount: p.downloadCount
      }))

      const allCategoriesList = getAllCategories()
      const relatedCategories = allCategoriesList
        .filter(cat => cat.slug !== category.slug)
        .slice(0, 3)
        .map(cat => ({
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          icon: cat.icon,
          id: cat.id
        }))

      const focusPoints = getCategoryFocusPoints(category.id)

      return (
        <CategoryPage
          category={category}
          templates={templates}
          relatedCategories={relatedCategories}
          focusPoints={focusPoints}
        />
      )
    }

    // Se nao for categoria, e uma planilha
    const plantillaData = await getTemplateData(resolvedSlug)

    if (!plantillaData) {
      notFound()
    }

    const getCategorySlug = (categoryName: string): string => {
      if (!categoryName) {
        return 'financeiro'
      }

      const normalizedName = categoryName.trim().toLowerCase()
      const categoryMatch = getAllCategories().find((category) => {
        const name = category.name.trim().toLowerCase()
        const slug = category.slug.trim().toLowerCase()
        return name === normalizedName || slug === normalizedName
      })

      if (categoryMatch) {
        return categoryMatch.slug
      }

      return normalizedName.replace(/\s+/g, '-')
    }

    const safeTitle = String(plantillaData.title || 'Planilha Excel')
    const safeH1 = String(plantillaData.h1 || plantillaData.title || 'Planilha Excel')
    const safeCategory = String(plantillaData.category || 'Negocios')
    const categorySlug = getCategorySlug(safeCategory)

    const breadcrumbs = [
      { name: 'Inicio', href: '/' },
      { name: safeCategory, href: `/${categorySlug}/` },
      { name: safeH1, href: `/${resolvedSlug}/` }
    ]

    const [relatedPlantillas, latestPlantillas] = await Promise.all([
      getRelatedPlantillas(resolvedSlug, safeCategory),
      getLatestPlantillas(resolvedSlug)
    ])

    return (
      <PlantillaTemplate
        plantilla={plantillaData}
        breadcrumbs={breadcrumbs}
        slug={resolvedSlug}
        relatedPlantillas={relatedPlantillas}
        latestPlantillas={latestPlantillas}
      />
    )
  } catch (error) {
    console.error('Erro em DynamicPage:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pagina nao encontrada</h1>
          <p className="text-gray-600">A pagina solicitada nao pode ser carregada.</p>
        </div>
      </div>
    )
  }
}
