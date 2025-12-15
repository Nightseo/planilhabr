import { Metadata } from 'next'
import { getTemplateStats, getLatestGeneratedTemplates } from '@/lib/plantillas'
import HeroSection from '@/components/homepage/HeroSection'
import TemplateCategoriesSection from '@/components/homepage/TemplateCategoriesSection'
import FeaturesSection from '@/components/homepage/FeaturesSection'
import HowItWorksSection from '@/components/homepage/CodeTerminalSection'
import FAQSection from '@/components/homepage/StatsSection'
import CTASection from '@/components/homepage/CTASection'

export const metadata: Metadata = {
  title: 'PlanilhaBR.com | Planilhas Excel Gratuitas e Profissionais',
  description:
    'PlanilhaBR oferece planilhas Excel profissionais para controle financeiro, gestao de estoque, RH, vendas e muito mais. 100% gratuitas e prontas para uso.',
  keywords:
    'planilha excel, planilha excel gratis, planilha controle financeiro, planilha estoque, planilha fluxo de caixa, planilha rh',
  openGraph: {
    title: 'PlanilhaBR.com - Planilhas Excel Profissionais para seu Negocio',
    description:
      'Baixe planilhas Excel gratuitas para controle financeiro, gestao de estoque, recursos humanos e muito mais. Prontas para uso imediato.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.planilhabr.com/',
    siteName: 'PlanilhaBR.com'
  },
  alternates: {
    canonical: 'https://www.planilhabr.com/'
  }
}

export default async function HomePage() {
  const [stats, latestTemplates] = await Promise.all([
    getTemplateStats(),
    getLatestGeneratedTemplates(3)
  ])
  const totalModels = stats.totalTemplates || 28
  const recentTemplates = latestTemplates.map(template => ({
    slug: template.slug,
    title: template.title,
    category: template.category
  }))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection totalModules={totalModels} recentTemplates={recentTemplates} />

      {/* Template Categories */}
      <TemplateCategoriesSection totalModels={totalModels} />

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <CTASection totalModels={totalModels} />

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PlanilhaBR.com",
            "url": "https://www.planilhabr.com",
            "logo": "https://www.planilhabr.com/icon.png",
            "description": "Planilhas Excel profissionais para controle financeiro, gestao de estoque, RH e muito mais - 100% gratuitas.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR",
              "addressRegion": "Sao Paulo",
              "addressLocality": "Sao Paulo"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "contato@planilhabr.com",
              "contactType": "customer service",
              "areaServed": "BR",
              "availableLanguage": "Portuguese"
            },
            "foundingDate": "2025"
          })
        }}
      />
    </div>
  )
}
