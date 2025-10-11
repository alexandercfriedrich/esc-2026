import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/hooks/useTranslation'

interface HotelSearchInfoProps {
  searchPerformed: boolean
  bookingHotelsCount: number
  isSearching: boolean
}

export function BookingWidget({ searchPerformed, bookingHotelsCount, isSearching }: HotelSearchInfoProps) {
  const { t } = useTranslation()

  return (
    <Card className="mb-6 border-pride-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏨 {t('language') === 'de' ? 'Wien Eurovision Hotels' : 'Vienna Eurovision Hotels'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pride-blue/10 to-pride-indigo/10 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="font-semibold">
                🎯 {t('language') === 'de' ? 'ESC 2026 Wien Hotel Empfehlungen' : 'ESC 2026 Vienna Hotel Recommendations'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('language') === 'de' 
                  ? 'Handverlesene Hotels mit aktuellen Preisen und Verfügbarkeiten • LGBTQ+ freundliche Auswahl'
                  : 'Hand-picked hotels with current prices and availability • LGBTQ+ friendly selection'
                }
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">🏳️‍🌈 {t('prideCertified')}</Badge>
              <Badge variant="secondary" className="text-xs">📍 {t('language') === 'de' ? 'Nahe Stadthalle' : 'Near Stadthalle'}</Badge>
              <Badge variant="secondary" className="text-xs">⭐ {t('language') === 'de' ? 'Top bewertet' : 'Top rated'}</Badge>
              <Badge variant="secondary" className="text-xs">💶 {t('language') === 'de' ? 'Echte Preise' : 'Real prices'}</Badge>
              <Badge variant="secondary" className="text-xs">🔄 {t('language') === 'de' ? 'Live-Verfügbarkeit' : 'Live availability'}</Badge>
            </div>
          </div>

          {isSearching ? (
            <div className="bg-pride-orange/10 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold text-pride-orange mb-2">
                🔄 {t('searchingHotels')}
              </div>
              <p className="text-sm text-muted-foreground">
                {t('language') === 'de' ? 'Hotels werden von Booking.com geladen' : 'Hotels are being loaded from Booking.com'}
              </p>
            </div>
          ) : searchPerformed ? (
            <div className="bg-pride-green/10 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold text-pride-green mb-2">
                ✅ {bookingHotelsCount} {t('language') === 'de' ? 'verfügbare Hotels gefunden' : 'available hotels found'}
              </div>
              <p className="text-sm text-muted-foreground">
                {t('language') === 'de' 
                  ? 'Aktuelle Preise und Verfügbarkeiten von Booking.com'
                  : 'Current prices and availability from Booking.com'
                }
              </p>
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-lg font-semibold mb-2">
                🔍 {t('language') === 'de' ? 'Booking.com Hotelsuche' : 'Booking.com Hotel Search'}
              </div>
              <p className="text-sm text-muted-foreground">
                {t('language') === 'de' 
                  ? 'Füllen Sie die Suchkriterien aus um Hotels zu laden'
                  : 'Fill in the search criteria to load hotels'
                }
              </p>
            </div>
          )}
          
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-pride-green rounded-full"></div>
              <span className="font-medium">{t('language') === 'de' ? 'Hotel-Integration' : 'Hotel Integration'}</span>
            </div>
            <p>
              {t('language') === 'de' 
                ? 'Alle Hotels führen direkt zu Booking.com für die beste Verfügbarkeit und sichere Buchung.'
                : 'All hotels lead directly to Booking.com for the best availability and secure booking.'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
