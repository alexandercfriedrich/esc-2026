export const translations = {
  de: {
    // Header and Navigation
    title: 'Eurovision 2026 Hotelsuche Wien',
    subtitle: '🏳️‍🌈 LGBTQ+ freundliche Unterkünfte für den ESC in Wien',
    backToHome: '← Zurück zur Startseite',
    imageCredits: 'Bildnachweis',
    
    // Search Form
    searchTitle: 'Hotelsuche für Eurovision 2026',
    searchLocation: 'Wien, Österreich',
    checkIn: 'Anreise',
    checkOut: 'Abreise',
    guests: 'Gäste',
    searchButton: 'Hotels suchen',
    searchButtonSearching: 'Suche läuft...',
    
    // Hotel Card
    pricePerNight: 'pro Nacht',
    prideLevel: 'Pride Level',
    distance: 'Entfernung',
    fromCenter: 'vom Zentrum',
    viewOnBooking: 'Auf Booking.com ansehen',
    addToFavorites: 'Zu Favoriten hinzufügen',
    removeFromFavorites: 'Aus Favoriten entfernen',
    showImages: 'Bilder anzeigen',
    hotelImages: 'Hotel Bilder',
    imageOf: 'Bild von',
    
    // Pride Levels
    prideCertified: 'Pride Zertifiziert',
    lgbtqFriendly: 'LGBTQ+ Freundlich',
    standard: 'Standard',
    
    // Booking Widget
    searchCompleted: 'Suche abgeschlossen',
    hotelsFound: 'Hotels gefunden',
    searchingHotels: 'Suche nach Hotels...',
    noResults: 'Keine Hotels gefunden',
    tryDifferentDates: 'Versuchen Sie andere Daten oder Filter',
    
    // FAQ Section
    faqTitle: 'Häufig gestellte Fragen',
    faqQuestion1: 'Was bedeutet "Pride Zertifiziert"?',
    faqAnswer1: 'Pride Zertifizierte Hotels haben spezielle LGBTQ+ Schulungen absolviert und bieten ein besonders inklusives Umfeld.',
    faqQuestion2: 'Wie nah sind die Hotels zur Wiener Stadthalle?',
    faqAnswer2: 'Alle gelisteten Hotels sind maximal 30 Minuten von der Wiener Stadthalle entfernt, dem Austragungsort des Eurovision 2026.',
    faqQuestion3: 'Sind die Preise final?',
    faqAnswer3: 'Die angezeigten Preise sind Richtwerte. Der finale Preis wird bei Booking.com angezeigt.',
    
    // Footer
    footerCopyright: '© 2024 Eurovision Rainbow City Vienna 2026',
    
    // Breadcrumb
    home: 'Startseite',
    hotels: 'Hotels',
    search: 'Suche',
    
    // Meta and SEO
    metaTitle: 'Eurovision 2026 Vienna Hotels | LGBTQ+ Freundliche ESC Unterkünfte',
    metaDescription: '🏳️‍🌈 Buche jetzt die perfekten Hotels für Eurovision 2026 in Wien! LGBTQ+ freundliche Unterkünfte, Community-Features und die besten Locations für ESC-Fans.',
    metaKeywords: 'Eurovision 2026, Wien Hotels, LGBTQ freundlich, ESC Vienna, Eurovision Hotels, Pride Hotels Wien, Eurovision Song Contest 2026',
    
    // Error Messages
    searchError: 'Fehler bei der Hotelsuche',
    imageLoadError: 'Bild konnte nicht geladen werden',
    bookingError: 'Weiterleitung zu Booking.com fehlgeschlagen',
    
    // Language Switcher
    switchToEnglish: 'Switch to English',
    switchToGerman: 'Auf Deutsch wechseln',
    language: 'Sprache',
    german: 'Deutsch',
    english: 'English'
  },
  
  en: {
    // Header and Navigation
    title: 'Eurovision 2026 Hotel Search Vienna',
    subtitle: '🏳️‍🌈 LGBTQ+ friendly accommodations for ESC in Vienna',
    backToHome: '← Back to Homepage',
    imageCredits: 'Image Credits',
    
    // Search Form
    searchTitle: 'Hotel Search for Eurovision 2026',
    searchLocation: 'Vienna, Austria',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    searchButton: 'Search Hotels',
    searchButtonSearching: 'Searching...',
    
    // Hotel Card
    pricePerNight: 'per night',
    prideLevel: 'Pride Level',
    distance: 'Distance',
    fromCenter: 'from center',
    viewOnBooking: 'View on Booking.com',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    showImages: 'Show images',
    hotelImages: 'Hotel Images',
    imageOf: 'Image of',
    
    // Pride Levels
    prideCertified: 'Pride Certified',
    lgbtqFriendly: 'LGBTQ+ Friendly',
    standard: 'Standard',
    
    // Booking Widget
    searchCompleted: 'Search completed',
    hotelsFound: 'hotels found',
    searchingHotels: 'Searching for hotels...',
    noResults: 'No hotels found',
    tryDifferentDates: 'Try different dates or filters',
    
    // FAQ Section
    faqTitle: 'Frequently Asked Questions',
    faqQuestion1: 'What does "Pride Certified" mean?',
    faqAnswer1: 'Pride Certified hotels have completed special LGBTQ+ training and offer a particularly inclusive environment.',
    faqQuestion2: 'How close are the hotels to Wiener Stadthalle?',
    faqAnswer2: 'All listed hotels are maximum 30 minutes from Wiener Stadthalle, the venue for Eurovision 2026.',
    faqQuestion3: 'Are the prices final?',
    faqAnswer3: 'The displayed prices are estimates. The final price will be shown on Booking.com.',
    
    // Footer
    footerCopyright: '© 2024 Eurovision Rainbow City Vienna 2026',
    
    // Breadcrumb
    home: 'Home',
    hotels: 'Hotels',
    search: 'Search',
    
    // Meta and SEO
    metaTitle: 'Eurovision 2026 Vienna Hotels | LGBTQ+ Friendly ESC Accommodations',
    metaDescription: '🏳️‍🌈 Book the perfect hotels for Eurovision 2026 in Vienna now! LGBTQ+ friendly accommodations, community features and the best locations for ESC fans.',
    metaKeywords: 'Eurovision 2026, Vienna Hotels, LGBTQ friendly, ESC Vienna, Eurovision Hotels, Pride Hotels Vienna, Eurovision Song Contest 2026',
    
    // Error Messages
    searchError: 'Error in hotel search',
    imageLoadError: 'Image could not be loaded',
    bookingError: 'Redirect to Booking.com failed',
    
    // Language Switcher
    switchToEnglish: 'Switch to English',
    switchToGerman: 'Auf Deutsch wechseln',
    language: 'Language',
    german: 'Deutsch',
    english: 'English'
  }
} as const

export type TranslationKey = keyof typeof translations.de
export type Language = keyof typeof translations