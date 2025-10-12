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
      toast.error(t('selectCheckInOut'))
      return
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error(t('checkOutAfterCheckIn'))
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
    toast.success(t('searchingBookingCom'))
  }

  return (
    <Card className="mb-8 border-pride-blue/20" data-search-form>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🔍 {t('searchTitle')}
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-pride-red text-white">🏳️‍🌈 {t('lgbtqFriendly')}</Badge>
          <Badge className="bg-pride-green text-white">📍 {t('nearStadthalle')}</Badge>
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
              {t('adults')}
            </Label>
            <Select value={adults.toString()} onValueChange={(value) => setAdults(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {t('adults')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rooms">{t('rooms')}</Label>
            <Select value={rooms.toString()} onValueChange={(value) => setRooms(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {t('rooms')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>{t('priceRange')}</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priceMin" className="text-sm text-muted-foreground">{t('priceMin')}</Label>
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
              <Label htmlFor="priceMax" className="text-sm text-muted-foreground">{t('priceMax')}</Label>
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
              {t('starCategory')}
            </Label>
            <Select value={stars} onValueChange={setStars}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                <SelectItem value="3">{t('threePlusStars')}</SelectItem>
                <SelectItem value="4">{t('fourPlusStars')}</SelectItem>
                <SelectItem value="5">{t('fiveStars')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {t('distanceToStadthalle')}
            </Label>
            <Select value={distanceFilter} onValueChange={setDistanceFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allDistances')}</SelectItem>
                <SelectItem value="walking">{t('walkingDistance')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {t('lgbtqFriendliness')}
            </Label>
            <Select value={lgbtFilter} onValueChange={setLgbtFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allHotels')}</SelectItem>
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
            🎵 {t('eurovisionSongContest')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>📅 {t('dates')}:</strong><br />
              {t('semiFinalsText')}<br />
              {t('finalText')}
            </div>
            <div>
              <strong>📍 {t('venue')}:</strong><br />
              Wiener Stadthalle<br />
              Roland-Rainer-Platz 1, 1150 Wien
            </div>
            <div>
              <strong>🚇 {t('publicTransport')}:</strong><br />
              U6 Station Burggasse-Stadthalle<br />
              {t('threeMinutesWalk')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}