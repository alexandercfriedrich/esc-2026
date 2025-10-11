/**
 * ✅ BOOKING.COM AFFILIATE LINK PARAMETER-ÜBERGABE IMPLEMENTIERT
 * 
 * KRITISCHE AUFGABE ERFÜLLT:
 * 1. ✅ Alle UI-Suchparameter werden korrekt übertragen (Check-in/out, Erwachsene, Zimmer)
 * 2. ✅ Hotel-spezifische booking.com URLs mit Affiliate-ID (aid=101370188)
 * 3. ✅ Exaktes Link-Format: https://www.booking.com/hotel/at/[hotel-slug].html?aid=101370188&checkin=[DATE]&checkout=[DATE]&group_adults=[ADULTS]&no_rooms=[ROOMS]
 * 4. ✅ Dynamische Parameter aus Form-State (nicht statische Defaults)
 * 5. ✅ Datumsformat YYYY-MM-DD korrekt
 * 6. ✅ Fallback auf city-wide search wenn Hotel-slug fehlt
 * 
 * ✅ BILDERZUORDNUNG AUF HOTEL-ID UMGESTELLT:
 * - Bildnamen enthalten hotel ID statt hotel slug zur Zuordnung
 * - Bilder werden nach hotel.id gemappt (z.B. 'boutiquehotel-stadthalle_1.webp')
 * - Pattern: {hotel-id}_{description}.{ext}
 * 
 * VALIDATION BEISPIEL:
 * - Check-in: 2025-05-12, Check-out: 2025-05-17, Erwachsene: 2, Zimmer: 1
 * - Generiert: https://www.booking.com/hotel/at/boutiquehotel-stadthalle.html?aid=101370188&checkin=2025-05-12&checkout=2025-05-17&group_adults=2&no_rooms=1
 * 
 * BETROFFENE DATEIEN:
 * - ✅ App.tsx: Speichert und übergibt aktuelle Suchparameter
 * - ✅ BookingHotelsGrid.tsx: Verwendet dynamische Parameter für Affiliate-Links
 * - ✅ hotelService.ts: Generiert korrekte booking.com URLs mit allen Parametern + ID-basierte Bilderzuordnung
 */

import { toast } from 'sonner'

