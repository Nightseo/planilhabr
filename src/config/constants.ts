/**
 * Constantes centralizadas do sistema PlanilhaBR
 * Configuracao imutavel e tipada
 */

import type { Category, CategoryId } from '@/types'

// ===============================
// CONFIGURACAO DO SITE
// ===============================

export const SITE_CONFIG = {
  NAME: 'PlanilhaBR.com',
  DESCRIPTION: 'Planilhas Excel gratuitas para gestao financeira, controle de estoque, RH e muito mais com suporte de IA.',
  URL: process.env.NEXTAUTH_URL || 'https://www.planilhabr.com',
  AUTHOR: 'PlanilhaBR',
  LANGUAGE: 'pt-BR',
  LOCALE: 'pt_BR',
  TWITTER_HANDLE: '@PlanilhaBR',
  VERIFICATION_TOKEN: 'PlanilhaBR-2025-Verification-Token'
} as const

// ===============================
// CONFIGURACAO DE METADADOS
// ===============================

export const META_CONFIG = {
  DEFAULT_TITLE: 'PlanilhaBR.com - Planilhas Excel Gratuitas e Profissionais',
  TITLE_TEMPLATE: '%s - PlanilhaBR.com',
  DEFAULT_DESCRIPTION: 'PlanilhaBR oferece planilhas Excel profissionais para controle financeiro, gestao de estoque, RH, vendas e muito mais - 100% gratuitas e prontas para uso.',
  KEYWORDS: 'planilha excel, planilha excel gratis, planilha controle financeiro, planilha estoque, planilha fluxo de caixa',
  OG_IMAGE: '/template-image-excel.jpg',
  FAVICON: '/planilhabr-favicon.png'
} as const

// ===============================
// CONFIGURACAO DE CATEGORIAS
// ===============================

export const CATEGORIES: Record<CategoryId, Category> = {
  financeiro: {
    id: 'financeiro',
    name: 'Financeiro',
    description: 'Planilhas de fluxo de caixa, orcamento, contas a pagar/receber e controle financeiro empresarial.',
    icon: 'banknotes',
    slug: 'financeiro',
    plantillaCount: 0
  },
  estoque: {
    id: 'estoque',
    name: 'Estoque',
    description: 'Controle de inventario, entrada e saida de produtos, alertas de reposicao e movimentacao.',
    icon: 'archive-box',
    slug: 'estoque',
    plantillaCount: 0
  },
  vendas: {
    id: 'vendas',
    name: 'Vendas',
    description: 'Planilhas para gestao de vendas, comissoes, metas, CRM e funil de vendas.',
    icon: 'chart-bar',
    slug: 'vendas',
    plantillaCount: 0
  },
  rh: {
    id: 'rh',
    name: 'Recursos Humanos',
    description: 'Controle de funcionarios, ferias, folha de pagamento, banco de horas e indicadores de RH.',
    icon: 'users',
    slug: 'recursos-humanos',
    plantillaCount: 0
  },
  projetos: {
    id: 'projetos',
    name: 'Projetos',
    description: 'Cronogramas, Gantt, gestao de tarefas, acompanhamento de projetos e metodologias ageis.',
    icon: 'clipboard-document-check',
    slug: 'projetos',
    plantillaCount: 0
  },
  produtividade: {
    id: 'produtividade',
    name: 'Produtividade',
    description: 'Planilhas de organizacao pessoal, agenda, listas de tarefas e gestao do tempo.',
    icon: 'bolt',
    slug: 'produtividade',
    plantillaCount: 0
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    description: 'Planejamento de campanhas, analise de ROI, calendario editorial e metricas de marketing.',
    icon: 'megaphone',
    slug: 'marketing',
    plantillaCount: 0
  },
  contabilidade: {
    id: 'contabilidade',
    name: 'Contabilidade',
    description: 'Balanco patrimonial, DRE, livro caixa, razao contabil e controle fiscal.',
    icon: 'calculator',
    slug: 'contabilidade',
    plantillaCount: 0
  },
  logistica: {
    id: 'logistica',
    name: 'Logistica',
    description: 'Controle de entregas, roteirizacao, frota, custos de transporte e rastreamento.',
    icon: 'truck',
    slug: 'logistica',
    plantillaCount: 0
  },
  qualidade: {
    id: 'qualidade',
    name: 'Qualidade',
    description: 'Checklists, auditorias, indicadores de qualidade, PDCA e gestao de nao conformidades.',
    icon: 'check-badge',
    slug: 'qualidade',
    plantillaCount: 0
  },
  compras: {
    id: 'compras',
    name: 'Compras',
    description: 'Cotacoes, cadastro de fornecedores, ordens de compra e controle de suprimentos.',
    icon: 'shopping-cart',
    slug: 'compras',
    plantillaCount: 0
  },
  administracao: {
    id: 'administracao',
    name: 'Administracao',
    description: 'Planilhas gerais de gestao empresarial, indicadores KPI e dashboards administrativos.',
    icon: 'building-office',
    slug: 'administracao',
    plantillaCount: 0
  }
} as const

