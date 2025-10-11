import { useKV } from '@github/spark/hooks'

export type Language = 'de' | 'en'

export function useLanguage() {
  const [language, setLanguage] = useKV<Language>('user-language', 'de')

  const toggleLanguage = () => {
    setLanguage(current => current === 'de' ? 'en' : 'de')
  }

  const setToGerman = () => setLanguage('de')
  const setToEnglish = () => setLanguage('en')

  return {
    language: language || 'de',
    setLanguage,
    toggleLanguage,
    setToGerman,
    setToEnglish,
    isGerman: (language || 'de') === 'de',
    isEnglish: (language || 'de') === 'en'
  }
}