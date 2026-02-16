import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AmendmentsFlowDemoTailwind, {
  getAvailability,
  rangeContainsSoldNight,
  getLargestAvailableSegment,
  getSoldNightsInRange,
  getAllAvailableSegments,
  formatDateRange,
} from './AmendmentsFlowDemoTailwind'

describe('Dream flow – logic', () => {
  describe('getAvailability', () => {
    it('marks days 1, 8, 16, 22 as sold', () => {
      const avail = getAvailability(5, 2024)
      expect(avail[1]).toBe('sold')
      expect(avail[8]).toBe('sold')
      expect(avail[16]).toBe('sold')
      expect(avail[22]).toBe('sold')
    })

    it('marks other days as high, medium, or low', () => {
      const avail = getAvailability(5, 2024)
      expect(avail[17]).toBe('high')
      expect(avail[18]).toBe('medium') // 18 is in medium list
      for (const d of [4, 5, 11, 12, 18, 19, 25, 26]) {
        expect(['high', 'medium']).toContain(avail[d])
      }
    })

    it('marks last day of month as low', () => {
      const avail = getAvailability(5, 2024)
      expect(avail[31]).toBe('low')
    })
  })

  describe('rangeContainsSoldNight', () => {
    it('returns false for range with no sold nights (May 17-21)', () => {
      const range = { startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 21, endYear: 2024 }
      expect(rangeContainsSoldNight(range)).toBe(false)
    })

    it('returns true when range includes day 16 (sold)', () => {
      const range = { startMonth: 5, startDay: 15, startYear: 2024, endMonth: 5, endDay: 20, endYear: 2024 }
      expect(rangeContainsSoldNight(range)).toBe(true)
    })

    it('returns true when range includes day 8 (sold)', () => {
      const range = { startMonth: 5, startDay: 7, startYear: 2024, endMonth: 5, endDay: 10, endYear: 2024 }
      expect(rangeContainsSoldNight(range)).toBe(true)
    })

    it('returns false for single-day range that is available', () => {
      const range = { startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 17, endYear: 2024 }
      expect(rangeContainsSoldNight(range)).toBe(false)
    })

    it('returns true for single-day range that is sold', () => {
      const range = { startMonth: 5, startDay: 16, startYear: 2024, endMonth: 5, endDay: 16, endYear: 2024 }
      expect(rangeContainsSoldNight(range)).toBe(true)
    })

    it('handles cross-month ranges', () => {
      const range = { startMonth: 5, startDay: 30, startYear: 2024, endMonth: 6, endDay: 2, endYear: 2024 }
      // June 1 is sold
      expect(rangeContainsSoldNight(range)).toBe(true)
    })
  })

  describe('getSoldNightsInRange', () => {
    it('returns empty array for range with no sold nights', () => {
      const range = { startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 21, endYear: 2024 }
      expect(getSoldNightsInRange(range)).toEqual([])
    })

    it('returns sold nights in range (May 15-20 includes day 16)', () => {
      const range = { startMonth: 5, startDay: 15, startYear: 2024, endMonth: 5, endDay: 20, endYear: 2024 }
      expect(getSoldNightsInRange(range)).toEqual([{ month: 5, year: 2024, day: 16 }])
    })

    it('returns multiple sold nights when range spans them', () => {
      const range = { startMonth: 5, startDay: 7, startYear: 2024, endMonth: 5, endDay: 25, endYear: 2024 }
      const sold = getSoldNightsInRange(range)
      expect(sold).toContainEqual({ month: 5, year: 2024, day: 8 })
      expect(sold).toContainEqual({ month: 5, year: 2024, day: 16 })
      expect(sold).toContainEqual({ month: 5, year: 2024, day: 22 })
    })
  })

  describe('getLargestAvailableSegment', () => {
    it('returns null for range with only sold nights', () => {
      const range = { startMonth: 5, startDay: 16, startYear: 2024, endMonth: 5, endDay: 16, endYear: 2024 }
      expect(getLargestAvailableSegment(range)).toBe(null)
    })

    it('returns full range when no sold nights', () => {
      const range = { startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 21, endYear: 2024 }
      const seg = getLargestAvailableSegment(range)
      expect(seg).toEqual(range)
    })

    it('returns largest contiguous segment when sold night splits range', () => {
      // May 15-20: 15,16(sold),17,18,19,20 → segments [15] and [17-20], largest is [17-20]
      const range = { startMonth: 5, startDay: 15, startYear: 2024, endMonth: 5, endDay: 20, endYear: 2024 }
      const seg = getLargestAvailableSegment(range)
      expect(seg).toEqual({ startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 20, endYear: 2024 })
    })

    it('returns first segment when it is larger', () => {
      // May 14-23: 14,15 | 16(sold) | 17,18,19,20,21,22(sold) | 23 → [14-15] and [17-21], largest is [17-21]
      const range = { startMonth: 5, startDay: 14, startYear: 2024, endMonth: 5, endDay: 23, endYear: 2024 }
      const seg = getLargestAvailableSegment(range)
      expect(seg.startDay).toBe(17)
      expect(seg.endDay).toBe(21)
    })
  })

  describe('getAllAvailableSegments', () => {
    it('returns single segment when no sold nights', () => {
      const range = { startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 21, endYear: 2024 }
      const segs = getAllAvailableSegments(range)
      expect(segs).toHaveLength(1)
      expect(segs[0]).toEqual(range)
    })

    it('returns multiple segments when sold nights split range', () => {
      // May 15-23: 15 | 16(sold) | 17,18,19,20,21 | 22(sold) | 23
      const range = { startMonth: 5, startDay: 15, startYear: 2024, endMonth: 5, endDay: 23, endYear: 2024 }
      const segs = getAllAvailableSegments(range)
      expect(segs).toHaveLength(3)
      expect(segs[0]).toEqual({ startMonth: 5, startDay: 15, startYear: 2024, endMonth: 5, endDay: 15, endYear: 2024 })
      expect(segs[1]).toEqual({ startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 21, endYear: 2024 })
      expect(segs[2]).toEqual({ startMonth: 5, startDay: 23, startYear: 2024, endMonth: 5, endDay: 23, endYear: 2024 })
    })
  })

  describe('formatDateRange', () => {
    it('formats same-month range', () => {
      const range = { startMonth: 5, startDay: 17, startYear: 2024, endMonth: 5, endDay: 21, endYear: 2024 }
      expect(formatDateRange(range)).toBe('May 17–21, 2024')
    })

    it('formats cross-month range same year', () => {
      const range = { startMonth: 5, startDay: 30, startYear: 2024, endMonth: 6, endDay: 3, endYear: 2024 }
      expect(formatDateRange(range)).toBe('May 30 – Jun 3, 2024')
    })

    it('returns empty string for null/undefined', () => {
      expect(formatDateRange(null)).toBe('')
      expect(formatDateRange(undefined)).toBe('')
    })

    it('formats cross-year range', () => {
      const range = { startMonth: 12, startDay: 28, startYear: 2024, endMonth: 1, endDay: 3, endYear: 2025 }
      expect(formatDateRange(range)).toBe('Dec 28, 2024 – Jan 3, 2025')
    })
  })
})

