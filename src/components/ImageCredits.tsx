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