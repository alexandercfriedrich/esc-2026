import React, { useState } from 'react'
import { Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { BookingSearchForm } from '@/components/BookingSearchForm'
import { BookingHotelsGrid } from '@/components/BookingHotelsGrid'
import { BookingWidget } from '@/components/BookingWidget'
import { AffiliateInfo } from '@/components/AffiliateInfo'
import { BookingHotel, HotelSearchParams, searchBookingHotels } from '@/services/hotelService'
import eurovisionBanner from '@/assets/images/frontpage_banner_of_the_eurovision_songcontest_2026_vienna_platform_colorful_impressive_mind_blowin_yrsl9hs8ik2077us0ncz_1.png'

export default function App() {
  const [hotels, setHotels] = useState<BookingHotel[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [favoriteHotels, setFavoriteHotels] = useKV<string[]>("favorite-hotels", [])
  // Store current search parameters for affiliate link generation
  const [currentSearchParams, setCurrentSearchParams] = useState<HotelSearchParams | null>(null)

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
      {/* Hero Section with Eurovision Banner */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${eurovisionBanner}')`
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
        
        {/* Affiliate Information */}
        <div className="mt-12">
          <AffiliateInfo />
        </div>
      </div>
      <Toaster />
    </div>
  );
}