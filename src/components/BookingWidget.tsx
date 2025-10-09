import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface HotelSearchInfoProps {
  searchPerformed: boolean
  filteredHotelsCount: number
}

export function BookingWidget({ searchPerformed, filteredHotelsCount }: HotelSearchInfoProps) {
  return (
    <Card className="mb-6 border-pride-blue/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            🏨 Eurovision Hotels Wien 2026
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-pride-blue text-white">
              Handselektierte Partner-Hotels
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
              <h3 className="font-semibold">🎯 Eurovision-optimierte Hotelauswahl</h3>
              <p className="text-sm text-muted-foreground">
                8 handselektierte LGBTQ+ freundliche Hotels • Direkte Booking.com-Weiterleitung
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">🏳️‍🌈 Pride Certified</Badge>
              <Badge variant="secondary" className="text-xs">📍 Nahe Stadthalle</Badge>
              <Badge variant="secondary" className="text-xs">⭐ Top bewertet</Badge>
              <Badge variant="secondary" className="text-xs">💶 Alle Preisklassen</Badge>
            </div>
          </div>

          {searchPerformed ? (
            <div className="bg-pride-green/10 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold text-pride-green mb-2">
                ✅ {filteredHotelsCount} passende Hotels gefunden
              </div>
              <p className="text-sm text-muted-foreground">
                Alle Hotels unten verfügbar mit direkter Booking.com-Weiterleitung
              </p>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold mb-2">
                🔍 Hotelsuche starten
              </div>
              <p className="text-sm text-muted-foreground">
                Bitte füllen Sie die Suchkriterien aus, um unsere handselektierten Eurovision-Hotels anzuzeigen
              </p>
            </div>
          )}
          
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pride-green rounded-full"></div>
              <span className="font-medium">Booking.com Affiliate-Partner</span>
            </div>
            <p>
              Alle "Jetzt buchen" Buttons führen direkt zu Booking.com mit unserer Affiliate-ID 101370188. 
              Wir erhalten Provisionen für vermittelte Buchungen ohne Zusatzkosten für Sie.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
