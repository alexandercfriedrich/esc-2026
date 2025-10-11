import React from 'react'
import { Globe } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { useTranslation } from '@/hooks/useTranslation'

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/20"
      title={language === 'de' ? t('switchToEnglish') : t('switchToGerman')}
    >
      <Globe size={16} />
      <span className="font-medium">
        {language === 'de' ? 'EN' : 'DE'}
      </span>
    </Button>
  )
}