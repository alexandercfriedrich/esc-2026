import { toast } from 'sonner'

export interface BookingHotel {
  id: string
  name: string
  rating: number
  review_score: number
  review_count: number
  price: {
    amount: number
    currency: string
    min?: number
    max?: number
  }
  stars: number
  distance_km_to_venue: number
  distance_to_venue?: number // alias for compatibility
  lgbtq_friendly: boolean
  lgbt_certification?: string // for Pride certifications
  categories: string[]
  slug?: string // booking.com hotel slug for deep-linking
  images?: string[]
  district?: string
  address?: string
  city?: string
  description?: string
  amenities?: string[]
  photos?: string[]
  available?: boolean
  rooms_available?: number
}

export interface HotelSearchCriteria {
  checkin: string // YYYY-MM-DD
  checkout: string // YYYY-MM-DD
  adults: number
  rooms: number
  minPrice?: number
  maxPrice?: number
  minStars?: number
  maxDistanceKm?: number
  lgbtqOnly?: boolean
  categories?: string[]
}

// Alias for compatibility with other components
export interface HotelSearchParams {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  rooms: number
  priceMin: number
  priceMax: number
  stars?: string
  distanceFilter?: string
  lgbtFilter?: string
}

// Hand-curated base dataset; NEVER slice or limit when returning results
const hotels: BookingHotel[] = [
  {
    id: 'stadthalle',
    name: 'Boutiquehotel Stadthalle',
    rating: 4.5,
    review_score: 9.1,
    review_count: 1247,
    price: { amount: 160, currency: 'EUR', min: 160, max: 220 },
    stars: 3,
    distance_km_to_venue: 0.3,
    distance_to_venue: 0.3,
    lgbtq_friendly: true,
    lgbt_certification: 'certified',
    categories: ['Pride Certified', 'Eco-friendly', 'Near Venue'],
    slug: 'boutiquehotel-stadthalle',
    district: 'Rudolfsheim-Fünfhaus',
    address: 'Hackengasse 20',
    city: 'Wien',
    description: 'Das umweltfreundlichste Hotel Wiens - perfekt für bewusste Eurovision-Fans!',
    amenities: ['WiFi kostenlos', 'Frühstück', 'Klimaanlage', 'Fitnessstudio'],
    photos: ['hotel1.jpg', 'hotel2.jpg', 'hotel3.jpg'],
    available: true,
    rooms_available: 12
  },
  {
    id: 'das-triest',
    name: 'Das Triest',
    rating: 4.8,
    review_score: 9.3,
    review_count: 2341,
    price: { amount: 280, currency: 'EUR', min: 280, max: 450 },
    stars: 5,
    distance_km_to_venue: 2.1,
    distance_to_venue: 2.1,
    lgbtq_friendly: true,
    lgbt_certification: 'certified',
    categories: ['Design', 'Luxury', 'Pride Certified'],
    slug: 'das-triest',
    district: 'Wieden',
    address: 'Wiedner Hauptstraße 12',
    city: 'Wien',
    description: 'Luxuriöses Design-Hotel im Herzen von Wien mit LGBTQ+ freundlicher Atmosphäre.',
    amenities: ['WiFi kostenlos', 'Spa', 'Restaurant', 'Bar', 'Parkplatz'],
    photos: ['hotel1.jpg', 'hotel2.jpg', 'hotel3.jpg', 'hotel4.jpg'],
    available: true,
    rooms_available: 8
  },
  {
    id: 'am-konzerthaus',
    name: 'Hotel Am Konzerthaus Vienna',
    rating: 4.6,
    review_score: 9.0,
    review_count: 1892,
    price: { amount: 180, currency: 'EUR', min: 180, max: 280 },
    stars: 4,
    distance_km_to_venue: 1.2,
    distance_to_venue: 1.2,
    lgbtq_friendly: true,
    lgbt_certification: 'friendly',
    categories: ['Music Theme', 'Central', 'Pride Certified'],
    slug: 'am-konzerthaus-vienna-mgallery',
    district: 'Innere Stadt',
    address: 'Am Heumarkt 35-37',
    city: 'Wien',
    description: 'Musik-thematisches Hotel in zentraler Lage, nur wenige Minuten zur Stadthalle.',
    amenities: ['WiFi kostenlos', 'Restaurant', 'Bar', 'Klimaanlage'],
    photos: ['hotel1.jpg', 'hotel2.jpg', 'hotel3.jpg'],
    available: true,
    rooms_available: 15
  },
  {
    id: 'regina',
    name: 'Hotel Regina',
    rating: 4.0,
    review_score: 8.3,
    review_count: 432,
    price: { amount: 90, currency: 'EUR', min: 90, max: 140 },
    stars: 3,
    distance_km_to_venue: 1.5,
    distance_to_venue: 1.5,
    lgbtq_friendly: false,
    lgbt_certification: 'standard',
    categories: ['Historic', 'Budget'],
    slug: 'regina-vienna',
    district: 'Alsergrund',
    address: 'Rooseveltplatz 15',
    city: 'Wien',
    description: 'Traditionelles Hotel mit historischem Charme zu erschwinglichen Preisen.',
    amenities: ['WiFi kostenlos', 'Frühstück', 'Rezeption 24h'],
    photos: ['hotel1.jpg', 'hotel2.jpg'],
    available: true,
    rooms_available: 20
  },
]