describe('Dream flow – user flows', () => {
  it('opens dream flow and shows calendar with default May 17-21 range', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/May 17–21, 2024/).length).toBeGreaterThan(0)
    })
  })

  it('shows Confirm when user shrinks range (takes one day off) without sold nights', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Click day 21 (end) in May to shrink to May 17-20
    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0])

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('shows sold-out panel when selection includes sold night', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Expand range to include day 22 (sold) – click day 23
    const day23Btns = within(document.body).getAllByRole('button', { name: '23' })
    await user.click(day23Btns[0])

    await waitFor(() => {
      expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument()
    })
  })

  it('sold days are disabled and cannot be clicked', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getByText(/Calendar/)).toBeInTheDocument())

    const day16Btns = within(document.body).getAllByRole('button', { name: /16/ })
    expect(day16Btns[0]).toBeDisabled()
  })

  it('clicking start-and-end day resets to initial range', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Shrink to single day (click day 21 to shrink end, then day 20, etc. – or shrink start)
    const dayBtns = (n) => within(document.body).getAllByRole('button', { name: String(n) })
    await user.click(dayBtns(21)[0]) // range becomes May 17-20
    await user.click(dayBtns(20)[0]) // range becomes May 17-19
    await user.click(dayBtns(19)[0]) // range becomes May 17-18
    await user.click(dayBtns(18)[0]) // range becomes May 17 only (start=end)
    await user.click(dayBtns(17)[0]) // click start=end → reset to initial May 17-21

    await waitFor(() => {
      expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0)
    })
  })

  it('Confirm collapses flow and shows amended card in itinerary', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0])
    await waitFor(() => expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Confirm/i }))

    await waitFor(() => {
      expect(screen.queryByText(/Calendar/)).not.toBeInTheDocument()
      expect(screen.getByText(/Itinerary/)).toBeInTheDocument()
      expect(screen.getByText(/Royal Hawaiian Resort/)).toBeInTheDocument()
      expect(screen.getByText(/May 17–20.*3 nights/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /View changes made/i })).toBeInTheDocument()
    })
  })

  it('Confirm shows loading spinner and "Confirming…" label', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0])
    await waitFor(() => expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument())

    const confirmBtn = screen.getByRole('button', { name: /Confirm/i })
    fireEvent.click(confirmBtn)

    expect(screen.getByText(/Confirming…/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Confirming/i })).toBeDisabled()
  })

  it('Confirm shows brief success checkmark on amended card', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0])
    await waitFor(() => expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: /Confirm/i }))

    await waitFor(
      () => {
        expect(screen.getByTestId('amendment-success-checkmark')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('History popover opens and shows changes made', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0])
    await waitFor(() => expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: /Confirm/i }))

    await waitFor(() => expect(screen.getByRole('button', { name: /View changes made/i })).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /View changes made/i }))

    await waitFor(() => {
      expect(screen.getByText(/Changes made/)).toBeInTheDocument()
      expect(screen.getByText(/Dates:/)).toBeInTheDocument()
      expect(screen.getByText(/May 17–21.*→.*May 17–20/)).toBeInTheDocument()
    })
  })

  it('History popover closes when clicking outside', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0])
    await waitFor(() => expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: /Confirm/i }))

    await waitFor(() => expect(screen.getByRole('button', { name: /View changes made/i })).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: /View changes made/i }))

    await waitFor(() => expect(screen.getByText(/Changes made/)).toBeInTheDocument())

    await user.click(screen.getByTestId('history-popover-overlay'))

    await waitFor(() => {
      expect(screen.queryByText(/Changes made/)).not.toBeInTheDocument()
    })
  })

  it('Back button closes dream flow', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getByText(/Calendar/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /← Back/i }))

    await waitFor(() => {
      expect(screen.queryByText(/Calendar/)).not.toBeInTheDocument()
      expect(screen.getByText(/Itinerary/)).toBeInTheDocument()
    })
  })

  it('expanding range to include sold night shows sold-out panel', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Expand: click day 14 (before start) → range becomes May 14-21; May 14,15,17-21 available; May 16 sold
    const day14Btns = within(document.body).getAllByRole('button', { name: '14' })
    await user.click(day14Btns[0])

    await waitFor(() => {
      expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument()
    })
  })

  it('Summary shows strikethrough when dates change', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0]) // shrink to May 17-20

    await waitFor(() => {
      expect(screen.getAllByText(/May 17–20/).length).toBeGreaterThan(0)
      expect(screen.getByText(/→/)).toBeInTheDocument()
    })
  })
})

