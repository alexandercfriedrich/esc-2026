import React, { useState, useEffect } from 'react'
import { Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { BookingSearchForm } from '@/components/BookingSearchForm'
import { BookingHotelsGrid } from '@/components/BookingHotelsGrid'
import { BookingWidget } from '@/components/BookingWidget'
import { Breadcrumb } from '@/components/Breadcrumb'
import { DynamicMetaTags } from '@/components/DynamicMetaTags'
import { ImageCredits } from '@/components/ImageCredits'
import SEO from '@/components/SEO'
import { BookingHotel, HotelSearchParams, searchBookingHotels } from '@/services/hotelService'
import eurovisionBanner from '@/assets/images/frontpage_banner_of_the_eurovision_songcontest_2026_vienna_platform_colorful_impressive_mind_blowin_yrsl9hs8ik2077us0ncz_1.png'

export default function App() {
  const [hotels, setHotels] = useState<BookingHotel[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [favoriteHotels, setFavoriteHotels] = useKV<string[]>("favorite-hotels", [])
  const [currentPage, setCurrentPage] = useState<'home' | 'bildnachweis'>('home')
  // Store current search parameters for affiliate link generation
  const [currentSearchParams, setCurrentSearchParams] = useState<HotelSearchParams | null>(null)

  // Simple routing based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'bildnachweis') {
        setCurrentPage('bildnachweis')
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
      {/* Dynamic Meta Tags Component */}
      <DynamicMetaTags 
        hotels={hotels}
        searchQuery=""
        pageType={currentPage === 'bildnachweis' ? 'credits' : (searchPerformed ? 'search' : 'home')}
      />
      
      {/* SEO Component with comprehensive Schema.org markup */}
      <SEO 
        hotels={hotels}
        searchParams={currentSearchParams}
        pageType={currentPage === 'bildnachweis' ? 'credits' : (searchPerformed ? 'search' : 'home')}
      />
      
      {currentPage === 'bildnachweis' ? (
        /* Bildnachweis Page */
        <>
          <header className="bg-primary text-primary-foreground py-6">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">Eurovision 2026 Wien Hotels</h1>
              <nav className="mt-2">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.hash = ''
                  }}
                  className="text-primary-foreground hover:underline"
                >
                  ← Zurück zur Startseite
                </a>
              </nav>
            </div>
          </header>
          <ImageCredits />
        </>
      ) : (
        /* Home Page */
        <>
          {/* Hero Section with Eurovision Banner */}
          <section className="relative h-96 bg-cover bg-center bg-no-repeat" style={{ 
            backgroundImage: `url('${eurovisionBanner}')`
          }}>
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">Eurovision 2026 Hotelsuche Wien</h1>
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
            
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-foreground">🏳️‍🌈 LGBTQ+ freundliche Unterkünfte für den ESC in Wien</p>
            </div>
            <BookingSearchForm onSearch={handleSearch} />
            
            <BookingWidget 
              searchPerformed={searchPerformed}
              bookingHotelsCount={hotels.length}
              isSearching={isSearching}
            />
            
            {(searchPerformed || isSearching) && currentSearchParams && (
              <BookingHotelsGrid 
                hotels={hotels}
                searchParams={currentSearchParams}
                favoriteHotels={favoriteHotels || []}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
        </>
      )}
      
      {/* Footer */}
      <footer className="bg-muted py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="space-y-2">
            <p>© 2024 Eurovision Rainbow City Vienna 2026</p>
            <nav className="flex justify-center space-x-4">
              <a 
                href="#bildnachweis" 
                className="hover:text-foreground transition-colors"
              >
                Bildnachweis
              </a>
            </nav>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}