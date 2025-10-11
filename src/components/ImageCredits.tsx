import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function ImageCredits() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Bildnachweis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Eurovision Logo</h3>
              <p className="text-sm text-muted-foreground">
                Von Europäische Rundfunkunion (EBU) - 
                <a 
                  href="https://logos.fandom.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://logos.fandom.com
                </a>
                , Logo, 
                <a 
                  href="https://de.wikipedia.org/w/index.php?curid=13511211" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://de.wikipedia.org/w/index.php?curid=13511211
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Hotel Motto Vienna</h3>
              <p className="text-sm text-muted-foreground">
                Von French'Ic Touch - 
                <a 
                  href="https://www.frenchictouch.com/hotel-motto-a-vienne-quand-lelegance-parisienne-rencontre-le-chic-viennois/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.frenchictouch.com/hotel-motto-a-vienne-quand-lelegance-parisienne-rencontre-le-chic-viennois/
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Hotel Stadthalle</h3>
              <p className="text-sm text-muted-foreground">
                Offizielle Website - 
                <a 
                  href="https://www.hotelstadthalle.at" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.hotelstadthalle.at
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Altstadt Vienna</h3>
              <p className="text-sm text-muted-foreground">
                Hotel Gallery - 
                <a 
                  href="https://www.altstadt.at/en/gallery/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.altstadt.at/en/gallery/
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Hotel Sans Souci Vienna</h3>
              <p className="text-sm text-muted-foreground">
                Press Gallery - 
                <a 
                  href="https://www.sanssouci-wien.com/en/press/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.sanssouci-wien.com/en/press/
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Accor Hotels</h3>
              <p className="text-sm text-muted-foreground">
                Hotel Information - 
                <a 
                  href="https://all.accor.com/hotel/0781/index.de.shtml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://all.accor.com/hotel/0781/index.de.shtml
                </a>
                <br />
                Hotel Information - 
                <a 
                  href="https://all.accor.com/hotel/1276/index.de.shtml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://all.accor.com/hotel/1276/index.de.shtml
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">DOCO Hotel</h3>
              <p className="text-sm text-muted-foreground">
                Hotel Information - 
                <a 
                  href="https://www.docohotel.com/vienna/de/rooms/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.docohotel.com/vienna/de/rooms/
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Donauwalzer</h3>
              <p className="text-sm text-muted-foreground">
                Bildergalerie - 
                <a 
                  href="https://www.donauwalzer.at/services/bildergalerie/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.donauwalzer.at/services/bildergalerie/
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Zeitgeist Vienna</h3>
              <p className="text-sm text-muted-foreground">
                Website - 
                <a 
                  href="https://www.zeitgeist-vienna.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.zeitgeist-vienna.com/
                </a>
                <br />
                DayUse Booking - 
                <a 
                  href="https://de.dayuse.ch/hotels/austria/hotel-zeitgeist-vienna-hauptbahnhof" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://de.dayuse.ch/hotels/austria/hotel-zeitgeist-vienna-hauptbahnhof
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Andaz Vienna am Belvedere</h3>
              <p className="text-sm text-muted-foreground">
                Hyatt Hotels - 
                <a 
                  href="https://www.hyatt.com/andaz/de-DE/vieaz-andaz-vienna-am-belvedere" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.hyatt.com/andaz/de-DE/vieaz-andaz-vienna-am-belvedere
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Leonardo Hotel Vienna Hauptbahnhof</h3>
              <p className="text-sm text-muted-foreground">
                Leonardo Hotels - 
                <a 
                  href="https://www.leonardo-hotels.de/vienna/leonardo-hotel-vienna-hauptbahnhof" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.leonardo-hotels.de/vienna/leonardo-hotel-vienna-hauptbahnhof
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Hilton Vienna Waterfront</h3>
              <p className="text-sm text-muted-foreground">
                Hotel Gallery - 
                <a 
                  href="https://www.hilton.com/de/hotels/viehahi-hilton-vienna-waterfront/gallery/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.hilton.com/de/hotels/viehahi-hilton-vienna-waterfront/gallery/
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Radisson Blu Das Triest Wien</h3>
              <p className="text-sm text-muted-foreground">
                Hotel Information - 
                <a 
                  href="https://www.radissonhotels.com/de-de/hotels/radisson-blu-das-triest-wien" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://www.radissonhotels.com/de-de/hotels/radisson-blu-das-triest-wien
                </a>
              </p>
            </div>
            
            <Separator />
            
            <div className="text-xs text-muted-foreground">
              <p>
                Alle Bilder und Logos werden gemäß den jeweiligen Urheberrechtsbestimmungen verwendet. 
                Bei Fragen oder Beanstandungen bezüglich der Bildrechte wenden Sie sich bitte an uns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}