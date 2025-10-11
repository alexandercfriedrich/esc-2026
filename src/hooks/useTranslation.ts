import { useLanguage } from '@/hooks/useLanguage'
import { translations, TranslationKey } from '@/lib/translations'

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.de[key] || key
  }

  return { t, language }
}