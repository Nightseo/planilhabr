import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLatestGeneratedTemplates, getAllGeneratedTemplates } from "@/lib/plantillas";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Metadados SEO aprimorados para melhor indexacao no Google
export const metadata: Metadata = {
  metadataBase: new URL('https://www.planilhabr.com'),
  title: {
    default: 'PlanilhaBR.com - Planilhas Excel Gratuitas e Profissionais',
  },
  description: 'Planilhas Excel gratuitas para controle financeiro, gestao de estoque, RH, vendas e muito mais. Desenvolvido pela PlanilhaBR com sede em Sao Paulo.',
  keywords: ['planilha excel', 'planilha excel gratis', 'planilha controle financeiro', 'planilha estoque', 'planilha fluxo de caixa'],
  authors: [{ name: 'PlanilhaBR' }],
  creator: 'PlanilhaBR',
  publisher: 'PlanilhaBR',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.planilhabr.com',
    siteName: 'PlanilhaBR.com',
    title: 'PlanilhaBR.com - Planilhas Excel Profissionais',
    description: 'Baixe planilhas Excel gratuitas para controle financeiro, estoque, RH e muito mais.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PlanilhaBR.com - Planilhas Excel profissionais gratuitas',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlanilhaBR.com - Planilhas Excel Gratuitas',
    description: 'Planilhas Excel profissionais para controle financeiro, estoque e gestao empresarial.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: { url: '/planilhabr-favicon.png', sizes: '512x512', type: 'image/png' },
    shortcut: '/planilhabr-favicon.png',
    apple: { url: '/planilhabr-favicon.png', sizes: '180x180', type: 'image/png' },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Carrega as 8 planilhas mais recentes para o dropdown do Header
  const latestPlantillas = await getLatestGeneratedTemplates(8);

  // Carrega todas as planilhas para busca client-side
  const allPlantillas = await getAllGeneratedTemplates();

  // Converte para formato do Header (usa h1 em vez de title)
  const latestTemplates = latestPlantillas.map((plantilla) => ({
    id: plantilla.slug,
    label: plantilla.h1 || plantilla.title,
    href: `/${plantilla.slug}`
  }));

  // Dados para busca client-side (ligero)
  const searchData = allPlantillas.map((p) => ({
    slug: p.slug,
    title: p.h1 || p.title,
    category: p.category || 'Geral'
  }));

  return (
    <html lang="pt-BR">
      <body className={`${dmSans.className} min-h-screen bg-white antialiased`}>
        <Header latestTemplates={latestTemplates} searchData={searchData} />
        <main id="main-content" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
