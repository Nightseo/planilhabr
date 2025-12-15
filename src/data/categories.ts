export const categoriesData = {
  financeiro: {
    id: 'financeiro' as const,
    slug: 'financeiro',
    name: 'Financeiro',
    description: 'Planilhas de fluxo de caixa, orcamento, contas a pagar/receber e controle financeiro empresarial.',
    icon: 'banknotes',
    color: 'green'
  },
  estoque: {
    id: 'estoque' as const,
    slug: 'estoque',
    name: 'Estoque',
    description: 'Controle de inventario, entrada e saida de produtos, alertas de reposicao e movimentacao.',
    icon: 'archive-box',
    color: 'emerald'
  },
  vendas: {
    id: 'vendas' as const,
    slug: 'vendas',
    name: 'Vendas',
    description: 'Planilhas para gestao de vendas, comissoes, metas, CRM e funil de vendas.',
    icon: 'chart-bar',
    color: 'green'
  },
  rh: {
    id: 'rh' as const,
    slug: 'rh',
    name: 'RH',
    description: 'Controle de funcionarios, ferias, folha de pagamento, banco de horas e indicadores de RH.',
    icon: 'users',
    color: 'teal'
  },
  projetos: {
    id: 'projetos' as const,
    slug: 'projetos',
    name: 'Projetos',
    description: 'Cronogramas, Gantt, gestao de tarefas, acompanhamento de projetos e metodologias ageis.',
    icon: 'clipboard-document-check',
    color: 'cyan'
  },
  marketing: {
    id: 'marketing' as const,
    slug: 'marketing',
    name: 'Marketing',
    description: 'Planejamento de campanhas, analise de ROI, calendario editorial e metricas de marketing.',
    icon: 'megaphone',
    color: 'lime'
  }
}

export const getAllCategories = () => {
  return Object.values(categoriesData)
}

export const getCategoryBySlug = (slug: string) => {
  if (!slug) {
    return null
  }

  const normalizedSlug = decodeURIComponent(slug)
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase()

  return getAllCategories().find(
    (category) =>
      category.slug.toLowerCase() === normalizedSlug ||
      category.id.toLowerCase() === normalizedSlug
  ) || null
}
