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
      <footer className="bg-muted py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="space-y-2">
            <p>{t('footerCopyright')}</p>
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
          {/* Hotels Section */}
<div className="mt-4">
  <h3 className="font-semibold mb-2">Hotels</h3>
  <ul className="flex flex-col items-center gap-1">
    <li>
      <a href="/hotels-vienna/andaz-vienna-eurovision.html" className="hover:text-foreground transition-colors">
        Andaz Vienna
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/boutique-hotel-motto.html" className="hover:text-foreground transition-colors">
        Boutique Hotel Motto
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/boutiquehotel-esc.html" className="hover:text-foreground transition-colors">
        Boutiquehotel ESC
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/hotel-altstadt-vienna.html" className="hover:text-foreground transition-colors">
        Hotel Altstadt Vienna
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/hotel-imperial-vienna.html" className="hover:text-foreground transition-colors">
        Hotel Imperial Vienna
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/hotel-sacher-vienna.html" className="hover:text-foreground transition-colors">
        Hotel Sacher Vienna
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/hotel_sans_souci.html" className="hover:text-foreground transition-colors">
        Hotel Sans Souci
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/moxy_vienna_es6.html" className="hover:text-foreground transition-colors">
        Moxy Vienna
      </a>
    </li>
    <li>
      <a href="/hotels-vienna/ruby-marie-hotel.html" className="hover:text-foreground transition-colors">
        Ruby Marie Hotel
      </a>
    </li>
  </ul>
</div>


        </div>
        
      </footer>
      <Toaster />
    </div>
  );
}
