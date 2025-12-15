import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.planilhabr.com'
  const currentDate = new Date().toISOString()

  // Paginas estaticas do site
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' }, // Home
    { url: 'planilhas', priority: '0.9', changefreq: 'daily' },
    { url: 'sobre-nos', priority: '0.7', changefreq: 'monthly' },
    { url: 'contato', priority: '0.8', changefreq: 'monthly' },
    { url: 'termos', priority: '0.5', changefreq: 'yearly' },
    { url: 'politica-privacidade', priority: '0.5', changefreq: 'yearly' },
    { url: 'politica-cookies', priority: '0.5', changefreq: 'yearly' }
  ]

  const urlEntries = staticPages.map(page => {
    // Agregar trailing slash si la URL no está vacía (home ya lo tiene en baseUrl)
    const url = page.url ? `${page.url}/` : ''
    return `  <url>
    <loc>${baseUrl}/${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  }).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
    }
  })
}
