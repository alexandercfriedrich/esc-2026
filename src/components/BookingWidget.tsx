import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function BookingWidget() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏨 Booking.com Partner Widget
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Direkter Zugang zu Booking.com mit unserem Affiliate-Partner-Widget für Wien.
          </p>
          
          {/* Booking.com Partner Widget - This would be the actual iframe in production */}
          <div className="bg-gradient-to-br from-pride-blue to-pride-indigo rounded-lg p-8 text-white min-h-[200px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold">🏨 Booking.com</div>
              <div className="text-lg">Wien • Eurovision 2026</div>
              <div className="text-sm opacity-90">
                Partner Widget<br />
                (Affiliate ID: 101370188)
              </div>
              <div className="mt-4 p-2 bg-white/20 rounded text-xs">
                Live-Widget würde hier eingebettet werden
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            Das Partner-Widget ermöglicht direkten Zugang zu Booking.com Angeboten für Wien mit automatischer Affiliate-Verfolgung.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function BookingIframe() {
  const affiliateId = '101370188'
  const destinationId = '-1991997' // Vienna destination ID
  const checkIn = '2026-05-12'
  const checkOut = '2026-05-17'
  
  // In production, this would use the actual Booking.com embed widget
  const bookingEmbedUrl = `https://www.booking.com/general.html?aid=${affiliateId}&label=eurovision-rainbow-city-vienna&sid=esc2026&dest_id=${destinationId}&dest_type=city&checkin=${checkIn}&checkout=${checkOut}&room1=A,A&lang=de&sb_price_type=total&type=total&`
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📋 Booking.com Einbettung
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-4">
            Für die vollständige Integration würde hier ein Booking.com Partner-Widget eingebettet werden.
          </p>
          
          {/* Placeholder for actual Booking.com iframe */}
          <div className="bg-white border rounded-lg p-6 text-center min-h-[300px] flex items-center justify-center">
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-700">
                🏨 Booking.com Partner Integration
              </div>
              <div className="text-sm text-gray-600">
                Wien • 12-17 Mai 2026 • 2 Erwachsene
              </div>
              <div className="bg-blue-50 p-4 rounded text-xs">
                <strong>Affiliate-Konfiguration:</strong><br />
                AID: {affiliateId}<br />
                Destination: Wien (-1991997)<br />
                Label: eurovision-rainbow-city-vienna
              </div>
              <div className="text-xs text-gray-500">
                Production: iframe src würde {bookingEmbedUrl} verwenden
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}