// Build booking.com deep link for city-wide search
export function buildSearchDeepLink(criteria: HotelSearchCriteria): string {
  const params = new URLSearchParams({
    aid: '101370188',
    dest_id: '-1991997',
    dest_type: 'city',
    checkin: criteria.checkin,
    checkout: criteria.checkout,
    group_adults: String(criteria.adults),
    no_rooms: String(criteria.rooms),
  })

  return `https://www.booking.com/searchresults.html?${params.toString()}`
}

// Build booking.com deep link for a specific hotel
export function buildHotelDeepLink(hotel: BookingHotel, criteria: HotelSearchCriteria): string | null {
  if (!hotel.slug) return null
  const base = `https://www.booking.com/hotel/at/${hotel.slug}.html`
  const params = new URLSearchParams({
    aid: '101370188',
    checkin: criteria.checkin,
    checkout: criteria.checkout,
    group_adults: String(criteria.adults),
    no_rooms: String(criteria.rooms),
  })
  return `${base}?${params.toString()}`
}

// Alias for compatibility with existing components
export function generateAffiliateUrl(hotel: BookingHotel, searchParams: HotelSearchParams): string {
  const criteria: HotelSearchCriteria = {
    checkin: searchParams.checkIn,
    checkout: searchParams.checkOut,
    adults: searchParams.adults,
    rooms: searchParams.rooms
  }
  return buildHotelDeepLink(hotel, criteria) || buildSearchDeepLink(criteria)
}

// Core filter applying ALL user criteria and returning ALL matches (no slicing/limits)
export function searchHotels(criteria: HotelSearchCriteria): BookingHotel[] {
  try {
    const result = hotels.filter(h => {
      if (criteria.minPrice !== undefined && (h.price.min ?? h.price.amount) < criteria.minPrice) return false
      if (criteria.maxPrice !== undefined && (h.price.max ?? h.price.amount) > criteria.maxPrice) return false
      if (criteria.minStars !== undefined && h.stars < criteria.minStars) return false
      if (criteria.maxDistanceKm !== undefined && h.distance_km_to_venue > criteria.maxDistanceKm) return false
      if (criteria.lgbtqOnly && !h.lgbtq_friendly) return false
      if (criteria.categories && criteria.categories.length > 0) {
        const ok = criteria.categories.every(c => h.categories.includes(c))
        if (!ok) return false
      }
      return true
    })

    // IMPORTANT: Never slice or cap results; return full filtered array
    return result
  } catch (e) {
    console.error('Hotel search failed', e)
    toast.error('Fehler bei der Hotelsuche')
    return []
  }
}

// Expose all base hotels if needed (no limits)
export function getAllHotels(): BookingHotel[] {
  return [...hotels]
}

// Alias for compatibility with App.tsx
export function searchBookingHotels(params: HotelSearchParams): Promise<BookingHotel[]> {
  return new Promise((resolve) => {
    // Convert HotelSearchParams to HotelSearchCriteria
    const criteria: HotelSearchCriteria = {
      checkin: params.checkIn,
      checkout: params.checkOut,
      adults: params.adults,
      rooms: params.rooms,
      minPrice: params.priceMin,
      maxPrice: params.priceMax,
      lgbtqOnly: params.lgbtFilter === 'friendly' || params.lgbtFilter === 'certified'
    }
    
    // Simulate async operation
    setTimeout(() => {
      resolve(searchHotels(criteria))
    }, 1000)
  })
}
