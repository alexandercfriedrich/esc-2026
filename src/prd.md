# Eurovision Rainbow City Vienna 2026 - Product Requirement Document

## Core Purpose & Success

**Mission Statement**: Eine umfassende LGBTQ+ freundliche Hotelbuchungsplattform für Eurovision 2026 in Wien, die Community, Pride-Werte und erstklassigen Service vereint.

**Success Indicators**: 
- Hohe Buchungsrate von Pride-zertifizierten Hotels
- Aktive Nutzung der Community-Features
- Positive Nutzer-Bewertungen für LGBTQ+ Freundlichkeit
- Erfolgreiche Affiliate-Umsätze durch Booking.com-Partnership

**Experience Qualities**: Inklusiv, Festlich, Vertrauenswürdig

## Technical Implementation Status

### ✅ Image Proxy Integration (LATEST UPDATE)
**Functionality**: All Booking.com hotel images now load through CORS-free proxy
**Implementation**: 
- Proxy Base: `https://booking-image-proxy.vercel.app/api/proxy-image`
- All hotel images use: `${PROXY_BASE}?url=${encodeURIComponent(bookingImageUrl)}`
- Fallback images also use proxy for consistent experience
- Works for both card view (max1024x768) and detail view (max1280x900)

**Benefits**:
- ✅ No more CORS errors for Booking.com images
- ✅ Consistent image loading across all hotel cards
- ✅ Proper fallback handling through proxy
- ✅ Maintained image quality and resolution options

## Project Classification & Approach

**Complexity Level**: Light Application (multiple features with basic state)

**Primary User Activity**: Acting (Hotel-Buchungen) & Interacting (Community-Features)

## Thought Process for Feature Selection

**Core Problem Analysis**: Eurovision-Fans, besonders aus der LGBTQ+ Community, benötigen vertrauensvolle, sichere und community-orientierte Unterkünfte in Wien.

**User Context**: Fans planen Monate im Voraus ihren Eurovision-Aufenthalt und möchten sich mit Gleichgesinnten vernetzen.

**Critical Path**: 
1. Ankunft auf der Seite
2. Hotelsuchefilter setzen (Pride-Level, Preis, Lage)
3. Hotel auswählen und Details prüfen
4. Weiterleitung zu Booking.com für Buchung
5. Optional: Community-Features nutzen

**Key Moments**: 
- Erste Impression der Pride-Thematik (Regenbogen-Animation)
- Hotel-Filter-Auswahl mit Pride-Kategorien
- Buchungsweiterleitung

## Essential Features

### 1. Hotel-Suche & Filterung
**Funktionalität**: Erweiterte Suchfilter mit LGBTQ+ Kategorisierung
**Zweck**: Nutzer finden Hotels, die ihren Werten und Bedürfnissen entsprechen
**Erfolgskriterien**: Mindestens 70% nutzen Pride-Filter

### 2. Pride-Kategorisierung
**Funktionalität**: Hotels in "Pride Certified", "LGBTQ+ Friendly", "Standard" einteilen
**Zweck**: Vertrauen und Sicherheit für LGBTQ+ Reisende schaffen
**Erfolgskriterien**: Klare visuelle Unterscheidung, hohe Pride-Hotel-Buchungsrate

### 3. Eurovision-Event-Kalender
**Funktionalität**: Übersicht aller Eurovision-Termine und -Events
**Zweck**: Zentrale Informationsquelle für Fan-Planung
**Erfolgskriterien**: Vollständige und aktuelle Event-Informationen

### 4. Interaktive Wien-Karte
**Funktionalität**: Karte mit Hotels, Eurovision-Venues und LGBTQ+ Locations
**Zweck**: Geographische Orientierung und Entscheidungshilfe
**Erfolgskriterien**: Intuitive Navigation, alle wichtigen Punkte markiert

### 5. Community-Features
**Funktionalität**: Fan-Matching, Gruppenhotel-Buchungen, Event-Meetups
**Zweck**: Community-Gefühl stärken und gemeinsame Erlebnisse ermöglichen
**Erfolgskriterien**: Aktive Nutzer-Interaktionen, erfolgreiche Meetups

### 6. Favoriten-System
**Funktionalität**: Hotels als Favoriten markieren und verwalten
**Zweck**: Wiederkehrende Nutzer und Buchungsprozess vereinfachen
**Erfolgskriterien**: Hohe Nutzungsrate des Favoriten-Systems

### 7. Booking.com-Integration
**Funktionalität**: Nahtlose Weiterleitung zu Booking.com mit Affiliate-Tracking
**Zweck**: Monetarisierung durch Provision
**Erfolgskriterien**: Erfolgreiche Buchungsweiterleitung und Tracking

