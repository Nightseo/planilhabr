import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `# PlanilhaBR.com - Robots.txt
# Planilhas Excel profissionais gratuitas para empresas brasileiras

User-agent: *
Allow: /

# Block admin/test pages
Disallow: /excel-generator
Disallow: /keywords
Disallow: /test-simple
Disallow: /todas-planilhas

# Sitemap Index
Sitemap: https://www.planilhabr.com/sitemap-index.xml`

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  })
} 
