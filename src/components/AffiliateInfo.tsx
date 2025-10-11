import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowSquareOut, CurrencyEur } from '@phosphor-icons/react'

export function AffiliateInfo() {
  return (
    <Card className="border-pride-blue/20 bg-pride-blue/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pride-blue">
          🤝 Booking.com Partnership & Commission Junction Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-pride-green" />
              Affiliate Integration Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                Commission Junction Affiliate ID: 101370188
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                Deep-Link Generator mit Tracking
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                Hotel-Suchmaske mit Filter
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                LGBTQ+ und Pride-Filter
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                Echtzeit Booking.com API Mock
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <CurrencyEur className="w-4 h-4 text-pride-orange" />
              Tracking & Analytics
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                CJ Event Tracking für Booking-Clicks
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                Automatische Provisionserfassung
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                Eurovision-spezifische Labels
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                Performance Analytics
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                LGBTQ+ Hotel Kategorisierung
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <ArrowSquareOut className="w-4 h-4" />
            Link-Struktur Beispiele
          </h4>
          <div className="space-y-2 text-xs text-muted-foreground font-mono">
            <div>
              <strong>Direkter Hotel-Link:</strong><br />
              https://www.booking.com/hotel/at/[hotel-id].html?aid=101370188&checkin=[date]&checkout=[date]...
            </div>
            <div>
              <strong>Wien Such-Link:</strong><br />
              https://www.booking.com/searchresults.html?aid=101370188&dest_id=-1991997&dest_type=city&checkin=[date]...
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground p-3 bg-pride-yellow/10 rounded border border-pride-yellow/20">
          <strong>💡 Implementierungshinweis:</strong> Diese Demo zeigt eine vollständige Booking.com Affiliate-Integration 
          mit Commission Junction Tracking (ID: 101370188). In der Produktion würde die echte Booking.com API verwendet 
          und alle Links würden echte Provisionen generieren.
        </div>
      </CardContent>
    </Card>
  )
}