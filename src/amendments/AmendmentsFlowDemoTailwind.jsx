import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import { JoelAvatar } from '../components/JoelAvatar'
import {
  DEMO_TRIP_DEFAULT_ITINERARY,
  DEMO_TRIP_HERO,
  demoTripPackageTotalFormatted,
} from './demoTripConstants'

const TAB_LABELS = ['itinerary', 'travellers', 'documents', 'payments', 'notes', 'history']

const TRIP_HERO = {
  title: DEMO_TRIP_HERO.title,
  dateRange: DEMO_TRIP_HERO.dateRange,
  travellersLabel: DEMO_TRIP_HERO.travellersLabel,
  packageTotalFormatted: demoTripPackageTotalFormatted(),
}
const TRIP_DEFAULT_ITINERARY_CARD = DEMO_TRIP_DEFAULT_ITINERARY

const newFlowSteps = ['Search & Travellers', 'Results', 'Review']
const oldFlowSteps = ['Results', 'Cart', 'Travellers', 'Payment']

const OLD_FLOW_HOTELS = [
  { name: 'Hilton Hawaiian Village', rooms: [{ label: 'Standard Room', price: '$289' }, { label: 'Deluxe Ocean', price: '$325' }, { label: 'Suite', price: '$399' }] },
  { name: 'Royal Hawaiian Resort', rooms: [{ label: 'Standard Room', price: '$425' }, { label: 'Ocean View', price: '$489' }, { label: 'Premium Suite', price: '$599' }] },
  { name: 'Moana Surfrider', rooms: [{ label: 'Standard Room', price: '$350' }, { label: 'Deluxe', price: '$395' }, { label: 'Ocean Front', price: '$449' }] },
  { name: 'Sheraton Waikiki', rooms: [{ label: 'Standard Room', price: '$315' }, { label: 'Superior', price: '$359' }, { label: 'Club Level', price: '$425' }] }
]

const DREAM_ROOM_OPTIONS = [
  { id: 'standard', label: 'Standard Room', price: '$289', delta: 0 },
  { id: 'deluxe', label: 'Deluxe Room', price: '$325', delta: 180 },
  { id: 'ocean', label: 'Ocean View Suite', price: '$375', delta: 420 }
]
const DREAM_HOTELS = [
  { name: 'Hilton Hawaiian Village', price: '$289', total: 4200 },
  { name: 'Royal Hawaiian Resort', price: '$425', total: 4805 },
  { name: 'Moana Surfrider', price: '$350', total: 4520 }
]
const DREAM_BASE_TOTAL = 4805

const DREAM_PLACEHOLDER_VARIATIONS = [
  'What would you like to change?',
  'e.g. Upgrade to ocean view',
  'e.g. Switch to a different hotel',
  'e.g. Find a hotel that exceeds traveller preferences'
]

const DREAM_TYPE_EXAMPLES = [
  'Upgrade to ocean view',
  'Switch to a different hotel',
  'Find a hotel that exceeds traveller preferences'
]

const DREAM_SEARCH_OPTIONS = [
  { roomId: 'ocean', hotelName: 'Hilton Hawaiian Village', roomLabel: 'Ocean View Suite', price: '$375' },
  { roomId: 'deluxe', hotelName: 'Hilton Hawaiian Village', roomLabel: 'Deluxe Room', price: '$325' },
  { roomId: 'ocean', hotelName: 'Royal Hawaiian Resort', roomLabel: 'Ocean View', price: '$489' },
  { roomId: 'deluxe', hotelName: 'Moana Surfrider', roomLabel: 'Deluxe', price: '$395' }
]
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDateRange(range) {
  if (!range) return ''
  return range.startMonth === range.endMonth && range.startYear === range.endYear
    ? `${MONTH_NAMES[range.startMonth - 1]} ${range.startDay}–${range.endDay}, ${range.startYear}`
    : range.startYear === range.endYear
      ? `${MONTH_NAMES[range.startMonth - 1]} ${range.startDay} – ${MONTH_NAMES[range.endMonth - 1]} ${range.endDay}, ${range.endYear}`
      : `${MONTH_NAMES[range.startMonth - 1]} ${range.startDay}, ${range.startYear} – ${MONTH_NAMES[range.endMonth - 1]} ${range.endDay}, ${range.endYear}`
}

function getCalendarGrid(month, year) {
  const first = new Date(year, month - 1, 1)
  const last = new Date(year, month, 0)
  const daysInMonth = last.getDate()
  const startOffset = first.getDay() // 0 = Sun
  const grid = []
  for (let i = 0; i < startOffset; i++) grid.push(null)
  for (let d = 1; d <= daysInMonth; d++) grid.push(d)
  return grid
}

function getAvailability(month, year) {
  const last = new Date(year, month, 0)
  const daysInMonth = last.getDate()
  const avail = {}
  for (let d = 1; d <= daysInMonth; d++) {
    let status = 'high'
    if ([4, 5, 11, 12, 18, 19, 25, 26].includes(d)) status = 'medium'
    else if (d === daysInMonth) status = 'low'
    else if ([1, 8, 16, 22].includes(d)) status = 'sold'
    avail[d] = status
  }
  return avail
}

function rangeContainsSoldNight(range) {
  const start = new Date(range.startYear, range.startMonth - 1, range.startDay)
  const end = new Date(range.endYear, range.endMonth - 1, range.endDay)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const day = d.getDate()
    const avail = getAvailability(month, year)
    if (avail[day] === 'sold') return true
  }
  return false
}

function getLargestAvailableSegment(range) {
  const start = new Date(range.startYear, range.startMonth - 1, range.startDay)
  const end = new Date(range.endYear, range.endMonth - 1, range.endDay)
  let best = null
  let bestLength = 0
  let segStart = null
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const day = d.getDate()
    const sold = getAvailability(month, year)[day] === 'sold'
    if (sold) {
      if (segStart !== null) {
        const prevDay = new Date(d.getTime() - 24 * 60 * 60 * 1000)
        const length = Math.floor((prevDay - segStart) / (24 * 60 * 60 * 1000)) + 1
        if (length > bestLength) {
          bestLength = length
          best = {
            startMonth: segStart.getMonth() + 1,
            startDay: segStart.getDate(),
            startYear: segStart.getFullYear(),
            endMonth: prevDay.getMonth() + 1,
            endDay: prevDay.getDate(),
            endYear: prevDay.getFullYear()
          }
        }
      }
      segStart = null
    } else if (segStart === null) segStart = new Date(d)
  }
  if (segStart !== null) {
    const length = Math.floor((end - segStart) / (24 * 60 * 60 * 1000)) + 1
    if (length > bestLength) {
      best = {
        startMonth: segStart.getMonth() + 1,
        startDay: segStart.getDate(),
        startYear: segStart.getFullYear(),
        endMonth: end.getMonth() + 1,
        endDay: end.getDate(),
        endYear: end.getFullYear()
      }
    }
  }
  return best
}

function getSoldNightsInRange(range) {
  const sold = []
  const start = new Date(range.startYear, range.startMonth - 1, range.startDay)
  const end = new Date(range.endYear, range.endMonth - 1, range.endDay)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const day = d.getDate()
    if (getAvailability(month, year)[day] === 'sold') {
      sold.push({ month, year, day })
    }
  }
  return sold
}

function getAllAvailableSegments(range) {
  const segments = []
  const start = new Date(range.startYear, range.startMonth - 1, range.startDay)
  const end = new Date(range.endYear, range.endMonth - 1, range.endDay)
  let segStart = null
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const day = d.getDate()
    const sold = getAvailability(month, year)[day] === 'sold'
    if (sold) {
      if (segStart !== null) {
        const prevDay = new Date(d.getTime() - 24 * 60 * 60 * 1000)
        segments.push({
          startMonth: segStart.getMonth() + 1,
          startDay: segStart.getDate(),
          startYear: segStart.getFullYear(),
          endMonth: prevDay.getMonth() + 1,
          endDay: prevDay.getDate(),
          endYear: prevDay.getFullYear()
        })
      }
      segStart = null
    } else if (segStart === null) segStart = new Date(d)
  }
  if (segStart !== null) {
    segments.push({
      startMonth: segStart.getMonth() + 1,
      startDay: segStart.getDate(),
      startYear: segStart.getFullYear(),
      endMonth: end.getMonth() + 1,
      endDay: end.getDate(),
      endYear: end.getFullYear()
    })
  }
  return segments
}

