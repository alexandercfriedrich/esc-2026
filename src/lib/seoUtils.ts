import { BookingHotel, getAllHotels } from '@/services/hotelService'

export default class SeoUtils {
  static generatePageTitle(hotels: BookingHotel[], searchType?: string): string {
    const lgbtqCount = hotels.filter(h => h.lgbtq_friendly).length
    const searchPrefix = searchType ? `${searchType} ` : ''
    return `${hotels.length} ${searchPrefix}Eurovision 2026 Hotels Wien | ${lgbtqCount} LGBTQ+ freundlich | Pride Certified`
  }

  static generatePageDescription(hotels: BookingHotel[]): string {
    if (hotels.length === 0) return 'Keine Hotels gefunden. Versuchen Sie andere Suchkriterien für Eurovision 2026 in Wien.'
    
    const minPrice = Math.min(...hotels.map(h => h.price.amount))
    const maxPrice = Math.max(...hotels.map(h => h.price.amount))
    const lgbtqCount = hotels.filter(h => h.lgbtq_friendly).length
    const avgDistance = Math.round(hotels.reduce((sum, h) => sum + h.distance_km_to_venue, 0) / hotels.length * 10) / 10
    
    return `${hotels.length} verfügbare Hotels für Eurovision 2026 in Wien. ${lgbtqCount} LGBTQ+ freundlich, ab €${minPrice}-€${maxPrice}/Nacht. Durchschnittlich ${avgDistance}km zur Stadthalle.`
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

  static generateStructuredData(hotels: BookingHotel[]) {
    const allHotels = getAllHotels()
    const totalHotels = allHotels.length
    const lgbtqCount = allHotels.filter(h => h.lgbtq_friendly).length
    
    // Main organization
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Eurovision 2026 Vienna - LGBTQ+ Freundliche Hotels",
      "description": `Offizielle Hotelsuche für Eurovision Song Contest 2026 in Wien. ${totalHotels} geprüfte Hotels, ${lgbtqCount} LGBTQ+ zertifiziert.`,
      "url": "https://esc-2026-vienna.com",
      "logo": "https://esc-2026-vienna.com/logo.png",
      "sameAs": [
        "https://eurovision.tv/",
        "https://www.wien.info/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+43-1-24555",
        "contactType": "customer service",
        "availableLanguage": ["German", "English"]
      }
    }

    // Event data
    const event = {
      "@context": "https://schema.org",
      "@type": "MusicEvent",
      "name": "Eurovision Song Contest 2026",
      "description": "Der 71. Eurovision Song Contest findet 2026 in der Wiener Stadthalle statt.",
      "startDate": "2026-05-12",
      "endDate": "2026-05-16",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Wiener Stadthalle",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Roland-Rainer-Platz 1",
          "addressLocality": "Wien",
          "postalCode": "1150",
          "addressCountry": "AT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.2014,
          "longitude": 16.3378
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "European Broadcasting Union",
        "url": "https://eurovision.tv/"
      }
    }

    // WebSite search action
    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Eurovision 2026 Vienna Hotels",
      "url": "https://esc-2026-vienna.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://esc-2026-vienna.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }

    // FAQ
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Wann findet Eurovision 2026 in Wien statt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Der Eurovision Song Contest 2026 findet vom 12. bis 16. Mai 2026 in der Wiener Stadthalle statt."
          }
        },
        {
          "@type": "Question",
          "name": "Welche Hotels sind LGBTQ+ freundlich?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Von unseren ${totalHotels} gelisteten Hotels sind ${lgbtqCount} als LGBTQ+ freundlich zertifiziert und bieten sichere, inklusive Unterkünfte.`
          }
        },
        {
          "@type": "Question",
          "name": "Wie weit sind die Hotels von der Stadthalle entfernt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alle Hotels sind nach Entfernung zur Wiener Stadthalle sortiert. Die meisten sind innerhalb von 5km und mit öffentlichen Verkehrsmitteln gut erreichbar."
          }
        }
      ]
    }

    return [organization, event, website, faq]
  }

  // Generate robots.txt content
  static generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Sitemap: https://esc-2026-vienna.com/sitemap.xml`;
}


  static generateSitemap(hotels: BookingHotel[]): string {
    const baseUrls = [
      'https://esc-2026-vienna.com',
      'https://esc-2026-vienna.com/hotels',
      'https://esc-2026-vienna.com/lgbtq-friendly',
      'https://esc-2026-vienna.com/budget-friendly',
      'https://esc-2026-vienna.com/luxury'
    ]

    const hotelUrls = hotels.map(hotel => 
      `https://esc-2026-vienna.com/hotel/${hotel.slug}`
    )

    const allUrls = [...baseUrls, ...hotelUrls]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${
    hotels.map(hotel => `
      <url>
        <loc>https://esc-2026-vienna.com/hotel/${hotel.slug}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `).join('\n')
  }
  <url>
    <loc>https://esc-2026-vienna.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://esc-2026-vienna.com/hotels</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

    return sitemap
  }
}
