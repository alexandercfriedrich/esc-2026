import React, { useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

export function DynamicTitle() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('metaTitle')
  }, [t])

  return null
}