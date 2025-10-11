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

      </CardContent>
    </Card>
  );
}