const DREAM_ALTERNATIVE_HOTELS = [
  { name: 'Moana Surfrider', price: '$350', available: true },
  { name: 'Sheraton Waikiki', price: '$315', available: true }
]

const AmendmentsFlowDemoTailwind = forwardRef(function AmendmentsFlowDemoTailwind(
  {
    embedded = false,
    onBackToCaseStudy,
    onClose,
    onFlowComplete,
    onFlowBegin,
    /** When true (spotlight tour open), ⋮ Actions entry points are non-interactive. */
    spotlightTourActive = false,
  },
  ref
) {
  const [activeTab, setActiveTab] = useState('itinerary')
  const [showNewFlow, setShowNewFlow] = useState(false)
  const [newFlowLoadingMessage, setNewFlowLoadingMessage] = useState(null)
  const [newFlowStep, setNewFlowStep] = useState(1)
  const [, setChangeType] = useState('')
  const [newFlowSelectedHotel, setNewFlowSelectedHotel] = useState(null)
  const [newFlowExpandedHotelName, setNewFlowExpandedHotelName] = useState(null)
  const [openKebabId, setOpenKebabId] = useState(null)

  useEffect(() => {
    if (spotlightTourActive) setOpenKebabId(null)
  }, [spotlightTourActive])

  const [showOldFlow, setShowOldFlow] = useState(false)
  const [, setOldFlowStep] = useState(1)
  const [oldFlowSelectedHotel, setOldFlowSelectedHotel] = useState(null)
  // Old flow: modals then separate pages
  const [oldFlowAmendModalOpen, setOldFlowAmendModalOpen] = useState(false)
  const [oldFlowTravellersModalOpen, setOldFlowTravellersModalOpen] = useState(false)
  const [oldFlowSearchModalOpen, setOldFlowSearchModalOpen] = useState(false)
  const [oldFlowPage, setOldFlowPage] = useState(null) // null | 'results' | 'cart' | 'travellers' | 'payment'
  const [oldFlowReason, setOldFlowReason] = useState('')
  const [oldFlowType, setOldFlowType] = useState('')
  const [oldFlowLoadingMessage, setOldFlowLoadingMessage] = useState(null)
  const [oldFlowExpandedHotelName, setOldFlowExpandedHotelName] = useState(null)
  const [successToast, setSuccessToast] = useState(null)

  const [showDreamFlow, setShowDreamFlow] = useState(false)
  const [dreamPrompt, setDreamPrompt] = useState('')
  const [dreamSearching, setDreamSearching] = useState(false)
  const [dreamUserHasFocused, setDreamUserHasFocused] = useState(false)
  const dreamInputRef = useRef(null)
  const dreamFlowOpenedAtRef = useRef(0)
  const dreamInitialSnapshotRef = useRef(null)
  const [dreamViewMode, setDreamViewMode] = useState('rooms') // 'rooms' | 'hotels'
  const getCurrentCalendarState = () => {
    // Fixed demo range (May 17–21) avoids sold nights (1, 8, 16, 22) so "take one day off" can show Confirm
    const month = 5
    const year = 2024
    return {
      month,
      year,
      range: {
        startMonth: month,
        startDay: 17,
        startYear: year,
        endMonth: month,
        endDay: 21,
        endYear: year
      }
    }
  }
  const [dreamCalendarMonth, setDreamCalendarMonth] = useState(() => getCurrentCalendarState().month)
  const [dreamCalendarYear, setDreamCalendarYear] = useState(() => getCurrentCalendarState().year)
  const [dreamDateRange, setDreamDateRange] = useState(() => getCurrentCalendarState().range)
  const [dreamSelectedRoomId, setDreamSelectedRoomId] = useState('standard')
  const [dreamSelectedHotelName, setDreamSelectedHotelName] = useState('Royal Hawaiian Resort')
  const [dreamConfirmed, setDreamConfirmed] = useState(false)
  const [dreamConfirmLoading, setDreamConfirmLoading] = useState(false)
  const [dreamAmendedCard, setDreamAmendedCard] = useState(null) // { hotel, dateRange, room, total, changes, initial } when just confirmed
  const [showAmendedHistory, setShowAmendedHistory] = useState(false)
  const [showAmendedSuccessCheckmark, setShowAmendedSuccessCheckmark] = useState(false)
  const [dreamSearchResultsShown, setDreamSearchResultsShown] = useState(false)
  const [dreamLastUpdatedMsg, setDreamLastUpdatedMsg] = useState('A few seconds ago')
  const [dreamNotifyMe, setDreamNotifyMe] = useState(false)
  const [dreamHoldFor15Min, setDreamHoldFor15Min] = useState(false)
  const [, setDreamSplitStayMode] = useState(false)
  const [dreamSoldOutTab, setDreamSoldOutTab] = useState('ai')

  useEffect(() => {
    if (!showDreamFlow || dreamConfirmed) return
    setDreamLastUpdatedMsg('Just now')
    const interval = setInterval(() => {
      setDreamLastUpdatedMsg((prev) =>
        prev === 'Just now'
          ? 'A few seconds ago'
          : prev === 'A few seconds ago'
            ? 'Updating…'
            : 'Just now'
      )
    }, 3500)
    return () => clearInterval(interval)
  }, [showDreamFlow, dreamConfirmed])

  const startAmendmentFlow = useCallback(() => {
    onFlowBegin?.()
    setOpenKebabId(null)
    setSuccessToast(null)
    setShowNewFlow(false)
    setShowOldFlow(false)
    setShowDreamFlow(false)
    setNewFlowLoadingMessage('Loading…')
    setTimeout(() => {
      setNewFlowLoadingMessage(null)
      setShowNewFlow(true)
    }, LOADING_DURATION)
  }, [onFlowBegin])

  useEffect(() => {
    if (!successToast) return
    const t = setTimeout(() => setSuccessToast(null), 4000)
    return () => clearTimeout(t)
  }, [successToast])

  useEffect(() => {
    if (!showAmendedSuccessCheckmark) return
    const t = setTimeout(() => setShowAmendedSuccessCheckmark(false), 2500)
    return () => clearTimeout(t)
  }, [showAmendedSuccessCheckmark])

  const startOldFlow = useCallback(() => {
    onFlowBegin?.()
    setOpenKebabId(null)
    setSuccessToast(null)
    setShowNewFlow(false)
    setShowDreamFlow(false)
    setShowOldFlow(true)
    setOldFlowStep(1)
    setOldFlowSelectedHotel(null)
    setOldFlowPage(null)
    setOldFlowReason('')
    setOldFlowType('')
    setOldFlowAmendModalOpen(false)
    setOldFlowTravellersModalOpen(false)
    setOldFlowSearchModalOpen(false)
    setOldFlowLoadingMessage('Loading…')
    setTimeout(() => {
      setOldFlowLoadingMessage(null)
      setOldFlowAmendModalOpen(true)
    }, LOADING_DURATION)
  }, [onFlowBegin])

  const startDreamFlow = useCallback(() => {
    onFlowBegin?.()
    setOpenKebabId(null)
    setSuccessToast(null)
    setShowNewFlow(false)
    setShowOldFlow(false)
    dreamFlowOpenedAtRef.current = Date.now()
    setShowDreamFlow(true)
    setDreamPrompt('')
    setDreamSearching(false)
    setDreamSearchResultsShown(false)
    setDreamUserHasFocused(false)
    setDreamViewMode('rooms')
    const current = getCurrentCalendarState()
    setDreamCalendarMonth(current.month)
    setDreamCalendarYear(current.year)
    setDreamDateRange(current.range)
    setDreamSelectedRoomId('standard')
    setDreamSelectedHotelName('Royal Hawaiian Resort')
    setDreamConfirmed(false)
    setDreamNotifyMe(false)
    setDreamHoldFor15Min(false)
    setDreamSplitStayMode(false)
    setDreamSoldOutTab('ai')
    setDreamAmendedCard(null)
    setDreamConfirmLoading(false)
    setShowAmendedHistory(false)
    setShowAmendedSuccessCheckmark(false)
    dreamInitialSnapshotRef.current = {
      dateRange: { ...current.range },
      roomId: 'standard',
      hotelName: 'Royal Hawaiian Resort'
    }
  }, [onFlowBegin])

  const closeOldFlow = () => {
    setShowOldFlow(false)
    setOldFlowStep(1)
    setOldFlowSelectedHotel(null)
    setOldFlowPage(null)
    setOldFlowAmendModalOpen(false)
    setOldFlowTravellersModalOpen(false)
    setOldFlowSearchModalOpen(false)
    setOldFlowLoadingMessage(null)
    setOldFlowExpandedHotelName(null)
  }

  const oldFlowInPages = showOldFlow && oldFlowPage !== null
  const oldFlowModalOpen = oldFlowAmendModalOpen || oldFlowTravellersModalOpen || oldFlowSearchModalOpen
  const LOADING_DURATION = 1200

  const showOldFlowLoadingThen = (message, then) => {
    setOldFlowLoadingMessage(message)
    setTimeout(() => {
      setOldFlowLoadingMessage(null)
      then()
    }, LOADING_DURATION)
  }

  const runOldFlowSearch = () => {
    setOldFlowSearchModalOpen(false)
    setOldFlowLoadingMessage('Searching available hotels…')
    setTimeout(() => {
      setOldFlowLoadingMessage(null)
      setOldFlowPage('results')
      setOldFlowStep(1)
    }, LOADING_DURATION)
  }

  const closeDreamFlow = () => {
    setShowDreamFlow(false)
    setDreamPrompt('')
    setDreamSearching(false)
    setDreamSearchResultsShown(false)
    setDreamUserHasFocused(false)
    setDreamConfirmed(false)
    setDreamConfirmLoading(false)
  }

  useImperativeHandle(
    ref,
    () => ({
      startOldFlow,
      startAmendmentFlow,
      startDreamFlow,
    }),
    [startOldFlow, startAmendmentFlow, startDreamFlow]
  )

  const confirmDreamAndCollapse = () => {
    const hotel = DREAM_HOTELS.find((h) => h.name === dreamSelectedHotelName) || DREAM_HOTELS[0]
    const room = DREAM_ROOM_OPTIONS.find((r) => r.id === dreamSelectedRoomId) || DREAM_ROOM_OPTIONS[0]
    const total = dreamViewMode === 'hotels' ? hotel.total : DREAM_BASE_TOTAL + room.delta
    const init = dreamInitialSnapshotRef.current
    const datesChanged = init && (
      dreamDateRange.startMonth !== init.dateRange.startMonth ||
      dreamDateRange.startDay !== init.dateRange.startDay ||
      dreamDateRange.startYear !== init.dateRange.startYear ||
      dreamDateRange.endMonth !== init.dateRange.endMonth ||
      dreamDateRange.endDay !== init.dateRange.endDay ||
      dreamDateRange.endYear !== init.dateRange.endYear
    )
    const roomChanged = init && dreamSelectedRoomId !== init.roomId
    const hotelChanged = init && dreamSelectedHotelName !== init.hotelName
    const initialRoom = init ? DREAM_ROOM_OPTIONS.find((r) => r.id === init.roomId) : null
    setDreamAmendedCard({
      hotel,
      dateRange: { ...dreamDateRange },
      room,
      total,
      changes: { dates: !!datesChanged, room: !!roomChanged, hotel: !!hotelChanged },
      initial: init ? {
        hotelName: init.hotelName,
        dateRange: { ...init.dateRange },
        roomLabel: initialRoom?.label ?? 'Standard Room'
      } : null
    })
    setShowAmendedSuccessCheckmark(true)
    closeDreamFlow()
    onFlowComplete?.('dream')
  }

  const dreamSearch = () => {
    setDreamSearching(true)
    setDreamSearchResultsShown(false)
    setTimeout(() => {
      setDreamSearchResultsShown(true)
      setDreamSearching(false)
    }, 1500)
  }

  const dreamSelectOption = (option) => {
    setDreamSelectedRoomId(option.roomId)
    setDreamSelectedHotelName(option.hotelName)
    setDreamViewMode(option.hotelName === 'Hilton Hawaiian Village' ? 'rooms' : 'hotels')
  }

  const dreamTypeDemoRef = useRef({ cancelled: false })
  useEffect(() => {
    if (!showDreamFlow || dreamUserHasFocused) return
    dreamTypeDemoRef.current.cancelled = false
    const startTyping = () => {
      if (dreamTypeDemoRef.current.cancelled) return
      dreamInputRef.current?.focus()
      let exampleIndex = 0
      let i = 0
      let phase = 'typing'
      const run = () => {
        if (dreamTypeDemoRef.current.cancelled) return
        const text = DREAM_TYPE_EXAMPLES[exampleIndex]
        if (phase === 'typing') {
          if (i <= text.length) {
            setDreamPrompt(text.slice(0, i))
            i++
            setTimeout(run, 50)
          } else {
            phase = 'pause'
            i = text.length
            setTimeout(run, 1200)
          }
        } else if (phase === 'pause') {
          phase = 'backspace'
          setTimeout(run, 0)
        } else if (phase === 'backspace') {
          if (i > 0) {
            i--
            setDreamPrompt(text.slice(0, i))
            setTimeout(run, 40)
          } else {
            exampleIndex = (exampleIndex + 1) % DREAM_TYPE_EXAMPLES.length
            phase = 'typing'
            i = 0
            setTimeout(run, 600)
          }
        }
      }
      run()
    }
    const t1 = setTimeout(startTyping, 100)
    return () => {
      clearTimeout(t1)
      dreamTypeDemoRef.current.cancelled = true
    }
  }, [showDreamFlow, dreamUserHasFocused])

  const dreamRoom = DREAM_ROOM_OPTIONS.find((r) => r.id === dreamSelectedRoomId) || DREAM_ROOM_OPTIONS[0]
  const dreamHotel = DREAM_HOTELS.find((h) => h.name === dreamSelectedHotelName) || DREAM_HOTELS[0]
  const dreamTotal = dreamViewMode === 'hotels' ? dreamHotel.total : DREAM_BASE_TOTAL + dreamRoom.delta
  const dreamInitial = dreamInitialSnapshotRef.current
  const dreamRangeContainsSoldNight = rangeContainsSoldNight(dreamDateRange)
  const hasDreamMadeChanges = dreamInitial && (
    dreamDateRange.startMonth !== dreamInitial.dateRange.startMonth ||
    dreamDateRange.startDay !== dreamInitial.dateRange.startDay ||
    dreamDateRange.startYear !== dreamInitial.dateRange.startYear ||
    dreamDateRange.endMonth !== dreamInitial.dateRange.endMonth ||
    dreamDateRange.endDay !== dreamInitial.dateRange.endDay ||
    dreamDateRange.endYear !== dreamInitial.dateRange.endYear ||
    dreamSelectedRoomId !== dreamInitial.roomId ||
    dreamSelectedHotelName !== dreamInitial.hotelName
  )

  const closeNewFlow = () => {
      setShowNewFlow(false)
      setNewFlowStep(1)
      setChangeType('')
    setNewFlowSelectedHotel(null)
    setNewFlowExpandedHotelName(null)
  }

  const handleClose = () => {
    if (showNewFlow) {
      closeNewFlow()
    } else if (showOldFlow) {
      closeOldFlow()
    } else if (showDreamFlow) {
      closeDreamFlow()
    } else {
      onClose?.()
      onBackToCaseStudy?.()
    }
  }

  const showingItinerary = !showNewFlow && !oldFlowInPages && !showDreamFlow
  const showCardWithDream = showDreamFlow

  return (
    <div
      className="relative flex min-h-[560px] flex-col rounded-xl border border-slate-200 bg-white shadow-lg"
      role="region"
      aria-label="Amendments demo"
    >
      {successToast && (
        <div
          className="absolute bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg"
          role="status"
          aria-live="polite"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" aria-hidden>✓</span>
          {successToast}
        </div>
      )}
      {!embedded && (
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Streamlining Amendments — Interactive Demo</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToCaseStudy}
              className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to story
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
        </header>
      )}

      <div className="relative h-36 w-full overflow-visible rounded-t-xl bg-slate-200 sm:h-44">
        <div className="absolute inset-0 overflow-hidden rounded-t-xl">
        <img
          src="/images/amendments/hawaii.avif"
          alt=""
          className="h-full w-full scale-x-[-1] object-cover object-[center_92%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/15" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-black/25 to-transparent" aria-hidden />
      </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 pb-3 pt-8">
          <div className="min-w-0 flex-1 text-sm text-white drop-shadow-sm">
            <span className="font-medium">{TRIP_HERO.title}</span>
            <span className="text-white/90">
              {' '}
              · {TRIP_HERO.dateRange} · {TRIP_HERO.travellersLabel}
            </span>
              </div>
          <span className="shrink-0 text-sm font-semibold text-white drop-shadow-sm">
            {TRIP_HERO.packageTotalFormatted}
          </span>
            </div>
          </div>

      {showingItinerary && (
        <>
          <nav className="flex border-b border-slate-200" aria-label="Trip sections">
            {TAB_LABELS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
                aria-current={activeTab === tab ? 'page' : undefined}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex-1 overflow-visible p-4 min-h-[280px]">
            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                {(() => {
                  const card = dreamAmendedCard
                    ? (() => {
                        const datesStr = formatDateRange(dreamAmendedCard.dateRange)
                        const nights = Math.ceil((new Date(dreamAmendedCard.dateRange.endYear, dreamAmendedCard.dateRange.endMonth - 1, dreamAmendedCard.dateRange.endDay) - new Date(dreamAmendedCard.dateRange.startYear, dreamAmendedCard.dateRange.startMonth - 1, dreamAmendedCard.dateRange.startDay)) / (1000 * 60 * 60 * 24))
                        const roomStr = dreamAmendedCard.room.label
                        return {
                          id: 'hotel',
                          title: dreamAmendedCard.hotel.name,
                          datesStr: `${datesStr} · ${nights} nights`,
                          roomStr,
                          price: `$${dreamAmendedCard.total.toLocaleString()}`,
                          highlight: true
                        }
                      })()
                    : TRIP_DEFAULT_ITINERARY_CARD
                  return (
                    <div
                      key={card.id}
                      className="relative rounded-xl border border-slate-200 bg-white p-4 transition-all"
                    >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                            {card.title}
                            {showAmendedSuccessCheckmark && card.highlight && (
                              <span className="inline-flex shrink-0 text-emerald-600" aria-hidden data-testid="amendment-success-checkmark">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                  <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
                            {card.datesStr}
                            {' · '}
                            {card.roomStr}
                            {' · '}
                            <span>{card.price}</span>
                            {card.highlight && dreamAmendedCard && (
                              <span className="relative shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setShowAmendedHistory((prev) => !prev)}
                                  className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                  aria-expanded={showAmendedHistory}
                                  aria-haspopup="true"
                                  aria-label="View changes made"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                  </svg>
                                </button>
                                {showAmendedHistory && (
                                  <>
                                    <div className="fixed inset-0 z-10" aria-hidden onClick={() => setShowAmendedHistory(false)} data-testid="history-popover-overlay" />
                                    <div className="absolute left-0 top-full z-20 mt-1 min-w-[200px] rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg">
                                      <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Changes made</p>
                                      {dreamAmendedCard.changes?.hotel && (
                                        <div className="px-3 py-1 text-xs text-slate-700">
                                          <span className="font-medium">Hotel:</span>{' '}
                                          {dreamAmendedCard.initial?.hotelName} → {dreamAmendedCard.hotel.name}
                      </div>
                                      )}
                                      {dreamAmendedCard.changes?.dates && (
                                        <div className="px-3 py-1 text-xs text-slate-700">
                                          <span className="font-medium">Dates:</span>{' '}
                                          {dreamAmendedCard.initial?.dateRange ? formatDateRange(dreamAmendedCard.initial.dateRange) : '—'} → {formatDateRange(dreamAmendedCard.dateRange)}
                                        </div>
                                      )}
                                      {dreamAmendedCard.changes?.room && (
                                        <div className="px-3 py-1 text-xs text-slate-700">
                                          <span className="font-medium">Room:</span>{' '}
                                          {dreamAmendedCard.initial?.roomLabel} → {dreamAmendedCard.room.label}
                                        </div>
                                      )}
                                      {!dreamAmendedCard.changes?.hotel && !dreamAmendedCard.changes?.dates && !dreamAmendedCard.changes?.room && (
                                        <div className="px-3 py-1 text-xs text-slate-500">No changes recorded</div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={() => setOpenKebabId(openKebabId === card.id ? null : card.id)}
                          disabled={spotlightTourActive}
                          data-amendments-demo-tour="card-actions"
                          className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:pointer-events-none disabled:cursor-not-allowed"
                          aria-label="Actions"
                          aria-expanded={openKebabId === card.id}
                        >
                          <span className="flex h-5 w-5 items-center justify-center text-lg leading-none">⋮</span>
                        </button>
                        {openKebabId === card.id && (
                          <>
                            <div className="fixed inset-0 z-10" aria-hidden onClick={() => setOpenKebabId(null)} />
                            <div className="absolute right-0 top-full z-20 mt-1 w-52 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                              <button
                                type="button"
                                  onClick={startOldFlow}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                              >
                                  <span aria-hidden>🐢</span> Turtle flow
                              </button>
                              <button
                                type="button"
                                  onClick={startAmendmentFlow}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                              >
                                  <span aria-hidden>🐰</span> Rabbit flow
                              </button>
                              <button
                                type="button"
                                onClick={startDreamFlow}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                              >
                                  <span aria-hidden>🚀</span> Dream flow
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  )
                })()}
              </div>
            )}

            {activeTab === 'travellers' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    JH
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Joel Hickey</p>
                    <p className="text-xs text-slate-500">Adult</p>
                  </div>
                </div>
              </div>
            )}

            {['documents', 'payments', 'notes', 'history'].includes(activeTab) && (
              <p className="text-sm text-slate-500">Content for {activeTab} — use itinerary to try the new flow.</p>
            )}
          </div>
        </>
      )}

      {showNewFlow && (
        <div className="flex flex-col p-4">
          <div className="mb-4 flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
            {newFlowSteps.map((step, i) => {
              const stepNum = i + 1
              const active = stepNum === newFlowStep
              const done = stepNum < newFlowStep
              return (
                <div
                  key={step}
                  className={`flex flex-1 items-center justify-center text-center text-sm ${
                    active ? 'font-semibold text-slate-900' : done ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {stepNum}. {step}
                </div>
              )
            })}
          </div>
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-300"
              style={{ width: `${(newFlowStep / newFlowSteps.length) * 100}%` }}
            />
          </div>

          {newFlowStep === 1 && (
            <div className="space-y-6">
            <div className="space-y-4">
                <p className="text-sm font-medium text-slate-800">Search parameters</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                    <input type="text" defaultValue="Honolulu, Hawaii" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Check-in date</label>
                    <input type="text" defaultValue="2024-05-15" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Check-out date</label>
                    <input type="text" defaultValue="2024-05-20" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                  </div>
                </div>
              </div>
              <div className="space-y-3 border-t border-slate-200 pt-4">
                <p className="text-sm font-medium text-slate-800">Travellers</p>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400" />
                    <span className="text-sm text-slate-700">Joel Hickey (Adult)</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                  <button
                    type="button"
                  onClick={() => setNewFlowStep(2)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Continue to Results →
                  </button>
              </div>
            </div>
          )}

          {newFlowStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-800">Found 4 available hotels</p>
              <div className="space-y-2">
                {OLD_FLOW_HOTELS.map((hotel) => {
                  const isExpanded = newFlowExpandedHotelName === hotel.name
                  const minPrice = hotel.rooms[0]?.price ?? ''
                  return (
                    <div key={hotel.name} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setNewFlowExpandedHotelName(isExpanded ? null : hotel.name)}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 grid grid-cols-[1fr_auto_auto] items-center gap-3"
                      >
                        <span className="font-medium text-slate-900 min-w-0 truncate">{hotel.name}</span>
                        <span className="text-slate-500 text-xs text-right w-24">{minPrice ? `from ${minPrice}/night` : ''}</span>
                        <span className="text-slate-400 text-sm leading-none w-5 text-center" aria-hidden>{isExpanded ? '▲' : '▼'}</span>
                      </button>
                      {isExpanded && (
                        <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-3 space-y-2">
                          <p className="text-xs font-medium text-slate-600 mb-2">Available rooms</p>
                          {hotel.rooms.map((room) => (
                            <div key={room.label} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
                              <span className="text-sm text-slate-700">{room.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-900">{room.price}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setNewFlowSelectedHotel({ name: hotel.name, price: room.price })
                                    setNewFlowStep(3)
                                  }}
                                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewFlowStep(1)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {newFlowStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-800">Review & confirm</p>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-900">{newFlowSelectedHotel?.name}</span>
                <span className="text-slate-500"> · {newFlowSelectedHotel?.price}/night · 5 nights</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                <p className="font-medium text-slate-800 mb-2">Payment details</p>
                <p className="text-slate-600">Visa •••• 4242</p>
                <p className="text-slate-500 text-xs mt-1">Joel Hickey · Expires 08/26</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <strong>Ready to confirm.</strong> Your amendment will be applied and you&apos;ll receive updated documents.
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewFlowStep(2)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeNewFlow()
                    setSuccessToast('Amendment confirmed')
                    onFlowComplete?.('rabbit')
                  }}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={handleClose}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              ← Back to itinerary
            </button>
          </div>
        </div>
      )}

      {/* Old flow: loading overlay between steps */}
      {((showOldFlow && oldFlowLoadingMessage) || newFlowLoadingMessage) && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" aria-hidden />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-none flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white px-8 py-6 shadow-xl">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" aria-hidden />
              <p className="text-sm font-medium text-slate-700">{oldFlowLoadingMessage || newFlowLoadingMessage}</p>
            </div>
          </div>
        </>
      )}

      {/* Old flow: modals (Amend → Travellers → Search) then separate pages (Results → Cart → Travellers → Payment) */}
      {showOldFlow && oldFlowModalOpen && !oldFlowLoadingMessage && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            aria-hidden
            onClick={() => {}}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              {oldFlowAmendModalOpen && (
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Amend Hotel</h3>
                    <button
                      type="button"
                      onClick={closeOldFlow}
                      className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 -m-1.5"
                      aria-label="Close"
                    >
                      <span className="text-xl leading-none">×</span>
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Reason for amendment</label>
                      <select
                        value={oldFlowReason}
                        onChange={(e) => setOldFlowReason(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      >
                        <option value="">Select</option>
                        <option value="downgrade">Downgrade</option>
                        <option value="upgrade">Upgrade</option>
                        <option value="date_change">Date Change</option>
                        <option value="cancellation">Cancellation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Type of amendment</label>
                      <select
                        value={oldFlowType}
                        onChange={(e) => setOldFlowType(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      >
                        <option value="">Select</option>
                        <option value="pricing">Pricing Adjustment</option>
                        <option value="room">Room Change</option>
                        <option value="availability">Availability Issue</option>
                      </select>
                    </div>
                    {(oldFlowReason && oldFlowType) && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        <strong>Amendment fee:</strong> $95.00 (includes agency service fee)
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => { setOldFlowAmendModalOpen(false); closeOldFlow(); }}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => showOldFlowLoadingThen('Loading travellers…', () => { setOldFlowAmendModalOpen(false); setOldFlowTravellersModalOpen(true); })}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Continue to Travellers →
                    </button>
                  </div>
                </div>
              )}
              {oldFlowTravellersModalOpen && (
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Travellers</h3>
                    <button
                      type="button"
                      onClick={closeOldFlow}
                      className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 -m-1.5"
                      aria-label="Close"
                    >
                      <span className="text-xl leading-none">×</span>
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400" />
                      <span className="text-sm text-slate-700">Joel Hickey (Adult)</span>
                    </label>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => { setOldFlowTravellersModalOpen(false); setOldFlowAmendModalOpen(true); }}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => showOldFlowLoadingThen('Loading search…', () => { setOldFlowTravellersModalOpen(false); setOldFlowSearchModalOpen(true); })}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Continue to Search →
                    </button>
                  </div>
                </div>
              )}
              {oldFlowSearchModalOpen && (
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Search parameters</h3>
                    <button
                      type="button"
                      onClick={closeOldFlow}
                      className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 -m-1.5"
                      aria-label="Close"
                    >
                      <span className="text-xl leading-none">×</span>
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                      <input type="text" defaultValue="Honolulu, Hawaii" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Check-in date</label>
                      <input type="text" defaultValue="2024-05-15" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Check-out date</label>
                      <input type="text" defaultValue="2024-05-20" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => { setOldFlowSearchModalOpen(false); setOldFlowTravellersModalOpen(true); }}
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={runOldFlowSearch}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Search availability
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {showOldFlow && oldFlowPage !== null && (
        <div className="flex flex-col p-4 relative">
          <div className="mb-4 flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
            {oldFlowSteps.map((step, i) => {
              const stepNum = i + 1
              const currentStepNum = oldFlowPage === 'results' ? 1 : oldFlowPage === 'cart' ? 2 : oldFlowPage === 'travellers' ? 3 : 4
              const active = stepNum === currentStepNum
              const done = stepNum < currentStepNum
              return (
                <div
                  key={step}
                  className={`flex flex-1 items-center justify-center text-center text-sm ${
                    active ? 'font-semibold text-slate-900' : done ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {stepNum}. {step}
                </div>
              )
            })}
          </div>
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-300"
              style={{ width: `${((oldFlowPage === 'results' ? 1 : oldFlowPage === 'cart' ? 2 : oldFlowPage === 'travellers' ? 3 : 4) / 4) * 100}%` }}
            />
          </div>

          <div className="relative min-h-[200px]">
            {oldFlowPage === 'results' && (
            <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-800">Found 4 available hotels</p>
                  <div className="space-y-2">
                    {OLD_FLOW_HOTELS.map((hotel) => {
                      const isExpanded = oldFlowExpandedHotelName === hotel.name
                      const minPrice = hotel.rooms[0]?.price ?? ''
                      return (
                        <div
                        key={hotel.name}
                          className="rounded-lg border border-slate-200 bg-white overflow-hidden"
                        >
                          <button
                        type="button"
                            onClick={() => setOldFlowExpandedHotelName(isExpanded ? null : hotel.name)}
                            className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 grid grid-cols-[1fr_auto_auto] items-center gap-3"
                          >
                            <span className="font-medium text-slate-900 min-w-0 truncate">{hotel.name}</span>
                            <span className="text-slate-500 text-xs text-right w-24">{minPrice ? `from ${minPrice}/night` : ''}</span>
                            <span className="text-slate-400 text-sm leading-none w-5 text-center" aria-hidden>{isExpanded ? '▲' : '▼'}</span>
                          </button>
                          {isExpanded && (
                            <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-3 space-y-2">
                              <p className="text-xs font-medium text-slate-600 mb-2">Available rooms</p>
                              {hotel.rooms.map((room) => (
                                <div
                                  key={room.label}
                                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
                                >
                                  <span className="text-sm text-slate-700">{room.label}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-900">{room.price}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setOldFlowSelectedHotel({ name: hotel.name, price: room.price })
                                        showOldFlowLoadingThen('Adding to cart…', () => { setOldFlowPage('cart'); setOldFlowStep(2); setOldFlowExpandedHotelName(null) })
                                      }}
                                      className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                    >
                                      Add to cart
                      </button>
                                  </div>
                                </div>
                    ))}
                  </div>
              )}
                        </div>
                      )
                    })}
                  </div>
            </div>
          )}

              {oldFlowPage === 'cart' && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-800">Cart</p>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-900">{oldFlowSelectedHotel?.name}</span>
                <span className="text-slate-500"> · {oldFlowSelectedHotel?.price}/night · 5 nights</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                      onClick={() => setOldFlowPage('results')}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                      Back to results
                </button>
                <button
                  type="button"
                      onClick={() => showOldFlowLoadingThen('Loading travellers…', () => { setOldFlowPage('travellers'); setOldFlowStep(3); })}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Continue to travellers
                </button>
              </div>
            </div>
          )}

              {oldFlowPage === 'travellers' && (
            <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-800">Select travellers</p>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <JoelAvatar sizeClass="h-8 w-8" className="ring-1 ring-slate-200/80" alt="" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Joel Hickey</p>
                    <p className="text-xs text-slate-500">Adult</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                      onClick={() => setOldFlowPage('cart')}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                      Back to cart
                </button>
                <button
                  type="button"
                      onClick={() => showOldFlowLoadingThen('Loading payment form…', () => { setOldFlowPage('payment'); setOldFlowStep(4); })}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Continue to payment
                </button>
              </div>
            </div>
          )}

              {oldFlowPage === 'payment' && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-800">Payment</p>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <strong>Ready to pay.</strong> Amendment total will be applied to your saved payment method.
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                      onClick={() => setOldFlowPage('travellers')}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                      Back to travellers
                </button>
                <button
                  type="button"
                      onClick={() => showOldFlowLoadingThen('Processing payment…', () => {
                        closeOldFlow()
                        setSuccessToast('Amendment confirmed')
                        onFlowComplete?.('turtle')
                      })}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Confirm payment
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={closeOldFlow}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              ← Back to itinerary
            </button>
            </div>
          </div>
        </div>
      )}

      {showCardWithDream && (
        <div className="p-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2 pb-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">{dreamHotel.name}</p>
                <p className="text-xs text-slate-500">
                  {dreamDateRange.startMonth === dreamDateRange.endMonth && dreamDateRange.startYear === dreamDateRange.endYear
                    ? `${MONTH_NAMES[dreamDateRange.startMonth - 1]} ${dreamDateRange.startDay}–${dreamDateRange.endDay}, ${dreamDateRange.startYear}`
                    : dreamDateRange.startYear === dreamDateRange.endYear
                      ? `${MONTH_NAMES[dreamDateRange.startMonth - 1]} ${dreamDateRange.startDay} – ${MONTH_NAMES[dreamDateRange.endMonth - 1]} ${dreamDateRange.endDay}, ${dreamDateRange.endYear}`
                      : `${MONTH_NAMES[dreamDateRange.startMonth - 1]} ${dreamDateRange.startDay}, ${dreamDateRange.startYear} – ${MONTH_NAMES[dreamDateRange.endMonth - 1]} ${dreamDateRange.endDay}, ${dreamDateRange.endYear}`}
                  {' · '}
                  {Math.ceil((new Date(dreamDateRange.endYear, dreamDateRange.endMonth - 1, dreamDateRange.endDay) - new Date(dreamDateRange.startYear, dreamDateRange.startMonth - 1, dreamDateRange.startDay)) / (1000 * 60 * 60 * 24))} nights
                  {' · '}
                  {dreamViewMode === 'rooms' ? dreamRoom.label : dreamHotel.name}
                  {' · '}
                  ${dreamTotal.toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDreamFlow}
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                ← Back
              </button>
          </div>

            <div className="space-y-3 pb-4 border-b border-slate-200">
              <div className="flex gap-2">
                <input
                  ref={dreamInputRef}
                  type="text"
                value={dreamPrompt}
                onChange={(e) => setDreamPrompt(e.target.value)}
                  onFocus={(e) => {
                    if (e.nativeEvent?.isTrusted && Date.now() - dreamFlowOpenedAtRef.current > 800) {
                      setDreamUserHasFocused(true)
                      setDreamPrompt('')
                    }
                  }}
                  placeholder={dreamUserHasFocused ? 'e.g. Upgrade to ocean view' : undefined}
                  disabled={dreamSearching}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:opacity-70 disabled:cursor-wait"
                />
                <button
                  type="button"
                  onClick={dreamSearch}
                  disabled={dreamSearching || !dreamPrompt.trim()}
                  title="Search"
                  aria-label="Search"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {dreamSearching ? (
                    <span className="text-sm">⋯</span>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {dreamSearchResultsShown && (
              <div className="pb-4 border-b border-slate-200">
                <p className="mb-2 text-xs font-semibold text-slate-500">Options based on your request</p>
                <div className="space-y-2">
                  {DREAM_SEARCH_OPTIONS.map((opt) => (
                    <button
                      key={`${opt.hotelName}-${opt.roomLabel}`}
                      type="button"
                      onClick={() => dreamSelectOption(opt)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
                        dreamSelectedRoomId === opt.roomId && dreamSelectedHotelName === opt.hotelName
                          ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-medium text-slate-900">{opt.roomLabel} · {opt.hotelName}</span>
                      <span className="text-slate-600 text-xs">{opt.price}/night</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

            {dreamConfirmed ? (
              <div className="border-t border-slate-200 pt-4">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  <strong>Done.</strong> Your booking has been updated.
                </div>
                <button
                  type="button"
                  onClick={closeDreamFlow}
                  className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Back to itinerary
                </button>
              </div>
            ) : (
              <div className="grid gap-4 border-t border-slate-200 pt-4 lg:grid-cols-[1fr_300px]">
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-500">Calendar</p>
              </div>
                    <div className="mb-1.5 flex items-center gap-2">
                <button
                  type="button"
                        onClick={() => {
                          if (dreamCalendarMonth === 1) {
                            setDreamCalendarMonth(12)
                            setDreamCalendarYear((y) => y - 1)
                          } else {
                            setDreamCalendarMonth((m) => m - 1)
                          }
                        }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Previous month"
                      >
                        ‹
                </button>
                      <span className="flex-1 text-center text-xs font-semibold text-slate-700">
                        {MONTH_NAMES[dreamCalendarMonth - 1]} {dreamCalendarYear}
                      </span>
                      <span className="flex-1 text-center text-xs font-semibold text-slate-700">
                        {MONTH_NAMES[(dreamCalendarMonth % 12)]} {dreamCalendarMonth === 12 ? dreamCalendarYear + 1 : dreamCalendarYear}
                      </span>
                <button
                  type="button"
                        onClick={() => {
                          if (dreamCalendarMonth === 12) {
                            setDreamCalendarMonth(1)
                            setDreamCalendarYear((y) => y + 1)
                          } else {
                            setDreamCalendarMonth((m) => m + 1)
                          }
                        }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Next month"
                      >
                        ›
                </button>
              </div>
                    <div className="grid max-w-full grid-cols-2 gap-3 min-w-0">
                      {[
                        [dreamCalendarMonth, dreamCalendarYear],
                        [dreamCalendarMonth === 12 ? 1 : dreamCalendarMonth + 1, dreamCalendarMonth === 12 ? dreamCalendarYear + 1 : dreamCalendarYear]
                      ].map(([m, y]) => (
                        <div key={`${m}-${y}`} className="min-w-0">
                          <div className="grid min-w-0 grid-cols-7 place-items-center justify-items-center gap-1">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                            <span key={d} className="flex h-7 w-7 shrink-0 items-center justify-center text-[10px] font-medium text-slate-400">{d}</span>
                          ))}
                          {getCalendarGrid(m, y).map((day, idx) => {
                            if (day === null) return <span key={`e-${idx}`} className="h-7 w-7 shrink-0" aria-hidden />
                            const dreamAvail = getAvailability(m, y)
                            const avail = dreamAvail[day] || 'high'
                            const isSold = avail === 'sold'
                            const startTs = new Date(dreamDateRange.startYear, dreamDateRange.startMonth - 1, dreamDateRange.startDay).getTime()
                            const endTs = new Date(dreamDateRange.endYear, dreamDateRange.endMonth - 1, dreamDateRange.endDay).getTime()
                            const cellTs = new Date(y, m - 1, day).getTime()
                            const isInRange = cellTs >= startTs && cellTs <= endTs
                            const init = dreamInitialSnapshotRef.current?.dateRange
                            const initialStartTs = init ? new Date(init.startYear, init.startMonth - 1, init.startDay).getTime() : 0
                            const initialEndTs = init ? new Date(init.endYear, init.endMonth - 1, init.endDay).getTime() : 0
                            const isInInitialRange = cellTs >= initialStartTs && cellTs <= initialEndTs
                            const usePurpleForDates = isInRange && init && !isInInitialRange
                            const availBg = (isInRange && !isSold)
                              ? undefined
                              : isSold
                                ? 'bg-slate-100'
                                : avail === 'high'
                                  ? 'bg-emerald-100'
                                  : avail === 'medium'
                                    ? 'bg-amber-100'
                                    : 'bg-amber-50'
                            const availText = (isInRange && !isSold)
                              ? undefined
                              : isSold
                                ? 'text-slate-400'
                                : avail === 'high'
                                  ? 'text-emerald-900'
                                  : 'text-amber-900'
                            const handleDayClick = () => {
                              if (isSold) return
                              setDreamDateRange((prev) => {
                                const prevStartTs = new Date(prev.startYear, prev.startMonth - 1, prev.startDay).getTime()
                                const prevEndTs = new Date(prev.endYear, prev.endMonth - 1, prev.endDay).getTime()
                                if (isInRange) {
                                  const isStart = cellTs === prevStartTs
                                  const isEnd = cellTs === prevEndTs
                                  const oneDay = 24 * 60 * 60 * 1000
                                  if (isStart && isEnd) {
                                    const init = dreamInitialSnapshotRef.current?.dateRange
                                    return init ? { ...init } : prev
                                  }
                                  if (isStart) {
                                    const start = new Date(prevStartTs + oneDay)
                                    return {
                                      startMonth: start.getMonth() + 1,
                                      startDay: start.getDate(),
                                      startYear: start.getFullYear(),
                                      endMonth: prev.endMonth,
                                      endDay: prev.endDay,
                                      endYear: prev.endYear
                                    }
                                  }
                                  if (isEnd) {
                                    const end = new Date(prevEndTs - oneDay)
                                    return {
                                      startMonth: prev.startMonth,
                                      startDay: prev.startDay,
                                      startYear: prev.startYear,
                                      endMonth: end.getMonth() + 1,
                                      endDay: end.getDate(),
                                      endYear: end.getFullYear()
                                    }
                                  }
                                  const beforeCount = (cellTs - prevStartTs) / oneDay
                                  const afterCount = (prevEndTs - cellTs) / oneDay
                                  if (beforeCount >= afterCount) {
                                    const end = new Date(cellTs - oneDay)
                                    return {
                                      startMonth: prev.startMonth,
                                      startDay: prev.startDay,
                                      startYear: prev.startYear,
                                      endMonth: end.getMonth() + 1,
                                      endDay: end.getDate(),
                                      endYear: end.getFullYear()
                                    }
                                  } else {
                                    const start = new Date(cellTs + oneDay)
                                    return {
                                      startMonth: start.getMonth() + 1,
                                      startDay: start.getDate(),
                                      startYear: start.getFullYear(),
                                      endMonth: prev.endMonth,
                                      endDay: prev.endDay,
                                      endYear: prev.endYear
                                    }
                                  }
                                }
                                const newStartTs = Math.min(prevStartTs, cellTs)
                                const newEndTs = Math.max(prevEndTs, cellTs)
                                const start = new Date(newStartTs)
                                const end = new Date(newEndTs)
                                return {
                                  startMonth: start.getMonth() + 1,
                                  startDay: start.getDate(),
                                  startYear: start.getFullYear(),
                                  endMonth: end.getMonth() + 1,
                                  endDay: end.getDate(),
                                  endYear: end.getFullYear()
                                }
                              })
                            }
                            return (
                              <button
                                key={day}
                                type="button"
                                disabled={isSold}
                                onClick={handleDayClick}
                                className={`flex h-7 w-7 shrink-0 flex-col items-center justify-center rounded text-[11px] font-medium transition ${
                                  (isInRange && !isSold) ? (usePurpleForDates ? 'bg-violet-600 text-white' : 'bg-slate-900 text-white') : `${availBg} ${availText} ${isSold ? 'cursor-not-allowed opacity-60' : 'hover:ring-2 hover:ring-slate-400'}`
                                }`}
                              >
                                {day}
                                {isSold && <span className="text-[8px] font-semibold">Full</span>}
                              </button>
                            )
                          })}
            </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-500">
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-slate-900" /> Current</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-violet-500" /> New</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-emerald-200" /> Available</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-amber-200" /> Limited</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-slate-200" /> Sold out</span>
                      </span>
                      <span className="text-slate-600">Last updated: {dreamLastUpdatedMsg}</span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-slate-500">Rooms</p>
                    <div className="space-y-1">
                      {DREAM_ROOM_OPTIONS.map((room) => {
                        const isSelected = dreamSelectedRoomId === room.id
                        const isChangedFromInitial = dreamInitialSnapshotRef.current && room.id !== dreamInitialSnapshotRef.current.roomId
                        const usePurple = isSelected && isChangedFromInitial
                        return (
                          <button
                            key={room.id}
                            type="button"
                            onClick={() => setDreamSelectedRoomId(room.id)}
                            className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                              isSelected
                                ? usePurple
                                  ? 'border-violet-500 bg-violet-50 ring-1 ring-violet-500'
                                  : 'border-slate-900 bg-slate-100 ring-1 ring-slate-900'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span className="font-medium text-slate-900">{room.label}</span>
                            <span className={`shrink-0 text-xs ${isSelected ? (usePurple ? 'text-violet-700 font-medium' : 'text-slate-900 font-medium') : 'text-slate-600'}`}>{room.price}/night</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4 lg:border-t-0 lg:border-l lg:border-slate-200 lg:pt-0 lg:pl-4">
                  <p className="mb-2 text-xs font-semibold text-slate-500">Summary</p>
                  <div className="space-y-1 text-sm">
                    {(() => {
                      const init = dreamInitialSnapshotRef.current
                      const datesChanged = init && (
                        dreamDateRange.startMonth !== init.dateRange.startMonth ||
                        dreamDateRange.startDay !== init.dateRange.startDay ||
                        dreamDateRange.startYear !== init.dateRange.startYear ||
                        dreamDateRange.endMonth !== init.dateRange.endMonth ||
                        dreamDateRange.endDay !== init.dateRange.endDay ||
                        dreamDateRange.endYear !== init.dateRange.endYear
                      )
                      const roomChanged = init && dreamSelectedRoomId !== init.roomId
                      const hotelChanged = init && dreamSelectedHotelName !== init.hotelName
                      const initialRoomLabel = init ? (DREAM_ROOM_OPTIONS.find((r) => r.id === init.roomId)?.label ?? init.roomId) : ''
                      const initialTotal = init ? DREAM_BASE_TOTAL + (DREAM_ROOM_OPTIONS.find((r) => r.id === init.roomId)?.delta ?? 0) : dreamTotal
                      const priceDiff = hasDreamMadeChanges && init ? dreamTotal - initialTotal : 0
                      return (
                        <>
                          <p className="text-slate-700">
                            {datesChanged && init ? (
                              <>
                                <span className="line-through text-slate-400">{formatDateRange(init.dateRange)}</span>
                                {' → '}
                                <span>{formatDateRange(dreamDateRange)}</span>
                              </>
                            ) : (
                              formatDateRange(dreamDateRange)
                            )}
                          </p>
                          <p className="text-slate-700">
                            {dreamViewMode === 'rooms' ? (
                              roomChanged ? (
                                <>
                                  <span className="line-through text-slate-400">{initialRoomLabel}</span>
                                  {' → '}
                                  <span>{dreamRoom.label}</span>
                                </>
                              ) : (
                                dreamRoom.label
                              )
                            ) : hotelChanged ? (
                              <>
                                <span className="line-through text-slate-400">{init?.hotelName ?? ''}</span>
                                {' → '}
                                <span>{dreamHotel.name}</span>
                              </>
                            ) : (
                              dreamHotel.name
                            )}
                          </p>
                          <p className="pt-2 font-semibold text-slate-900">
                            Total: ${dreamTotal.toLocaleString()}
                            {priceDiff !== 0 && (
                              <span className={`ml-2 text-xs font-medium ${priceDiff > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                ({priceDiff > 0 ? '+' : ''}${priceDiff.toLocaleString()})
                              </span>
                            )}
                          </p>
                        </>
                      )
                    })()}
              </div>
                  {hasDreamMadeChanges && dreamRangeContainsSoldNight && (() => {
                    const availableSegment = getLargestAvailableSegment(dreamDateRange)
                    const segments = getAllAvailableSegments(dreamDateRange)
                    const soldNights = getSoldNightsInRange(dreamDateRange)
                    const soldNightLabel = soldNights[0] ? `${MONTH_NAMES[soldNights[0].month - 1]} ${soldNights[0].day}` : 'those nights'
                    const tabs = [
                      { id: 'ai', icon: '✨', label: 'AI' },
                      ...(segments.length > 1 ? [{ id: 'split', icon: '↔', label: 'Split' }] : []),
                      { id: 'waitlist', icon: '🔔', label: 'Hold' }
                    ].filter(Boolean)
                    const activeTab = tabs.some((t) => t.id === dreamSoldOutTab) ? dreamSoldOutTab : tabs[0]?.id ?? 'ai'
                    return (
                      <div className="mt-3 space-y-2">
                        <p className="rounded-lg border-2 border-amber-400 bg-amber-100 px-3 py-2 text-xs font-medium text-amber-900">
                          Sold-out nights in selection. Choose different dates or a different room, or:
                        </p>
                        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                          {tabs.map((tab) => (
                <button
                              key={tab.id}
                  type="button"
                              onClick={() => setDreamSoldOutTab(tab.id)}
                              className={`flex flex-1 flex-col items-center gap-0.5 rounded-md px-2 py-2 text-[10px] font-semibold transition ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-800'}`}
                              title={tab.label}
                >
                              <span className="text-base leading-none">{tab.icon}</span>
                              <span>{tab.label}</span>
                </button>
                          ))}
                        </div>
                        <div className="min-h-[140px] rounded-lg border-2 border-slate-200 bg-white p-3">
                          {activeTab === 'ai' && (
                            <div className="space-y-2">
                              {availableSegment && (
                <button
                  type="button"
                                  onClick={() => setDreamDateRange(availableSegment)}
                                  className="flex w-full items-center justify-between rounded border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-900 hover:bg-slate-50"
                >
                                  <span>Shift to: {formatDateRange(availableSegment)}</span>
                                  <span className="shrink-0 text-slate-600">Use</span>
                </button>
                              )}
                              <p className="text-xs text-slate-800">
                                Night {soldNightLabel} unavailable at {dreamHotel.name}. Stay elsewhere?
                              </p>
                              {DREAM_ALTERNATIVE_HOTELS.map((h) => (
                                <button
                                  key={h.name}
                                  type="button"
                                  onClick={() => { setDreamSelectedHotelName(h.name); setDreamDateRange(availableSegment || dreamDateRange) }}
                                  className="flex w-full items-center justify-between rounded border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-900 hover:bg-slate-50"
                                >
                                  <span>{h.name} · {h.price}/night</span>
                                  <span className="shrink-0 font-semibold text-emerald-700">Available</span>
                                </button>
                              ))}
            </div>
          )}
                          {activeTab === 'split' && segments.length > 1 && (
                            <div className="space-y-2">
                              <p className="text-xs text-slate-800">Book {segments.length} segments:</p>
                              {segments.map((seg, i) => (
                                <div key={i} className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900">
                                  <span>{formatDateRange(seg)}</span>
                                  <span className="text-slate-700">+ ${Math.round(dreamTotal / segments.length).toLocaleString()}</span>
              </div>
                              ))}
              <button
                type="button"
                                onClick={() => { setDreamSplitStayMode(true); setDreamDateRange(segments[0]); setSuccessToast('Split stay selected') }}
                                className="w-full rounded border-2 border-violet-500 bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700"
              >
                                Book as split stay — ${dreamTotal.toLocaleString()}
              </button>
            </div>
          )}
                          {activeTab === 'waitlist' && (
                            <div className="space-y-2">
            <button
              type="button"
                                onClick={() => { setDreamNotifyMe(!dreamNotifyMe); setSuccessToast(dreamNotifyMe ? 'Notification removed' : 'We\'ll notify you when available') }}
                                className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-xs font-medium ${dreamNotifyMe ? 'border-2 border-emerald-500 bg-emerald-100 text-emerald-900' : 'border border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100'}`}
                              >
                                <span>Notify me when night {soldNightLabel} available</span>
                                {dreamNotifyMe && <span className="shrink-0 font-bold text-emerald-700">✓</span>}
                              </button>
                              <button
                                type="button"
                                onClick={() => { setDreamHoldFor15Min(!dreamHoldFor15Min); setSuccessToast(dreamHoldFor15Min ? 'Hold released' : 'Holding for 15 min') }}
                                className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-xs font-medium ${dreamHoldFor15Min ? 'border-2 border-amber-500 bg-amber-100 text-amber-900' : 'border border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100'}`}
                              >
                                <span>Hold 15 min — check with property</span>
                                {dreamHoldFor15Min && <span className="shrink-0 font-bold text-amber-700">✓</span>}
            </button>
          </div>
                          )}
                        </div>
                      </div>
                    )
                  })()}
                  {hasDreamMadeChanges && !dreamRangeContainsSoldNight && (
                    <button
                      type="button"
                      disabled={dreamConfirmLoading}
                      onClick={() => {
                        setDreamConfirmLoading(true)
                        setTimeout(() => {
                          confirmDreamAndCollapse()
                        }, 600)
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {dreamConfirmLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
                          Confirming…
                        </>
                      ) : (
                        'Confirm'
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

export { getAvailability, rangeContainsSoldNight, getLargestAvailableSegment, getSoldNightsInRange, getAllAvailableSegments, formatDateRange }
export default AmendmentsFlowDemoTailwind
