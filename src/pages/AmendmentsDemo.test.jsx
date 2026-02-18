import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AmendmentsDemo from './AmendmentsDemo'

describe('AmendmentsDemo page', () => {
  it('renders the demo with amendments flow', () => {
    render(
      <MemoryRouter>
        <AmendmentsDemo />
      </MemoryRouter>
    )

    expect(screen.getByRole('region', { name: /Amendments demo/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to story/i })).toBeInTheDocument()
  })

  it('Back to story link navigates to amendments case study', () => {
    render(
      <MemoryRouter>
        <AmendmentsDemo />
      </MemoryRouter>
    )

    const backLink = screen.getByRole('link', { name: /Back to story/i })
    expect(backLink).toHaveAttribute('href', '/stories/amendments')
  })
})
