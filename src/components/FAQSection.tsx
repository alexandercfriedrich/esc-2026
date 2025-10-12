import React, { useState } from 'react'
import { CaretDown, CaretUp, Question } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from '@/hooks/useTranslation'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // Allgemeine Informationen
  {
    id: 'esc-2026-dates',
    category: 'Allgemeine Informationen',
    question: 'Wann findet der Eurovision Song Contest 2026 statt?',
    answer: 'Der Eurovision Song Contest 2026 findet vom 10. bis 16. Mai 2026 in Wien statt. Die Halbfinale sind am 12. Mai 2026 (1. Halbfinale) und 14. Mai 2026 (2. Halbfinale), das große Finale am Samstag, 16. Mai 2026. Alle Shows beginnen um 21:00 Uhr MESZ.'
  },
  {
    id: 'esc-2026-venue',
    category: 'Allgemeine Informationen',
    question: 'Wo wird der ESC 2026 ausgetragen?',
    answer: 'Der Eurovision Song Contest 2026 wird in der Wiener Stadthalle (Roland Rainer Platz 1, 1150 Wien) ausgetragen. Diese Venue hat bereits 2015 erfolgreich den Eurovision Song Contest gehostet und bietet Platz für bis zu 16.000 Zuschauer.'
  },
  {
    id: 'stadthalle-transport',
    category: 'Allgemeine Informationen',
    question: 'Wie komme ich zur Wiener Stadthalle?',
    answer: 'Die Wiener Stadthalle ist optimal mit öffentlichen Verkehrsmitteln erreichbar: U-Bahn U6 (Station Burggasse-Stadthalle) oder U-Bahn U3 (Station Schweglerstraße).'
  },
  {
    id: 'stadthalle-accessibility',
    category: 'Allgemeine Informationen',
    question: 'Ist die Wiener Stadthalle barrierefrei zugänglich?',
    answer: 'Ja, die Wiener Stadthalle ist vollständig barrierefrei. Es gibt spezielle Rollstuhlplätze in den Hallen D und F, eine induktive Höranlage in Halle F, rollstuhlgerechte Toiletten und Parkplätze für Menschen mit Behinderungen.'
  },

  // Tickets & Preise
  {
    id: 'ticket-sales-start',
    category: 'Tickets & Preise',
    question: 'Wann beginnt der Ticketverkauf für Eurovision 2026?',
    answer: 'Der Ticketverkauf für den Eurovision Song Contest 2026 wird für Ende 2025 erwartet. Basierend auf vorherigen Jahren startet der Verkauf üblicherweise zwischen Dezember und Januar vor dem Event.'
  },
  {
    id: 'ticket-prices',
    category: 'Tickets & Preise',
    question: 'Wie viel kosten Eurovision 2026 Tickets?',
    answer: 'Die Ticketpreise variieren je nach Show und Kategorie. Basierend auf vergangene Eurovision-Events liegen die Preise typischerweise zwischen €10-€400. Günstigste Tickets für Probe der Halbfinale (ca. €10-€50), teuerste Tickets für Finale Live-Show (bis zu €400).'
  },
  {
    id: 'ticket-purchase',
    category: 'Tickets & Preise',
    question: 'Wo kann ich Eurovision 2026 Tickets kaufen?',
    answer: 'Offizielle Tickets werden über die von ORF und EBU authorisierten Ticketing-Partner verkauft. Weitere Details zum Verkaufsstart werden Ende 2025 bekannt gegeben.'
  },
  {
    id: 'fan-tickets',
    category: 'Tickets & Preise',
    question: 'Gibt es spezielle Fan-Tickets?',
    answer: 'Ja, traditionell werden spezielle Fan-Tickets über offizielle Eurovision-Fanclubs verkauft. Diese Pakete enthalten meist Tickets für alle sechs Shows (drei Live-Shows und drei Jury-Proben) mit Zugang zur Fan-Zone direkt vor der Bühne.'
  },

  // Veranstaltungsort & Kapazität
  {
    id: 'stadthalle-capacity',
    category: 'Veranstaltungsort & Kapazität',
    question: 'Welche Kapazität hat die Wiener Stadthalle?',
    answer: 'Die Wiener Stadthalle hat eine Gesamtkapazität von bis zu 16.000 Zuschauern und ist damit Österreichs größte Multifunktionshalle. Halle D, wo Eurovision stattfindet, kann bis zu 16.152 Personen fassen.'
  },
  {
    id: 'vienna-selection',
    category: 'Veranstaltungsort & Kapazität',
    question: 'Warum wurde Wien als Austragungsort gewählt?',
    answer: 'Wien wurde am 20. August 2025 als Austragungsort gewählt aufgrund seiner Erfahrung (bereits 1967 und 2015 Gastgeber), exzellenten Infrastruktur mit über 80.000 Hotelbetten, internationalen Flugverbindungen zu über 65 Ländern und bewährten öffentlichen Verkehrssystems.'
  },

  // Eurovision Village & Side Events
  {
    id: 'eurovision-village-location',
    category: 'Eurovision Village & Side Events',
    question: 'Wo findet das Eurovision Village statt?',
    answer: 'Das Eurovision Village befindet sich am Wiener Rathausplatz (Rathausplatz, 1010 Wien) und ist mit der U-Bahn U2 (Station Rathaus) erreichbar.'
  },
  {
    id: 'eurovision-village-hours',
    category: 'Eurovision Village & Side Events',
    question: 'Wann ist das Eurovision Village geöffnet?',
    answer: 'Das Eurovision Village ist vom 10. bis 17. Mai 2026 täglich von 11:00 bis 24:00 Uhr (oder bis Showende) geöffnet. Der Eintritt ist kostenlos.'
  },

  // Unterkunft & Reisen
  {
    id: 'vienna-hotel-capacity',
    category: 'Unterkunft & Reisen',
    question: 'Wie viele Hotelbetten gibt es in Wien?',
    answer: 'Wien verfügt über mehr als 80.000 Hotelbetten in über 433 Hotels, was ausreichend Kapazität für Eurovision-Besucher bietet.'
  },
  {
    id: 'hotel-prices-eurovision',
    category: 'Unterkunft & Reisen',
    question: 'Sind die Hotelpreise während Eurovision erhöht?',
    answer: 'Ja, viele Wiener Hotels haben ihre Preise nach der offiziellen Eurovision-Ankündigung erhöht. Es wird empfohlen, frühzeitig zu buchen.'
  },
  {
    id: 'accommodation-alternatives',
    category: 'Unterkunft & Reisen',
    question: 'Welche Alternativen gibt es zu Hotels?',
    answer: 'Alternative Unterkünfte umfassen Hostels und Pensionen, Airbnb und private Vermietungen sowie Unterkünfte in Bratislava (weniger als eine Stunde mit dem Zug).'
  },

  // Teilnehmer & Format
  {
    id: 'participating-countries',
    category: 'Teilnehmer & Format',
    question: 'Wie viele Länder nehmen am ESC 2026 teil?',
    answer: '25 Länder haben ihr Interesse für die Teilnahme am Eurovision 2026 bekundet. 6 weitere Länder warten auf die Entscheidung der EBU-Generalversammlung bezüglich Israels Teilnahme ab.'
  },
  {
    id: 'registration-deadline',
    category: 'Teilnehmer & Format',
    question: 'Bis wann müssen sich Länder anmelden?',
    answer: 'Die EBU-Mitgliedsender haben bis Mitte Dezember 2025 Zeit, ihre formellen Anträge für die Teilnahme am Eurovision 2026 einzureichen.'
  },

  // Broadcast & Übertragung
  {
    id: 'austrian-broadcaster',
    category: 'Broadcast & Übertragung',
    question: 'Wer überträgt Eurovision 2026 in Österreich?',
    answer: 'ORF (Österreichischer Rundfunk) ist der Gastgeber-Sender und überträgt Eurovision 2026 in Österreich.'
  },
  {
    id: 'watch-options',
    category: 'Broadcast & Übertragung',
    question: 'Wo kann ich Eurovision 2026 live verfolgen?',
    answer: 'Eurovision 2026 kann im Fernsehen über die jeweiligen nationalen Broadcaster, live im Eurovision Village am Rathausplatz (kostenlos) oder online über offizielle Streaming-Kanäle verfolgt werden.'
  }
]

