import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function BookingWidget() {
  const [showIframe, setShowIframe] = useState(true)
  
  // Booking.com Affiliate Configuration
  const affiliateConfig = {
    aid: '101370188',
    label: 'eurovision-rainbow-city-vienna',
    sid: 'esc2026',
    destId: '-1991997', // Vienna
    destType: 'city'
  }
  
  // Generate Booking.com affiliate URL for Vienna
  const generateBookingUrl = () => {
    const params = new URLSearchParams({
      aid: affiliateConfig.aid,
      label: affiliateConfig.label,
      sid: affiliateConfig.sid,
      dest_id: affiliateConfig.destId,
      dest_type: affiliateConfig.destType,
      checkin: '2026-05-12',
      checkout: '2026-05-17',
      group_adults: '2',
      no_rooms: '1',
      lang: 'de',
      sb_price_type: 'total'
    })
    
    return `https://www.anrdoezrs.net/click-101370188-13822287?url=https://www.booking.com/searchresults.html?${params.toString()}`
  }
  
  // Direct Booking.com search URL for embedding
  const embedUrl = (() => {
    const params = new URLSearchParams({
      aid: affiliateConfig.aid,
      label: affiliateConfig.label,
      sid: affiliateConfig.sid,
      dest_id: affiliateConfig.destId,
      dest_type: affiliateConfig.destType,
      checkin: '2026-05-12',
      checkout: '2026-05-17',
      group_adults: '2',
      no_rooms: '1',
      lang: 'de',
      sb_price_type: 'total',
      selected_currency: 'EUR'
    })
    
    return `https://www.booking.com/searchresults.html?${params.toString()}`
  })()

  return (
    <Card className="mb-6 border-pride-blue/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            🏨 Booking.com Partner Integration
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-pride-blue text-white">
              Live Partner-Widget
            </Badge>
            <Badge variant="outline" className="text-xs">
              Affiliate ID: {affiliateConfig.aid}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pride-blue/10 to-pride-indigo/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">🎯 Eurovision-optimierte Hotelsuche</h3>
                <p className="text-sm text-muted-foreground">
                  Vorkonfiguriert für Wien • 12.-17. Mai 2026 • LGBTQ+ freundlich
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowIframe(!showIframe)}
              >
                {showIframe ? 'Widget ausblenden' : 'Widget anzeigen'}
              </Button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">2 Erwachsene</Badge>
              <Badge variant="secondary" className="text-xs">1 Zimmer</Badge>
              <Badge variant="secondary" className="text-xs">€€€ Alle Preisklassen</Badge>
              <Badge variant="secondary" className="text-xs">🏳️‍🌈 LGBTQ+ Filter</Badge>
            </div>
          </div>

          {showIframe && (
            <div className="rounded-lg overflow-hidden border-2 border-pride-blue/20">
              {/* Booking.com Iframe Integration */}
              <iframe
                src={embedUrl}
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="yes"
                title="Booking.com Hotel Search - Vienna Eurovision 2026"
                className="w-full rounded-lg"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
                style={{ minHeight: '500px' }}
              ></iframe>
              
              {/* Fallback content if iframe fails */}
              <div className="bg-gradient-to-br from-pride-blue via-pride-indigo to-pride-violet text-white p-8 text-center">
                <div className="space-y-4">
                  <div className="text-2xl font-bold">🏨 Booking.com</div>
                  <div className="text-lg">Wien • Eurovision 2026</div>
                  <div className="text-sm opacity-90">
                    12.-17. Mai 2026 • 2 Erwachsene • 1 Zimmer
                  </div>
                  <Button 
                    className="bg-white text-pride-blue hover:bg-white/90"
                    onClick={() => window.open(generateBookingUrl(), '_blank', 'noopener,noreferrer')}
                  >
                    Auf Booking.com suchen
                  </Button>
                  <div className="text-xs opacity-75">
                    Affiliate-Partner • Commission Junction • ID: {affiliateConfig.aid}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-center">
            <Button 
              className="bg-pride-orange hover:bg-pride-red transition-colors px-8"
              onClick={() => window.open(generateBookingUrl(), '_blank', 'noopener,noreferrer')}
            >
              🔗 Direkt zu Booking.com Wien-Suche
            </Button>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pride-green rounded-full"></div>
              <span className="font-medium">Affiliate-Partner Information</span>
            </div>
            <p>
              Diese Seite ist Partner von Booking.com via Commission Junction und erhält Provisionen für vermittelte Buchungen. 
              Alle Links sind mit der Affiliate-ID {affiliateConfig.aid} versehen und führen zu den besten verfügbaren Preisen.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
