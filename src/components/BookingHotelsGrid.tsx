import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Heart, MapPin, Star, WifiHigh, Car, Coffee, Barbell, Eye, Users } from '@phosphor-icons/react'
import { BookingHotel, generateAffiliateUrl, HotelSearchParams } from '@/services/hotelService'
import { toast } from 'sonner'

interface BookingHotelsGridProps {
  hotels: BookingHotel[]
  searchParams: HotelSearchParams
  favoriteHotels: string[] | null
  onToggleFavorite: (hotelId: string) => void
}

export function BookingHotelsGrid({ 
  hotels, 
  searchParams, 
  favoriteHotels,
  onToggleFavorite 
}: BookingHotelsGridProps) {
  
  const handleBooking = (hotel: BookingHotel) => {
    try {
      // Track booking click for analytics
      const cj = (window as any)._cj
      if (cj && typeof cj.track === 'function') {
        cj.track('booking-click', {
          hotel_id: hotel.id,
          hotel_name: hotel.name,
          price: hotel.price.amount,
          lgbt_certification: hotel.lgbt_certification,
          source: 'booking_com_api'
        })
      }
    } catch (error) {
      console.warn('CJ tracking failed:', error)
    }

    // Generate Booking.com affiliate URL
    const affiliateUrl = generateAffiliateUrl(hotel, searchParams)
    
    // Open booking URL in new tab
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
    
    toast.success(`Weiterleitung zu Booking.com für ${hotel.name}...`)
  }

  const getPrideBadgeColor = (certification: string) => {
    switch(certification) {
      case 'certified': return 'bg-pride-red text-white'
      case 'friendly': return 'bg-pride-green text-white'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPrideBadgeText = (certification: string) => {
    switch(certification) {
      case 'certified': return '🏳️‍🌈 Pride Certified'
      case 'friendly': return '🤝 LGBTQ+ Friendly'
      default: return 'Standard'
    }
  }

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes('wifi')) return <WifiHigh className="w-4 h-4" />
    if (lowerAmenity.includes('parking')) return <Car className="w-4 h-4" />
    if (lowerAmenity.includes('breakfast')) return <Coffee className="w-4 h-4" />
    if (lowerAmenity.includes('gym')) return <Barbell className="w-4 h-4" />
    return null
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-semibold mb-2">Keine Hotels gefunden</h3>
          <p className="text-sm">
            Versuchen Sie andere Suchkriterien oder erweitern Sie Ihre Filter.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          📍 {hotels.length} verfügbare Hotels in Wien
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 hover:bg-white"
                onClick={() => onToggleFavorite(hotel.id)}
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
                        <span className="text-sm text-muted-foreground">
                          ({hotel.review_score}/10 • {hotel.review_count} Bewertungen)
                        </span>
                      </div>
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {hotel.address && hotel.city ? `${hotel.address}, ${hotel.city}` : hotel.district} • {hotel.distance_to_venue || hotel.distance_km_to_venue}km zur Stadthalle
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Hotel Image Placeholder */}
                    <div className="h-64 bg-gradient-to-br from-pride-blue to-pride-purple rounded-lg relative">
                      <div className="absolute bottom-4 left-4">
                        <Badge className={getPrideBadgeColor(hotel.lgbt_certification || 'standard')}>
                          {getPrideBadgeText(hotel.lgbt_certification || 'standard')}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 text-white text-sm">
                        📷 {hotel.photos?.length || 0} Fotos
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <h3 className="font-semibold mb-2">Beschreibung</h3>
                      <p className="text-muted-foreground">{hotel.description}</p>
                    </div>
                    
                    {/* Booking.com Info */}
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        ℹ️ Hotel Informationen
                      </h3>
                      <div className="bg-muted p-3 rounded-lg text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>Bewertungsscore: {hotel.review_score}/10</div>
                          <div>Bewertungen: {hotel.review_count}</div>
                          <div>Verfügbare Zimmer: {hotel.rooms_available}</div>
                          <div>Entfernung: {hotel.distance_to_venue}km</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div>
                      <h3 className="font-semibold mb-2">Ausstattung</h3>
                      <div className="flex flex-wrap gap-2">
                        {(hotel.amenities || []).map((amenity, index) => (
                          <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm">
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Pricing & Booking */}
                    <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
                      <div>
                        <div className="text-2xl font-bold text-pride-green">
                          €{hotel.price.amount}
                        </div>
                        <div className="text-sm text-muted-foreground">pro Nacht • {hotel.price.currency}</div>
                      </div>
                      <Button 
                        className="bg-pride-orange hover:bg-pride-red transition-colors px-8"
                        onClick={() => handleBooking(hotel)}
                      >
                        Jetzt buchen
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Hotel Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-pride-blue to-pride-purple relative">
              <div className="absolute bottom-4 left-4">
                <Badge className={getPrideBadgeColor(hotel.lgbt_certification || 'standard')}>
                  {getPrideBadgeText(hotel.lgbt_certification || 'standard')}
                </Badge>
              </div>
              {!hotel.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Ausgebucht</Badge>
                </div>
              )}
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {hotel.address} • {hotel.distance_to_venue}km zur Stadthalle
                  </div>
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
                  {(hotel.amenities || []).slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {(hotel.amenities || []).length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(hotel.amenities || []).length - 3}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {hotel.review_count} Bewertungen
                  </div>
                  <div className="flex items-center gap-1">
                    Score: {hotel.review_score}/10
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-pride-green">
                      €{hotel.price.amount}
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
                      disabled={!hotel.available}
                    >
                      {hotel.available ? 'Buchen' : 'Ausgebucht'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}