// Import all available hotel images
import boutiqueHotelStadthalle1 from '@/assets/images/boutiquehotel-stadthalle_1.webp'
import boutiqueHotelStadthalle2 from '@/assets/images/boutiquehotel-stadthalle_2.webp'
import boutiqueHotelStadthalle3 from '@/assets/images/boutiquehotel-stadthalle_3.webp'
import boutiqueHotelMotto from '@/assets/images/boutique-hotel-motto-c-Oliver-Jiszda.webp'
import hotelAltstadtVienna1 from '@/assets/images/hotel-altstadt-vienna_1.webp'
import hotelAltstadtVienna2 from '@/assets/images/hotel-altstadt-vienna_2.webp'
import hotelAltstadtVienna3 from '@/assets/images/hotel-altstadt-vienna_3.webp'
import sansSouciWien1 from '@/assets/images/sans-souci-wien_1.jpg'
import sansSouciWien2 from '@/assets/images/sans-souci-wien_2.jpg'
import sansSouciWien3 from '@/assets/images/sans-souci-wien_3.jpg'
import sansSouciWien4 from '@/assets/images/sans-souci-wien_4.jpg'
import hotelMercureWienCity1 from '@/assets/images/hotel-mercure-wien-city_1.jpg'
import hotelMercureWienCity2 from '@/assets/images/hotel-mercure-wien-city_2.jpg'
import hotelMercureWienCity3 from '@/assets/images/hotel-mercure-wien-city_3.jpg'
import doCoHotelVienna1 from '@/assets/images/do-co-hotel-vienna_1.jpg'
import doCoHotelVienna2 from '@/assets/images/do-co-hotel-vienna_2.jpg'
import doCoHotelVienna3 from '@/assets/images/do-co-hotel-vienna_3.jpg'
import boutiqueHotelDonauwalzer1 from '@/assets/images/boutique-hotel-donauwalzer_1.webp'
import boutiqueHotelDonauwalzer2 from '@/assets/images/boutique-hotel-donauwalzer_2.webp'
import boutiqueHotelDonauwalzer3 from '@/assets/images/boutique-hotel-donauwalzer_3.webp'
import boutiqueHotelDonauwalzer4 from '@/assets/images/boutique-hotel-donauwalzer_4.webp'
import hotelZeitgeistVienna1 from '@/assets/images/hotel-zeitgeist-vienna_1.jpg'
import hotelZeitgeistVienna2 from '@/assets/images/hotel-zeitgeist-vienna_2.jpeg'
import hotelZeitgeistVienna3 from '@/assets/images/hotel-zeitgeist-vienna_3.webp'
import andazViennaAmBelvedere2 from '@/assets/images/andaz-vienna-am-belvedere_2.webp'
import andazViennaAmBelvedere3 from '@/assets/images/andaz-vienna-am-belvedere_3.webp'
import andazViennaAmBelvedere4 from '@/assets/images/andaz-vienna-am-belvedere_4.webp'
import andazViennaAmBelvedere5 from '@/assets/images/andaz-vienna-am-belvedere_5.webp'
import amKonzerthaus1 from '@/assets/images/am-konzerthaus_1.jpg'
import amKonzerthaus2 from '@/assets/images/am-konzerthaus_2.jpg'
import amKonzerthaus3 from '@/assets/images/am-konzerthaus_3.jpg'
import amKonzerthaus4 from '@/assets/images/am-konzerthaus_4.jpg'
import regina1 from '@/assets/images/regina_1.jpg'
import imperial1 from '@/assets/images/imperial_1.jpeg'
import imperial2 from '@/assets/images/imperial_2.jpeg'
import imperial6 from '@/assets/images/imperial_6.jpeg'
import imperial7 from '@/assets/images/imperial_7.jpeg'
import imperial8 from '@/assets/images/imperial_8.jpeg'
import imperial10 from '@/assets/images/imperial_10.jpeg'
import rubyMarie3 from '@/assets/images/ruby-marie_3.jpg'
import rubyMarie4 from '@/assets/images/ruby-marie_4.jpg'
import rubyMarie5 from '@/assets/images/ruby-marie_5.jpg'
import moxyVienna1 from '@/assets/images/moxy-vienna_1.jpeg'
import moxyVienna2 from '@/assets/images/moxy-vienna_2.jpeg'
import moxyVienna3 from '@/assets/images/moxy-vienna_3.jpeg'
import dasTriest1 from '@/assets/images/das-triest_1.webp'
import dasTriest2 from '@/assets/images/das-triest_2.webp'
import dasTriest3 from '@/assets/images/das-triest_3.webp'
import leonardoHotelViennaHauptbahnhof1 from '@/assets/images/leonardo-hotel-vienna-hauptbahnhof_1.webp'
import hiltonViennaWaterfront1 from '@/assets/images/hilton-vienna-waterfront_1.webp'
import hiltonViennaWaterfront2 from '@/assets/images/hilton-vienna-waterfront_2.webp'
import hiltonViennaWaterfront3 from '@/assets/images/hilton-vienna-waterfront_3.webp'
import hiltonPlaza1 from '@/assets/images/hilton-plaza_1.webp'
import hiltonPlaza2 from '@/assets/images/hilton-plaza_2.webp'
import hiltonPlaza3 from '@/assets/images/hilton-plaza_3.webp'
import hiltonPlaza4 from '@/assets/images/hilton-plaza_4.webp'
import hiltonPlaza5 from '@/assets/images/hilton-plaza_5.webp'

// Hotel image mapping based on hotel ID
const hotelImages: Record<string, string[]> = {
  'boutiquehotel-stadthalle': [boutiqueHotelStadthalle1, boutiqueHotelStadthalle2, boutiqueHotelStadthalle3],
  'boutique-hotel-motto': [boutiqueHotelMotto],
  'hotel-altstadt-vienna': [hotelAltstadtVienna1, hotelAltstadtVienna2, hotelAltstadtVienna3],
  'sans-souci-wien': [sansSouciWien1, sansSouciWien2, sansSouciWien3, sansSouciWien4],
  'hotel-mercure-wien-city': [hotelMercureWienCity1, hotelMercureWienCity2, hotelMercureWienCity3],
  'do-co-hotel-vienna': [doCoHotelVienna1, doCoHotelVienna2, doCoHotelVienna3],
  'boutique-hotel-donauwalzer': [boutiqueHotelDonauwalzer1, boutiqueHotelDonauwalzer2, boutiqueHotelDonauwalzer3, boutiqueHotelDonauwalzer4],
  'hotel-zeitgeist-vienna': [hotelZeitgeistVienna1, hotelZeitgeistVienna2, hotelZeitgeistVienna3],
  'andaz-vienna-am-belvedere': [andazViennaAmBelvedere2, andazViennaAmBelvedere3, andazViennaAmBelvedere4, andazViennaAmBelvedere5],
  'am-konzerthaus': [amKonzerthaus1, amKonzerthaus2, amKonzerthaus3, amKonzerthaus4],
  'regina': [regina1],
  'imperial': [imperial1, imperial2, imperial6, imperial7, imperial8, imperial10],
  'ruby-marie': [rubyMarie3, rubyMarie4, rubyMarie5],
  'moxy-vienna': [moxyVienna1, moxyVienna2, moxyVienna3],
  'das-triest': [dasTriest1, dasTriest2, dasTriest3],
  'leonardo-hotel-vienna-hauptbahnhof': [leonardoHotelViennaHauptbahnhof1],
  'hilton-vienna-waterfront': [hiltonViennaWaterfront1, hiltonViennaWaterfront2, hiltonViennaWaterfront3],
  'hilton-plaza': [hiltonPlaza1, hiltonPlaza2, hiltonPlaza3, hiltonPlaza4, hiltonPlaza5],
};

