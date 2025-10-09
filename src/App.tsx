import React, { useState } from 'react'
import { Toaster } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { BookingSearchForm } from '@/components/BookingSearchForm'
import { BookingHotelsGrid } from '@/components/BookingHotelsGrid'
import { BookingWidget } from '@/components/BookingWidget'
import { AffiliateInfo } from '@/components/AffiliateInfo'
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
      <div className="rainbow-header"></div>

      {/* Hero Section with Eurovision Banner */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGMDAwMDtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxNi42NiUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjk5MDA7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMzMuMzMlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRjAwO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwRkYwMDtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSI2Ni42NiUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwRkY7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iODMuMzMlIiBzdHlsZT0ic3RvcC1jb2xvcjojOEIwMEZGO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjAwMDA7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8dGV4dCB4PSI2MDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiPkVVUk9WSVNJT048L3RleHQ+Cjx0ZXh0IHg9IjYwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjM2IiBmb250LXdlaWdodD0iYm9sZCI+U09ORyBDT05URVNUIDIwMjY8L3RleHQ+Cjx0ZXh0IHg9IjYwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0Ij5WSUVOTkE8L3RleHQ+CjxjaXJjbGUgY3g9IjUwMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuOCIvPgo8dGV4dCB4PSI1MDAiIHk9IjE5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMDAwMCIgZm9udC1zaXplPSIzMCI+4p2kPC90ZXh0Pgo8L3N2Zz4K')`
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