/**
 * Category Icon Mapping
 * Maps category IDs to Heroicons components for PlanilhaBR
 */

import {
  BanknotesIcon,
  ArchiveBoxIcon,
  ChartBarIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  BoltIcon,
  MegaphoneIcon,
  CalculatorIcon,
  TruckIcon,
  CheckBadgeIcon,
  ShoppingCartIcon,
  BuildingOfficeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import type { CategoryId } from '@/types'

export const categoryIconMap: Record<CategoryId, any> = {
  financeiro: BanknotesIcon,
  estoque: ArchiveBoxIcon,
  vendas: ChartBarIcon,
  rh: UsersIcon,
  projetos: ClipboardDocumentCheckIcon,
  produtividade: BoltIcon,
  marketing: MegaphoneIcon,
  contabilidade: CalculatorIcon,
  logistica: TruckIcon,
  qualidade: CheckBadgeIcon,
  compras: ShoppingCartIcon,
  administracao: BuildingOfficeIcon
}

export const getCategoryIcon = (categoryId: string) => {
  return categoryIconMap[categoryId as CategoryId] || DocumentTextIcon
}
