import { Metadata } from 'next'
import { getAllCategories } from '@/data/categories'
import { getAllGeneratedTemplates } from '@/lib/plantillas'
import PlanilhasHero from '@/components/planilhas/PlanilhasHero'
import PlanilhasContent from '@/components/planilhas/PlanilhasContent'
import PlanilhasSEOContent from '@/components/planilhas/PlanilhasSEOContent'

export const metadata: Metadata = {
  title: 'Planilhas Excel Gratuitas | PlanilhaBR - Download Imediato',
  description: 'Biblioteca completa de planilhas Excel profissionais e gratuitas. Controle financeiro, gestao de estoque, RH, vendas e muito mais. Baixe agora sem cadastro.',
  keywords: 'planilha excel gratis, planilha controle financeiro, planilha estoque, planilha fluxo de caixa, planilha rh, download planilha excel',
  openGraph: {
    title: 'Planilhas Excel Gratuitas para Download - PlanilhaBR.com',
    description: 'Mais de 126 planilhas Excel profissionais para gestao empresarial. 100% gratuitas e prontas para uso.',
    url: 'https://www.planilhabr.com/planilhas/',
    type: 'website'
  },
  alternates: {
    canonical: 'https://www.planilhabr.com/planilhas/'
  }
}

export default async function PlanilhasPage() {
  const categories = getAllCategories()
  const allTemplates = await getAllGeneratedTemplates()

  const templates = allTemplates.map(template => ({
    slug: template.slug,
    title: template.title,
    h1: template.h1,
    category: template.category,
    description: template.description
  }))

  const categoryFilters = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug
  }))

  return (
    <div className="min-h-screen bg-white">
      <PlanilhasHero totalTemplates={templates.length} />
      <PlanilhasContent templates={templates} categories={categoryFilters} />
      <PlanilhasSEOContent />
    </div>
  )
}
