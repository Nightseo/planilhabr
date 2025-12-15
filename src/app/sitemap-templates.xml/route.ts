import { NextResponse } from 'next/server'
import { getAllGeneratedTemplates } from '@/lib/plantillas'

export async function GET() {
  const baseUrl = 'https://www.planilhabr.com'
  const currentDate = new Date().toISOString()

  try {
    // Obtener todas las plantillas generadas
    const plantillas = await getAllGeneratedTemplates()

    const urlEntries = plantillas.map(plantilla => {
      const lastmod = plantilla.updatedAt || plantilla.createdAt || currentDate

      return `  <url>
    <loc>${baseUrl}/${plantilla.slug}/</loc>
    <lastmod>${typeof lastmod === 'string' ? lastmod : new Date(lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
  } catch (error) {
    console.error('Error generating sitemap-templates:', error)

    // Retornar sitemap vacío en caso de error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`

    return new NextResponse(emptySitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  }
}
