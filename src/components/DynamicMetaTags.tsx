import React from 'react'
import { BookingHotel, getHotelImageUrl } from '@/services/hotelService'

interface DynamicMetaTagsProps {
  hotels?: BookingHotel[]
  currentHotel?: BookingHotel
  searchQuery?: string
  location?: string
  pageType?: 'home' | 'search' | 'hotel' | 'category' | 'credits'
}

export function DynamicMetaTags({ 
  hotels = [], 
  currentHotel, 
  searchQuery,
  location = 'Wien',
  pageType = 'home' 
}: DynamicMetaTagsProps) {
  
  // Dynamic title generation based on context
  const generateTitle = () => {
    if (currentHotel) {
      return `${currentHotel.name} | Eurovision 2026 Wien | LGBTQ+ Hotel ${currentHotel.lgbt_certification === 'certified' ? '🏳️‍🌈 Pride Certified' : '🤝 Gay Friendly'}`
    }
    
    if (pageType === 'credits') {
      return 'Bildnachweis | Eurovision 2026 Vienna Hotels | LGBTQ+ Freundliche ESC Unterkünfte'
    }
    
    if (pageType === 'search' && hotels.length > 0) {
      const lgbtqCount = hotels.filter(h => h.lgbtq_friendly).length
      const prideCount = hotels.filter(h => h.lgbt_certification === 'certified').length
      return `${hotels.length} Eurovision 2026 Hotels Wien | ${lgbtqCount} LGBTQ+ freundlich | ${prideCount} Pride Certified`
    }
    
    if (searchQuery) {
      return `${searchQuery} | Eurovision 2026 Wien Hotels | LGBTQ+ Unterkünfte ESC`
    }
    
    return 'Eurovision 2026 Vienna Hotels | LGBTQ+ Freundliche ESC Unterkünfte | Pride Certified'
  }

  // Dynamic description generation
  const generateDescription = () => {
    if (currentHotel) {
      const certText = currentHotel.lgbt_certification === 'certified' ? 'Pride-zertifiziertes' : 'LGBTQ+ freundliches'
      return `${certText} Hotel ${currentHotel.name} für Eurovision 2026 - ${currentHotel.distance_km_to_venue}km zur Stadthalle, ab €${currentHotel.price.amount}/Nacht. ${currentHotel.description?.slice(0, 100)}...`
    }
    
    if (pageType === 'credits') {
      return 'Bildnachweis und Quellenangaben für alle verwendeten Bilder, Logos und Medien auf der Eurovision 2026 Vienna Hotels Plattform.'
    }
    
    if (pageType === 'search' && hotels.length > 0) {
      const avgPrice = Math.round(hotels.reduce((sum, h) => sum + h.price.amount, 0) / hotels.length)
      const minDistance = Math.min(...hotels.map(h => h.distance_km_to_venue))
      return `${hotels.length} verfügbare Hotels für Eurovision 2026 in Wien. LGBTQ+ freundlich ab €${Math.min(...hotels.map(h => h.price.amount))}/Nacht. Nächstes Hotel ${minDistance}km zur Stadthalle.`
    }
    
    return '🏳️‍🌈 Buche jetzt die perfekten Hotels für Eurovision 2026 in Wien! LGBTQ+ freundliche Unterkünfte, Pride-zertifizierte Hotels und die besten Locations für ESC-Fans mit Community-Features.'
  }

  // Dynamic keywords generation
  const generateKeywords = () => {
    const baseKeywords = [
      'Eurovision 2026', 'Wien Hotels', 'LGBTQ freundlich', 'ESC Vienna', 
      'Eurovision Hotels', 'Pride Hotels Wien', 'Wiener Stadthalle',
      'Gay Friendly Vienna', 'Eurovision Song Contest 2026'
    ]
    
    if (currentHotel) {
      return [
        ...baseKeywords,
        currentHotel.name,
        currentHotel.district || '',
        currentHotel.lgbt_certification || '',
        ...currentHotel.categories
      ].filter(Boolean).join(', ')
    }
    
    if (hotels.length > 0) {
      const hotelNames = hotels.slice(0, 5).map(h => h.name)
      const districts = [...new Set(hotels.map(h => h.district).filter(Boolean))]
      const certifications = [...new Set(hotels.map(h => h.lgbt_certification).filter(Boolean))]
      
      return [
        ...baseKeywords,
        ...hotelNames,
        ...districts,
        ...certifications
      ].join(', ')
    }
    
    return baseKeywords.join(', ')
  }

  // Canonical URL generation
  const generateCanonicalUrl = () => {
    if (currentHotel) {
      return `https://esc-2026-vienna.com/hotel/${currentHotel.slug}`
    }
    
    if (pageType === 'search') {
      return 'https://esc-2026-vienna.com/search'
    }
    
    return 'https://esc-2026-vienna.com'
  }

  // Open Graph image selection
  const generateOGImage = () => {
    if (currentHotel && currentHotel.photos && currentHotel.photos.length > 0) {
      return getHotelImageUrl(currentHotel)
    }
    
    return 'https://esc-2026-vienna.com/eurovision-2026-vienna-hotels-og.jpg'
  }

  // Generate price range for structured data
  const generatePriceRange = () => {
    if (currentHotel) {
      return `€${currentHotel.price.min || currentHotel.price.amount}-€${currentHotel.price.max || currentHotel.price.amount}`
    }
    
    if (hotels.length > 0) {
      const minPrice = Math.min(...hotels.map(h => h.price.min || h.price.amount))
      const maxPrice = Math.max(...hotels.map(h => h.price.max || h.price.amount))
      return `€${minPrice}-€${maxPrice}`
    }
    
    return '€65-€800'
  }

  const title = generateTitle()
  const description = generateDescription()
  const keywords = generateKeywords()
  const canonicalUrl = generateCanonicalUrl()
  const ogImage = generateOGImage()
  const priceRange = generatePriceRange()

  return (
    <>
      {/* Dynamic Title */}
      <title>{title}</title>
      
      {/* Dynamic Meta Description */}
      <meta name="description" content={description} />
      
      {/* Dynamic Keywords */}
      <meta name="keywords" content={keywords} />
      
      {/* Dynamic Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Dynamic Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${currentHotel?.name || 'Eurovision 2026 Wien Hotels'} - LGBTQ+ freundliche Unterkünfte`} />
      
      {/* Dynamic Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Hotel-specific meta tags */}
      {currentHotel && (
        <>
          <meta name="hotel.name" content={currentHotel.name} />
          <meta name="hotel.rating" content={currentHotel.review_score.toString()} />
          <meta name="hotel.stars" content={currentHotel.stars.toString()} />
          <meta name="hotel.price" content={currentHotel.price.amount.toString()} />
          <meta name="hotel.distance" content={`${currentHotel.distance_km_to_venue}km`} />
          <meta name="hotel.lgbtq" content={currentHotel.lgbtq_friendly.toString()} />
          <meta name="hotel.certification" content={currentHotel.lgbt_certification || 'standard'} />
          <meta name="hotel.district" content={currentHotel.district || ''} />
        </>
      )}
      
      {/* Search results meta tags */}
      {pageType === 'search' && hotels.length > 0 && (
        <>
          <meta name="search.results_count" content={hotels.length.toString()} />
          <meta name="search.price_range" content={priceRange} />
          <meta name="search.lgbtq_count" content={hotels.filter(h => h.lgbtq_friendly).length.toString()} />
          <meta name="search.pride_certified_count" content={hotels.filter(h => h.lgbt_certification === 'certified').length.toString()} />
          <meta name="search.min_distance" content={`${Math.min(...hotels.map(h => h.distance_km_to_venue))}km`} />
          <meta name="search.avg_rating" content={(Math.round((hotels.reduce((sum, h) => sum + h.review_score, 0) / hotels.length) * 10) / 10).toString()} />
        </>
      )}
      
      {/* Additional Eurovision-specific meta tags */}
      <meta name="event.name" content="Eurovision Song Contest 2026" />
      <meta name="event.location" content="Wiener Stadthalle, Vienna, Austria" />
      <meta name="event.date" content="2026-05-12" />
      <meta name="event.end_date" content="2026-05-16" />
      <meta name="event.type" content="Music Contest" />
      <meta name="event.audience" content="Eurovision fans, LGBTQ+ community, music lovers" />
      
      {/* Local business information */}
      <meta name="business.type" content="Hotel Booking Platform" />
      <meta name="business.location" content="Vienna, Austria" />
      <meta name="business.service_area" content="Vienna, Austria" />
      <meta name="business.speciality" content="LGBTQ+ friendly hotels, Pride certified accommodations" />
      
      {/* Additional structured data for current page */}
      {pageType === 'search' && hotels.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SearchResultsPage",
              "name": `Eurovision 2026 Hotels in ${location}`,
              "description": description,
              "url": canonicalUrl,
              "totalResults": hotels.length,
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": hotels.length,
                "itemListElement": hotels.slice(0, 10).map((hotel, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Hotel",
                    "name": hotel.name,
                    "url": `https://esc-2026-vienna.com/hotel/${hotel.slug}`,
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": hotel.city || "Vienna",
                      "addressCountry": "AT"
                    },
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": hotel.review_score,
                      "reviewCount": hotel.review_count,
                      "bestRating": 10
                    },
                    "priceRange": `€${hotel.price.min || hotel.price.amount}-€${hotel.price.max || hotel.price.amount}`
                  }
                }))
              }
            })
          }}
        />
      )}
    </>
  )
}

export default DynamicMetaTags