// ===============================
// CONFIGURACAO DE NAVEGACAO
// ===============================

export const NAVIGATION_CONFIG = {
  MAIN_MENU: [
    { id: 'home', label: 'Inicio', href: '/', primary: false },
    { id: 'categories', label: 'Categorias', href: '/#templates', primary: false },
    { id: 'templates', label: 'Planilhas', href: '/planilhas', primary: false },
    { id: 'contact', label: 'Contato', href: '/contato', primary: true }
  ]
} as const

export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '/' },
  { name: 'Categorias', href: '/#templates' },
  { name: 'Planilhas', href: '/planilhas' },
  { name: 'Contato', href: '/contato' }
] as const

export const FOOTER_LINKS = {
  legal: [
    { name: 'Politica de Privacidade', href: '/politica-privacidade' },
    { name: 'Politica de Cookies', href: '/politica-cookies' },
    { name: 'Contato', href: '/contato' }
  ],
  categories: Object.values(CATEGORIES).slice(0, 6).map(cat => ({
    name: cat.name,
    href: `/${cat.slug}`
  }))
} as const

// ===============================
// CONFIGURACAO DE API
// ===============================

export const API_CONFIG = {
  ENDPOINTS: {
    EXCEL_GENERATION: '/api/generator',
    SEO_GENERATION: '/api/generator/seo',
    AI_DATA: '/api/ai-data',
    RECOVER_KEYWORDS: '/api/recover-keywords',
    SITEMAP: '/sitemap.xml',
    ROBOTS: '/robots.txt'
  },
  TIMEOUTS: {
    EXCEL_GENERATION: 300000, // 5 minutos
    SEO_GENERATION: 120000,   // 2 minutos
    DEFAULT: 30000            // 30 segundos
  },
  RETRY_ATTEMPTS: 3,
  RATE_LIMITS: {
    EXCEL_GENERATION: 5,  // por hora
    SEO_GENERATION: 10    // por hora
  }
} as const

// ===============================
// CONFIGURACAO DE ARMAZENAMENTO
// ===============================

export const STORAGE_KEYS = {
  KEYWORDS: 'planilhabr-keywords-v2',
  LEGACY_KEYWORDS: 'planilhabr-keywords'
} as const

// ===============================
// CONFIGURACAO DE EXCEL
// ===============================

export const EXCEL_CONFIG = {
  SUPPORTED_FORMATS: ['.xlsx', '.xls'],
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MODELS: {
    PRIMARY: 'GPT-4o-mini',
    FALLBACK: 'GPT-4'
  },
  CHART_TYPES: ['bar', 'line', 'pie', 'scatter'],
  LANGUAGES: ['portugues', 'ingles', 'espanhol'],
  COUNTRIES: ['brasil', 'usa', 'espanha']
} as const

// ===============================
// CONFIGURACAO DE KEYWORDS
// ===============================

