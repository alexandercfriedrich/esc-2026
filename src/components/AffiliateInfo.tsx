import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowSquareOut, CurrencyEur } from '@phosphor-icons/react'
import { useTranslation } from '@/hooks/useTranslation'

export function AffiliateInfo() {
  const { t } = useTranslation()
  
  return (
    <Card className="border-pride-blue/20 bg-pride-blue/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pride-blue">
          🤝 {t('affiliateTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-pride-green" />
              {t('affiliateIntegrationFeatures')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateCommissionJunctionId')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateDeepLinkGenerator')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateHotelSearch')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateLGBTQFilter')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateBookingAPI')}
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <CurrencyEur className="w-4 h-4 text-pride-orange" />
              {t('affiliateTracking')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateCJTracking')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateCommissionTracking')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateEurovisionLabels')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliatePerformanceAnalytics')}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">✓</Badge>
                {t('affiliateLGBTQCategories')}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <ArrowSquareOut className="w-4 h-4" />
            {t('affiliateLinkStructure')}
          </h4>
          <div className="space-y-2 text-xs text-muted-foreground font-mono">
            <div>
              <strong>{t('affiliateDirectHotelLink')}</strong><br />
              https://www.tkqlhce.com/click-101370188-14082404?url=[encoded-hotel-url]
            </div>
            <div>
              <strong>{t('affiliateViennaSearchLink')}</strong><br />
              https://www.tkqlhce.com/click-101370188-14082404?url=[encoded-search-url]
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground p-3 bg-pride-yellow/10 rounded border border-pride-yellow/20">
          <strong>💡 {t('affiliateImplementationNote')}</strong> {t('affiliateImplementationText')}
        </div>
      </CardContent>
    </Card>
  )
}