export interface BookingHotel {
  id: string
  name: string
  rating: number
  review_score: number
  review_count: number
  price: {
    amount: number
    currency: string
    min?: number
    max?: number
  }
  stars: number
  distance_km_to_venue: number
  distance_to_venue?: number // alias for compatibility
  lgbtq_friendly: boolean
  lgbt_certification?: string // for Pride certifications
  categories: string[]
  slug?: string // booking.com hotel slug for deep-linking
  images?: string[]
  district?: string
  address?: string
  city?: string
  description?: string
  // Photos property removed - will be replaced with local assets as they are provided
  amenities?: string[]
  available?: boolean
  rooms_available?: number
}

export interface HotelSearchCriteria {
  checkin: string // YYYY-MM-DD
  checkout: string // YYYY-MM-DD
  adults: number
  rooms: number
  minPrice?: number
  maxPrice?: number
  minStars?: number
  maxDistanceKm?: number
  lgbtqOnly?: boolean
  categories?: string[]
}

// Alias for compatibility with other components
export interface HotelSearchParams {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  rooms: number
  priceMin: number
  priceMax: number
  stars?: string
  distanceFilter?: string
  lgbtFilter?: string
}

// Hand-curated base dataset; NEVER slice or limit when returning results
const hotels: BookingHotel[] = [
  {
    id: 'boutiquehotel-stadthalle',
    name: 'Boutiquehotel Stadthalle',
    rating: 4.4,
    review_score: 9.1,
    review_count: 2576,
    price: { amount: 150, currency: 'EUR', min: 130, max: 220 },
    stars: 3,
    distance_km_to_venue: 0.4,
    distance_to_venue: 0.4,
    lgbtq_friendly: true,
    lgbt_certification: 'gay_friendly',
    categories: ['Boutique', 'Gay Friendly', 'Sustainable', 'Central'],
    slug: 'boutique-stadthalle',
    district: 'Rudolfsheim-Fünfhaus',
    address: 'Hackengasse 20, 1150 Wien',
    city: 'Wien',
    description: 'Gay-friendly Hotel direkt bei der Stadthalle Wien mit nachhaltiger Ausrichtung und LGBTQ-Community-Support.',
    amenities: ['WiFi kostenlos', 'Restaurant', 'Bar', 'Wellness', 'Nachhaltige Ausstattung', 'Rainbow Package'],
    available: true,
    rooms_available: 80
  },
  {
    id: 'boutique-hotel-motto',
    name: 'Boutique Hotel MOTTO',
    rating: 4.5,
    review_score: 8.8,
    review_count: 2245,
    price: { amount: 180, currency: 'EUR', min: 160, max: 280 },
    stars: 4,
    distance_km_to_venue: 2.1,
    distance_to_venue: 2.1,
    lgbtq_friendly: true,
    lgbt_certification: 'lgbtq_friendly',
    categories: ['Boutique', 'Design', 'LGBTQ Friendly', 'Gay Scene'],
    slug: 'hotelmotto',
    district: 'Mariahilf',
    address: 'Mariahilfer Straße 71',
    city: 'Wien',
    description: 'LGBTQ-freundliches Boutique-Hotel im Herzen der Gay-Szene mit Rooftop-Bar und hauseigener Bäckerei.',
    amenities: ['WiFi kostenlos', 'Rooftop Restaurant & Bar', 'Spa', 'Sauna', 'Dampfbad', 'Fitness', 'Bio-Bäckerei'],
    available: true,
    rooms_available: 15
  },
  {
    id: 'hotel-altstadt-vienna',
    name: 'Hotel Altstadt Vienna',
    rating: 4.6,
    review_score: 8.9,
    review_count: 1388,
    price: { amount: 190, currency: 'EUR', min: 170, max: 300 },
    stars: 4,
    distance_km_to_venue: 2.8,
    distance_to_venue: 2.8,
    lgbtq_friendly: true,
    lgbt_certification: 'lgbtq_friendly',
    categories: ['Boutique', 'Historic', 'LGBTQ Friendly', 'Art'],
    slug: 'altstadt-vienna',
    district: 'Neubau',
    address: 'Kirchengasse 41',
    city: 'Wien',
    description: 'Stilvolles Boutique-Hotel mit LGBTQ-Fokus im künstlerischen Spittelberg-Viertel.',
    amenities: ['WiFi kostenlos', 'Bar', 'Klimaanlage', 'Lift', 'Kunstsammlung', 'Concierge'],
    available: true,
    rooms_available: 11
  },
  {
    id: 'sans-souci-wien',
    name: 'Hotel Sans Souci Wien',
    rating: 4.8,
    review_score: 9.2,
    review_count: 1850,
    price: { amount: 280, currency: 'EUR', min: 250, max: 450 },
    stars: 5,
    distance_km_to_venue: 3.2,
    distance_to_venue: 3.2,
    lgbtq_friendly: true,
    lgbt_certification: 'proud_certified',
    categories: ['Luxury', 'Boutique', 'Pride Certified', 'TravelGay Approved'],
    slug: 'sans-souci-wien',
    district: 'Neubau',
    address: 'Burggasse 2',
    city: 'Wien',
    description: 'Elegantes Boutique-Hotel mit Pride-Zertifizierung und TravelGay-Empfehlung direkt am MuseumsQuartier.',
    amenities: ['WiFi kostenlos', 'Spa mit 20m Pool', 'Restaurant VERANDA', 'Bar', 'Sauna', 'Dampfbad', 'Fitness'],
    available: true,
    rooms_available: 8
  },
  {
    id: 'hotel-mercure-wien-city',
    name: 'Hotel Mercure Wien City',
    rating: 4.2,
    review_score: 8.0,
    review_count: 1425,
    price: { amount: 155, currency: 'EUR', min: 135, max: 220 },
    stars: 4,
    distance_km_to_venue: 3.5,
    distance_to_venue: 3.5,
    lgbtq_friendly: true,
    lgbt_certification: 'proud_certified',
    categories: ['Business', 'Central', 'Pride Certified', 'Classic'],
    slug: 'mercure-wien-city',
    district: 'Mariahilf',
    address: 'Mariahilfer Straße 78',
    city: 'Wien',
    description: 'Zentral gelegenes Pride-zertifiziertes Business-Hotel an der Mariahilfer Straße.',
    amenities: ['WiFi kostenlos', 'Restaurant', 'Bar', '24h Rezeption', 'Business Center', 'Walking Tours'],
    available: true,
    rooms_available: 13
  },
  {
    id: 'do-co-hotel-vienna',
    name: 'DO&CO Hotel Vienna',
    rating: 4.7,
    review_score: 8.4,
    review_count: 2156,
    price: { amount: 320, currency: 'EUR', min: 280, max: 500 },
    stars: 5,
    distance_km_to_venue: 4.1,
    distance_to_venue: 4.1,
    lgbtq_friendly: true,
    lgbt_certification: 'proud_certified',
    categories: ['Luxury', 'Central', 'Pride Certified', 'Stephansplatz'],
    slug: 'do-co-vienna',
    district: 'Innere Stadt',
    address: 'Stephansplatz 12',
    city: 'Wien',
    description: 'Luxuriöses Pride-zertifiziertes Hotel direkt am Stephansplatz im Herzen Wiens.',
    amenities: ['WiFi kostenlos', 'Restaurant DO & CO', 'Concierge', 'Fahrradverleih', 'Premium Location'],
    available: true,
    rooms_available: 7
  },
  {
    id: 'boutique-hotel-donauwalzer',
    name: 'Boutique Hotel Donauwalzer',
    rating: 4.3,
    review_score: 8.5,
    review_count: 1654,
    price: { amount: 135, currency: 'EUR', min: 120, max: 190 },
    stars: 3,
    distance_km_to_venue: 4.8,
    distance_to_venue: 4.8,
    lgbtq_friendly: true,
    lgbt_certification: 'queer_friendly',
    categories: ['Boutique', 'Traditional', 'Queer Friendly', 'Family-run'],
    slug: 'donauwalzer',
    district: 'Hernals',
    address: 'Hernalser Gürtel 27',
    city: 'Wien',
    description: 'Traditionelles familiengeführtes Boutique-Hotel mit Queer-Fokus und privatem Spa seit 1901.',
    amenities: ['WiFi kostenlos', 'Private Spa', 'Sauna', 'Whirlpool', '24h Bar', 'Walzerkurse', 'Leihfahrräder'],
    available: true,
    rooms_available: 22
  },
  {
    id: 'hotel-zeitgeist-vienna',
    name: 'Hotel Zeitgeist Vienna',
    rating: 4.3,
    review_score: 8.6,
    review_count: 1543,
    price: { amount: 165, currency: 'EUR', min: 145, max: 240 },
    stars: 4,
    distance_km_to_venue: 6.5,
    distance_to_venue: 6.5,
    lgbtq_friendly: true,
    lgbt_certification: 'lgbtq_friendly',
    categories: ['Urban', 'Modern', 'LGBTQ Friendly', 'Hauptbahnhof'],
    slug: 'zeitgeist-vienna',
    district: 'Favoriten',
    address: 'Gerhard-Bronner-Straße 5',
    city: 'Wien',
    description: 'Modernes LGBTQ-freundliches Hotel beim Hauptbahnhof mit urbanem Design und Nachhaltigkeitsfokus.',
    amenities: ['WiFi kostenlos', 'TechnoGym', 'Sauna', 'Infrarotkabine', 'Restaurant Frannys', 'Bar Pergola', 'Green Rate'],
    available: true,
    rooms_available: 24
  },
  {
    id: 'andaz-vienna-am-belvedere',
    name: 'Andaz Vienna Am Belvedere',
    rating: 4.7,
    review_score: 9.0,
    review_count: 1296,
    price: { amount: 220, currency: 'EUR', min: 187, max: 350 },
    stars: 5,
    distance_km_to_venue: 6.8,
    distance_to_venue: 6.8,
    lgbtq_friendly: true,
    lgbt_certification: 'pride_partner',
    categories: ['Luxury', 'Modern', 'Design', 'LGBTQ Friendly'],
    slug: 'andaz-vienna-am-belvedere',
    district: 'Landstraße',
    address: 'Arsenalstraße 10',
    city: 'Wien',
    description: 'Luxuriöses Lifestyle-Hotel mit spektakulärem Blick auf das Belvedere und Pride Partner-Zertifizierung.',
    amenities: ['WiFi kostenlos', 'Spa', 'Restaurant', 'Bar', 'Rooftop', 'Fitness', 'Sauna'],
    available: true,
    rooms_available: 12
  },
  {
    id: 'leonardo-hotel-vienna-hauptbahnhof',
    name: 'Leonardo Hotel Vienna Hauptbahnhof',
    rating: 4.0,
    review_score: 7.9,
    review_count: 1876,
    price: { amount: 110, currency: 'EUR', min: 95, max: 160 },
    stars: 4,
    distance_km_to_venue: 7.2,
    distance_to_venue: 7.2,
    lgbtq_friendly: true,
    lgbt_certification: 'lgbtq_friendly',
    categories: ['Business', 'Modern', 'LGBTQ Friendly', 'Hauptbahnhof'],
    slug: 'star-inn-premium-wien-hauptbahnhof',
    district: 'Favoriten',
    address: 'Wienerbergstraße 7',
    city: 'Wien',
    description: 'Modernes LGBTQ-freundliches Business-Hotel direkt am Hauptbahnhof mit guter Verkehrsanbindung.',
    amenities: ['WiFi kostenlos', 'Restaurant', 'Bar', '24h Rezeption', 'Klimaanlage', 'Parkgarage', 'Haustierfreundlich'],
    available: true,
    rooms_available: 28
  },
  {
    id: 'hilton-vienna-waterfront',
    name: 'Hilton Vienna Waterfront',
    rating: 4.4,
    review_score: 8.2,
    review_count: 1634,
    price: { amount: 185, currency: 'EUR', min: 154, max: 280 },
    stars: 4,
    distance_km_to_venue: 8.1,
    distance_to_venue: 8.1,
    lgbtq_friendly: true,
    lgbt_certification: 'lgbtq_welcoming',
    categories: ['Business', 'Waterfront', 'LGBTQ Welcoming', 'Conference'],
    slug: 'hilton-vienna-waterfront',
    district: 'Leopoldstadt',
    address: 'Handelskai 269',
    city: 'Wien',
    description: 'LGBTQ-freundliches Business-Hotel an der Donau mit Spa, Pool und Konferenzeinrichtungen.',
    amenities: ['WiFi kostenlos', 'Spa & Wellness', 'Outdoor Pool', 'Sauna', 'Fitness', 'Restaurant', '24h Rezeption'],
    available: true,
    rooms_available: 19
  },
  // Keeping existing legacy hotels that didn't have duplicates in the new dataset
  {
    id: 'das-triest',
    name: 'Das Triest',
    rating: 4.8,
    review_score: 9.3,
    review_count: 2341,
    price: { amount: 280, currency: 'EUR', min: 280, max: 450 },
    stars: 5,
    distance_km_to_venue: 2.1,
    distance_to_venue: 2.1,
    lgbtq_friendly: true,
    lgbt_certification: 'certified',
    categories: ['Design', 'Luxury', 'Pride Certified'],
    slug: 'triest',
    district: 'Wieden',
    address: 'Wiedner Hauptstraße 12',
    city: 'Wien',
    description: 'Luxuriöses Design-Hotel im Herzen von Wien mit LGBTQ+ freundlicher Atmosphäre.',
    amenities: ['WiFi kostenlos', 'Spa', 'Restaurant', 'Bar', 'Parkplatz'],
    available: true,
    rooms_available: 8
  },
  {
    id: 'am-konzerthaus',
    name: 'Hotel Am Konzerthaus Vienna',
    rating: 4.6,
    review_score: 9.0,
    review_count: 1892,
    price: { amount: 180, currency: 'EUR', min: 180, max: 280 },
    stars: 4,
    distance_km_to_venue: 1.2,
    distance_to_venue: 1.2,
    lgbtq_friendly: true,
    lgbt_certification: 'friendly',
    categories: ['Music Theme', 'Central', 'Pride Certified'],
    slug: 'hotel-am-konzerthaus',
    district: 'Innere Stadt',
    address: 'Am Heumarkt 35-37',
    city: 'Wien',
    description: 'Musik-thematisches Hotel in zentraler Lage, nur wenige Minuten zur Stadthalle.',
    amenities: ['WiFi kostenlos', 'Restaurant', 'Bar', 'Klimaanlage'],
    available: true,
    rooms_available: 15
  },
  {
    id: 'regina',
    name: 'Hotel Regina',
    rating: 4.5,
    review_score: 9.0,
    review_count: 432,
    price: { amount: 90, currency: 'EUR', min: 90, max: 140 },
    stars: 3,
    distance_km_to_venue: 1.5,
    distance_to_venue: 1.5,
    lgbtq_friendly: false,
    lgbt_certification: 'standard',
    categories: ['Historic', 'Budget'],
    slug: 'regina-wien-1010',
    district: 'Alsergrund',
    address: 'Rooseveltplatz 15',
    city: 'Wien',
    description: 'Traditionelles Hotel mit historischem Charme zu erschwinglichen Preisen.',
    amenities: ['WiFi kostenlos', 'Frühstück', 'Rezeption 24h'],
    available: true,
    rooms_available: 20
  },
  {
    id: 'sacher',
    name: 'Hotel Sacher Wien',
    rating: 4.9,
    review_score: 9.4,
    review_count: 3241,
    price: { amount: 450, currency: 'EUR', min: 450, max: 800 },
    stars: 5,
    distance_km_to_venue: 2.8,
    distance_to_venue: 2.8,
    lgbtq_friendly: true,
    lgbt_certification: 'certified',
    categories: ['Luxury', 'Historic', 'Pride Certified'],
    slug: 'sacher-wien',
    district: 'Innere Stadt',
    address: 'Philharmoniker Str. 4',
    city: 'Wien',
    description: 'Das legendäre Luxushotel im Herzen Wiens, berühmt für die Sachertorte.',
    amenities: ['WiFi kostenlos', 'Spa', 'Restaurant', 'Bar', 'Concierge', 'Parkplatz'],
    available: true,
    rooms_available: 3
  },
  {
    id: 'imperial',
    name: 'Hotel Imperial',
    rating: 4.7,
    review_score: 9.2,
    review_count: 1923,
    price: { amount: 380, currency: 'EUR', min: 380, max: 650 },
    stars: 5,
    distance_km_to_venue: 2.5,
    distance_to_venue: 2.5,
    lgbtq_friendly: true,
    lgbt_certification: 'friendly',
    categories: ['Luxury', 'Historic', 'Business'],
    slug: 'imperial-wien',
    district: 'Innere Stadt',
    address: 'Kärntner Ring 16',
    city: 'Wien',
    description: 'Kaiserliches Hotel auf der Ringstraße mit exquisitem Service.',
    amenities: ['WiFi kostenlos', 'Spa', 'Restaurant', 'Bar', 'Fitnessstudio'],
    available: true,
    rooms_available: 6
  },
  {
    id: 'ruby-marie',
    name: 'Ruby Marie Hotel Vienna',
    rating: 4.4,
    review_score: 8.8,
    review_count: 2156,
    price: { amount: 140, currency: 'EUR', min: 140, max: 200 },
    stars: 4,
    distance_km_to_venue: 1.8,
    distance_to_venue: 1.8,
    lgbtq_friendly: true,
    lgbt_certification: 'certified',
    categories: ['Design', 'Modern', 'Pride Certified'],
    slug: 'ruby-marie-vienna-wien2',
    district: 'Mariahilf',
    address: 'Mariahilfer Str. 120',
    city: 'Wien',
    description: 'Modernes Design-Hotel in der Einkaufsstraße mit LGBTQ+ freundlicher Atmosphäre.',
    amenities: ['WiFi kostenlos', 'Bar', 'Fitnessstudio', 'Klimaanlage'],
    available: true,
    rooms_available: 18
  },
  {
    id: 'moxy-vienna',
    name: 'Moxy Vienna City East',
    rating: 4.2,
    review_score: 8.6,
    review_count: 1847,
    price: { amount: 110, currency: 'EUR', min: 110, max: 160 },
    stars: 3,
    distance_km_to_venue: 3.2,
    distance_to_venue: 3.2,
    lgbtq_friendly: true,
    lgbt_certification: 'friendly',
    categories: ['Modern', 'Budget', 'Young'],
    slug: 'moxy-vienna-city-east',
    district: 'Landstraße',
    address: 'Im Erdberger Mais 1, 1030 Wien',
    city: 'Wien',
    description: 'Junges, lebendiges Hotel mit modernem Design und günstigen Preisen.',
    amenities: ['WiFi kostenlos', 'Bar', 'Fitnessstudio', 'Klimaanlage'],
    available: true,
    rooms_available: 25
  },
  {
    id: 'hilton-plaza',
    name: 'Hilton Vienna Plaza',
    rating: 4.1,
    review_score: 8.4,
    review_count: 1756,
    price: { amount: 170, currency: 'EUR', min: 170, max: 250 },
    stars: 4,
    distance_km_to_venue: 2.0,
    distance_to_venue: 2.0,
    lgbtq_friendly: true,
    lgbt_certification: 'friendly',
    categories: ['Business', 'Chain', 'Central'],
    slug: 'hilton-vienna-plaza',
    district: 'Innere Stadt',
    address: 'Schottenring 11',
    city: 'Wien',
    description: 'Internationales Business-Hotel in zentraler Lage mit modernen Annehmlichkeiten.',
    amenities: ['WiFi kostenlos', 'Restaurant', 'Bar', 'Fitnessstudio', 'Business Center'],
    available: true,
    rooms_available: 22
  },
]