export const KEYWORD_CONFIG = {
  STATUSES: {
    PENDING: 'pending',
    EXCEL_GENERATED: 'excel_generated',
    SEO_GENERATED: 'seo_generated',
    COMPLETED: 'completed'
  },
  DIFFICULTIES: {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
  },
  SORT_OPTIONS: [
    { value: 'keyword', label: 'Palavra-chave' },
    { value: 'volume', label: 'Volume' },
    { value: 'difficulty', label: 'Dificuldade' },
    { value: 'cpc', label: 'CPC' },
    { value: 'status', label: 'Status' }
  ]
} as const

// ===============================
// CONFIGURACAO DE UI
// ===============================

export const UI_CONFIG = {
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px'
  },
  ANIMATIONS: {
    DURATION: {
      FAST: '150ms',
      NORMAL: '300ms',
      SLOW: '500ms'
    },
    EASING: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      IN: 'cubic-bezier(0.4, 0, 1, 1)',
      OUT: 'cubic-bezier(0, 0, 0.2, 1)'
    }
  },
  COLORS: {
    PRIMARY: {
      50: '#f0fdf4',
      500: '#166534',
      600: '#15803d',
      700: '#14532d',
      800: '#0f3d21',
      900: '#0a2817'
    },
    ACCENT: {
      50: '#fefce8',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207'
    },
    SECONDARY: {
      50: '#f8fafc',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  }
} as const

// ===============================
// CONFIGURACAO DE VALIDACAO
// ===============================

export const VALIDATION_CONFIG = {
  KEYWORD: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\s\-]+$/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  SEARCH: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    DEBOUNCE_MS: 300
  }
} as const

// ===============================
// CONFIGURACAO DE CACHE
// ===============================

export const CACHE_CONFIG = {
  TTL: {
    CATEGORIES: 3600,     // 1 hora
    PLANTILLAS: 1800,     // 30 minutos
    KEYWORDS: 300,        // 5 minutos
    STATIC_CONTENT: 86400 // 24 horas
  },
  KEYS: {
    CATEGORIES: 'categories',
    PLANTILLAS: 'plantillas',
    KEYWORDS: 'keywords'
  }
} as const

// ===============================
// TEXTOS E COPIAS - ESTILO EDUCACIONAL
// ===============================

export const TEXT_CONFIG = {
  COMMON: {
    LOADING: 'Um momento por favor...',
    ERROR: 'Ops! Algo deu errado',
    SUCCESS: 'Perfeito! Deu tudo certo!',
    DOWNLOAD: 'Baixar planilha agora',
    CANCEL: 'Cancelar',
    CONFIRM: 'Entendi',
    CLOSE: 'Fechar'
  },
  BUTTONS: {
    DOWNLOAD_EXCEL: 'Baixar planilha Excel',
    GENERATE_EXCEL: 'Criar planilha personalizada',
    GENERATE_SEO: 'Iniciar otimizacao SEO',
    VIEW_MORE: 'Ver mais planilhas',
    BACK_TO_TOP: 'Voltar ao topo'
  },
  EDUCATIONAL: {
    HERO_TITLE: 'Planilhas Excel Profissionais',
    HERO_SUBTITLE: 'Planilhas gratuitas para controle financeiro, estoque, RH e muito mais',
    LEARN_MORE: 'Explorar planilhas',
    GET_STARTED: 'Comecar agora',
    MASTER_EXCEL: 'Domine o Excel',
    TUTORIAL_AVAILABLE: '✓ Com tutorial',
    BEGINNER_FRIENDLY: '✓ Para iniciantes'
  },
  ARIA_LABELS: {
    MENU_TOGGLE: 'Abrir/fechar menu principal',
    SEARCH: 'Buscar planilhas Excel',
    CATEGORY_MENU: 'Exibir categorias',
    DOWNLOAD: 'Baixar planilha Excel',
    EXTERNAL_LINK: 'Link externo (abre em nova janela)'
  }
} as const
