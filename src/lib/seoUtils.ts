import { BookingHotel, getAllHotels } from '@/services/hotelService'

interface SitemapEntry {
  url: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: string
}

export function generateSitemap(): string {
  const baseUrl = 'https://esc-2026-vienna.com'
  const currentDate = new Date().toISOString().split('T')[0]
  const hotels = getAllHotels()
  
  const sitemapEntries: SitemapEntry[] = [
    // Main pages
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/hotels`,
      lastmod: currentDate,
      changefreq: 'hourly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/search`,
      lastmod: currentDate,
      changefreq: 'hourly',
      priority: '0.8'
    },
    
    // Hotel detail pages
    ...hotels.map(hotel => ({
      url: `${baseUrl}/hotel/${hotel.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly' as const,
      priority: '0.7'
    })),
    
    // Category pages
    {
      url: `${baseUrl}/lgbtq-hotels`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/pride-certified-hotels`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/boutique-hotels`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/luxury-hotels`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/budget-hotels`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    
    // District pages
    {
      url: `${baseUrl}/hotels/rudolfsheim-funfhaus`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/hotels/innere-stadt`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/hotels/mariahilf`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/hotels/neubau`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.6'
    },
    
    // Eurovision specific pages
    {
      url: `${baseUrl}/eurovision-2026`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/wiener-stadthalle-hotels`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/eurovision-packages`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    
    // Information pages
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.3'
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.3'
    },
    {
      url: `${baseUrl}/privacy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.2'
    },
    {
      url: `${baseUrl}/terms`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.2'
    }
  ]

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  const urlsetClose = '</urlset>'
  
  const urlEntries = sitemapEntries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('')

  return `${xmlHeader}\n${urlsetOpen}${urlEntries}\n${urlsetClose}`
}

export function generateSitemapIndex(): string {
  const baseUrl = 'https://esc-2026-vienna.com'
  const currentDate = new Date().toISOString().split('T')[0]
  
  const sitemaps = [
    {
      url: `${baseUrl}/sitemap-main.xml`,
      lastmod: currentDate
    },
    {
      url: `${baseUrl}/sitemap-hotels.xml`,
      lastmod: currentDate
    },
    {
      url: `${baseUrl}/sitemap-categories.xml`,
      lastmod: currentDate
    },
    {
      url: `${baseUrl}/sitemap-districts.xml`,
      lastmod: currentDate
    }
  ]

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const sitemapIndexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  const sitemapIndexClose = '</sitemapindex>'
  
  const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('')

  return `${xmlHeader}\n${sitemapIndexOpen}${sitemapEntries}\n${sitemapIndexClose}`
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  const baseUrl = 'https://esc-2026-vienna.com'
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-index.xml

# Eurovision 2026 specific
Allow: /eurovision-2026
Allow: /hotels/*
Allow: /lgbtq-hotels
Allow: /pride-certified-hotels

# Block admin/staging areas (if any)
Disallow: /admin/
Disallow: /staging/
Disallow: /test/

# Block affiliate tracking parameters
Disallow: /*?aid=*
Disallow: /*?affiliate=*

# Allow important Eurovision pages
Allow: /wiener-stadthalle-hotels
Allow: /eurovision-packages
Allow: /search

# Crawl delay for different bots
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

User-agent: Slurp
Crawl-delay: 3

# Block AI training crawlers (optional)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /`
}

// Generate specific sitemap for hotels
export function generateHotelsSitemap(): string {
  const baseUrl = 'https://esc-2026-vienna.com'
  const currentDate = new Date().toISOString().split('T')[0]
  const hotels = getAllHotels()
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  const urlsetClose = '</urlset>'
  
  const hotelEntries = hotels.map(hotel => {
    const priority = hotel.lgbtq_friendly ? '0.8' : '0.6'
    const changefreq = hotel.lgbt_certification === 'certified' ? 'weekly' : 'monthly'
    
    return `
  <url>
    <loc>${baseUrl}/hotel/${hotel.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/default-hotel.jpg</image:loc>
      <image:caption>${hotel.name} - Eurovision 2026 Wien ${hotel.lgbt_certification === 'certified' ? 'Pride Certified' : 'LGBTQ+ Friendly'} Hotel</image:caption>
      <image:title>${hotel.name}</image:title>
    </image:image>
  </url>`
  }).join('')

  return `${xmlHeader}\n${urlsetOpen}${hotelEntries}\n${urlsetClose}`
}

// SEO Utils for meta tag optimization
export class SEOUtils {
  static generateHotelTitle(hotel: BookingHotel): string {
    const certText = hotel.lgbt_certification === 'certified' ? '🏳️‍🌈 Pride Certified' : '🤝 LGBTQ+ Friendly'
    return `${hotel.name} | Eurovision 2026 Wien | ${certText} Hotel ab €${hotel.price.amount}`
  }
  
  static generateHotelDescription(hotel: BookingHotel): string {
    const certText = hotel.lgbt_certification === 'certified' ? 'Pride-zertifiziertes' : 'LGBTQ+ freundliches'
    return `${certText} Hotel ${hotel.name} für Eurovision 2026 - nur ${hotel.distance_km_to_venue}km zur Wiener Stadthalle. Ab €${hotel.price.amount}/Nacht. ${hotel.description?.slice(0, 100)}... Jetzt buchen!`
  }
  
  static generateSearchTitle(hotels: BookingHotel[], searchType?: string): string {
    const lgbtqCount = hotels.filter(h => h.lgbtq_friendly).length
    const searchPrefix = searchType ? `${searchType} ` : ''
    return `${hotels.length} ${searchPrefix}Eurovision 2026 Hotels Wien | ${lgbtqCount} LGBTQ+ freundlich | Pride Certified`
  }
  
  static generateSearchDescription(hotels: BookingHotel[]): string {
    if (hotels.length === 0) return 'Keine Hotels gefunden. Versuchen Sie andere Suchkriterien für Eurovision 2026 in Wien.'
    
    const minPrice = Math.min(...hotels.map(h => h.price.amount))
    const maxPrice = Math.max(...hotels.map(h => h.price.amount))
    const lgbtqCount = hotels.filter(h => h.lgbtq_friendly).length
    const avgDistance = Math.round(hotels.reduce((sum, h) => sum + h.distance_km_to_venue, 0) / hotels.length * 10) / 10
    
    return `${hotels.length} verfügbare Hotels für Eurovision 2026 in Wien. ${lgbtqCount} LGBTQ+ freundlich, ab €${minPrice}-€${maxPrice}/Nacht. Durchschnittlich ${avgDistance}km zur Stadthalle.`
  }
  
  static generateStructuredBreadcrumb(currentHotel?: BookingHotel, searchType?: string) {
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Eurovision 2026 Wien",
          "item": "https://esc-2026-vienna.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hotels",
          "item": "https://esc-2026-vienna.com/hotels"
        }
      ]
    }
    
    if (searchType) {
      breadcrumb.itemListElement.push({
        "@type": "ListItem",
        "position": 3,
        "name": searchType,
        "item": `https://esc-2026-vienna.com/${searchType.toLowerCase().replace(/\s+/g, '-')}`
      } as any)
    }
    
    if (currentHotel) {
      breadcrumb.itemListElement.push({
        "@type": "ListItem",
        "position": breadcrumb.itemListElement.length + 1,
        "name": currentHotel.name,
        "item": `https://esc-2026-vienna.com/hotel/${currentHotel.slug}`
      } as any)
    }
    
    return breadcrumb
  }
}