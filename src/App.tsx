import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Heart, MapPin, Calendar, Users, Star, WifiHigh, Car, Coffee, Barbell, Eye, ChatCircle, MagnifyingGlass, Spinner, Plus, Minus, CalendarBlank, Bed } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { BookingSearchForm } from '@/components/BookingSearchForm'
import { BookingWidget } from '@/components/BookingWidget'
import { BookingHotelsGrid } from '@/components/BookingHotelsGrid'
import { searchBookingHotels, BookingHotel, HotelSearchParams } from '@/services/hotelService'

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

interface SearchParams {
  checkIn: string
  checkOut: string
  adults: number
  rooms: number
  children: number
  priceMin: number
  priceMax: number
  stars: string
  distanceFilter: string
  lgbtFilter: string
}

function App() {
  const [favoriteHotels, setFavoriteHotels] = useKV<string[]>('favorite-hotels', [])

  // Enhanced Search State
  const [searchParams, setSearchParams] = useState<SearchParams>({
    checkIn: '2026-05-12',
    checkOut: '2026-05-17',
    adults: 2,
    rooms: 1,
    children: 0,
    priceMin: 50,
    priceMax: 500,
    stars: 'all',
    distanceFilter: 'all',
    lgbtFilter: 'all'
  })

  // Calendar state for date pickers
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date('2026-05-12'))
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date('2026-05-17'))
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)

  // Hotel search state
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [bookingHotels, setBookingHotels] = useState<BookingHotel[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  const [selectedTab, setSelectedTab] = useState('hotels')
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

  // Function to search hotels from Booking.com
  const searchBookingHotelsHandler = async () => {
    // Validate required fields
    if (!searchParams.checkIn || !searchParams.checkOut) {
      toast.error('Bitte Check-in und Check-out Datum auswählen')
      return
    }

    if (!searchParams.adults || searchParams.adults < 1) {
      toast.error('Bitte mindestens 1 Erwachsenen angeben')
      return
    }

    if (!searchParams.rooms || searchParams.rooms < 1) {
      toast.error('Bitte mindestens 1 Zimmer angeben')
      return
    }

    setIsSearching(true)
    setSearchError(null)
    toast.info('Hotels werden von Booking.com geladen...')

    try {
      // Convert search params to HotelSearchParams
      const hotelSearchParams: HotelSearchParams = {
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        adults: searchParams.adults,
        children: searchParams.children,
        rooms: searchParams.rooms,
        priceMin: searchParams.priceMin,
        priceMax: searchParams.priceMax,
        stars: searchParams.stars,
        distanceFilter: searchParams.distanceFilter,
        lgbtFilter: searchParams.lgbtFilter
      }

      // Search hotels using the service
      const hotels = await searchBookingHotels(hotelSearchParams)
      
      setBookingHotels(hotels)
      setSearchPerformed(true)
      
      if (hotels.length === 0) {
        toast.warning('Keine Hotels für Ihre Suchkriterien gefunden. Versuchen Sie andere Filter.')
      } else {
        toast.success(`${hotels.length} Hotels von Booking.com geladen!`)
      }
      
    } catch (error) {
      console.error('Booking search error:', error)
      setSearchError('Fehler beim Laden der Hotels von Booking.com. Bitte versuchen Sie es erneut.')
      toast.error('Fehler beim Laden der Hotels von Booking.com.')
    } finally {
      setIsSearching(false)
    }
  }

  // Date formatting helper
  const formatDate = (date: Date | undefined) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  // Update search params when dates change
  useEffect(() => {
    if (checkInDate) {
      setSearchParams(prev => ({ ...prev, checkIn: formatDate(checkInDate) }))
    }
  }, [checkInDate])

  useEffect(() => {
    if (checkOutDate) {
      setSearchParams(prev => ({ ...prev, checkOut: formatDate(checkOutDate) }))
    }
  }, [checkOutDate])

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

  const toggleFavorite = (hotelId: string) => {
    setFavoriteHotels(current => {
      if (!current) return [hotelId]
      return current.includes(hotelId) 
        ? current.filter(id => id !== hotelId)
        : [...current, hotelId]
    })
    toast.success('Favoriten aktualisiert!')
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
            {/* Hotel Search Info */}
            <BookingWidget 
              searchPerformed={searchPerformed}
              bookingHotelsCount={bookingHotels.length}
              isSearching={isSearching}
            />
            
            {/* Enhanced Search Interface */}
            <BookingSearchForm
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={searchBookingHotelsHandler}
              isSearching={isSearching}
              filteredHotelsCount={bookingHotels.length}
              searchPerformed={searchPerformed}
            />

            {/* Error Display */}
            {searchError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-destructive">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="font-medium">Fehler beim Laden der Hotels</span>
                </div>
                <p className="text-sm text-destructive/80 mt-1">{searchError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={searchBookingHotelsHandler}
                >
                  Erneut versuchen
                </Button>
              </div>
            )}

            {/* Booking.com Hotels Grid - Only show after search performed */}
            {searchPerformed && !searchError && (
              <BookingHotelsGrid
                hotels={bookingHotels}
                searchParams={{
                  checkIn: searchParams.checkIn,
                  checkOut: searchParams.checkOut,
                  adults: searchParams.adults,
                  children: searchParams.children,
                  rooms: searchParams.rooms,
                  priceMin: searchParams.priceMin,
                  priceMax: searchParams.priceMax,
                  stars: searchParams.stars,
                  distanceFilter: searchParams.distanceFilter,
                  lgbtFilter: searchParams.lgbtFilter
                }}
                favoriteHotels={favoriteHotels || null}
                onToggleFavorite={toggleFavorite}
              />
            )}
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
                      {bookingHotels.slice(0, 8).map((hotel, index) => (
                        <div
                          key={hotel.id}
                          className="absolute bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-10"
                          style={{
                            left: `${20 + (index * 15)}%`,
                            top: `${30 + (index * 10)}%`,
                          }}
                          title={hotel.name}
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
                        {bookingHotels.slice(0, 5).map((hotel) => (
                          <div 
                            key={hotel.id} 
                            className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-sm">{hotel.name}</div>
                                <div className="text-xs text-muted-foreground">{hotel.distance_to_venue}km zur Stadthalle</div>
                              </div>
                              <Badge className={hotel.lgbt_certification === 'certified' ? 'bg-pride-red text-white' : 'bg-pride-green text-white'} variant="secondary">
                                {hotel.lgbt_certification === 'certified' ? '🏳️‍🌈' : hotel.lgbt_certification === 'friendly' ? '🤝' : '🏨'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        {bookingHotels.length === 0 && searchPerformed && (
                          <div className="text-center py-4 text-muted-foreground">
                            <p className="text-sm">Keine Hotels gefunden</p>
                          </div>
                        )}
                        {!searchPerformed && (
                          <div className="text-center py-4 text-muted-foreground">
                            <p className="text-sm">Suche Hotels um sie hier anzuzeigen</p>
                          </div>
                        )}
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