import { useState, useEffect } from 'react'

export type Language = 'de' | 'en'

const LANGUAGE_STORAGE_KEY = 'user-language'
const LANGUAGE_CHANGE_EVENT = 'languageChange'

export function useLanguage() {
  // Initialize language from localStorage or default to 'de'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
      return (stored === 'en' || stored === 'de') ? stored : 'de'
    }
    return 'de'
  })

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>
      setLanguageState(customEvent.detail)
    }

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange)
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange)
  }, [])

  // Persist language changes to localStorage and notify other components
  const setLanguage = (newLanguage: Language | ((prev: Language) => Language)) => {
    setLanguageState(prev => {
      const nextLanguage = typeof newLanguage === 'function' ? newLanguage(prev) : newLanguage
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
        // Dispatch custom event to notify all components
        window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: nextLanguage }))
      }
      return nextLanguage
    })
  }

  const toggleLanguage = () => {
    setLanguage(current => current === 'de' ? 'en' : 'de')
  }

  const setToGerman = () => setLanguage('de')
  const setToEnglish = () => setLanguage('en')

  return {
    language,
    setLanguage,
    toggleLanguage,
    setToGerman,
    setToEnglish,
    isGerman: language === 'de',
    isEnglish: language === 'en'
  }
}