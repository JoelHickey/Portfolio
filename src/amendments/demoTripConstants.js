/**
 * Single fictional trip used by Amendments + Insurance interactive demos.
 * Keep hero overlay and default itinerary row in sync.
 */
export const DEMO_TRIP_HERO = {
  title: 'Hawaii Family Vacation',
  dateRange: 'May 15–20, 2024',
  travellersLabel: '1 traveller',
  /** Package total shown on hero (line item below is hotel only). */
  packageTotalAmount: 4805,
}

export const DEMO_TRIP_DEFAULT_ITINERARY = {
  id: 'hotel',
  title: 'Hilton Hawaiian Village',
  datesStr: `${DEMO_TRIP_HERO.dateRange} · 5 nights`,
  roomStr: 'Standard Room',
  price: '$2,890',
  highlight: false,
}

export const demoTripPackageTotalFormatted = () =>
  `$${DEMO_TRIP_HERO.packageTotalAmount.toLocaleString()}`
