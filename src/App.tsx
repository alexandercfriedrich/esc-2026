import React, { useState } from 'react'
import { Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { BookingSearchForm } from '@/components/BookingSearchForm'
import { BookingHotelsGrid } from '@/components/BookingHotelsGrid'
import { BookingWidget } from '@/components/BookingWidget'
import { BookingHotel, HotelSearchParams, searchBookingHotels } from '@/services/hotelService'

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
      <div className="h-2 rainbow-gradient relative overflow-hidden">
        <div className="pride-stripes-overlay">
          <div className="stripe-1"></div>
          <div className="stripe-2"></div>
          <div className="stripe-3"></div>
          <div className="stripe-4"></div>
          <div className="stripe-5"></div>
          <div className="stripe-6"></div>
          <div className="stripe-7"></div>
          <div className="stripe-8"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pride-blue via-pride-indigo to-pride-violet text-white py-16 relative overflow-hidden">
        <div className="pride-stripes-overlay">
          <div className="stripe-1"></div>
          <div className="stripe-2"></div>
          <div className="stripe-3"></div>
          <div className="stripe-4"></div>
          <div className="stripe-5"></div>
          <div className="stripe-6"></div>
          <div className="stripe-7"></div>
          <div className="stripe-8"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 float-animation">
            🏳️‍🌈 Eurovision Rainbow City
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Wien heißt alle Eurovision-Fans willkommen! Finde LGBTQ+ freundliche Hotels für ESC 2026.
          </p>
          <div className="text-lg font-semibold pride-wave">
            "SHALL WE DANCE!" 💃🕺
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
      </div>

      <Toaster />
    </div>
  )
}