describe('Dream flow – edge cases', () => {
  it('no Confirm when no changes made', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // No date changes – Confirm should not appear
    const confirmBtns = screen.queryAllByRole('button', { name: /^Confirm$/ })
    expect(confirmBtns.length).toBe(0)
  })

  it('AI tab "Use" applies largest available segment', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Expand to include sold night (May 16)
    const day15Btns = within(document.body).getAllByRole('button', { name: '15' })
    await user.click(day15Btns[0]) // range May 15-21 includes day 16 (sold)

    await waitFor(() => expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument())

    // Click "Use" on the shift-to segment – applies May 17–21 (largest available)
    const useBtn = screen.getByRole('button', { name: /Use/i })
    await user.click(useBtn)

    await waitFor(() => {
      expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0)
      // Sold-out panel disappears; Confirm doesn't show (range equals initial)
      expect(screen.queryByText(/Sold-out nights in selection/)).not.toBeInTheDocument()
    })
  })

  it('room change triggers hasDreamMadeChanges', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getByText(/Calendar/)).toBeInTheDocument())

    // Select Deluxe Room (different from initial Standard)
    const deluxeBtn = screen.getByRole('button', { name: /Deluxe Room/i })
    await user.click(deluxeBtn)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('hotel change via AI alternative hotels triggers hasDreamMadeChanges', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Expand to include sold night (May 16) so AI tab with alternative hotels shows
    const day15Btns = within(document.body).getAllByRole('button', { name: '15' })
    await user.click(day15Btns[0])
    await waitFor(() => expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument())

    // Click alternative hotel "Moana Surfrider" Available button
    const availBtns = screen.getAllByRole('button', { name: /Available/i })
    await user.click(availBtns[0])

    await waitFor(() => {
      expect(screen.getByText(/Moana Surfrider/)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('Split tab shows when range has multiple segments', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Expand to May 15-23: segments [15], [17-21], [23]
    const day15Btns = within(document.body).getAllByRole('button', { name: '15' })
    await user.click(day15Btns[0])
    const day23Btns = within(document.body).getAllByRole('button', { name: '23' })
    await user.click(day23Btns[0])

    await waitFor(() => expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument())

    // Split tab should appear (segments.length > 1)
    await user.click(screen.getByRole('button', { name: /Split/i }))

    await waitFor(() => {
      expect(screen.getByText(/Book as split stay/)).toBeInTheDocument()
    })
  })

  it('Hold tab Notify me toggle shows success toast', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day15Btns = within(document.body).getAllByRole('button', { name: '15' })
    await user.click(day15Btns[0])
    await waitFor(() => expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Hold/i }))
    const notifyBtn = screen.getByRole('button', { name: /Notify me when night/ })
    await user.click(notifyBtn)

    await waitFor(() => {
      expect(screen.getByText(/We'll notify you when available/)).toBeInTheDocument()
    })
  })

  it('month navigation does not change date selection', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Click Next month (›) – should only change displayed months, not selection
    const nextBtn = screen.getByRole('button', { name: /Next month/i })
    await user.click(nextBtn)

    await waitFor(() => {
      expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0)
    })
  })

  it('shrinking from start shows Confirm when no sold nights', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day17Btns = within(document.body).getAllByRole('button', { name: '17' })
    await user.click(day17Btns[0]) // shrink start → May 18–21

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('expanding range without sold nights shows Confirm', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Shrink to May 17–19
    const dayBtns = (n) => within(document.body).getAllByRole('button', { name: String(n) })
    await user.click(dayBtns(21)[0])
    await user.click(dayBtns(20)[0])
    // Expand: click day 20 → May 17–20 (no sold)
    await user.click(dayBtns(20)[0])

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('"Book as split stay" applies first segment and shows Confirm', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day15Btns = within(document.body).getAllByRole('button', { name: '15' })
    await user.click(day15Btns[0])
    const day23Btns = within(document.body).getAllByRole('button', { name: '23' })
    await user.click(day23Btns[0])
    await waitFor(() => expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Split/i }))
    await user.click(screen.getByRole('button', { name: /Book as split stay/ }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('Hold 15 min toggle shows success toast', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const day15Btns = within(document.body).getAllByRole('button', { name: '15' })
    await user.click(day15Btns[0])
    await waitFor(() => expect(screen.getByText(/Sold-out nights in selection/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Hold/i }))
    await user.click(screen.getByRole('button', { name: /Hold 15 min/ }))

    await waitFor(() => {
      expect(screen.getByText(/Holding for 15 min/)).toBeInTheDocument()
    })
  })

  it('Previous month button does not change date selection', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    const prevBtn = screen.getByRole('button', { name: /Previous month/i })
    await user.click(prevBtn)

    await waitFor(() => {
      expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0)
    })
  })

  it('room upgrade shows price difference in summary', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getByText(/Calendar/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Deluxe Room/i }))

    await waitFor(() => {
      expect(screen.getByText(/\+?\$180/)).toBeInTheDocument()
    })
  })

  it('Ocean View Suite selection triggers Confirm', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getByText(/Calendar/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Ocean View Suite/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('Search flow: type, Search, choose option updates room/hotel and view mode', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getByText(/Calendar/)).toBeInTheDocument())

    const searchInput = screen.getByRole('textbox')
    await user.clear(searchInput)
    await user.type(searchInput, 'Upgrade to ocean view')
    await user.click(screen.getByRole('button', { name: /Search/i }))

    await waitFor(
      () => expect(screen.getByText(/Options based on your request/)).toBeInTheDocument(),
      { timeout: 3000 }
    )

    await user.click(screen.getByRole('button', { name: /Ocean View Suite · Hilton Hawaiian Village/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/Ocean View Suite/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Hilton Hawaiian Village/).length).toBeGreaterThan(0)
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })
  })

  it('shrinking from middle shrinks to side with fewer days', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Click day 19 (middle): beforeCount=2 (17,18), afterCount=2 (20,21), beforeCount>=afterCount → shrink end to 18
    const day19Btns = within(document.body).getAllByRole('button', { name: '19' })
    await user.click(day19Btns[0])

    await waitFor(() => {
      expect(screen.getAllByText(/May 17–18/).length).toBeGreaterThan(0)
    })
  })

  it('Summary shows strikethrough Standard Room → Deluxe Room when room changes', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getByText(/Calendar/)).toBeInTheDocument())

    await user.click(screen.getByRole('button', { name: /Deluxe Room/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/Standard Room/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Deluxe Room/).length).toBeGreaterThan(0)
      expect(screen.getByText(/→/)).toBeInTheDocument()
    })
  })

  it('close/reopen dream flow resets to initial range', async () => {
    const user = userEvent.setup()
    render(<AmendmentsFlowDemoTailwind />)

    const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))
    await waitFor(() => expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0))

    // Change dates: shrink to May 17-20
    const day21Btns = within(document.body).getAllByRole('button', { name: '21' })
    await user.click(day21Btns[0])
    await waitFor(() => expect(screen.getAllByText(/May 17–20/).length).toBeGreaterThan(0))

    // Close dream flow
    await user.click(screen.getByRole('button', { name: /← Back/i }))
    await waitFor(() => expect(screen.queryByText(/Calendar/)).not.toBeInTheDocument())

    // Reopen dream flow
    const actionsButtons2 = screen.getAllByRole('button', { name: 'Actions' })
    await user.click(actionsButtons2[0])
    await user.click(screen.getByRole('button', { name: /Dream flow/i }))

    // Should show initial range May 17-21 again
    await waitFor(() => {
      expect(screen.getAllByText(/May 17–21/).length).toBeGreaterThan(0)
    })
  })

  describe('Turtle flow (old flow)', () => {
    it('opens Amend modal after loading', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Turtle flow/i }))

      expect(screen.getByText(/Loading…/)).toBeInTheDocument()
      await waitFor(
        () => {
          expect(screen.getByRole('heading', { name: /Amend Hotel/i })).toBeInTheDocument()
          expect(screen.getByText(/Reason for amendment/)).toBeInTheDocument()
          expect(screen.getByText(/Type of amendment/)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('navigates Amend → Travellers → Search modals', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Turtle flow/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Amend Hotel/i })).toBeInTheDocument(), { timeout: 3000 })

      const amendContent = screen.getByRole('heading', { name: /Amend Hotel/i }).parentElement?.parentElement
      const selects = within(amendContent).getAllByRole('combobox')
      await user.selectOptions(selects[0], 'upgrade')
      await user.selectOptions(selects[1], 'room')
      await user.click(screen.getByRole('button', { name: /Continue to Travellers/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Travellers/i })).toBeInTheDocument(), { timeout: 3000 })

      await user.click(screen.getByRole('button', { name: /Continue to Search/i }))
      await waitFor(
        () => {
          expect(screen.getByRole('heading', { name: /Search parameters/i })).toBeInTheDocument()
          expect(screen.getByRole('button', { name: /Search availability/i })).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('Search availability opens Results page', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Turtle flow/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Amend Hotel/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Travellers/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Travellers/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Search/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Search availability/i })).toBeInTheDocument(), { timeout: 3000 })

      await user.click(screen.getByRole('button', { name: /Search availability/i }))
      await waitFor(
        () => {
          expect(screen.getByText(/Found 4 available hotels/)).toBeInTheDocument()
          expect(screen.getByText(/Hilton Hawaiian Village/)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    }, 20000)

    it('Add to cart progresses to Cart page', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Turtle flow/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Amend Hotel/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Travellers/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Travellers/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Search/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Search availability/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Search availability/i }))
      await waitFor(() => expect(screen.getByText(/Found 4 available hotels/)).toBeInTheDocument(), { timeout: 3000 })

      const resultsSection = screen.getByText(/Found 4 available hotels/).closest('div')
      await user.click(within(resultsSection).getByRole('button', { name: /Hilton Hawaiian Village/i }))
      await waitFor(() => expect(within(resultsSection).getAllByRole('button', { name: /Add to cart/i }).length).toBeGreaterThan(0), { timeout: 3000 })
      await user.click(within(resultsSection).getAllByRole('button', { name: /Add to cart/i })[0])
      await waitFor(
        () => {
          expect(screen.getByRole('button', { name: /Continue to travellers/i })).toBeInTheDocument()
          expect(screen.getByRole('button', { name: /Back to results/i })).toBeInTheDocument()
          expect(screen.getByText(/Hilton Hawaiian Village/)).toBeInTheDocument()
        },
        { timeout: 5000 }
      )
    }, 20000)

    it('full Turtle flow: Amend → Search → Results → Cart → Travellers → Payment → Confirm', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Turtle flow/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Amend Hotel/i })).toBeInTheDocument(), { timeout: 3000 })
      const amendContent = screen.getByRole('heading', { name: /Amend Hotel/i }).parentElement?.parentElement
      const selects = within(amendContent).getAllByRole('combobox')
      await user.selectOptions(selects[0], 'upgrade')
      await user.selectOptions(selects[1], 'room')
      await user.click(screen.getByRole('button', { name: /Continue to Travellers/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Travellers/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Search/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Search availability/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Search availability/i }))
      await waitFor(() => expect(screen.getByText(/Found 4 available hotels/)).toBeInTheDocument(), { timeout: 3000 })

      await user.click(screen.getByRole('button', { name: /Hilton Hawaiian Village/i }))
      await waitFor(() => expect(screen.getAllByRole('button', { name: /Add to cart/i }).length).toBeGreaterThan(0), { timeout: 3000 })
      await user.click(screen.getAllByRole('button', { name: /Add to cart/i })[0])
      await waitFor(() => expect(screen.getByRole('button', { name: /Continue to travellers/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to travellers/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Continue to payment/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to payment/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Confirm payment/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Confirm payment/i }))
      await waitFor(
        () => {
          expect(screen.getByText(/Amendment confirmed/)).toBeInTheDocument()
          expect(screen.queryByRole('button', { name: /Confirm payment/i })).not.toBeInTheDocument()
        },
        { timeout: 5000 }
      )
    }, 20000)

    it('Back in Amend modal cancels and closes flow', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Turtle flow/i }))
      await waitFor(() => expect(screen.getByRole('heading', { name: /Amend Hotel/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Cancel/i }))

      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: /Amend Hotel/i })).not.toBeInTheDocument()
        expect(screen.getByText(/Itinerary/)).toBeInTheDocument()
      })
    })
  })

  describe('Rabbit flow (new flow)', () => {
    it('opens Search & Travellers step after loading', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Rabbit flow/i }))

      expect(screen.getByText(/Loading…/)).toBeInTheDocument()
      await waitFor(
        () => {
          expect(screen.getByText(/1\. Search & Travellers/)).toBeInTheDocument()
          expect(screen.getByText(/Search parameters/)).toBeInTheDocument()
          expect(screen.getByRole('button', { name: /Continue to Results/i })).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('Continue to Results shows hotel list', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Rabbit flow/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Continue to Results/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Results/i }))

      await waitFor(
        () => {
          expect(screen.getByText(/2\. Results/)).toBeInTheDocument()
          expect(screen.getByText(/Found 4 available hotels/)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('expand hotel and Select room goes to Review step', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Rabbit flow/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Continue to Results/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Results/i }))

      await waitFor(() => expect(screen.getByText(/Found 4 available hotels/)).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Royal Hawaiian Resort/i }))
      await waitFor(() => expect(screen.getAllByRole('button', { name: /Select/i }).length).toBeGreaterThan(0), { timeout: 3000 })
      await user.click(screen.getAllByRole('button', { name: /Select/i })[0])

      await waitFor(
        () => {
          expect(screen.getByText(/3\. Review/)).toBeInTheDocument()
          expect(screen.getByText(/Review & confirm/)).toBeInTheDocument()
          expect(screen.getByText(/Royal Hawaiian Resort/)).toBeInTheDocument()
          expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('full Rabbit flow: Search & Travellers → Results → Review → Confirm', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Rabbit flow/i }))
      await waitFor(() => expect(screen.getByRole('button', { name: /Continue to Results/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Continue to Results/i }))

      await waitFor(() => expect(screen.getByText(/Found 4 available hotels/)).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Hilton Hawaiian Village/i }))
      await waitFor(() => expect(screen.getAllByRole('button', { name: /Select/i }).length).toBeGreaterThan(0), { timeout: 3000 })
      await user.click(screen.getAllByRole('button', { name: /Select/i })[0])

      await waitFor(() => expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /Confirm/i }))

      await waitFor(
        () => {
          expect(screen.queryByText(/Review & confirm/)).not.toBeInTheDocument()
          expect(screen.getByText(/Amendment confirmed/)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('Back to itinerary closes Rabbit flow', async () => {
      const user = userEvent.setup()
      render(<AmendmentsFlowDemoTailwind />)

      const actionsButtons = screen.getAllByRole('button', { name: 'Actions' })
      await user.click(actionsButtons[0])
      await user.click(screen.getByRole('button', { name: /Rabbit flow/i }))
      await waitFor(() => expect(screen.getByText(/1\. Search & Travellers/)).toBeInTheDocument(), { timeout: 3000 })
      await user.click(screen.getByRole('button', { name: /← Back to itinerary/i }))

      await waitFor(() => {
        expect(screen.queryByText(/Search & Travellers/)).not.toBeInTheDocument()
        expect(screen.getByText(/Itinerary/)).toBeInTheDocument()
      })
    })
  })
})
