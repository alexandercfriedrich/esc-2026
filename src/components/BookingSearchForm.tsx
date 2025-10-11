import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, MapPin, Star, Heart } from '@phosphor-icons/react'
import { HotelSearchParams } from '@/services/hotelService'
import { useTranslation } from '@/hooks/useTranslation'
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
  const { t } = useTranslation()

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      toast.error(t('language') === 'de' ? 'Bitte wählen Sie Check-in und Check-out Daten' : 'Please select check-in and check-out dates')
      return
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error(t('language') === 'de' ? 'Check-out Datum muss nach Check-in Datum liegen' : 'Check-out date must be after check-in date')
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
    toast.success(t('language') === 'de' ? 'Suche Hotels von Booking.com...' : 'Searching hotels from Booking.com...')
  }

  return (
    <Card className="mb-8 border-pride-blue/20" data-search-form>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🔍 {t('searchTitle')}
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-pride-red text-white">🏳️‍🌈 {t('lgbtqFriendly')}</Badge>
          <Badge className="bg-pride-green text-white">📍 {t('language') === 'de' ? 'Nahe Stadthalle' : 'Near Stadthalle'}</Badge>
          <Badge variant="outline">🎵 Eurovision 2026</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Dates & Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {t('checkIn')}
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
              {t('checkOut')}
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
              {t('language') === 'de' ? 'Erwachsene' : 'Adults'}
            </Label>
            <Select value={adults.toString()} onValueChange={(value) => setAdults(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {t('language') === 'de' ? 'Erwachsene' : 'Adults'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rooms">{t('language') === 'de' ? 'Zimmer' : 'Rooms'}</Label>
            <Select value={rooms.toString()} onValueChange={(value) => setRooms(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {t('language') === 'de' ? 'Zimmer' : 'Rooms'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>{t('language') === 'de' ? 'Preisspanne pro Nacht' : 'Price range per night'}</Label>
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
              {t('language') === 'de' ? 'Sterne-Kategorie' : 'Star Category'}
            </Label>
            <Select value={stars} onValueChange={setStars}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('language') === 'de' ? 'Alle Kategorien' : 'All Categories'}</SelectItem>
                <SelectItem value="3">{t('language') === 'de' ? '3+ Sterne' : '3+ Stars'}</SelectItem>
                <SelectItem value="4">{t('language') === 'de' ? '4+ Sterne' : '4+ Stars'}</SelectItem>
                <SelectItem value="5">{t('language') === 'de' ? '5 Sterne' : '5 Stars'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {t('language') === 'de' ? 'Entfernung zur Stadthalle' : 'Distance to Stadthalle'}
            </Label>
            <Select value={distanceFilter} onValueChange={setDistanceFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('language') === 'de' ? 'Alle Entfernungen' : 'All distances'}</SelectItem>
                <SelectItem value="walking">{t('language') === 'de' ? 'Zu Fuß erreichbar (max. 1km)' : 'Walking distance (max. 1km)'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {t('language') === 'de' ? 'LGBTQ+ Freundlichkeit' : 'LGBTQ+ Friendliness'}
            </Label>
            <Select value={lgbtFilter} onValueChange={setLgbtFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('language') === 'de' ? 'Alle Hotels' : 'All hotels'}</SelectItem>
                <SelectItem value="friendly">{t('lgbtqFriendly')}</SelectItem>
                <SelectItem value="certified">{t('prideCertified')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleSearch}
            className="w-full bg-pride-orange hover:bg-pride-red transition-colors h-12 text-lg font-semibold"
          >
            🔍 {t('searchButton')}
          </Button>
        </div>

        {/* ESC 2026 Info */}
        <div className="bg-gradient-to-r from-pride-blue/10 to-pride-indigo/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            🎵 {t('language') === 'de' ? 'Eurovision Song Contest 2026 in Wien' : 'Eurovision Song Contest 2026 in Vienna'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>📅 {t('language') === 'de' ? 'Termine' : 'Dates'}:</strong><br />
              {t('language') === 'de' ? 'Semifinale: 13.+15. Mai 2026' : 'Semi-finals: May 13 & 15, 2026'}<br />
              {t('language') === 'de' ? 'Finale: 17. Mai 2026' : 'Final: May 17, 2026'}
            </div>
            <div>
              <strong>📍 {t('language') === 'de' ? 'Austragungsort' : 'Venue'}:</strong><br />
              Wiener Stadthalle<br />
              Roland-Rainer-Platz 1, 1150 Wien
            </div>
            <div>
              <strong>🚇 {t('language') === 'de' ? 'Öffentliche Verkehrsmittel' : 'Public Transport'}:</strong><br />
              U6 Station Burggasse-Stadthalle<br />
              {t('language') === 'de' ? '3 Minuten Gehweg' : '3 minutes walk'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}