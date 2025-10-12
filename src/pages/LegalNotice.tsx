import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from '@/hooks/useTranslation'

export function LegalNotice() {
  const { t } = useTranslation()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{t('legalNoticeTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('legalNoticeIntro')}
            </p>
            
            <Separator />
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{t('legalNoticeDisclaimerTitle')}</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t('legalNoticeNotAffiliated')}</li>
                <li>{t('legalNoticeNoDirectBookings')}</li>
                <li>{t('legalNoticeInfoAccuracy')}</li>
                <li>{t('legalNoticeAffiliateLinks')}</li>
                <li>{t('legalNoticePersonalProject')}</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="text-xs text-muted-foreground">
              <p>
                {t('legalNoticeContact')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
