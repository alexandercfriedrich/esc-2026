import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Heart, MapPin, Calendar, Users, Star, WifiHigh, Car, Coffee, Barbell } from '@phosphor-icons/react'
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
    checkIn: '',
    checkOut: ''
  })

  const [selectedTab, setSelectedTab] = useState('hotels')

  const sampleHotels: Hotel[] = [
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
      features: ['Umweltfreundlich', '5 Min zur Stadthalle', 'LGBTQ+ Welcome']
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
      features: ['Traditionell Wienerisch', 'Nahe Naschmarkt', 'Familiengeführt']
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
      features: ['5-Sterne Luxus', 'Design Hotel', 'Pride Partner']
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
      features: ['Budget-freundlich', 'Zentrale Lage', 'Historisch']
    }
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

  const filteredHotels = sampleHotels.filter(hotel => {
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
    window.open(hotel.bookingUrl, '_blank', 'noopener,noreferrer')
    toast.success(`Weiterleitung zu ${hotel.name}...`)
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
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
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
            <TabsTrigger value="events" className="text-lg">🎭 Events</TabsTrigger>
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
                  Finde die perfekte Unterkunft für deinen Eurovision-Aufenthalt in Wien
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
              </CardContent>
            </Card>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
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
                  </div>
                  
                  <div className="h-48 bg-gradient-to-br from-pride-blue to-pride-purple relative">
                    <div className="absolute bottom-4 left-4">
                      <Badge className={getPrideBadgeColor(hotel.prideCategory)}>
                        {getPrideBadgeText(hotel.prideCategory)}
                      </Badge>
                    </div>
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
                      <div className="flex flex-wrap gap-2">
                        {hotel.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
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
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-pride-green">
                            €{hotel.priceFrom}-{hotel.priceTo}
                          </div>
                          <div className="text-sm text-muted-foreground">pro Nacht</div>
                        </div>
                        <Button 
                          className="bg-pride-orange hover:bg-pride-red transition-colors"
                          onClick={() => handleBooking(hotel)}
                        >
                          Jetzt buchen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                <div className="h-96 bg-gradient-to-br from-pride-blue to-pride-green rounded-lg flex items-center justify-center text-white text-xl">
                  📍 Interaktive Karte mit Hotels, Eurovision-Venues und Pride-Locations
                  <br />
                  <span className="text-sm opacity-75">(In Entwicklung)</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  👥 Eurovision Fan Community
                </CardTitle>
                <CardDescription>
                  Verbinde dich mit anderen Eurovision-Fans und plant gemeinsame Aktivitäten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-pride-blue" />
                  <h3 className="text-xl font-semibold mb-2">Community Features kommen bald!</h3>
                  <p className="text-muted-foreground mb-6">
                    Fan-Matching, Gruppenhotel-Buchungen und Event-Meetups
                  </p>
                  <Button variant="outline">
                    Benachrichtigung erhalten
                  </Button>
                </div>
              </CardContent>
            </Card>
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
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Affiliate-Partner von Booking.com</li>
                <li>Datenschutz</li>
                <li>Impressum</li>
                <li>AGB</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Eurovision Rainbow City Vienna. Partner von Booking.com via Commission Junction.</p>
            <p className="mt-2">🏳️‍🌈 Wien heißt alle willkommen • "SHALL WE DANCE!" 🎵</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App