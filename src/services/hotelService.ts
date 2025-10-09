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
  }
  distance_to_venue: number
  address: string
  city: string
  country: string
  coordinates: {
    latitude: number
    longitude: number
  }
  amenities: string[]
  photos: string[]
  description: string
  url: string
  is_lgbt_friendly: boolean
  lgbt_certification: 'certified' | 'friendly' | 'standard'
  available: boolean
  rooms_available: number
}

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

// Mock hotel data that simulates Booking.com API responses
const generateMockBookingHotels = (searchParams: HotelSearchParams): BookingHotel[] => {
  const baseHotels: Omit<BookingHotel, 'id' | 'available' | 'rooms_available' | 'price'>[] = [
    {
      name: "Hotel Kärntnerhof",
      rating: 4.5,
      review_score: 8.9,
      review_count: 2847,
      distance_to_venue: 1.8,
      address: "Grashofgasse 4",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2051, longitude: 16.3721 },
      amenities: ["WiFi", "Breakfast", "Restaurant", "Bar", "Concierge"],
      photos: ["hotel-1.jpg", "hotel-1-2.jpg"],
      description: "Elegantes Boutique-Hotel im Herzen Wiens, nur wenige Minuten von der Wiener Staatsoper entfernt.",
      url: "https://www.booking.com/hotel/at/karntnerhof.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'friendly'
    },
    {
      name: "Ruby Sofie Hotel Vienna",
      rating: 4.4,
      review_score: 8.7,
      review_count: 1956,
      distance_to_venue: 1.5,
      address: "Marxergasse 17",
      city: "Wien",
      country: "Austria", 
      coordinates: { latitude: 48.1987, longitude: 16.3895 },
      amenities: ["WiFi", "Bar", "Gym", "24h Front Desk"],
      photos: ["ruby-1.jpg", "ruby-2.jpg"],
      description: "Modernes Lifestyle-Hotel mit innovativem Design und erstklassiger Lage.",
      url: "https://www.booking.com/hotel/at/ruby-sofie.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'friendly'
    },
    {
      name: "Hilton Vienna Plaza",
      rating: 4.6,
      review_score: 9.1,
      review_count: 3547,
      distance_to_venue: 2.2,
      address: "Schottenring 11",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2156, longitude: 16.3667 },
      amenities: ["WiFi", "Spa", "Gym", "Restaurant", "Bar", "Room Service"],
      photos: ["hilton-1.jpg", "hilton-2.jpg", "hilton-3.jpg"],
      description: "Luxuriöses 5-Sterne-Hotel mit erstklassigem Service und Spa im Herzen von Wien.",
      url: "https://www.booking.com/hotel/at/hilton-vienna-plaza.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'certified'
    },
    {
      name: "Boutiquehotel Stadthalle",
      rating: 4.5,
      review_score: 9.0,
      review_count: 1247,
      distance_to_venue: 0.3,
      address: "Hackengasse 20",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2066, longitude: 16.3384 },
      amenities: ["WiFi", "Parking", "Breakfast", "Gym", "Eco-friendly"],
      photos: ["stadthalle-1.jpg", "stadthalle-2.jpg"],
      description: "Österreichs erstes klimaneutrales Stadthotel, nur 5 Gehminuten von der Wiener Stadthalle entfernt.",
      url: "https://www.booking.com/hotel/at/boutiquehotel-stadthalle.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'certified'
    },
    {
      name: "Das Triest",
      rating: 4.8,
      review_score: 9.3,
      review_count: 2341,
      distance_to_venue: 2.1,
      address: "Wiedner Hauptstraße 12",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.1951, longitude: 16.3721 },
      amenities: ["WiFi", "Parking", "Spa", "Restaurant", "Gym", "Design Hotel"],
      photos: ["triest-1.jpg", "triest-2.jpg", "triest-3.jpg"],
      description: "Luxuriöses Design-Hotel im eleganten 4. Bezirk mit preisgekröntem Spa.",
      url: "https://www.booking.com/hotel/at/das-triest.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'certified'
    },
    {
      name: "Austria Trend Hotel Europa Wien",
      rating: 4.3,
      review_score: 8.6,
      review_count: 2103,
      distance_to_venue: 1.8,
      address: "Kärntner Ring 9-13",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2021, longitude: 16.3721 },
      amenities: ["WiFi", "Restaurant", "Business Center", "Room Service"],
      photos: ["europa-1.jpg", "europa-2.jpg"],
      description: "Elegantes Hotel am Ring mit traditionellem Wiener Charme und moderner Ausstattung.",
      url: "https://www.booking.com/hotel/at/austria-trend-europa-wien.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'friendly'
    },
    {
      name: "Motel One Wien-Staatsoper",
      rating: 4.1,
      review_score: 8.4,
      review_count: 4201,
      distance_to_venue: 1.9,
      address: "Elisabethstraße 5",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2016, longitude: 16.3692 },
      amenities: ["WiFi", "Bar", "24h Front Desk"],
      photos: ["motel-one-1.jpg", "motel-one-2.jpg"],
      description: "Stylisches Budget-Hotel nahe der Wiener Staatsoper mit komfortablen Zimmern.",
      url: "https://www.booking.com/hotel/at/motel-one-wien-staatsoper.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'friendly'
    },
    {
      name: "Hotel Am Konzerthaus Vienna MGallery",
      rating: 4.5,
      review_score: 8.8,
      review_count: 1892,
      distance_to_venue: 1.2,
      address: "Am Heumarkt 35-37",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2010, longitude: 16.3758 },
      amenities: ["WiFi", "Parking", "Restaurant", "Gym", "Spa"],
      photos: ["konzerthaus-1.jpg", "konzerthaus-2.jpg"],
      description: "Elegantes Hotel nur wenige Schritte vom Konzerthaus entfernt.",
      url: "https://www.booking.com/hotel/at/hotel-am-konzerthaus-vienna-mgallery.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'certified'
    },
    {
      name: "Hotel Imperial Vienna",
      rating: 4.7,
      review_score: 9.2,
      review_count: 1654,
      distance_to_venue: 2.0,
      address: "Kärntner Ring 16",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2018, longitude: 16.3711 },
      amenities: ["WiFi", "Spa", "Restaurant", "Bar", "Concierge", "Luxury"],
      photos: ["imperial-1.jpg", "imperial-2.jpg", "imperial-3.jpg"],
      description: "Legendäres Luxushotel mit kaiserlicher Tradition und erstklassigem Service.",
      url: "https://www.booking.com/hotel/at/imperial-vienna.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'friendly'
    },
    {
      name: "Hotel Topazz Vienna",
      rating: 4.2,
      review_score: 8.5,
      review_count: 987,
      distance_to_venue: 1.7,
      address: "Lichtensteg 3",
      city: "Wien",
      country: "Austria",
      coordinates: { latitude: 48.2082, longitude: 16.3738 },
      amenities: ["WiFi", "Restaurant", "Bar", "Modern Design"],
      photos: ["topazz-1.jpg", "topazz-2.jpg"],
      description: "Modernes Design-Hotel mit spektakulärer Glasfassade im Zentrum Wiens.",
      url: "https://www.booking.com/hotel/at/topazz-vienna.html",
      is_lgbt_friendly: true,
      lgbt_certification: 'friendly'
    }
  ]

  // Generate dynamic pricing based on search params
  const generatePrice = (baseRating: number): { amount: number; currency: string } => {
    const basePricePerStar = 60
    const basePrice = Math.round(baseRating * basePricePerStar)
    const variation = Math.random() * 0.4 - 0.2 // ±20% variation
    const finalPrice = Math.round(basePrice * (1 + variation))
    return {
      amount: Math.max(80, Math.min(450, finalPrice)),
      currency: 'EUR'
    }
  }

  // Convert to full BookingHotel objects with dynamic data
  const hotels: BookingHotel[] = baseHotels.map((hotel, index) => ({
    ...hotel,
    id: `booking_${index + 1}`,
    price: generatePrice(hotel.rating),
    available: Math.random() > 0.1, // 90% availability
    rooms_available: Math.floor(Math.random() * 8) + 1
  }))

  // Apply filters
  return hotels.filter(hotel => {
    // Price filter
    if (hotel.price.amount < searchParams.priceMin || hotel.price.amount > searchParams.priceMax) {
      return false
    }

    // Star filter
    if (searchParams.stars && searchParams.stars !== 'all') {
      const minStars = parseInt(searchParams.stars)
      if (hotel.rating < minStars) return false
    }

    // Distance filter
    if (searchParams.distanceFilter === 'walking' && hotel.distance_to_venue > 1) {
      return false
    }

    // LGBT filter
    if (searchParams.lgbtFilter === 'certified' && hotel.lgbt_certification !== 'certified') {
      return false
    }
    if (searchParams.lgbtFilter === 'friendly' && hotel.lgbt_certification === 'standard') {
      return false
    }

    // Availability
    if (!hotel.available) return false

    return true
  })
}