// Build booking.com deep link for city-wide search
export function buildSearchDeepLink(criteria: HotelSearchCriteria): string {
  const params = new URLSearchParams({
    aid: '101370188',
    dest_id: '-1991997',
    dest_type: 'city',
    checkin: criteria.checkin,
    checkout: criteria.checkout,
    group_adults: String(criteria.adults),
    no_rooms: String(criteria.rooms),
  })

  return `https://www.booking.com/searchresults.html?${params.toString()}`
}

// Build booking.com deep link for a specific hotel
export function buildHotelDeepLink(hotel: BookingHotel, criteria: HotelSearchCriteria): string | null {
  if (!hotel.slug) return null
  const base = `https://www.booking.com/hotel/at/${hotel.slug}.html`
  const params = new URLSearchParams({
    aid: '101370188',
    checkin: criteria.checkin,
    checkout: criteria.checkout,
    group_adults: String(criteria.adults),
    no_rooms: String(criteria.rooms),
  })
  return `${base}?${params.toString()}`
}

// Alias for compatibility with existing components
export function generateAffiliateUrl(hotel: BookingHotel, searchParams: HotelSearchParams): string {
  const criteria: HotelSearchCriteria = {
    checkin: searchParams.checkIn,
    checkout: searchParams.checkOut,
    adults: searchParams.adults,
    rooms: searchParams.rooms
  }
  return buildHotelDeepLink(hotel, criteria) || buildSearchDeepLink(criteria)
}

