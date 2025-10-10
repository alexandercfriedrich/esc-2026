import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { generateAffiliateUrl, HotelSearchParams, BookingHotel } from '@/services/hotelService'

export function AffiliateDebugger() {
  const testSearchParams: HotelSearchParams = {
    checkIn: '2026-05-12',
    checkOut: '2026-05-17',
    adults: 2,
    children: 0,
    rooms: 1,
    priceMin: 50,
    priceMax: 500
  }

  const testHotel: BookingHotel = {
    id: 'stadthalle',
    name: 'Boutiquehotel Stadthalle',
    rating: 4.5,
    review_score: 9.1,
    review_count: 1247,
    price: { amount: 160, currency: 'EUR', min: 160, max: 220 },
    stars: 3,
    distance_km_to_venue: 0.3,
    distance_to_venue: 0.3,
    lgbtq_friendly: true,
    lgbt_certification: 'certified',
    categories: ['Pride Certified', 'Eco-friendly', 'Near Venue'],
    slug: 'boutiquehotel-stadthalle',
    district: 'Rudolfsheim-Fünfhaus',
    address: 'Hackengasse 20',
    city: 'Wien',
    description: 'Das umweltfreundlichste Hotel Wiens - perfekt für bewusste Eurovision-Fans!',
    amenities: ['WiFi kostenlos', 'Frühstück', 'Klimaanlage', 'Fitnessstudio'],
    available: true,
    rooms_available: 12
  }

  const handleTestBooking = () => {
    const affiliateUrl = generateAffiliateUrl(testHotel, testSearchParams)
    console.log('🔗 Test Affiliate URL:', affiliateUrl)
    
    // Parse URL to verify parameters
    const urlObj = new URL(affiliateUrl)
    const params = Object.fromEntries(urlObj.searchParams.entries())
    
    console.log('📋 Extracted URL Parameters:', params)
    
    // Verify all required parameters are present
    const requiredParams = ['aid', 'checkin', 'checkout', 'group_adults', 'no_rooms']
    const missingParams = requiredParams.filter(param => !params[param])
    
    if (missingParams.length === 0) {
      console.log('✅ All required parameters are present')
    } else {
      console.error('❌ Missing parameters:', missingParams)
    }
    
    // Open URL in new tab for verification
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="mt-8 border-orange-200">
      <CardHeader>
        <CardTitle className="text-lg">🔧 Affiliate Link Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-3 rounded text-sm">
          <strong>Test Search Parameters:</strong><br />
          Check-in: {testSearchParams.checkIn}<br />
          Check-out: {testSearchParams.checkOut}<br />
          Adults: {testSearchParams.adults}<br />
          Rooms: {testSearchParams.rooms}
        </div>
        
        <div className="bg-muted p-3 rounded text-sm">
          <strong>Test Hotel:</strong><br />
          Name: {testHotel.name}<br />
          Slug: {testHotel.slug}<br />
          ID: {testHotel.id}
        </div>
        
        <Button onClick={handleTestBooking} className="w-full">
          🧪 Test Affiliate Link Generation
        </Button>
        
        <p className="text-xs text-muted-foreground">
          This will generate a test affiliate link and open it in a new tab. 
          Check the browser console for detailed debugging information.
        </p>
      </CardContent>
    </Card>
  )
}