## Design Direction

### Visual Tone & Identity
**Emotional Response**: Freude, Stolz, Gemeinschaftsgefühl und Vertrauen
**Design Personality**: Festlich, inklusiv, modern, lebhaft aber professionell
**Visual Metaphors**: Regenbogen-Pride-Flagge, Eurovision-Glitzer, Wiener Architektur
**Simplicity Spectrum**: Lebendige aber strukturierte Oberfläche mit klarer Navigation

### Color Strategy
**Color Scheme Type**: Custom 8-Farben Pride-Palette
**Primary Colors**: 
- Pride-Rot (oklch(0.60 0.30 25)) - Energie und Leidenschaft
- Pride-Orange (oklch(0.75 0.25 50)) - Wärme und Einladung  
- Pride-Gelb (oklch(0.90 0.20 90)) - Optimismus und Freude
- Pride-Grün (oklch(0.70 0.25 140)) - Vertrauen und Sicherheit
- Pride-Cyan (oklch(0.65 0.20 200)) - Klarheit und Frische
- Pride-Blau (oklch(0.55 0.25 260)) - Stabilität und Professionalität
- Pride-Lila (oklch(0.50 0.20 300)) - Kreativität und Stolz
- Pride-Magenta (oklch(0.55 0.25 330)) - Individualität und Mut

**Color Psychology**: Die 8-Farben-Pride-Palette vermittelt Diversität, Inklusivität und Feierlichkeit
**Color Accessibility**: Alle Kontraste erfüllen WCAG AA Standards (4.5:1)

### Typography System
**Font Pairing Strategy**: Inter (modern, klar) + Noto Serif (elegant, lesbar)
**Selected Fonts**: Inter für UI-Elemente, Noto Serif für Content
**Typographic Hierarchy**: Klare Größenabstufungen mit ausreichendem Kontrast
**Legibility Check**: Beide Fonts sind weboptimiert und barrierefrei

### Visual Hierarchy & Layout
**Attention Direction**: Regenbogen-Header führt zum Hero, dann zu Hotel-Karten
**Grid System**: Responsive 12-Spalten-Grid mit Tailwind
**Component Hierarchy**: 
- Primary: Buchungs-Buttons, Pride-Badges
- Secondary: Navigations-Tabs, Filter
- Tertiary: Zusatzinformationen, Footer

### Animations
**Purposeful Meaning**: 
- Regenbogen-Animation symbolisiert Pride und Bewegung
- Vertikale Streifen-Animation verstärkt Eurovision-Bühnen-Gefühl
- Hover-Animationen an Hotel-Karten für Interaktivität

### UI Elements & Component Selection
**Component Usage**: Shadcn v4 für konsistente, barrierefreie UI
**Key Components**: Card, Button, Badge, Tabs, Select, Input
**Icon Selection**: Phosphor Icons für einheitliches Design

## Edge Cases & Problem Scenarios

**Potential Obstacles**: 
- Booking.com-API-Ausfälle
- Hohe Nachfrage während Eurovision-Anmeldung
- Verschiedene Sprachen (DE/EN)
- Mobile Optimierung für unterwegs

**Technical Constraints**: 
- Affiliate-Link-Compliance
- DSGVO-Konformität
- Performance bei vielen Hotels

## Implementation Considerations

**Scalability Needs**: 
- Erweiterung auf andere Eurovision-Städte
- Mehrsprachigkeit
- Zusätzliche Booking-Partner

**Critical Questions**: 
- Wie validieren wir Pride-Zertifizierungen?
- Welche Community-Features sind am wichtigsten?
- Wie optimieren wir die Conversion-Rate?

## Reflection

**Unique Approach**: Erste spezialisierte Eurovision+LGBTQ+-Buchungsplattform
**Assumptions**: LGBTQ+ Community bevorzugt zertifizierte Hotels
**Exceptional Solution**: Kombination aus praktischer Buchung und Community-Erlebnis

## Nächste Implementierungsschritte

1. **Interaktive Wien-Karte** - Geographische Orientierung
2. **Erweiterte Hotel-Details** - Mehr Informationen und Bilder
3. **Community-Features** - Fan-Matching und Gruppenplanung
4. **Mehrsprachigkeit** - EN/DE Toggle
5. **Mobile Optimierung** - Touch-friendly Interface
6. **Review-System** - Nutzer-Bewertungen für Hotels
7. **Social Media Integration** - Teilen von Favoriten
8. **Newsletter-System** - Updates zu Eurovision 2026