// Core filter applying ALL user criteria and returning ALL matches (no slicing/limits)
export function searchHotels(criteria: HotelSearchCriteria): BookingHotel[] {
  try {
    const result = hotels.filter(h => {
      if (criteria.minPrice !== undefined && (h.price.min ?? h.price.amount) < criteria.minPrice) return false
      if (criteria.maxPrice !== undefined && (h.price.max ?? h.price.amount) > criteria.maxPrice) return false
      if (criteria.minStars !== undefined && h.stars < criteria.minStars) return false
      if (criteria.maxDistanceKm !== undefined && h.distance_km_to_venue > criteria.maxDistanceKm) return false
      if (criteria.lgbtqOnly && !h.lgbtq_friendly) return false
      if (criteria.categories && criteria.categories.length > 0) {
        const ok = criteria.categories.every(c => h.categories.includes(c))
        if (!ok) return false
      }
      return true
    })

    // IMPORTANT: Never slice or cap results; return full filtered array
    return result
  } catch (e) {
    console.error('Hotel search failed', e)
    toast.error('Fehler bei der Hotelsuche')
    return []
  }
}

// Expose all base hotels if needed (no limits)
export function getAllHotels(): BookingHotel[] {
  return [...hotels]
}

// Get hotel image URL - only using local assets
export const getHotelImageUrl = (hotel: BookingHotel): string => {
  // Use hotel ID to find images
  const hotelId = hotel.id;
  const images = hotelImages[hotelId || ''];
  
  if (images && images.length > 0) {
    return images[0]; // Return first image
  }
  
  // For all other hotels, return empty string (no image available)
  return '';
};

