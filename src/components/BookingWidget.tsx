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
        <CardTitle className="flex items-center gap-2">
          🏨 Wien Eurovision Hotels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pride-blue/10 to-pride-indigo/10 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="font-semibold">🎯 Eurovision 2026 Wien Hotel Empfehlungen</h3>
              <p className="text-sm text-muted-foreground">Handverlesene Hotels mit aktuellen Preisen und Verfügbarkeiten • LGBTQ+ freundliche Auswahl</p>
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
                Aktuelle Preise und Verfügbarkeiten von Booking.com
              </p>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold mb-2">
                🔍 Booking.com Hotelsuche
              </div>
              <p className="text-sm text-muted-foreground">
                Füllen Sie die Suchkriterien aus um Hotels zu laden
              </p>
            </div>
          )}
          
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pride-green rounded-full"></div>
              <span className="font-medium">Hotel-Integration</span>
            </div>
            <p>
              Alle Hotels führen direkt zu Booking.com für die beste Verfügbarkeit und sichere Buchung.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