const categories = Array.from(new Set(faqData.map(item => item.category)))

export function FAQSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const { t } = useTranslation()

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId)
    } else {
      newOpenItems.add(itemId)
    }
    setOpenItems(newOpenItems)
  }

  const expandAll = () => {
    setOpenItems(new Set(faqData.map(item => item.id)))
  }

  const collapseAll = () => {
    setOpenItems(new Set())
  }

  // Generate Schema.org FAQPage markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* FAQ Section Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Question className="text-primary" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('faqTitle')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('faqSubtitle')}
            </p>
          </div>

          {/* Expandable FAQ Container */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <div className="text-center mb-6">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                >
                  {isExpanded ? (
                    <>
                      <CaretUp className="mr-2" size={20} />
                      {t('faqClose')}
                    </>
                  ) : (
                    <>
                      <CaretDown className="mr-2" size={20} />
                      {t('faqShowAll')}
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-8">
              {/* FAQ Controls */}
              <div className="flex justify-center gap-4 mb-8">
                <Button 
                  variant="secondary" 
                  onClick={expandAll}
                  className="text-sm"
                >
                  {t('faqOpenAll')}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={collapseAll}
                  className="text-sm"
                >
                  {t('faqCloseAll')}
                </Button>
              </div>

              {/* FAQ Categories */}
              {categories.map((category, categoryIndex) => (
                <Card key={category} className="overflow-hidden">
                  <CardHeader className="bg-secondary/50">
                    <CardTitle className="text-xl text-secondary-foreground flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {faqData
                      .filter(item => item.category === category)
                      .map((item, itemIndex) => (
                        <div key={item.id}>
                          <Collapsible 
                            open={openItems.has(item.id)} 
                            onOpenChange={() => toggleItem(item.id)}
                          >
                            <CollapsibleTrigger className="w-full text-left p-6 hover:bg-muted/50 transition-colors">
                              <div className="flex items-center justify-between gap-4">
                                <h3 
                                  className="font-semibold text-foreground leading-relaxed"
                                  itemProp="name"
                                >
                                  {item.question}
                                </h3>
                                {openItems.has(item.id) ? (
                                  <CaretUp className="text-primary flex-shrink-0" size={20} />
                                ) : (
                                  <CaretDown className="text-muted-foreground flex-shrink-0" size={20} />
                                )}
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div 
                                className="px-6 pb-6 text-muted-foreground leading-relaxed"
                                itemProp="acceptedAnswer"
                                itemScope
                                itemType="https://schema.org/Answer"
                              >
                                <div itemProp="text">
                                  {item.answer}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                          {itemIndex < faqData.filter(i => i.category === category).length - 1 && (
                            <Separator />
                          )}
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}

              {/* Additional Information */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {t('faqMoreQuestions')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('faqUpdateInfo')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('faqOfficialInfo')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    {t('faqHotelSelection')}{' '}
                    <button 
                      onClick={() => {
                        const searchForm = document.querySelector('[data-search-form]');
                        if (searchForm) {
                          searchForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="text-primary hover:text-primary/80 underline font-medium cursor-pointer bg-transparent border-none p-0"
                    >
                      {t('faqHere')}
                    </button>.
                  </p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    </>
  )
}