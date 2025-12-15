/**
 * Client-safe utility functions for plantillas
 */

/**
 * Formata uma data em formato legivel brasileiro
 */
export function formatDateBrazilian(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return 'Recentemente'
  }
}

/**
 * Obtém o nome de categoria em português
 */
export function getCategoryDisplayName(category: string): string {
  const categoryNames: { [key: string]: string } = {
    'financeiro': 'Financeiro',
    'estoque': 'Estoque',
    'vendas': 'Vendas',
    'rh': 'Recursos Humanos',
    'projetos': 'Projetos',
    'produtividade': 'Produtividade',
    'marketing': 'Marketing',
    'contabilidade': 'Contabilidade',
    'logistica': 'Logistica',
    'qualidade': 'Qualidade',
    'compras': 'Compras',
    'administracao': 'Administracao'
  }

  return categoryNames[category] || category
}
