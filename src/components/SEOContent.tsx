import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'

/**
 * SEO-optimized content block for Eurovision 2026 Vienna Hotels
 * This content is designed to be inserted after the hotel listing on the main page
 * to improve on-page SEO and provide comprehensive information to visitors.
 * Fully internationalized with German and English translations.
 */
export function SEOContent() {
  const { t } = useTranslation()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg max-w-none">
        
        <h2 className="text-3xl font-normal mb-6">{t('seoMainTitle')}</h2>
        <p className="italic text-muted-foreground mb-6">{t('seoMainSubtitle')}</p>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoOverview')}</h3>
        <p className="mb-6">{t('seoOverviewText')}</p>

        <hr className="my-8" />

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoTableOfContents')}</h3>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li><a href="#esc-2026-vienna" className="text-primary hover:underline">{t('seoTOC1')}</a></li>
          <li><a href="#wiener-stadthalle" className="text-primary hover:underline">{t('seoTOC2')}</a></li>
          <li><a href="#vienna-host-city" className="text-primary hover:underline">{t('seoTOC3')}</a></li>
          <li><a href="#complete-hotel-guide" className="text-primary hover:underline">{t('seoTOC4')}</a></li>
          <li><a href="#booking-information" className="text-primary hover:underline">{t('seoTOC5')}</a></li>
        </ol>

        <hr className="my-8" />

        <h2 id="esc-2026-vienna" className="text-3xl font-normal mt-12 mb-6">{t('seoESC2026Title')}</h2>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoESC70thTitle')}</h3>
        <p className="mb-6">{t('seoESC70thText')}</p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoKeyInfoTitle')}</h4>
        <p className="mb-4"><strong>{t('seoEventDates')}</strong></p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>{t('seoSemiFinal1')}</strong></li>
          <li><strong>{t('seoSemiFinal2')}</strong></li>
          <li><strong>{t('seoGrandFinal')}</strong></li>
        </ul>
        <p className="mb-2"><strong>{t('seoVenue')}</strong></p>
        <p className="mb-2"><strong>{t('seoExpectedAttendance')}</strong></p>
        <p className="mb-2"><strong>{t('seoParticipatingCountries')}</strong></p>
        <p className="mb-6"><strong>{t('seoLanguage')}</strong></p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHistoryTitle')}</h4>
        <p className="mb-4">{t('seoHistoryText')}</p>
        <p className="mb-2"><strong>{t('seoEurovision1967')}</strong></p>
        <p className="mb-6"><strong>{t('seoEurovision2015')}</strong></p>
        <p className="mb-6">{t('seoHistoryText2')}</p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoSpecialTitle')}</h4>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li><strong>{t('seoSpecialAnniversary')}</strong></li>
          <li><strong>{t('seoSpecialProduction')}</strong></li>
          <li><strong>{t('seoSpecialSustainability')}</strong></li>
          <li><strong>{t('seoSpecialCultural')}</strong></li>
          <li><strong>{t('seoSpecialDigital')}</strong></li>
        </ul>

        <hr className="my-8" />

        <h2 id="wiener-stadthalle" className="text-3xl font-normal mt-12 mb-6">{t('seoStadthalleTitle')}</h2>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoStadthallePremier')}</h3>
        <p className="mb-6">{t('seoStadthalleText')}</p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoVenueSpecs')}</h4>
        <p className="mb-2"><strong>{t('seoCapacity')}</strong></p>
        <p className="mb-2"><strong>{t('seoAddress')}</strong></p>
        <p className="mb-2"><strong>{t('seoBuilt')}</strong></p>
        <p className="mb-6"><strong>{t('seoHalls')}</strong></p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoGettingThere')}</h4>
        <p className="mb-4"><strong>{t('seoPublicTransportTitle')}</strong></p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>{t('seoU6Metro')}</strong></li>
          <li><strong>{t('seoTramLines')}</strong></li>
          <li><strong>{t('seoBusConnections')}</strong></li>
          <li><strong>{t('seoTaxiRideshare')}</strong></li>
        </ul>

        <p className="mb-4"><strong>{t('seoInternationalVisitors')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoAirport')}</strong></li>
          <li><strong>{t('seoCentralStation')}</strong></li>
          <li><strong>{t('seoWalkingDistance')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoVenueAmenities')}</h4>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li><strong>{t('seoVIPAreas')}</strong></li>
          <li><strong>{t('seoRestaurantsBars')}</strong></li>
          <li><strong>{t('seoAccessibility')}</strong></li>
          <li><strong>{t('seoParking')}</strong></li>
          <li><strong>{t('seoSecurity')}</strong></li>
        </ul>

        <hr className="my-8" />

        <h2 id="vienna-host-city" className="text-3xl font-normal mt-12 mb-6">{t('seoViennaTitle')}</h2>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoViennaCapital')}</h3>
        <p className="mb-6">{t('seoViennaText')}</p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoWhyViennaPerfect')}</h4>
        <p className="mb-4"><strong>{t('seoMusicalHeritage')}</strong></p>
        <p className="mb-4">{t('seoMusicalHeritageText')}</p>

        <p className="mb-4"><strong>{t('seoCulturalDiversity')}</strong></p>
        <p className="mb-4">{t('seoCulturalDiversityText')}</p>

        <p className="mb-4"><strong>{t('seoTourismInfrastructure')}</strong></p>
        <p className="mb-6">{t('seoTourismInfrastructureText')}</p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoTopAttractions')}</h4>
        <p className="mb-4"><strong>{t('seoHistoricCenter')}</strong></p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>{t('seoStStephensCathedral')}</strong></li>
          <li><strong>{t('seoHofburg')}</strong></li>
          <li><strong>{t('seoSchonbrunn')}</strong></li>
        </ul>

        <p className="mb-4"><strong>{t('seoCulturalHighlights')}</strong></p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>{t('seoBelvedere')}</strong></li>
          <li><strong>{t('seoKunsthistorisches')}</strong></li>
          <li><strong>{t('seoNaschmarkt')}</strong></li>
        </ul>

        <p className="mb-4"><strong>{t('seoModernVienna')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoPrater')}</strong></li>
          <li><strong>{t('seoDanubeIsland')}</strong></li>
          <li><strong>{t('seoMuseumQuarter')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoEurovisionVillages')}</h4>
        <p className="mb-6">{t('seoEurovisionVillagesText')}</p>
        <p className="mb-2"><strong>{t('seoEurovisionVillage')}</strong></p>
        <p className="mb-2"><strong>{t('seoSongContestBoulevard')}</strong></p>
        <p className="mb-6"><strong>{t('seoCulturalEvents')}</strong></p>

        <hr className="my-8" />

        <h2 id="complete-hotel-guide" className="text-3xl font-normal mt-12 mb-6">{t('seoCompleteHotelGuide')}</h2>
        <p className="italic text-muted-foreground mb-6">{t('seoIndependentComparison')}</p>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoLuxuryHotels')}</h3>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelSacherTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelSacherDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelSacherPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelSacherOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoWhyChooseSacher')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoSacherElegance')}</strong></li>
          <li><strong>{t('seoSacherLocation')}</strong></li>
          <li><strong>{t('seoSacherDining')}</strong></li>
          <li><strong>{t('seoSacherConcierge')}</strong></li>
          <li><strong>{t('seoSacherRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelImperialTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelImperialDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelImperialPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelImperialOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoImperialFeatures')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoImperialArchitecture')}</strong></li>
          <li><strong>{t('seoImperialSuites')}</strong></li>
          <li><strong>{t('seoImperialDining')}</strong></li>
          <li><strong>{t('seoImperialSpa')}</strong></li>
          <li><strong>{t('seoImperialMeeting')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelSansSouciTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelSansSouciDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelSansSouciPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelSansSouciOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoSansSouciHighlights')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoSansSouciDesign')}</strong></li>
          <li><strong>{t('seoSansSouciWellness')}</strong></li>
          <li><strong>{t('seoSansSouciLocation')}</strong></li>
          <li><strong>{t('seoSansSouciRestaurant')}</strong></li>
          <li><strong>{t('seoSansSouciRooms')}</strong></li>
        </ul>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoBoutiqueHotels')}</h3>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelStadthalleTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelStadthalleDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelStadthallePrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelStadthalleOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoStadthalleFeatures')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoStadthalleGreenBuilding')}</strong></li>
          <li><strong>{t('seoStadthalleSolar')}</strong></li>
          <li><strong>{t('seoStadthalleOrganic')}</strong></li>
          <li><strong>{t('seoStadthalleRooms')}</strong></li>
          <li><strong>{t('seoStadthalleRooftop')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelMOTTOTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelMOTTODistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelMOTTOPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelMOTTOOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoMOTTOAmenities')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoMOTTOArchitecture')}</strong></li>
          <li><strong>{t('seoMOTTOShopping')}</strong></li>
          <li><strong>{t('seoMOTTODesign')}</strong></li>
          <li><strong>{t('seoMOTTORestaurant')}</strong></li>
          <li><strong>{t('seoMOTTOBusiness')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelAltstadtTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelAltstadtDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelAltstadtPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelAltstadtOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoAltstadtCharacter')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoAltstadtArtistic')}</strong></li>
          <li><strong>{t('seoAltstadtQuarter')}</strong></li>
          <li><strong>{t('seoAltstadtService')}</strong></li>
          <li><strong>{t('seoAltstadtCultural')}</strong></li>
          <li><strong>{t('seoAltstadtRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelAndazTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelAndazDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelAndazPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelAndazOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoAndazFeatures')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoAndazRooftop')}</strong></li>
          <li><strong>{t('seoAndazDesign')}</strong></li>
          <li><strong>{t('seoAndazLocation')}</strong></li>
          <li><strong>{t('seoAndazFitness')}</strong></li>
          <li><strong>{t('seoAndazRooms')}</strong></li>
        </ul>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoBusinessHotels')}</h3>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelDOCOTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelDOCODistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelDOCOPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelDOCOOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoDOCOAdvantages')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoDOCOLocation')}</strong></li>
          <li><strong>{t('seoDOCOViews')}</strong></li>
          <li><strong>{t('seoDOCODining')}</strong></li>
          <li><strong>{t('seoDOCODesign')}</strong></li>
          <li><strong>{t('seoDOCOSuites')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelKonzerthausTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelKonzerthausDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelKonzerthausPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelKonzerthausOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoKonzerthausFeatures')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoKonzerthausMusical')}</strong></li>
          <li><strong>{t('seoKonzerthausProximity')}</strong></li>
          <li><strong>{t('seoKonzerthausBusiness')}</strong></li>
          <li><strong>{t('seoKonzerthausDining')}</strong></li>
          <li><strong>{t('seoKonzerthausRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelMercureTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelMercureDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelMercurePrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelMercureOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoMercureBenefits')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoMercureShopping')}</strong></li>
          <li><strong>{t('seoMercureEco')}</strong></li>
          <li><strong>{t('seoMercureBusinessServices')}</strong></li>
          <li><strong>{t('seoMercureRestaurant')}</strong></li>
          <li><strong>{t('seoMercureRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelLeonardoTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelLeonardoDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelLeonardoPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelLeonardoOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoLeonardoAdvantages')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoLeonardoTransport')}</strong></li>
          <li><strong>{t('seoLeonardoModern')}</strong></li>
          <li><strong>{t('seoLeonardoFitness')}</strong></li>
          <li><strong>{t('seoLeonardoRestaurant')}</strong></li>
          <li><strong>{t('seoLeonardoRooms')}</strong></li>
        </ul>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoContemporaryHotels')}</h3>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelRubyMarieTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelRubyMarieDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelRubyMariePrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelRubyMarieOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoRubyMarieHighlights')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoRubyMarieLean')}</strong></li>
          <li><strong>{t('seoRubyMarieRooftop')}</strong></li>
          <li><strong>{t('seoRubyMarieShopping')}</strong></li>
          <li><strong>{t('seoRubyMarieDesign')}</strong></li>
          <li><strong>{t('seoRubyMarieRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelMoxyTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelMoxyDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelMoxyPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelMoxyOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoMoxyExperience')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoMoxySocial')}</strong></li>
          <li><strong>{t('seoMoxyBar')}</strong></li>
          <li><strong>{t('seoMoxyRooms')}</strong></li>
          <li><strong>{t('seoMoxyFitness')}</strong></li>
          <li><strong>{t('seoMoxyRoomsCount')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelZeitgeistTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelZeitgeistDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelZeitgeistPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelZeitgeistOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoZeitgeistFeatures')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoZeitgeistDesign')}</strong></li>
          <li><strong>{t('seoZeitgeistCourtyard')}</strong></li>
          <li><strong>{t('seoZeitgeistStation')}</strong></li>
          <li><strong>{t('seoZeitgeistBusiness')}</strong></li>
          <li><strong>{t('seoZeitgeistRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelARTTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelARTDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelARTPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelARTOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoARTCharacter')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoARTArtistic')}</strong></li>
          <li><strong>{t('seoARTExterior')}</strong></li>
          <li><strong>{t('seoARTDistrict')}</strong></li>
          <li><strong>{t('seoARTAmenities')}</strong></li>
          <li><strong>{t('seoARTRooms')}</strong></li>
        </ul>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoBudgetHotels')}</h3>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelPrizeTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelPrizeDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelPrizePrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelPrizeOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoPrizeBenefits')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoPrizeValue')}</strong></li>
          <li><strong>{t('seoPrizeAmenities')}</strong></li>
          <li><strong>{t('seoPrizeLocation')}</strong></li>
          <li><strong>{t('seoPrizeStandards')}</strong></li>
          <li><strong>{t('seoPrizeRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelHenrietteTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelHenrietteDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelHenriettePrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelHenrietteOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoHenrietteSustainability')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoHenrietteCommonGood')}</strong></li>
          <li><strong>{t('seoHenriettePractices')}</strong></li>
          <li><strong>{t('seoHenrietteLocation')}</strong></li>
          <li><strong>{t('seoHenrietteComfort')}</strong></li>
          <li><strong>{t('seoHenrietteRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelReginaTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelReginaDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelReginaPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelReginaOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoReginaAdvantages')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoReginaTraditional')}</strong></li>
          <li><strong>{t('seoReginaLocation')}</strong></li>
          <li><strong>{t('seoReginaCharacter')}</strong></li>
          <li><strong>{t('seoReginaValue')}</strong></li>
          <li><strong>{t('seoReginaRooms')}</strong></li>
        </ul>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoChainHotels')}</h3>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelHiltonPlazaTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelHiltonPlazaDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelHiltonPlazaPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelHiltonPlazaOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoHiltonPlazaFeatures')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoHiltonPlazaLocation')}</strong></li>
          <li><strong>{t('seoHiltonPlazaBusiness')}</strong></li>
          <li><strong>{t('seoHiltonPlazaStandards')}</strong></li>
          <li><strong>{t('seoHiltonPlazaFitness')}</strong></li>
          <li><strong>{t('seoHiltonPlazaRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelHiltonWaterfrontTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelHiltonWaterfrontDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelHiltonWaterfrontPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelHiltonWaterfrontOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoWaterfrontBenefits')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoWaterfrontLocation')}</strong></li>
          <li><strong>{t('seoWaterfrontSpa')}</strong></li>
          <li><strong>{t('seoWaterfrontPool')}</strong></li>
          <li><strong>{t('seoWaterfrontBusiness')}</strong></li>
          <li><strong>{t('seoWaterfrontRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelDonauwalzerTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelDonauwalzerDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelDonauwalzerPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelDonauwalzerOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoDonauwalzerCharacter')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoDonauwalzerDesign')}</strong></li>
          <li><strong>{t('seoDonauwalzerCharm')}</strong></li>
          <li><strong>{t('seoDonauwalzerArea')}</strong></li>
          <li><strong>{t('seoDonauwalzerFamily')}</strong></li>
          <li><strong>{t('seoDonauwalzerRooms')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoHotelDasTriestTitle')}</h4>
        <p className="mb-2"><strong>{t('seoHotelDasTriestDistance')}</strong></p>
        <p className="mb-2"><strong>{t('seoHotelDasTriestPrice')}</strong></p>
        <p className="mb-4"><strong>{t('seoHotelDasTriestOverview')}</strong></p>
        
        <p className="mb-2"><strong>{t('seoDasTriestExcellence')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoDasTriestHeritage')}</strong></li>
          <li><strong>{t('seoDasTriestStandards')}</strong></li>
          <li><strong>{t('seoDasTriestStyle')}</strong></li>
          <li><strong>{t('seoDasTriestLocation')}</strong></li>
          <li><strong>{t('seoDasTriestRooms')}</strong></li>
        </ul>

        <hr className="my-8" />

        <h2 id="booking-information" className="text-3xl font-normal mt-12 mb-6">{t('seoBookingInfoTitle')}</h2>

        <h3 className="text-2xl font-normal mt-8 mb-4">{t('seoHowToBook')}</h3>
        <p className="italic text-muted-foreground mb-6">{t('seoIndependentPlatform')}</p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoBookingProcess')}</h4>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li><strong>{t('seoBookingStep1')}</strong></li>
          <li><strong>{t('seoBookingStep2')}</strong></li>
          <li><strong>{t('seoBookingStep3')}</strong></li>
          <li><strong>{t('seoBookingStep4')}</strong></li>
          <li><strong>{t('seoBookingStep5')}</strong></li>
        </ol>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoImportantNotes')}</h4>
        <p className="mb-4"><strong>{t('seoPriceFluctuations')}</strong></p>
        <p className="mb-4"><strong>{t('seoAdvanceBooking')}</strong></p>
        <p className="mb-4"><strong>{t('seoCancellationPolicies')}</strong></p>
        <p className="mb-6"><strong>{t('seoPaymentMethods')}</strong></p>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoTransportationFromHotels')}</h4>
        <p className="mb-4"><strong>{t('seoPublicTransportation')}</strong></p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>{t('seoU6MetroLine')}</strong></li>
          <li><strong>{t('seoTramNetworks')}</strong></li>
          <li><strong>{t('seoNightServices')}</strong></li>
        </ul>

        <p className="mb-4"><strong>{t('seoWalkingDistancesTitle')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoUnder10Min')}</strong></li>
          <li><strong>{t('seo10to20Min')}</strong></li>
          <li><strong>{t('seo20PlusMin')}</strong></li>
        </ul>

        <h4 className="text-xl font-normal mt-6 mb-3">{t('seoAdditionalServices')}</h4>
        <p className="mb-4"><strong>{t('seoAirportTransfer')}</strong></p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>{t('seoCATTrain')}</strong></li>
          <li><strong>{t('seoS7Train')}</strong></li>
          <li><strong>{t('seoTaxiUber')}</strong></li>
        </ul>

        <p className="mb-4"><strong>{t('seoConcertTickets')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>{t('seoOfficialWebsite')}</strong></li>
          <li><strong>{t('seoAuthorizedVendors')}</strong></li>
          <li><strong>{t('seoORF')}</strong></li>
        </ul>

        <hr className="my-8" />

        <h2 className="text-3xl font-normal mt-12 mb-6">{t('seoLegalDisclaimer')}</h2>
        <p className="mb-4">{t('seoLegalDisclaimerText')}</p>

        <p className="mb-4"><strong>{t('seoImportantLegalInfo')}</strong></p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li><strong>{t('seoNotAffiliated')}</strong></li>
          <li><strong>{t('seoNoDirectBookings')}</strong></li>
          <li><strong>{t('seoInfoAccuracy')}</strong></li>
          <li><strong>{t('seoAffiliateLinks')}</strong></li>
          <li><strong>{t('seoPersonalProject')}</strong></li>
          <li><strong>{t('seoPriceEstimates')}</strong></li>
        </ul>

        <p className="mb-6">
          <strong>{t('seoContactInfo')}</strong><br />
          {t('seoContactInfoText')}
        </p>

        <p className="mb-4">
          <strong>{t('seoLastUpdated')}</strong><br />
          <strong>{t('seoNextUpdate')}</strong>
        </p>

        <hr className="my-8" />

        <p className="text-center italic text-muted-foreground mt-8">
          {t('seoFinalNote')}
        </p>

      </div>
    </div>
  )
}
