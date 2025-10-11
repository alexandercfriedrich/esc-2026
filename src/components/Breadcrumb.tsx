import React from 'react'
import { BookingHotel } from '@/services/hotelService'
import { useTranslation } from '@/hooks/useTranslation'
import { CaretRight, House } from '@phosphor-icons/react'

interface BreadcrumbItem {
  "@type": string
  position: number
  name: string
  item: string
}

interface BreadcrumbCrumb {
  name: string
  href: string
  icon?: React.ReactElement
  isActive?: boolean
}

interface BreadcrumbProps {
  currentHotel?: BookingHotel
  searchType?: string
  pageType?: 'home' | 'search' | 'hotel' | 'category' | 'district'
  customPath?: Array<{ name: string; href: string }>
}

export function Breadcrumb({ 
  currentHotel, 
  searchType, 
  pageType = 'home',
  customPath 
}: BreadcrumbProps) {
  const { t } = useTranslation()
  
  const generateBreadcrumbSchema = () => {
    const items: BreadcrumbItem[] = []
    
    // Home
    items.push({
      "@type": "ListItem",
      "position": 1,
      "name": t('language') === 'de' ? "Eurovision 2026 Wien" : "Eurovision 2026 Vienna",
      "item": "https://esc-2026-vienna.com"
    })
    
    // Hotels main page
    if (pageType !== 'home') {
      items.push({
        "@type": "ListItem",
        "position": 2,
        "name": t('hotels'),
        "item": "https://esc-2026-vienna.com/hotels"
      })
    }
    
    // Category or search type
    if (searchType) {
      items.push({
        "@type": "ListItem",
        "position": items.length + 1,
        "name": searchType,
        "item": `https://esc-2026-vienna.com/${searchType.toLowerCase().replace(/\s+/g, '-')}`
      })
    }
    
    // Custom path items
    if (customPath) {
      customPath.forEach((item) => {
        items.push({
          "@type": "ListItem",
          "position": items.length + 1,
          "name": item.name,
          "item": item.href
        })
      })
    }
    
    // Current hotel
    if (currentHotel) {
      items.push({
        "@type": "ListItem",
        "position": items.length + 1,
        "name": currentHotel.name,
        "item": `https://esc-2026-vienna.com/hotel/${currentHotel.slug}`
      })
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    }
  }

  const generateVisualBreadcrumbs = () => {
    const crumbs: BreadcrumbCrumb[] = []
    
    // Home
    crumbs.push({
      name: t('language') === 'de' ? "Eurovision 2026" : "Eurovision 2026",
      href: "/",
      icon: <House className="w-4 h-4" />
    })
    
    // Hotels
    if (pageType !== 'home') {
      crumbs.push({
        name: t('hotels'),
        href: "/hotels"
      })
    }
    
    // Category/Search type
    if (searchType) {
      crumbs.push({
        name: searchType,
        href: `/${searchType.toLowerCase().replace(/\s+/g, '-')}`
      })
    }
    
    // Custom path
    if (customPath) {
      crumbs.push(...customPath)
    }
    
    // Current hotel
    if (currentHotel) {
      crumbs.push({
        name: currentHotel.name,
        href: `/hotel/${currentHotel.slug}`,
        isActive: true
      })
    }
    
    return crumbs
  }

  const breadcrumbSchema = generateBreadcrumbSchema()
  const visualCrumbs = generateVisualBreadcrumbs()

  // Don't show breadcrumbs on home page unless there's a current hotel
  if (pageType === 'home' && !currentHotel) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    )
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Visual Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        {visualCrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <CaretRight className="w-4 h-4 text-muted-foreground/50" />
            )}
            <div className="flex items-center space-x-1">
              {crumb.icon && crumb.icon}
              {crumb.isActive ? (
                <span className="font-medium text-foreground">{crumb.name}</span>
              ) : (
                <a 
                  href={crumb.href}
                  className="hover:text-primary transition-colors"
                  itemProp="url"
                >
                  <span itemProp="name">{crumb.name}</span>
                </a>
              )}
            </div>
          </React.Fragment>
        ))}
      </nav>
    </>
  )
}

export default Breadcrumb