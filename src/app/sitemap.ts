import type { MetadataRoute } from 'next'
import { getAllArtistSlugs } from '@/lib/artistDataManager'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://localhost:3000')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${BASE_URL}/artistes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/catalogue-inrealart-artcapital2026`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/inrealart-artcapital2026`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]

  const slugs = await getAllArtistSlugs()
  const artistRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [...staticRoutes, ...artistRoutes]
}
