import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { CalendarBlank, MagnifyingGlass, Spinner, Plus, Minus, Users, Bed } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

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

interface BookingSearchFormProps {
  searchParams: SearchParams
  setSearchParams: (params: SearchParams) => void
  onSearch: () => void
  isSearching: boolean
  filteredHotelsCount: number
  bookingResultsCount: number
  searchPerformed: boolean
}

export function BookingSearchForm({
  searchParams,
  setSearchParams,
  onSearch,
  isSearching,
  filteredHotelsCount,
  bookingResultsCount,
  searchPerformed
}: BookingSearchFormProps) {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date(searchParams.checkIn))
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(searchParams.checkOut))
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)

  const formatDate = (date: Date | undefined) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const formatDisplayDate = (date: Date | undefined) => {
    if (!date) return 'Datum wählen'
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date)
    setSearchParams({ ...searchParams, checkIn: formatDate(date) })
    setShowCheckInCalendar(false)
  }

  const handleCheckOutChange = (date: Date | undefined) => {
    setCheckOutDate(date)
    setSearchParams({ ...searchParams, checkOut: formatDate(date) })
    setShowCheckOutCalendar(false)
  }

  const handleReset = () => {
    const defaultParams: SearchParams = {
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
    }
    setSearchParams(defaultParams)
    setCheckInDate(new Date('2026-05-12'))
    setCheckOutDate(new Date('2026-05-17'))
  }

  const adjustGuests = (type: 'adults' | 'children', delta: number) => {
    const newValue = Math.max(type === 'adults' ? 1 : 0, searchParams[type] + delta)
    setSearchParams({ ...searchParams, [type]: newValue })
  }

  const adjustRooms = (delta: number) => {
    const newValue = Math.max(1, searchParams.rooms + delta)
    setSearchParams({ ...searchParams, rooms: newValue })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔍 Hotel-Suche für Eurovision 2026
        </CardTitle>
        <CardDescription>
          Finde die perfekte Unterkunft für deinen Eurovision-Aufenthalt in Wien. Powered by Booking.com Partnership.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Check-in</Label>
            <Popover open={showCheckInCalendar} onOpenChange={setShowCheckInCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkInDate && "text-muted-foreground"
                  )}
                >
                  <CalendarBlank className="mr-2 h-4 w-4" />
                  {formatDisplayDate(checkInDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkInDate}
                  onSelect={handleCheckInChange}
                  disabled={(date) => date < new Date() || date < new Date("2026-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Check-out</Label>
            <Popover open={showCheckOutCalendar} onOpenChange={setShowCheckOutCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOutDate && "text-muted-foreground"
                  )}
                >
                  <CalendarBlank className="mr-2 h-4 w-4" />
                  {formatDisplayDate(checkOutDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkOutDate}
                  onSelect={handleCheckOutChange}
                  disabled={(date) => date <= (checkInDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests and Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Erwachsene
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustGuests('adults', -1)}
                disabled={searchParams.adults <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{searchParams.adults}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustGuests('adults', 1)}
                disabled={searchParams.adults >= 8}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Kinder (0-17)</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustGuests('children', -1)}
                disabled={searchParams.children <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{searchParams.children}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustGuests('children', 1)}
                disabled={searchParams.children >= 6}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Bed className="w-4 h-4" />
              Zimmer
            </Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustRooms(-1)}
                disabled={searchParams.rooms <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{searchParams.rooms}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustRooms(1)}
                disabled={searchParams.rooms >= 4}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Preisbereich pro Nacht: €{searchParams.priceMin} - €{searchParams.priceMax}</Label>
          <div className="px-2">
            <Slider
              value={[searchParams.priceMin, searchParams.priceMax]}
              onValueChange={([min, max]) => setSearchParams({ ...searchParams, priceMin: min, priceMax: max })}
              max={500}
              min={50}
              step={10}
              className="w-full"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Sternekategorie</Label>
            <Select value={searchParams.stars} onValueChange={(value) => setSearchParams({ ...searchParams, stars: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sterne wählen" />
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
            <Label>Entfernung zur Stadthalle</Label>
            <Select value={searchParams.distanceFilter} onValueChange={(value) => setSearchParams({ ...searchParams, distanceFilter: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Entfernung wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Entfernungen</SelectItem>
                <SelectItem value="walking">Fußläufig (bis 1km)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>LGBTQ+ Filter</Label>
            <Select value={searchParams.lgbtFilter} onValueChange={(value) => setSearchParams({ ...searchParams, lgbtFilter: value })}>
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

        {/* Search Actions */}
        <div className="flex flex-wrap gap-4 items-center justify-between pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Filter zurücksetzen
            </Button>
            <Badge variant="secondary" className="flex items-center gap-1">
              {filteredHotelsCount} Hotels gefunden
            </Badge>
            {searchPerformed && bookingResultsCount > 0 && (
              <Badge variant="outline" className="flex items-center gap-1 bg-pride-blue text-white">
                {bookingResultsCount} Booking.com Hotels
              </Badge>
            )}
          </div>
          
          <Button 
            onClick={onSearch}
            disabled={isSearching || !searchParams.checkIn || !searchParams.checkOut}
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
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-pride-green rounded-full"></div>
              <span className="font-medium">Live-Suche abgeschlossen</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Zeigt eine Kombination aus unseren Pride-zertifizierten Partner-Hotels und verfügbaren Booking.com Hotels für {searchParams.checkIn} bis {searchParams.checkOut}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}