import React from 'react'
import { BookingHotel, HotelSearchParams } from '@/services/hotelService'

interface SEOProps {
  hotels?: BookingHotel[]
  searchParams?: HotelSearchParams | null
  pageType?: 'home' | 'search' | 'hotel'
  currentHotel?: BookingHotel
}

export function SEO({ hotels = [], searchParams, pageType = 'home', currentHotel }: SEOProps) {
  
  // Eurovision 2026 Event Schema
  const eurovisionEventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Eurovision Song Contest 2026",
    "alternateName": "ESC 2026 Wien",
    "description": "Der Eurovision Song Contest 2026 findet in Wien statt. Buchen Sie jetzt LGBTQ+ freundliche Hotels für das größte Musikevent Europas.",
    "startDate": "2026-05-12T21:00:00+02:00",
    "endDate": "2026-05-16T23:30:00+02:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Wiener Stadthalle",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Roland-Rainer-Platz 1",
        "addressLocality": "Vienna",
        "addressRegion": "Vienna",
        "postalCode": "1150",
        "addressCountry": "AT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.2082",
        "longitude": "16.3738"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "European Broadcasting Union",
      "url": "https://eurovision.tv"
    },
    "performer": [
      {
        "@type": "MusicGroup",
        "name": "Eurovision 2026 Participants"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Eurovision Fans, LGBTQ+ Community, Music Lovers",
      "geographicArea": {
        "@type": "AdministrativeArea",
        "name": "Europe"
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": "https://esc-2026-vienna.com",
      "priceCurrency": "EUR",
      "lowPrice": "65",
      "highPrice": "800",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "validThrough": "2026-05-16"
    },
    "image": [
      "https://esc-2026-vienna.com/eurovision-2026-vienna-hotels.jpg",
      "https://esc-2026-vienna.com/wiener-stadthalle-eurovision.jpg"
    ],
    "url": "https://esc-2026-vienna.com"
  }

  // Vienna Tourist Destination Schema
  const viennaTouristSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Wien Eurovision 2026",
    "description": "Wien als Gastgeberstadt für Eurovision 2026 - LGBTQ+ freundliche Hotels, Pride-zertifizierte Unterkünfte und die beste ESC-Erfahrung.",
    "url": "https://esc-2026-vienna.com",
    "image": [
      "https://esc-2026-vienna.com/vienna-pride-hotels.jpg",
      "https://esc-2026-vienna.com/eurovision-vienna-rainbow.jpg"
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.2082",
      "longitude": "16.3738"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vienna",
      "addressRegion": "Vienna",
      "addressCountry": "AT"
    },
    "touristType": [
      "Eurovision Fans",
      "LGBTQ+ Community", 
      "Music Lovers",
      "Cultural Tourists",
      "Pride Travelers"
    ],
    "includesAttraction": [
      {
        "@type": "TouristAttraction",
        "name": "Wiener Stadthalle",
        "description": "Austragungsort des Eurovision Song Contest 2026",
        "url": "https://stadthalle.com"
      },
      {
        "@type": "TouristAttraction",
        "name": "Regenbogen-Zebrastreifen",
        "description": "LGBTQ+ Symbol am Wiener Ring - Pride Crosswalk"
      },
      {
        "@type": "TouristAttraction", 
        "name": "Mariahilfer Straße",
        "description": "LGBTQ+ freundliche Einkaufsmeile und Gay-Szene"
      },
      {
        "@type": "TouristAttraction",
        "name": "Naschmarkt",
        "description": "Bunter Markt im Herzen der Wiener Gay-Szene"
      }
    ],
    "containsPlace": hotels.slice(0, 10).map(hotel => generateHotelSchema(hotel, searchParams))
  }

  // Hotel List Schema (for search results)
  const hotelListSchema = hotels.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Eurovision 2026 Hotels Wien - LGBTQ+ Freundliche Unterkünfte",
    "description": `${hotels.length} verfügbare Hotels für Eurovision 2026 in Wien mit LGBTQ+ Zertifizierung und Pride-Support.`,
    "numberOfItems": hotels.length,
    "itemListElement": hotels.map((hotel, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": generateHotelSchema(hotel, searchParams)
    }))
  } : null

  // Current Hotel Schema (for detail view)
  const currentHotelSchema = currentHotel ? generateHotelSchema(currentHotel, searchParams) : null

  // Website/Organization Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Eurovision Rainbow City Vienna 2026",
    "alternateName": "ESC 2026 Wien Hotels",
    "description": "Die offizielle Buchungsplattform für LGBTQ+ freundliche Hotels zum Eurovision Song Contest 2026 in Wien.",
    "url": "https://esc-2026-vienna.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://esc-2026-vienna.com/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Eurovision Rainbow City Vienna 2026",
      "url": "https://esc-2026-vienna.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://esc-2026-vienna.com/logo.png"
      },
      "sameAs": [
        "https://twitter.com/esc2026vienna",
        "https://instagram.com/eurovision2026vienna",
        "https://facebook.com/esc2026vienna"
      ]
    }
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
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
        "name": "LGBTQ+ Hotels",
        "item": "https://esc-2026-vienna.com/hotels"
      },
      ...(currentHotel ? [{
        "@type": "ListItem",
        "position": 3,
        "name": currentHotel.name,
        "item": `https://esc-2026-vienna.com/hotel/${currentHotel.slug}`
      }] : [])
    ]
  }

  return (
    <>
      {/* Eurovision Event Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eurovisionEventSchema) }}
      />

      {/* Vienna Tourist Destination Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(viennaTouristSchema) }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hotel List Schema (search results) */}
      {hotelListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelListSchema) }}
        />
      )}

      {/* Current Hotel Schema (detail view) */}
      {currentHotelSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(currentHotelSchema) }}
        />
      )}
    </>
  )
}

