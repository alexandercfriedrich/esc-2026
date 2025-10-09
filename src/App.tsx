import React, { useState } from 'react'
import { Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { BookingSearchForm } from '@/components/BookingSearchForm'
import { BookingHotelsGrid } from '@/components/BookingHotelsGrid'
import { BookingWidget } from '@/components/BookingWidget'
import { AffiliateInfo } from '@/components/AffiliateInfo'
import { BookingHotel, HotelSearchParams, searchBookingHotels } from '@/services/hotelService'
import eurovisionBanner from '@/assets/images/eurovision-banner.jpg'

export default function App() {
  const [hotels, setHotels] = useState<BookingHotel[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [favoriteHotels, setFavoriteHotels] = useKV<string[]>("favorite-hotels", [])

  const handleSearch = async (params: HotelSearchParams) => {
    setIsSearching(true)
    setSearchPerformed(false)
    
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
      {/* Rainbow Header */}
      <div className="rainbow-header"></div>

      {/* Hero Section with Eurovision Banner */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${eurovisionBanner}')`
      }}>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Eurovision 2026 Vienna Hotels
            </h1>
            <p className="text-lg md:text-xl opacity-90 drop-shadow-lg">
              🏳️‍🌈 LGBTQ+ freundliche Unterkünfte für den ESC in Wien
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <BookingSearchForm onSearch={handleSearch} />
        
        <BookingWidget 
          searchPerformed={searchPerformed}
          bookingHotelsCount={hotels.length}
          isSearching={isSearching}
        />
        
        {(searchPerformed || isSearching) && (
          <BookingHotelsGrid 
            hotels={hotels}
            searchParams={{ checkIn: '', checkOut: '', adults: 2, children: 0, rooms: 1, priceMin: 0, priceMax: 500 }}
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
  )
}