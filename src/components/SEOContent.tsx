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
