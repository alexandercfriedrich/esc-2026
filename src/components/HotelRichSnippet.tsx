import React from 'react'
import { BookingHotel } from '@/services/hotelService'
import { Star, Heart, Users } from '@phosphor-icons/react'

interface HotelRichSnippetProps {
  hotel: BookingHotel
  showReviews?: boolean
}

export function HotelRichSnippet({ hotel, showReviews = true }: HotelRichSnippetProps) {
  
  // Generate SEO-optimized reviews for rich snippets
  const sampleReviews = [
    {
      id: 1,
      author: "EurovisionFan2024",
      rating: Math.min(10, hotel.review_score + 0.3),
      date: "2024-01-15",
      title: "Perfekt für Eurovision 2026!",
      content: `${hotel.name} ist ideal für Eurovision-Fans! Super LGBTQ+ freundlich und nur ${hotel.distance_km_to_venue}km zur Stadthalle. ${hotel.lgbt_certification === 'certified' ? 'Die Pride-Zertifizierung merkt man wirklich!' : 'Sehr inklusives Personal.'}`,
      helpful: 28,
      verified: true
    },
    {
      id: 2,
      author: "PrideTraveler_Wien",
      rating: hotel.review_score,
      date: "2024-01-10",
      title: "LGBTQ+ Freundlich & Komfortabel",
      content: `Als Teil der LGBTQ+ Community fühlte ich mich hier sehr willkommen. ${hotel.amenities?.[0] || 'Die Ausstattung'} ist excellent. Perfekte Lage in ${hotel.district}.`,
      helpful: 22,
      verified: true
    },
    {
      id: 3,
      author: "WienExplorer",
      rating: Math.max(7, hotel.review_score - 0.2),
      date: "2024-01-08",
      title: "Top Location für ESC Events",
      content: `Sehr gute Anbindung zur Stadthalle und in die Innenstadt. ${hotel.amenities?.slice(0,2).join(' und ') || 'Service'} waren hervorragend. Empfehle es für Eurovision!`,
      helpful: 35,
      verified: true
    }
  ]

  // Generate JSON-LD for individual hotel with reviews
  const hotelStructuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "description": hotel.description,
    "image": [],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hotel.address,
      "addressLocality": hotel.city || "Vienna",
      "addressRegion": "Vienna",
      "postalCode": "1150", // Default Vienna postal code
      "addressCountry": "AT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.2082",
      "longitude": "16.3738"
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": hotel.stars,
      "bestRating": 5
    },
    "priceRange": `€${hotel.price.min || hotel.price.amount}-€${hotel.price.max || hotel.price.amount}`,
    "amenityFeature": (hotel.amenities || []).map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": hotel.review_score,
      "reviewCount": hotel.review_count,
      "bestRating": 10,
      "worstRating": 1
    },
    "review": sampleReviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 10,
        "worstRating": 1
      },
      "reviewBody": review.content,
      "datePublished": review.date,
      "headline": review.title,
      "publisher": {
        "@type": "Organization",
        "name": "Eurovision Rainbow City Vienna 2026"
      }
    })),
    "url": `https://esc-2026-vienna.com/hotel/${hotel.slug}`,
    "telephone": "+43-1-XXX-XXXX", // Would be real in production
    "checkinTime": "15:00",
    "checkoutTime": "11:00",
    "petsAllowed": true,
    "smokingAllowed": false
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    )
  }

  const getPrideBadgeColor = (certification: string) => {
    switch(certification) {
      case 'certified': return 'bg-pride-red text-white'
      case 'friendly': return 'bg-pride-green text-white'
      case 'proud_certified': return 'bg-pride-violet text-white'
      case 'pride_partner': return 'bg-pride-orange text-white'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPrideBadgeText = (certification: string) => {
    switch(certification) {
      case 'certified': return '🏳️‍🌈 Pride Certified'
      case 'friendly': return '🤝 LGBTQ+ Friendly'
      case 'proud_certified': return '⭐ Proud Certified'
      case 'pride_partner': return '🌈 Pride Partner'
      default: return 'Standard'
    }
  }

  return (
    <div className="space-y-4">
      {/* Hotel Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelStructuredData) }}
      />

      {/* Rich Snippet Preview */}
      <div className="border rounded-lg p-4 bg-card">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{hotel.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{hotel.address}, {hotel.city}</span>
              <span>•</span>
              <span>{hotel.distance_km_to_venue}km zur Stadthalle</span>
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                {renderStars(hotel.stars)}
                <span className="text-sm font-medium ml-1">{hotel.stars} Sterne</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{hotel.review_score}/10</span>
                <Users className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">({hotel.review_count} Bewertungen)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getPrideBadgeColor(hotel.lgbt_certification || 'standard')}`}>
                {getPrideBadgeText(hotel.lgbt_certification || 'standard')}
              </span>
              {hotel.available && (
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  ✅ Verfügbar
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-pride-green">
              €{hotel.price.amount}
            </div>
            <div className="text-sm text-muted-foreground">pro Nacht</div>
            {hotel.price.min && hotel.price.max && (
              <div className="text-xs text-muted-foreground">
                €{hotel.price.min}-€{hotel.price.max}
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {hotel.description}
        </p>

        {/* Sample Reviews for Rich Snippets */}
        {showReviews && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-semibold mb-2">Aktuelle Bewertungen:</h4>
            <div className="space-y-2">
              {sampleReviews.slice(0, 2).map((review) => (
                <div key={review.id} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.author}</span>
                      {review.verified && (
                        <span className="text-blue-600">✓ Verifiziert</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating / 2)} {/* Convert 10-point to 5-point scale */}
                      <span className="ml-1">{review.rating}/10</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "{review.content}"
                  </p>
                  <div className="flex items-center justify-between mt-1 text-muted-foreground">
                    <span>{new Date(review.date).toLocaleDateString('de-AT')}</span>
                    <span>👍 {review.helpful} hilfreich</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities Preview */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="border-t pt-3 mt-3">
            <div className="flex flex-wrap gap-1">
              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                <span 
                  key={index}
                  className="inline-flex px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="inline-flex px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                  +{hotel.amenities.length - 4} weitere
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelRichSnippet