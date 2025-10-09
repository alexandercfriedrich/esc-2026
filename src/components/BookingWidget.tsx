import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface HotelSearchInfoProps {
  searchPerformed: boolean
  bookingHotelsCount: number
  isSearching: boolean
}

export function BookingWidget({ searchPerformed, bookingHotelsCount, isSearching }: HotelSearchInfoProps) {
  return (
    <Card className="mb-6 border-pride-blue/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            🏨 Live Booking.com Hotels Wien 2026
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-pride-blue text-white">
              Echte Booking.com Daten
            </Badge>
            <Badge variant="outline" className="text-xs">
              Affiliate ID: 101370188
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pride-blue/10 to-pride-indigo/10 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="font-semibold">🎯 Echte Hotels von Booking.com</h3>
              <p className="text-sm text-muted-foreground">
                Live-Hotelsuche mit aktuellen Preisen und Verfügbarkeiten • LGBTQ+ freundliche Auswahl
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">🏳️‍🌈 Pride Certified</Badge>
              <Badge variant="secondary" className="text-xs">📍 Nahe Stadthalle</Badge>
              <Badge variant="secondary" className="text-xs">⭐ Top bewertet</Badge>
              <Badge variant="secondary" className="text-xs">💶 Echte Preise</Badge>
              <Badge variant="secondary" className="text-xs">🔄 Live-Verfügbarkeit</Badge>
            </div>
          </div>

          {isSearching ? (
            <div className="bg-pride-orange/10 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold text-pride-orange mb-2">
                🔄 Suche läuft...
              </div>
              <p className="text-sm text-muted-foreground">
                Hotels werden von Booking.com geladen
              </p>
            </div>
          ) : searchPerformed ? (
            <div className="bg-pride-green/10 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold text-pride-green mb-2">
                ✅ {bookingHotelsCount} verfügbare Hotels gefunden
              </div>
              <p className="text-sm text-muted-foreground">
                Live-Daten von Booking.com • Aktuelle Preise und Verfügbarkeiten
              </p>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold mb-2">
                🔍 Booking.com Hotelsuche
              </div>
              <p className="text-sm text-muted-foreground">
                Füllen Sie die Suchkriterien aus um echte Hotels von Booking.com zu laden
              </p>
            </div>
          )}
          
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pride-green rounded-full"></div>
              <span className="font-medium">Booking.com API-Integration</span>
            </div>
            <p>
              Echte Hotels werden direkt von Booking.com geladen und hier angezeigt. 
              Jeder "Jetzt buchen" Button führt zu Booking.com mit unserer Affiliate-ID 101370188.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