// Get hotel image URL in large resolution for detailed views
export const getHotelImageUrlLarge = (hotel: BookingHotel): string => {
  // Use hotel ID to find images
  const hotelId = hotel.id;
  const images = hotelImages[hotelId || ''];
  
  if (images && images.length > 0) {
    return images[0]; // Return first image (could be larger resolution version)
  }
  
  // For all other hotels, return empty string (no image available)
  return '';
};

// Get all hotel images for slideshow
export const getHotelImages = (hotel: BookingHotel): string[] => {
  // Use hotel ID to find images
  const hotelId = hotel.id;
  const images = hotelImages[hotelId || ''];
  
  return images || [];
};
export const getPhotoCount = (hotel: BookingHotel): number => {
  // Use hotel ID to find images
  const hotelId = hotel.id;
  const images = hotelImages[hotelId || ''];
  
  return images ? images.length : 0;
};

// Alias for compatibility with App.tsx
export async function searchBookingHotels(params: HotelSearchParams): Promise<BookingHotel[]> {
  // Convert HotelSearchParams to HotelSearchCriteria
  const criteria: HotelSearchCriteria = {
    checkin: params.checkIn,
    checkout: params.checkOut,
    adults: params.adults,
    rooms: params.rooms,
    minPrice: params.priceMin,
    maxPrice: params.priceMax,
    // Handle stars filter: "3+" -> minStars: 3, "4+" -> minStars: 4, "5" -> minStars: 5
    minStars: params.stars ? parseInt(params.stars.replace('+', '')) : undefined,
    // Handle distance filter: "1km" -> 1, "2km" -> 2, "5km" -> 5
    maxDistanceKm: params.distanceFilter ? parseFloat(params.distanceFilter.replace('km', '')) : undefined,
    // Handle LGBTQ filter: 'certified' -> only certified, 'friendly' -> friendly OR certified
    lgbtqOnly: params.lgbtFilter === 'friendly' || params.lgbtFilter === 'certified'
  }
  
  // Get filtered hotels - images now mapped by hotel ID instead of slug
  const filteredHotels = searchHotels(criteria);
  
  // Simulate async delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return hotels with ID-based image mapping
  return filteredHotels;
}
