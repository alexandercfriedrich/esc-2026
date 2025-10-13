import React, { useState, useEffect } from 'react'
import { Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { BookingSearchForm } from '@/components/BookingSearchForm'
import { BookingHotelsGrid } from '@/components/BookingHotelsGrid'
import { BookingWidget } from '@/components/BookingWidget'
import { Breadcrumb } from '@/components/Breadcrumb'
import { DynamicMetaTags } from '@/components/DynamicMetaTags'
import { DynamicTitle } from '@/components/DynamicTitle'
import { ImageCredits } from '@/components/ImageCredits'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { FAQSection } from '@/components/FAQSection'
import { SEOContent } from '@/components/SEOContent'
import { LegalNotice } from '@/pages/LegalNotice'
import SEO from '@/components/SEO'
import { BookingHotel, HotelSearchParams, searchBookingHotels, getAllHotels } from '@/services/hotelService'
import { useTranslation } from '@/hooks/useTranslation'
import eurovisionBanner from '@/assets/images/frontpage_banner_of_the_eurovision_songcontest_2026_vienna_platform.jpg'

export default function App() {
  const [hotels, setHotels] = useState<BookingHotel[]>([])
  const [allHotels, setAllHotels] = useState<BookingHotel[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [favoriteHotels, setFavoriteHotels] = useKV<string[]>("favorite-hotels", [])
  const [currentPage, setCurrentPage] = useState<'home' | 'bildnachweis' | 'legal-notice'>('home')
  // Store current search parameters for affiliate link generation
  const [currentSearchParams, setCurrentSearchParams] = useState<HotelSearchParams | null>(null)
  const { t } = useTranslation()

  // Load all hotels on initial page load
  useEffect(() => {
    const loadAllHotels = async () => {
      const allHotelsData = getAllHotels()
      setAllHotels(allHotelsData)
      // Set default search params for affiliate links
      setCurrentSearchParams({
        checkIn: '2026-05-12',
        checkOut: '2026-05-17',
        adults: 2,
        children: 0,
        rooms: 1,
        priceMin: 0,
        priceMax: 1000,
        stars: '',
        distanceFilter: '',
        lgbtFilter: ''
      })
    }
    loadAllHotels()
  }, [])

  // Simple routing based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'bildnachweis') {
        setCurrentPage('bildnachweis')
      } else if (hash === 'legal-notice') {
        setCurrentPage('legal-notice')
      } else {
        setCurrentPage('home')
      }
    }

    // Set initial page based on current hash
    handleHashChange()
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleSearch = async (params: HotelSearchParams) => {
    setIsSearching(true)
    setSearchPerformed(false)
    // Store the search parameters for affiliate link generation
    setCurrentSearchParams(params)
    
    try {
      const results = await searchBookingHotels(params)
      setHotels(results)
      setSearchPerformed(true)
    } catch (error) {
      console.error('Search failed:', error)
      setHotels([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleToggleFavorite = (hotelId: string) => {
    setFavoriteHotels(prevFavorites => {
      if (!prevFavorites) return [hotelId]
      if (prevFavorites.includes(hotelId)) {
        return prevFavorites.filter(id => id !== hotelId)
      } else {
        return [...prevFavorites, hotelId]
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Title Component */}
      <DynamicTitle />
      {/* Dynamic Meta Tags Component */}
      <DynamicMetaTags 
        hotels={hotels}
        searchQuery=""
        pageType={currentPage === 'bildnachweis' ? 'credits' : currentPage === 'legal-notice' ? 'home' : (searchPerformed ? 'search' : 'home')}
      />
      {/* SEO Component with comprehensive Schema.org markup */}
      <SEO 
        hotels={hotels}
        searchParams={currentSearchParams}
        pageType={currentPage === 'bildnachweis' ? 'credits' : currentPage === 'legal-notice' ? 'home' : (searchPerformed ? 'search' : 'home')}
      />
      {currentPage === 'legal-notice' ? (
        /* Legal Notice Page */
        (<>
          <header className="bg-primary text-primary-foreground py-6">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t('title')}</h1>
                  <nav className="mt-2">
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.hash = ''
                      }}
                      className="text-primary-foreground hover:underline"
                    >
                      {t('backToHome')}
                    </a>
                  </nav>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          <LegalNotice />
        </>)
      ) : currentPage === 'bildnachweis' ? (
        /* Bildnachweis Page */
        (<>
          <header className="bg-primary text-primary-foreground py-6">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">{t('title')}</h1>
                  <nav className="mt-2">
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.hash = ''
                      }}
                      className="text-primary-foreground hover:underline"
                    >
                      {t('backToHome')}
                    </a>
                  </nav>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          <ImageCredits />
        </>)
      ) : (
        /* Home Page */
        (<>
          {/* Hero Section with Eurovision Banner */}
          <section className="relative h-96 bg-cover bg-center bg-no-repeat" style={{ 
            backgroundImage: `url('${eurovisionBanner}')`
          }}>
            <div className="absolute top-4 right-4 z-20">
              <LanguageSwitcher />
            </div>
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-5xl mb-4 drop-shadow-lg text-slate-50 bg-gray-900 font-normal font-sans capital letters\n">{t('title')}</h1>
              </div>
            </div>
          </section>
          {/* Rainbow Header */}
          <div className="rainbow-header"></div>
          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb Navigation */}
            <Breadcrumb 
              pageType={searchPerformed ? 'search' : 'home'}
              searchType={searchPerformed ? 'Hotel Search Results' : undefined}
            />
            
            <BookingWidget 
              searchPerformed={searchPerformed}
              bookingHotelsCount={searchPerformed ? hotels.length : allHotels.length}
              isSearching={isSearching}
            />
            
            {/* Show all hotels by default or search results if search was performed */}
            {currentSearchParams && (
              <>
                {searchPerformed ? (
                  <BookingHotelsGrid 
                    hotels={hotels}
                    searchParams={currentSearchParams}
                    favoriteHotels={favoriteHotels || []}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ) : (
                  <BookingHotelsGrid 
                    hotels={allHotels}
                    searchParams={currentSearchParams}
                    favoriteHotels={favoriteHotels || []}
                    onToggleFavorite={handleToggleFavorite}
                  />
                )}
              </>
            )}
            
            {/* Search Form - moved below hotel cards but above FAQ */}
            <div className="mt-12 mb-8">
              <BookingSearchForm onSearch={handleSearch} />
            </div>
            
            {/* SEO Content - comprehensive hotel guide information */}
            {!searchPerformed && !isSearching && (
              <SEOContent />
            )}
            
            {/* FAQ Section - only show on home page when no search is performed */}
            {!searchPerformed && !isSearching && (
              <FAQSection />
            )}
          </div>
        </>)
      )}
      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-bold text-base mb-2">ESC 2026 Vienna Hotels</p>
          <p className="mb-4">Ihre unabhängige Plattform für LGBTQ+ freundliche Hotels zum Eurovision Song Contest 2026 in Wien</p>
          
          <nav className="flex justify-center space-x-2 mb-4">
            <a href="https://www.esc-2026-vienna.com/" className="hover:text-foreground transition-colors text-[#667eea]">
              Startseite
            </a>
            <span>|</span>
            <a href="https://www.esc-2026-vienna.com/hotels-vienna" className="hover:text-foreground transition-colors text-[#667eea]">
              Alle Hotels
            </a>
            <span>|</span>
            <a href="https://www.esc-2026-vienna.com/#about" className="hover:text-foreground transition-colors text-[#667eea]">
              Über uns
            </a>
          </nav>
          
          <div className="mt-4">
            <p className="font-semibold mb-2">Unsere Hotels:</p>
            <p className="text-sm leading-relaxed">
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/andaz-vienna-eurovision.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Andaz Vienna</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/art-hotel-vienna.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">ART HOTEL</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/boutique-hotel-donauwalzer.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Donauwalzer</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/boutique-hotel-motto.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Hotel Motto</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/boutiquehotel-esc.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Boutiquehotel Stadthalle</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/do-co-hotel-vienna.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">DO&CO</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/henriette-stadthotel-vienna.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Henriette Stadthotel</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/hotel-altstadt-vienna.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Altstadt Vienna</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/hotel-imperial-vienna.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Imperial</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/hotel-mercure-wien-city.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Mercure Wien City</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/hotel-sacher-vienna.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Sacher</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/hotel-zeitgeist-vienna.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Zeitgeist</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/hotel_sans_souci.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Sans Souci</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/leonardo-vienna-hauptbahnhof.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Leonardo Hauptbahnhof</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/moxy_vienna_es6.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Moxy Vienna</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/prize-radisson-vienna-city.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Prize by Radisson</a> •
              <a href="https://www.esc-2026-vienna.com/hotels-vienna/ruby-marie-hotel.html" className="hover:text-foreground transition-colors text-[#667eea] mx-1">Ruby Marie</a>
            </p>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500">© 2025 ESC 2026 Vienna • Alle Rechte vorbehalten</p>
            <nav className="flex justify-center space-x-4">
              <a 
                href="#bildnachweis" 
                className="hover:text-foreground transition-colors"
              >
                {t('imageCredits')}
              </a>
              <a 
                href="#legal-notice" 
                className="hover:text-foreground transition-colors"
              >
                {t('legalNotice')}
              </a>
            </nav>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
