import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, MapPin, Star, Heart } from '@phosphor-icons/react'
import { HotelSearchParams } from '@/services/hotelService'
import { toast } from 'sonner'

interface BookingSearchFormProps {
  onSearch: (params: HotelSearchParams) => void
}

export function BookingSearchForm({ onSearch }: BookingSearchFormProps) {
  const [checkIn, setCheckIn] = useState('2026-05-10')
  const [checkOut, setCheckOut] = useState('2026-05-18')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [priceMin, setPriceMin] = useState(50)
  const [priceMax, setPriceMax] = useState(500)
  const [stars, setStars] = useState('all')
  const [distanceFilter, setDistanceFilter] = useState('all')
  const [lgbtFilter, setLgbtFilter] = useState('all')

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      toast.error('Bitte wählen Sie Check-in und Check-out Daten')
      return
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out Datum muss nach Check-in Datum liegen')
      return
    }

    const searchParams: HotelSearchParams = {
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
      priceMin,
      priceMax,
      stars: stars === 'all' ? undefined : stars,
      distanceFilter: distanceFilter === 'all' ? undefined : distanceFilter,
      lgbtFilter: lgbtFilter === 'all' ? undefined : lgbtFilter
    }

    onSearch(searchParams)
    toast.success('Suche Hotels von Booking.com...')
  }

  const handleBookingComSearch = () => {
    // Generate direct Booking.com URL with affiliate ID
    const bookingUrl = `https://www.booking.com/searchresults.html?aid=101370188&dest_id=-1991997&dest_type=city&checkin=${checkIn}&checkout=${checkOut}&group_adults=${adults}&no_rooms=${rooms}&group_children=${children}`
    
    window.open(bookingUrl, '_blank', 'noopener,noreferrer')
    toast.success('Weiterleitung zu Booking.com...')
  }

  return (
    <Card className="mb-8 border-pride-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🔍 Eurovision 2026 Hotelsuche Wien
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-pride-red text-white">🏳️‍🌈 LGBTQ+ Friendly</Badge>
          <Badge className="bg-pride-green text-white">📍 Nahe Stadthalle</Badge>
          <Badge variant="outline">🎵 Eurovision 2026</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Dates & Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min="2026-05-01"
              max="2026-05-31"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="checkout" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Check-out
            </Label>
            <Input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min="2026-05-01"
              max="2026-05-31"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="adults" className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Erwachsene
            </Label>
            <Select value={adults.toString()} onValueChange={(value) => setAdults(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} Erwachsene</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rooms">Zimmer</Label>
            <Select value={rooms.toString()} onValueChange={(value) => setRooms(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} Zimmer</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Preisspanne pro Nacht</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priceMin" className="text-sm text-muted-foreground">Min. €</Label>
              <Input
                id="priceMin"
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(parseInt(e.target.value) || 0)}
                min={0}
                max={1000}
              />
            </div>
            <div>
              <Label htmlFor="priceMax" className="text-sm text-muted-foreground">Max. €</Label>
              <Input
                id="priceMax"
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(parseInt(e.target.value) || 500)}
                min={0}
                max={1000}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              Sterne-Kategorie
            </Label>
            <Select value={stars} onValueChange={setStars}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                <SelectItem value="3">3+ Sterne</SelectItem>
                <SelectItem value="4">4+ Sterne</SelectItem>
                <SelectItem value="5">5 Sterne</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Entfernung zur Stadthalle
            </Label>
            <Select value={distanceFilter} onValueChange={setDistanceFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Entfernungen</SelectItem>
                <SelectItem value="walking">Zu Fuß erreichbar (max. 1km)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              LGBTQ+ Freundlichkeit
            </Label>
            <Select value={lgbtFilter} onValueChange={setLgbtFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Hotels</SelectItem>
                <SelectItem value="friendly">LGBTQ+ Friendly</SelectItem>
                <SelectItem value="certified">Pride Certified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleSearch}
            className="flex-1 bg-pride-orange hover:bg-pride-red transition-colors h-12 text-lg font-semibold"
          >
            🔍 Hotels auf dieser Seite suchen
          </Button>
          <Button
            onClick={handleBookingComSearch}
            variant="outline"
            className="flex-1 border-pride-blue text-pride-blue hover:bg-pride-blue hover:text-white h-12 text-lg font-semibold"
          >
            🌐 Direkt auf Booking.com suchen
          </Button>
        </div>

        {/* ESC 2026 Info */}
        <div className="bg-gradient-to-r from-pride-blue/10 to-pride-indigo/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            🎵 Eurovision Song Contest 2026 in Wien
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>📅 Termine:</strong><br />
              Semifinale: 13.+15. Mai 2026<br />
              Finale: 17. Mai 2026
            </div>
            <div>
              <strong>📍 Austragungsort:</strong><br />
              Wiener Stadthalle<br />
              Roland-Rainer-Platz 1, 1150 Wien
            </div>
            <div>
              <strong>🚇 Öffentliche Verkehrsmittel:</strong><br />
              U6 Station Burggasse-Stadthalle<br />
              3 Minuten Gehweg
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}