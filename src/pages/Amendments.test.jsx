import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Amendments from './Amendments'

describe('Amendments page', () => {
  it('renders the case study with heading and demo link', () => {
    render(
      <MemoryRouter>
        <Amendments />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1, name: /Fewer steps, more presence/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Try the interactive demo/i })).toBeInTheDocument()
  })

  it('demo link navigates to amendments demo route', () => {
    render(
      <MemoryRouter>
        <Amendments />
      </MemoryRouter>
    )

    const demoLink = screen.getByRole('link', { name: /Try the interactive demo/i })
    expect(demoLink).toHaveAttribute('href', '/stories/amendments/demo')
  })

  it('renders Back to Stories link', () => {
    render(
      <MemoryRouter>
        <Amendments />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /Back to Stories/i })).toBeInTheDocument()
  })
})
