import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { BookingHotel } from '@/services/hotelService'
import { useTranslation } from '@/hooks/useTranslation'

interface HotelImageSlideshowProps {
  hotel: BookingHotel
  images: string[]
  onClose?: () => void
  showFullscreen?: boolean
}

export function HotelImageSlideshow({ 
  hotel, 
  images, 
  onClose, 
  showFullscreen = false 
}: HotelImageSlideshowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { t } = useTranslation()

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }, [images.length])

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showFullscreen) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            goToPrevious()
            break
          case 'ArrowRight':
            event.preventDefault()
            goToNext()
            break
          case 'Escape':
            event.preventDefault()
            onClose?.()
            break
        }
      }
    }

    if (showFullscreen) {
      window.addEventListener('keydown', handleKeyDown)
      // Prevent scrolling when in fullscreen
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (showFullscreen) {
        document.body.style.overflow = 'unset'
      }
    }
  }, [showFullscreen, goToPrevious, goToNext, onClose])

  return (
    <div className={`relative ${showFullscreen ? 'bg-black' : ''}`}>
      {/* Main Image */}
      <div className="relative">
        <img 
          src={images[currentImageIndex]}
          alt={`${hotel.name} - ${t('imageOf')} ${currentImageIndex + 1}`}
          className={`w-full ${showFullscreen ? 'h-screen' : 'h-48'} object-cover transition-opacity duration-300`}
          loading="lazy"
        />
        
        {/* Image Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToPrevious}
            >
              <CaretLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToNext}
            >
              <CaretRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Close Button for Fullscreen */}
        {showFullscreen && onClose && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && !showFullscreen && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex 
                  ? 'border-primary shadow-md' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img 
                src={image}
                alt={`${hotel.name} - ${t('language') === 'de' ? 'Thumbnail' : 'Thumbnail'} ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Thumbnails */}
      {images.length > 1 && showFullscreen && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex 
                  ? 'border-white shadow-md' 
                  : 'border-white/50 hover:border-white/80'
              }`}
            >
              <img 
                src={image}
                alt={`${hotel.name} - ${t('language') === 'de' ? 'Thumbnail' : 'Thumbnail'} ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}