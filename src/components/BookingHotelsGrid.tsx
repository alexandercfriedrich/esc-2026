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

  const getHotelImageUrl = (hotel: BookingHotel) => {
    // Hotel-spezifische Bilder basierend auf dem Hotel-Namen
    const hotelImages: { [key: string]: string } = {
      'stadthalle': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=200&fit=crop&auto=format&q=80',
      'das-triest': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop&auto=format&q=80',
      'am-konzerthaus': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop&auto=format&q=80',
      'regina': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=200&fit=crop&auto=format&q=80',
      'sacher': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=200&fit=crop&auto=format&q=80',
      'imperial': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=200&fit=crop&auto=format&q=80',
      'ruby-marie': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=200&fit=crop&auto=format&q=80',
      'moxy-vienna': 'https://images.unsplash.com/photo-1551895009-882f7b3e6b2e?w=400&h=200&fit=crop&auto=format&q=80',
      'arthotel': 'https://images.unsplash.com/photo-1578774204375-51fa0ba81ae8?w=400&h=200&fit=crop&auto=format&q=80',
      'andaz': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=200&fit=crop&auto=format&q=80',
      'hilton-plaza': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=200&fit=crop&auto=format&q=80',
      'budget-europa': 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=200&fit=crop&auto=format&q=80',
      'pride-rainbow': 'https://images.unsplash.com/photo-1576675466681-0e73a92026b3?w=400&h=200&fit=crop&auto=format&q=80'
    }
    
    return hotelImages[hotel.id] || `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop&auto=format&q=80`
  }

  const getHotelImageUrlLarge = (hotel: BookingHotel) => {
    // Hotel-spezifische Bilder basierend auf dem Hotel-Namen - größere Versionen
    const hotelImages: { [key: string]: string } = {
      'stadthalle': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format&q=80',
      'das-triest': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format&q=80',
      'am-konzerthaus': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop&auto=format&q=80',
      'regina': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format&q=80',
      'sacher': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format&q=80',
      'imperial': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop&auto=format&q=80',
      'ruby-marie': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format&q=80',
      'moxy-vienna': 'https://images.unsplash.com/photo-1551895009-882f7b3e6b2e?w=800&h=400&fit=crop&auto=format&q=80',
      'arthotel': 'https://images.unsplash.com/photo-1578774204375-51fa0ba81ae8?w=800&h=400&fit=crop&auto=format&q=80',
      'andaz': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format&q=80',
      'hilton-plaza': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format&q=80',
      'budget-europa': 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&h=400&fit=crop&auto=format&q=80',
      'pride-rainbow': 'https://images.unsplash.com/photo-1576675466681-0e73a92026b3?w=800&h=400&fit=crop&auto=format&q=80'
    }
    
    return hotelImages[hotel.id] || `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop&auto=format&q=80`
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
                    {/* Hotel Image */}
                    <div className="h-64 rounded-lg relative overflow-hidden">
                      <img 
                        src={getHotelImageUrlLarge(hotel)}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop&auto=format&q=80`;
                        }}
                      />
                      <div className="absolute bottom-4 left-4">
                        <Badge className={getPrideBadgeColor(hotel.lgbt_certification || 'standard')}>
                          {getPrideBadgeText(hotel.lgbt_certification || 'standard')}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
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
            
            {/* Hotel Image */}
            <div className="h-48 relative overflow-hidden">
              <img 
                src={getHotelImageUrl(hotel)}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop&auto=format&q=80`;
                }}
              />
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