// Simulate API call with delay
export const searchBookingHotels = async (searchParams: HotelSearchParams): Promise<BookingHotel[]> => {
  console.log('Searching Booking.com hotels with params:', searchParams)
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
  
  try {
    // In a real implementation, this would be an API call to Booking.com
    // For now, we use sophisticated mock data
    const hotels = generateMockBookingHotels(searchParams)
    
    console.log(`Found ${hotels.length} hotels from Booking.com`)
    return hotels
    
  } catch (error) {
    console.error('Hotel search error:', error)
    toast.error('Fehler beim Laden der Hotels von Booking.com')
    throw error
  }
}

// Generate Booking.com affiliate URL - FIXED to use proper Booking.com domain
export const generateAffiliateUrl = (hotel: BookingHotel, searchParams: HotelSearchParams, affiliateId: string = '101370188'): string => {
  // CRITICAL FIX: Use proper Booking.com domain with Commission Junction affiliate ID
  const baseUrl = 'https://www.booking.com/hotel'
  
  // Extract hotel ID from the existing URL or generate one
  const hotelPath = hotel.url.includes('booking.com') ? hotel.url.split('booking.com')[1] : '/at/vienna-hotel.html'
  
  const params = new URLSearchParams({
    aid: affiliateId,
    checkin: searchParams.checkIn,
    checkout: searchParams.checkOut,
    group_adults: searchParams.adults.toString(),
    no_rooms: searchParams.rooms.toString(),
    group_children: searchParams.children.toString()
  })
  
  // Construct proper Booking.com URL with affiliate parameters
  const fullUrl = `${baseUrl}${hotelPath}?${params.toString()}`
  
  console.log('Generated Booking.com affiliate URL:', fullUrl)
  return fullUrl
}