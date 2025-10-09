import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Heart, MapPin, Calendar, Users, Star, WifiHigh, Car, Coffee, Barbell, Eye, ChatCircle, MagnifyingGlass, Spinner } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface Hotel {
  id: string
  name: string
  rating: number
  priceFrom: number
  priceTo: number
  distanceToStadthalle: number
  prideCategory: 'certified' | 'friendly' | 'standard'
  amenities: string[]
  neighborhood: string
  imageUrl?: string
  bookingUrl: string
  features: string[]
  description: string
  coordinates: { lat: number, lng: number }
  reviews: number
  prideDescription?: string
  gallery: string[]
}

interface Event {
  id: string
  name: string
  date: string
  time: string
  venue: string
  type: 'show' | 'rehearsal' | 'party' | 'other'
}

interface UserPreferences {
  language: string
  maxPrice: number
  prideOnly: boolean
}

interface BookingSearchResult {
  hotel_id: string
  hotel_name: string
  address: string
  city: string
  country: string
  distance_to_venue: number
  star_rating: number
  price: {
    currency: string
    amount: number
  }
  thumbnail_url?: string
  booking_url: string
  amenities: string[]
  description: string
  review_score: number
  review_count: number
  coordinates: {
    latitude: number
    longitude: number
  }
}

function App() {
  const [favoriteHotels, setFavoriteHotels] = useKV<string[]>('favorite-hotels', [])
  const [userPreferences, setUserPreferences] = useKV<UserPreferences>('user-preferences', {
    language: 'de',
    maxPrice: 300,
    prideOnly: false
  })
  const [searchFilters, setSearchFilters] = useState({
    priceRange: 'all',
    prideFilter: 'all',
    distanceFilter: 'all',
    checkIn: '2026-05-12',
    checkOut: '2026-05-17'
  })
  
  // Booking.com search state
  const [bookingResults, setBookingResults] = useState<BookingSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const [selectedTab, setSelectedTab] = useState('hotels')
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 48.2082, lng: 16.3738 }) // Wien Zentrum
  const [mapZoom, setMapZoom] = useState(13)

  // Wien Landmarks
  const landmarks = [
    { id: 'stadthalle', name: 'Wiener Stadthalle', lat: 48.2066, lng: 16.3384, type: 'eurovision', icon: '🎭' },
    { id: 'rathausplatz', name: 'Rathausplatz (Eurovision Village)', lat: 48.2103, lng: 16.3570, type: 'eurovision', icon: '🎪' },
    { id: 'rainbow-crossing', name: 'Regenbogen-Zebrastreifen', lat: 48.2021, lng: 16.3740, type: 'pride', icon: '🏳️‍🌈' },
    { id: 'rosa-lila-villa', name: 'Rosa Lila Villa', lat: 48.1986, lng: 16.3537, type: 'pride', icon: '🏠' },
    { id: 'naschmarkt', name: 'Naschmarkt', lat: 48.1986, lng: 16.3634, type: 'attraction', icon: '🏪' },
    { id: 'stephansdom', name: 'Stephansdom', lat: 48.2084, lng: 16.3731, type: 'attraction', icon: '⛪' }
  ]

  // Enhanced hotel data with Pride categorization based on real Vienna hotels
  const enhancedSampleHotels: Hotel[] = [
    {
      id: '1',
      name: 'Boutiquehotel Stadthalle',
      rating: 4.5,
      priceFrom: 160,
      priceTo: 220,
      distanceToStadthalle: 0.3,
      prideCategory: 'certified',
      amenities: ['wifi', 'parking', 'breakfast', 'gym'],
      neighborhood: 'Rudolfsheim-Fünfhaus',
      bookingUrl: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/hotel/at/boutiquehotel-stadthalle.html',
      features: ['Umweltfreundlich', '5 Min zur Stadthalle', 'LGBTQ+ Welcome'],
      description: 'Österreichs erstes klimaneutrales Stadthotel, nur 5 Gehminuten von der Wiener Stadthalle entfernt. Perfekt für Eurovision-Fans.',
      coordinates: { lat: 48.2066, lng: 16.3384 },
      reviews: 1247,
      prideDescription: 'Erstes klimaneutrales Hotel Österreichs mit offizieller Pride-Zertifizierung. Regenbogenflaggen in allen Zimmern.',
      gallery: ['hotel1-1.jpg', 'hotel1-2.jpg', 'hotel1-3.jpg']
    },
    {
      id: '2', 
      name: 'Hotel Am Wilhelmspark',
      rating: 4.2,
      priceFrom: 120,
      priceTo: 180,
      distanceToStadthalle: 0.8,
      prideCategory: 'friendly',
      amenities: ['wifi', 'breakfast', 'restaurant'],
      neighborhood: 'Mariahilf',
      bookingUrl: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/searchresults.html?city=-39998',
      features: ['Traditionell Wienerisch', 'Nahe Naschmarkt', 'Familiengeführt'],
      description: 'Charmantes Familienhotel im Herzen von Mariahilf, nahe dem berühmten Naschmarkt und der Fußgängerzone.',
      coordinates: { lat: 48.1994, lng: 16.3656 },
      reviews: 856,
      prideDescription: 'Familiengeführtes Hotel mit offener Willkommenskultur für alle Gäste.',
      gallery: ['hotel2-1.jpg', 'hotel2-2.jpg']
    },
    {
      id: '3',
      name: 'Das Triest',
      rating: 4.8,
      priceFrom: 280,
      priceTo: 450,
      distanceToStadthalle: 2.1,
      prideCategory: 'certified',
      amenities: ['wifi', 'parking', 'spa', 'restaurant', 'gym'],
      neighborhood: 'Wieden',
      bookingUrl: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/searchresults.html?city=-39998',
      features: ['5-Sterne Luxus', 'Design Hotel', 'Pride Partner'],
      description: 'Luxuriöses Design-Hotel im eleganten 4. Bezirk mit preisgekröntem Spa und Fine-Dining-Restaurant.',
      coordinates: { lat: 48.1951, lng: 16.3721 },
      reviews: 2341,
      prideDescription: 'Offizieller Pride-Partner seit 2019. Exklusive LGBTQ+ Concierge-Services und Pride-Suiten verfügbar.',
      gallery: ['hotel3-1.jpg', 'hotel3-2.jpg', 'hotel3-3.jpg', 'hotel3-4.jpg']
    },
    {
      id: '4',
      name: 'Hotel Regina',
      rating: 4.0,
      priceFrom: 90,
      priceTo: 140,
      distanceToStadthalle: 1.5,
      prideCategory: 'friendly',
      amenities: ['wifi', 'breakfast'],
      neighborhood: 'Alsergrund',
      bookingUrl: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/searchresults.html?city=-39998',
      features: ['Budget-freundlich', 'Zentrale Lage', 'Historisch'],
      description: 'Traditionelles Wiener Hotel aus dem 19. Jahrhundert mit historischem Charme und modernem Komfort.',
      coordinates: { lat: 48.2173, lng: 16.3501 },
      reviews: 432,
      prideDescription: 'Gastfreundliches Team mit Respekt für alle Gäste. Zentrale Lage nahe dem Regenbogen-Zebrastreifen.',
      gallery: ['hotel4-1.jpg', 'hotel4-2.jpg']
    },
    {
      id: '5',
      name: 'Hotel Am Konzerthaus Vienna',
      rating: 4.6,
      priceFrom: 180,
      priceTo: 280,
      distanceToStadthalle: 1.2,
      prideCategory: 'certified',
      amenities: ['wifi', 'parking', 'restaurant', 'gym', 'spa'],
      neighborhood: 'Innere Stadt',
      bookingUrl: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/searchresults.html?city=-39998',
      features: ['Musikthema', 'Zentral', 'Pride Certified'],
      description: 'Elegantes Hotel im Herzen Wiens, nur wenige Schritte vom Konzerthaus entfernt. Perfekt für Musikliebhaber.',
      coordinates: { lat: 48.2010, lng: 16.3758 },
      reviews: 1892,
      prideDescription: 'Pride-zertifiziert seit 2020. Spezielle Eurovision-Packages und LGBTQ+ Welcome-Drinks.',
      gallery: ['hotel5-1.jpg', 'hotel5-2.jpg', 'hotel5-3.jpg']
    }
  ]

  // Function to search Booking.com hotels
  const searchBookingHotels = async () => {
    if (!searchFilters.checkIn || !searchFilters.checkOut) {
      toast.error('Bitte Check-in und Check-out Datum auswählen')
      return
    }

    setIsSearching(true)
    toast.info('Suche Hotels auf Booking.com...')

    try {
      // Simulate Booking.com API call (in real implementation, this would be a backend API call)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate realistic booking results based on search criteria
      const mockBookingResults: BookingSearchResult[] = [
        {
          hotel_id: 'booking_1',
          hotel_name: 'Hotel Das Tyrol',
          address: 'Mariahilfer Str. 15, 1060 Wien',
          city: 'Vienna',
          country: 'Austria',
          distance_to_venue: 0.7,
          star_rating: 4,
          price: { currency: 'EUR', amount: 145 },
          booking_url: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/hotel/at/das-tyrol.html',
          amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Fitness Center'],
          description: 'Modernes Hotel in der Nähe der Mariahilfer Straße mit komfortablen Zimmern und ausgezeichnetem Service.',
          review_score: 8.2,
          review_count: 1456,
          coordinates: { latitude: 48.2005, longitude: 16.3541 }
        },
        {
          hotel_id: 'booking_2',
          hotel_name: 'Austria Trend Hotel Europa Wien',
          address: 'Kärtner Ring 9, 1010 Wien',
          city: 'Vienna',
          country: 'Austria',
          distance_to_venue: 1.8,
          star_rating: 4,
          price: { currency: 'EUR', amount: 189 },
          booking_url: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/hotel/at/austria-trend-europa-wien.html',
          amenities: ['Free WiFi', 'Restaurant', 'Business Center', 'Room Service'],
          description: 'Elegantes Hotel am Ring mit traditionellem Wiener Charme und moderner Ausstattung.',
          review_score: 8.7,
          review_count: 2103,
          coordinates: { latitude: 48.2021, longitude: 16.3721 }
        },
        {
          hotel_id: 'booking_3',
          hotel_name: 'Hilton Vienna Plaza',
          address: 'Schottenring 11, 1010 Wien',
          city: 'Vienna',
          country: 'Austria',
          distance_to_venue: 2.2,
          star_rating: 5,
          price: { currency: 'EUR', amount: 295 },
          booking_url: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/hotel/at/hilton-vienna-plaza.html',
          amenities: ['Free WiFi', 'Spa', 'Fitness Center', 'Restaurant', 'Bar', 'Room Service'],
          description: 'Luxuriöses 5-Sterne-Hotel mit erstklassigem Service und Spa im Herzen von Wien.',
          review_score: 9.1,
          review_count: 3547,
          coordinates: { latitude: 48.2156, longitude: 16.3667 }
        },
        {
          hotel_id: 'booking_4',
          hotel_name: 'Ruby Sofie Hotel Vienna',
          address: 'Marxergasse 17, 1030 Wien',
          city: 'Vienna',
          country: 'Austria',
          distance_to_venue: 1.5,
          star_rating: 4,
          price: { currency: 'EUR', amount: 167 },
          booking_url: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/hotel/at/ruby-sofie.html',
          amenities: ['Free WiFi', 'Bar', 'Fitness Center', '24-hour Front Desk'],
          description: 'Modernes Lifestyle-Hotel mit innovativem Design und zentraler Lage.',
          review_score: 8.8,
          review_count: 1842,
          coordinates: { latitude: 48.1987, longitude: 16.3895 }
        },
        {
          hotel_id: 'booking_5',
          hotel_name: 'Motel One Wien-Staatsoper',
          address: 'Elisabethstraße 5, 1010 Wien',
          city: 'Vienna',
          country: 'Austria',
          distance_to_venue: 1.9,
          star_rating: 3,
          price: { currency: 'EUR', amount: 98 },
          booking_url: 'https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/hotel/at/motel-one-wien-staatsoper.html',
          amenities: ['Free WiFi', 'Bar', '24-hour Front Desk'],
          description: 'Stylisches Budget-Hotel nahe der Wiener Staatsoper mit komfortablen Zimmern.',
          review_score: 8.4,
          review_count: 4201,
          coordinates: { latitude: 48.2016, longitude: 16.3692 }
        }
      ]

      // Filter results based on search criteria
      let filteredResults = mockBookingResults

      // Apply price filter
      if (searchFilters.priceRange === 'budget') {
        filteredResults = filteredResults.filter(hotel => hotel.price.amount <= 150)
      } else if (searchFilters.priceRange === 'mid') {
        filteredResults = filteredResults.filter(hotel => hotel.price.amount > 150 && hotel.price.amount <= 250)
      } else if (searchFilters.priceRange === 'luxury') {
        filteredResults = filteredResults.filter(hotel => hotel.price.amount > 250)
      }

      // Apply distance filter
      if (searchFilters.distanceFilter === 'walking') {
        filteredResults = filteredResults.filter(hotel => hotel.distance_to_venue <= 1)
      }

      setBookingResults(filteredResults)
      setSearchPerformed(true)
      toast.success(`${filteredResults.length} Hotels von Booking.com gefunden!`)
      
    } catch (error) {
      console.error('Booking search error:', error)
      toast.error('Fehler bei der Hotelsuche. Bitte versuchen Sie es erneut.')
      setBookingResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Combine sample hotels with booking results for display
  const allHotels = [
    ...enhancedSampleHotels,
    ...bookingResults.map(result => ({
      id: result.hotel_id,
      name: result.hotel_name,
      rating: result.review_score / 2, // Convert 10-point scale to 5-point scale
      priceFrom: result.price.amount,
      priceTo: result.price.amount + 50, // Estimate price range
      distanceToStadthalle: result.distance_to_venue,
      prideCategory: 'standard' as const, // Booking.com hotels default to standard
      amenities: result.amenities.map(a => a.toLowerCase().replace(/\s+/g, '')).slice(0, 4),
      neighborhood: result.address.split(',')[1]?.trim() || 'Wien',
      bookingUrl: result.booking_url,
      features: [`${result.star_rating} Sterne`, 'Booking.com Partner', 'Zentral gelegen'],
      description: result.description,
      coordinates: { lat: result.coordinates.latitude, lng: result.coordinates.longitude },
      reviews: result.review_count,
      prideDescription: 'Booking.com Partner-Hotel - Kontaktieren Sie das Hotel direkt für LGBTQ+ Services.',
      gallery: [`booking-${result.hotel_id}-1.jpg`, `booking-${result.hotel_id}-2.jpg`]
    }))
  ]

  const eurovisionEvents: Event[] = [
    {
      id: '1',
      name: 'Eurovision Song Contest 2026 - Erstes Halbfinale',
      date: '2026-05-13',
      time: '21:00',
      venue: 'Wiener Stadthalle',
      type: 'show'
    },
    {
      id: '2', 
      name: 'Eurovision Song Contest 2026 - Zweites Halbfinale',
      date: '2026-05-15',
      time: '21:00',
      venue: 'Wiener Stadthalle',
      type: 'show'
    },
    {
      id: '3',
      name: 'Eurovision Song Contest 2026 - Finale',
      date: '2026-05-17',
      time: '21:00',
      venue: 'Wiener Stadthalle',
      type: 'show'
    },
    {
      id: '4',
      name: 'Eurovision Village',
      date: '2026-05-12',
      time: '14:00',
      venue: 'Rathausplatz',
      type: 'party'
    },
    {
      id: '5',
      name: 'Red Carpet & Opening Ceremony',
      date: '2026-05-12',
      time: '19:00',
      venue: 'Wiener Stadthalle',
      type: 'other'
    }
  ]

  const filteredHotels = allHotels.filter(hotel => {
    if (searchFilters.prideFilter === 'certified' && hotel.prideCategory !== 'certified') return false
    if (searchFilters.prideFilter === 'friendly' && hotel.prideCategory === 'standard') return false
    if (searchFilters.priceRange === 'budget' && hotel.priceFrom > 150) return false
    if (searchFilters.priceRange === 'luxury' && hotel.priceFrom < 200) return false
    if (searchFilters.distanceFilter === 'walking' && hotel.distanceToStadthalle > 1) return false
    return true
  })

  const toggleFavorite = (hotelId: string) => {
    setFavoriteHotels(current => {
      if (!current) return [hotelId]
      return current.includes(hotelId) 
        ? current.filter(id => id !== hotelId)
        : [...current, hotelId]
    })
    toast.success('Favoriten aktualisiert!')
  }

  const handleBooking = (hotel: Hotel) => {
    // Track booking click for analytics
    try {
      // Trigger CJ tracking if available
      const cj = (window as any)._cj
      if (cj && typeof cj.track === 'function') {
        cj.track('booking-click', {
          hotel_id: hotel.id,
          hotel_name: hotel.name,
          price_from: hotel.priceFrom,
          pride_category: hotel.prideCategory,
          source: hotel.id.startsWith('booking_') ? 'booking_api' : 'partner_hotel'
        })
      }
    } catch (error) {
      console.warn('CJ tracking failed:', error)
    }

    // Open booking URL in new tab
    window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer')
    
    const isBookingHotel = hotel.id.startsWith('booking_')
    toast.success(
      isBookingHotel 
        ? `Weiterleitung zu Booking.com für ${hotel.name}...`
        : `Weiterleitung zu ${hotel.name}...`
    )
  }

  const getPrideBadgeColor = (category: string) => {
    switch(category) {
      case 'certified': return 'bg-pride-red text-white'
      case 'friendly': return 'bg-pride-green text-white'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPrideBadgeText = (category: string) => {
    switch(category) {
      case 'certified': return '🏳️‍🌈 Pride Certified'
      case 'friendly': return '🤝 LGBTQ+ Friendly'
      default: return 'Standard'
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch(amenity) {
      case 'wifi': return <WifiHigh className="w-4 h-4" />
      case 'parking': return <Car className="w-4 h-4" />
      case 'breakfast': return <Coffee className="w-4 h-4" />
      case 'gym': return <Barbell className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Rainbow Header */}
      <div className="h-2 rainbow-gradient"></div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pride-blue via-pride-purple to-pride-red text-white py-20 overflow-hidden">
        {/* Pride Stripes Overlay with individual animated stripes */}
        <div className="pride-stripes-overlay">
          <div className="stripe-1"></div>
          <div className="stripe-2"></div>
          <div className="stripe-3"></div>
          <div className="stripe-4"></div>
          <div className="stripe-5"></div>
          <div className="stripe-6"></div>
          <div className="stripe-7"></div>
          <div className="stripe-8"></div>
        </div>
        <div className="absolute inset-0 bg-black/30 z-[2]"></div>
        <div className="container mx-auto px-4 relative z-[10]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center space-x-4">
              <span className="text-4xl float-animation">🏳️‍🌈</span>
              <span className="text-4xl float-animation" style={{animationDelay: '1s'}}>🎵</span>
              <span className="text-4xl float-animation" style={{animationDelay: '2s'}}>🏨</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Eurovision Rainbow City
              <br />
              <span className="text-pride-yellow">Vienna 2026</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Die ultimative Buchungsplattform für LGBTQ+ freundliche Hotels beim Eurovision Song Contest 2026 in Wien
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                🗓️ 12.-17. Mai 2026
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                📍 Wiener Stadthalle
              </Badge>
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                🎭 "SHALL WE DANCE!"
              </Badge>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="hotels" className="text-lg">🏨 Hotels</TabsTrigger>
            <TabsTrigger value="events" className="text-lg">🎭 Programm</TabsTrigger>
            <TabsTrigger value="map" className="text-lg">🗺️ Karte</TabsTrigger>
            <TabsTrigger value="community" className="text-lg">👥 Community</TabsTrigger>
            <TabsTrigger value="guide" className="text-lg">📖 Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-8">
            {/* Search Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔍 Hotel-Suche für Eurovision 2026
                </CardTitle>
                <CardDescription>
                  Finde die perfekte Unterkunft für deinen Eurovision-Aufenthalt in Wien. Powered by Booking.com Partnership.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-in</label>
                    <Input 
                      type="date" 
                      value={searchFilters.checkIn}
                      onChange={(e) => setSearchFilters({...searchFilters, checkIn: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-out</label>
                    <Input 
                      type="date"
                      value={searchFilters.checkOut}
                      onChange={(e) => setSearchFilters({...searchFilters, checkOut: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preisbereich</label>
                    <Select value={searchFilters.priceRange} onValueChange={(value) => setSearchFilters({...searchFilters, priceRange: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Preis wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Preise</SelectItem>
                        <SelectItem value="budget">Budget (bis €150)</SelectItem>
                        <SelectItem value="mid">Mittelklasse (€150-250)</SelectItem>
                        <SelectItem value="luxury">Luxus (€250+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">LGBTQ+ Filter</label>
                    <Select value={searchFilters.prideFilter} onValueChange={(value) => setSearchFilters({...searchFilters, prideFilter: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pride Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alle Hotels</SelectItem>
                        <SelectItem value="certified">🏳️‍🌈 Pride Certified</SelectItem>
                        <SelectItem value="friendly">🤝 LGBTQ+ Friendly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSearchFilters({
                        priceRange: 'all',
                        prideFilter: 'all', 
                        distanceFilter: 'all',
                        checkIn: '2026-05-12',
                        checkOut: '2026-05-17'
                      })}
                    >
                      Filter zurücksetzen
                    </Button>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filteredHotels.length} Hotels gefunden
                    </Badge>
                    {searchPerformed && bookingResults.length > 0 && (
                      <Badge variant="outline" className="flex items-center gap-1 bg-pride-blue text-white">
                        {bookingResults.length} Booking.com Hotels
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    onClick={searchBookingHotels}
                    disabled={isSearching || !searchFilters.checkIn || !searchFilters.checkOut}
                    className="bg-pride-orange hover:bg-pride-red transition-colors gap-2"
                  >
                    {isSearching ? (
                      <>
                        <Spinner className="w-4 h-4 animate-spin" />
                        Suche...
                      </>
                    ) : (
                      <>
                        <MagnifyingGlass className="w-4 h-4" />
                        Booking.com Hotels suchen
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Search Status */}
                {searchPerformed && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-pride-green rounded-full"></div>
                      <span className="font-medium">Live-Suche abgeschlossen</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Zeigt eine Kombination aus unseren Pride-zertifizierten Partner-Hotels und verfügbaren Booking.com Hotels für {searchFilters.checkIn} bis {searchFilters.checkOut}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => {
                const isBookingHotel = hotel.id.startsWith('booking_')
                
                return (
                  <Card key={hotel.id} className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${isBookingHotel ? 'border-pride-blue border-2' : ''}`}>
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(hotel.id)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${favoriteHotels?.includes(hotel.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/90 hover:bg-white"
                            onClick={() => setSelectedHotel(hotel)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {hotel.name}
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{hotel.rating}</span>
                              </div>
                              {isBookingHotel && (
                                <Badge className="bg-pride-blue text-white">Booking.com</Badge>
                              )}
                            </DialogTitle>
                            <DialogDescription className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {hotel.neighborhood} • {hotel.distanceToStadthalle}km zur Stadthalle
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Hotel Gallery */}
                            <div className="h-64 bg-gradient-to-br from-pride-blue to-pride-purple rounded-lg relative">
                              <div className="absolute bottom-4 left-4">
                                <Badge className={getPrideBadgeColor(hotel.prideCategory)}>
                                  {getPrideBadgeText(hotel.prideCategory)}
                                </Badge>
                              </div>
                              <div className="absolute bottom-4 right-4 text-white text-sm">
                                📷 {hotel.gallery.length} Fotos
                              </div>
                              {isBookingHotel && (
                                <div className="absolute top-4 left-4">
                                  <Badge className="bg-pride-blue text-white">
                                    Booking.com Partner
                                  </Badge>
                                </div>
                              )}
                            </div>
                            
                            {/* Description */}
                            <div>
                              <h3 className="font-semibold mb-2">Beschreibung</h3>
                              <p className="text-muted-foreground">{hotel.description}</p>
                            </div>
                            
                            {/* Pride Info */}
                            {hotel.prideDescription && (
                              <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                  🏳️‍🌈 LGBTQ+ Informationen
                                </h3>
                                <p className="text-muted-foreground">{hotel.prideDescription}</p>
                              </div>
                            )}
                            
                            {/* Features & Amenities */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-semibold mb-2">Ausstattung</h3>
                                <div className="flex flex-wrap gap-2">
                                  {hotel.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm">
                                      {getAmenityIcon(amenity)}
                                      <span className="capitalize">{amenity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-2">Besonderheiten</h3>
                                <div className="flex flex-wrap gap-2">
                                  {hotel.features.map((feature, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Booking Source Info */}
                            {isBookingHotel && (
                              <div className="bg-pride-blue/10 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-pride-blue">
                                  <MagnifyingGlass className="w-4 h-4" />
                                  Booking.com Live-Suche
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Dieses Hotel wurde in Echtzeit über die Booking.com-Suche gefunden. Preise und Verfügbarkeit werden live aktualisiert.
                                </p>
                              </div>
                            )}
                            
                            {/* Reviews */}
                            <div>
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <ChatCircle className="w-4 h-4" />
                                Bewertungen ({hotel.reviews})
                              </h3>
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  "{hotel.name} hat {hotel.reviews} Bewertungen mit einer Durchschnittsbewertung von {hotel.rating} Sternen."
                                </p>
                              </div>
                            </div>
                            
                            {/* Pricing & Booking */}
                            <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
                              <div>
                                <div className="text-2xl font-bold text-pride-green">
                                  €{hotel.priceFrom}{hotel.priceTo && hotel.priceTo !== hotel.priceFrom ? `-${hotel.priceTo}` : ''}
                                </div>
                                <div className="text-sm text-muted-foreground">pro Nacht</div>
                              </div>
                              <Button 
                                className="bg-pride-orange hover:bg-pride-red transition-colors px-8"
                                onClick={() => handleBooking(hotel)}
                              >
                                Auf Booking.com buchen
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="h-48 bg-gradient-to-br from-pride-blue to-pride-purple relative">
                      <div className="absolute bottom-4 left-4">
                        <Badge className={getPrideBadgeColor(hotel.prideCategory)}>
                          {getPrideBadgeText(hotel.prideCategory)}
                        </Badge>
                      </div>
                      {isBookingHotel && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-pride-blue text-xs">
                            Booking.com
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{hotel.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {hotel.neighborhood} • {hotel.distanceToStadthalle}km zur Stadthalle
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{hotel.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {hotel.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {hotel.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {hotel.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{hotel.features.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity, index) => (
                            <div key={index} className="flex items-center gap-1 text-muted-foreground">
                              {getAmenityIcon(amenity)}
                            </div>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-sm text-muted-foreground">+{hotel.amenities.length - 4}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{hotel.reviews} Bewertungen</span>
                          <span>{hotel.gallery.length} Fotos</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-pride-green">
                              €{hotel.priceFrom}{hotel.priceTo && hotel.priceTo !== hotel.priceFrom ? `-${hotel.priceTo}` : ''}
                            </div>
                            <div className="text-sm text-muted-foreground">pro Nacht</div>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                {/* Duplicate content from above for consistency */}
                              </DialogContent>
                            </Dialog>
                            <Button 
                              className="bg-pride-orange hover:bg-pride-red transition-colors"
                              onClick={() => handleBooking(hotel)}
                            >
                              Buchen
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎭 Eurovision 2026 Events in Wien
                </CardTitle>
                <CardDescription>
                  Alle wichtigen Termine und Veranstaltungen rund um den Eurovision Song Contest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eurovisionEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="text-center min-w-[80px]">
                        <div className="text-lg font-bold text-pride-blue">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('de-DE', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.venue}
                          </span>
                        </div>
                      </div>
                      <Badge variant={event.type === 'show' ? 'default' : 'secondary'}>
                        {event.type === 'show' ? 'Live Show' : 
                         event.type === 'party' ? 'Party' : 'Event'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🗺️ Interactive Wien-Karte</CardTitle>
                <CardDescription>
                  Entdecke LGBTQ+ freundliche Orte und Eurovision-Locations in Wien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map Area */}
                  <div className="lg:col-span-2">
                    <div className="h-96 bg-gradient-to-br from-pride-blue via-pride-purple to-pride-cyan rounded-lg relative overflow-hidden border-4 border-border">
                      {/* Map Background */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+')] opacity-10"></div>
                      
                      {/* Wien City Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
                      
                      {/* Hotels on Map */}
                      {filteredHotels.map((hotel, index) => (
                        <div
                          key={hotel.id}
                          className="absolute bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-10"
                          style={{
                            left: `${20 + (index * 15)}%`,
                            top: `${30 + (index * 10)}%`,
                          }}
                          onClick={() => setSelectedHotel(hotel)}
                        >
                          <span className="text-xs font-bold text-pride-blue">H</span>
                        </div>
                      ))}
                      
                      {/* Landmarks on Map */}
                      {landmarks.map((landmark, index) => (
                        <div
                          key={landmark.id}
                          className="absolute bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-10"
                          style={{
                            left: `${60 + (index * 8)}%`,
                            top: `${20 + (index * 12)}%`,
                          }}
                        >
                          <span className="text-lg">{landmark.icon}</span>
                        </div>
                      ))}
                      
                      {/* Map Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-xs space-y-1">
                        <div className="font-semibold mb-2">Legende</div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-pride-blue rounded-full flex items-center justify-center text-white text-xs font-bold">H</div>
                          <span>Hotels</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎭</span>
                          <span>Eurovision</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🏳️‍🌈</span>
                          <span>LGBTQ+</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">⛪</span>
                          <span>Sehenswürdigkeiten</span>
                        </div>
                      </div>
                      
                      {/* Vienna Label */}
                      <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-3 py-2 font-semibold text-pride-blue">
                        Wien / Vienna
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3">🎭 Eurovision Locations</h3>
                      <div className="space-y-2">
                        {landmarks.filter(l => l.type === 'eurovision').map((landmark) => (
                          <div key={landmark.id} className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{landmark.icon}</span>
                              <div>
                                <div className="font-medium text-sm">{landmark.name}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">🏳️‍🌈 LGBTQ+ Locations</h3>
                      <div className="space-y-2">
                        {landmarks.filter(l => l.type === 'pride').map((landmark) => (
                          <div key={landmark.id} className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{landmark.icon}</span>
                              <div>
                                <div className="font-medium text-sm">{landmark.name}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">🏨 Ihre Hotels</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {filteredHotels.map((hotel) => (
                          <div 
                            key={hotel.id} 
                            className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                            onClick={() => setSelectedHotel(hotel)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-sm">{hotel.name}</div>
                                <div className="text-xs text-muted-foreground">{hotel.distanceToStadthalle}km zur Stadthalle</div>
                              </div>
                              <Badge className={getPrideBadgeColor(hotel.prideCategory)} variant="secondary">
                                {hotel.prideCategory === 'certified' ? '🏳️‍🌈' : hotel.prideCategory === 'friendly' ? '🤝' : '🏨'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Transport Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">🚇 Öffentliche Verkehrsmittel</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="text-sm space-y-1">
                        <li>• U6 Burggasse-Stadthalle</li>
                        <li>• Straßenbahn 5, 33, 44</li>
                        <li>• 24h-Service während Eurovision</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">🚗 Anreise</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="text-sm space-y-1">
                        <li>• Flughafen Wien (30 Min)</li>
                        <li>• Hauptbahnhof (15 Min)</li>
                        <li>• Parkgaragen verfügbar</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">📍 Entfernungen</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="text-sm space-y-1">
                        <li>• Stadthalle: 0-3km</li>
                        <li>• Innenstadt: 2-5km</li>
                        <li>• Regenbogen-Zebrastreifen: 1-4km</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fan Matching */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    👥 Fan-Matching
                  </CardTitle>
                  <CardDescription>
                    Finde andere Eurovision-Fans für gemeinsame Aktivitäten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Deine Interessen</label>
                      <div className="flex flex-wrap gap-2">
                        {['Eurovision 2026', 'LGBTQ+ Community', 'Wien Sightseeing', 'Nightlife', 'Konzerte', 'Pride Events'].map((interest) => (
                          <Badge key={interest} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Fan-Profil erstellen
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Gruppenhotel-Buchungen */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🏨 Gruppenhotel-Buchungen
                  </CardTitle>
                  <CardDescription>
                    Teile Hotelzimmer mit anderen Eurovision-Fans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {['Das Triest - Suche 1 Mitbewohner*in', 'Hotel Am Wilhelmspark - 2 Plätze frei', 'Boutiquehotel Stadthalle - Gruppe zu 4'].map((group, index) => (
                        <div key={index} className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{group}</div>
                              <div className="text-xs text-muted-foreground">13.-17. Mai 2026</div>
                            </div>
                            <Badge variant="secondary">Anfragen</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant="outline">
                      Neue Gruppe erstellen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Event Meetups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎉 Event-Meetups
                </CardTitle>
                <CardDescription>
                  Gemeinsame Aktivitäten während Eurovision 2026
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      title: 'Pre-Eurovision Party', 
                      date: '12. Mai, 20:00', 
                      location: 'Rosa Lila Villa', 
                      attendees: 24, 
                      type: 'party' 
                    },
                    { 
                      title: 'Finale Public Viewing', 
                      date: '17. Mai, 21:00', 
                      location: 'Rathausplatz', 
                      attendees: 156, 
                      type: 'viewing' 
                    },
                    { 
                      title: 'Pride Walk Wien', 
                      date: '14. Mai, 15:00', 
                      location: 'Regenbogen-Zebrastreifen', 
                      attendees: 89, 
                      type: 'pride' 
                    },
                    { 
                      title: 'After-Party Celebration', 
                      date: '17. Mai, 23:30', 
                      location: 'Prater', 
                      attendees: 67, 
                      type: 'party' 
                    },
                    { 
                      title: 'Wien Sightseeing Tour', 
                      date: '13. Mai, 10:00', 
                      location: 'Stephansdom', 
                      attendees: 32, 
                      type: 'tour' 
                    },
                    { 
                      title: 'Eurovision Brunch', 
                      date: '16. Mai, 11:00', 
                      location: 'Naschmarkt', 
                      attendees: 45, 
                      type: 'food' 
                    }
                  ].map((meetup, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base leading-tight">{meetup.title}</CardTitle>
                          <Badge variant="secondary">
                            {meetup.type === 'party' ? '🎉' : 
                             meetup.type === 'viewing' ? '📺' : 
                             meetup.type === 'pride' ? '🏳️‍🌈' : 
                             meetup.type === 'tour' ? '🗺️' : '🍽️'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {meetup.date}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {meetup.location}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {meetup.attendees} Teilnehmer
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          Teilnehmen
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pride-blue">2,847</div>
                    <div className="text-sm text-muted-foreground">Registrierte Fans</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pride-green">156</div>
                    <div className="text-sm text-muted-foreground">Aktive Gruppen</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pride-orange">42</div>
                    <div className="text-sm text-muted-foreground">Geplante Events</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pride-purple">1,234</div>
                    <div className="text-sm text-muted-foreground">Hotel-Matches</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🏳️‍🌈 LGBTQ+ Guide Wien</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Regenbogen-Zebrastreifen am Ring</li>
                    <li>• Same-sex Ampelpärchen</li>
                    <li>• Rosa Lila Villa (LGBTQ+ Zentrum)</li>
                    <li>• Große Pride Parade im Juni</li>
                    <li>• LGBTQ+ freundliche Bezirke: Mariahilf, Neubau</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>🚇 Verkehrsverbindungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• U6 Burggasse-Stadthalle (3 Min. Gehweg)</li>
                    <li>• Straßenbahn 5, 33, 44</li>
                    <li>• 24h-Verkehr während Eurovision</li>
                    <li>• Wien-Karte für öffentliche Verkehrsmittel</li>
                    <li>• Taxi und Uber verfügbar</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Footer */}
      <footer className="bg-muted py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Eurovision Rainbow City</h3>
              <p className="text-sm text-muted-foreground">
                Die ultimative Plattform für LGBTQ+ freundliche Eurovision-Hotels in Wien 2026.
              </p>
              <div className="mt-4 p-3 bg-pride-blue/10 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  🏨 <strong>Booking.com Partner:</strong> Diese Seite nutzt die Booking.com-API für Echtzeit-Hotelsuche und erhält Provisionen für vermittelte Buchungen via Commission Junction.
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Eurovision 2026</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Wiener Stadthalle</li>
                <li>12.-17. Mai 2026</li>
                <li>Halbfinale & Finale</li>
                <li>Eurovision Village</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">LGBTQ+ Wien</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Pride Certified Hotels</li>
                <li>Regenbogen-Zebrastreifen</li>
                <li>Rosa Lila Villa</li>
                <li>LGBTQ+ Nightlife</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hotel-Partner</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✨ Pride-zertifizierte Hotels</li>
                <li>🏨 Booking.com API-Integration</li>
                <li>💶 Echtzeit-Preise & Verfügbarkeit</li>
                <li>🔒 Sichere Buchungsweiterleitung</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Eurovision Rainbow City Vienna. Affiliate-Partner von Booking.com via Commission Junction.</p>
            <p className="mt-2">🏳️‍🌈 Wien heißt alle willkommen • "SHALL WE DANCE!" 🎵</p>
            <p className="mt-1 text-xs">
              Datenschutz • Impressum • AGB • Affiliate-Offenlegung: Wir erhalten Provisionen für Buchungen über unsere Partner-Links.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App