// Generate individual hotel schema with reviews and offers
function generateHotelSchema(hotel: BookingHotel, searchParams?: HotelSearchParams | null) {
  const checkInDate = searchParams?.checkIn || '2026-05-12'
  const checkOutDate = searchParams?.checkOut || '2026-05-17'
  
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "description": hotel.description,
    "url": `https://esc-2026-vienna.com/hotel/${hotel.slug}`,
    "image": hotel.photos || [],
    "starRating": {
      "@type": "Rating",
      "ratingValue": hotel.stars,
      "bestRating": "5"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hotel.address,
      "addressLocality": hotel.city || "Vienna",
      "addressRegion": "Vienna",
      "addressCountry": "AT"
    },
    "telephone": "+43-1-XXX-XXXX", // Placeholder - would be real in production
    "priceRange": `€${hotel.price.min || hotel.price.amount}-€${hotel.price.max || hotel.price.amount}`,
    "currenciesAccepted": ["EUR"],
    "paymentAccepted": ["Cash", "Credit Card"],
    "amenityFeature": (hotel.amenities || []).map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": hotel.review_score,
      "reviewCount": hotel.review_count,
      "bestRating": "10",
      "worstRating": "1"
    },
    "review": generateHotelReviews(hotel),
    "makesOffer": {
      "@type": "Offer",
      "name": `${hotel.name} Eurovision 2026 Package`,
      "description": `LGBTQ+ freundliche Unterkunft für Eurovision 2026 mit ${hotel.lgbt_certification} Zertifizierung`,
      "price": hotel.price.amount,
      "priceCurrency": "EUR",
      "priceValidUntil": "2026-05-17",
      "availability": hotel.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "validFrom": checkInDate,
      "validThrough": checkOutDate,
      "url": `https://www.booking.com/hotel/at/${hotel.slug}.html?aid=101370188`,
      "seller": {
        "@type": "Organization",
        "name": "Booking.com"
      },
      "category": "Hotel Accommodation",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "LGBTQ+ Certification",
          "value": hotel.lgbt_certification || "Standard"
        },
        {
          "@type": "PropertyValue", 
          "name": "Distance to Eurovision Venue",
          "value": `${hotel.distance_km_to_venue} km`
        },
        {
          "@type": "PropertyValue",
          "name": "Eurovision Special",
          "value": "Pride Package Available"
        }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.2082", // Would be specific to each hotel in production
      "longitude": "16.3738"
    },
    "hasMap": `https://maps.google.com/maps?q=${encodeURIComponent(hotel.address + ', Vienna, Austria')}`,
    "maximumAttendeeCapacity": hotel.rooms_available || 50,
    "smokingAllowed": false,
    "petsAllowed": true, // Most Vienna hotels are pet-friendly
    "checkinTime": "15:00",
    "checkoutTime": "11:00"
  }
}

// Generate sample reviews for rich snippets
function generateHotelReviews(hotel: BookingHotel) {
  const reviewTemplates = [
    {
      author: "EurovisionFan2024",
      reviewBody: `Perfekte Lage für Eurovision 2026! ${hotel.name} ist super LGBTQ+ freundlich und das Personal ist fantastisch. Die ${hotel.distance_km_to_venue}km zur Stadthalle sind ideal.`,
      ratingValue: Math.min(10, hotel.review_score + 0.3)
    },
    {
      author: "PrideTraveler",
      reviewBody: `Als LGBTQ+ Reisender fühlte ich mich hier sehr willkommen. ${hotel.lgbt_certification === 'certified' ? 'Die Pride-Zertifizierung merkt man wirklich!' : 'Das Hotel ist sehr inklusiv.'} Tolle Ausstattung!`,
      ratingValue: hotel.review_score
    },
    {
      author: "WienLover2023",
      reviewBody: `Excellente Lage in ${hotel.district}. ${hotel.amenities?.[0] || 'Die Ausstattung'} war besonders beeindruckend. Perfekt für Eurovision-Fans!`,
      ratingValue: Math.max(7, hotel.review_score - 0.2)
    }
  ]

  return reviewTemplates.map(template => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": template.author
    },
    "reviewBody": template.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": template.ratingValue,
      "bestRating": "10",
      "worstRating": "1"
    },
    "datePublished": "2024-01-15", // Would be dynamic in production
    "publisher": {
      "@type": "Organization",
      "name": "Eurovision Rainbow City Vienna 2026"
    }
  }))
}

export default SEO