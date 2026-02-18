import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App routing', () => {
  it('renders Home at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getAllByText(/Streamlining Amendments|AI talk for now/i).length).toBeGreaterThan(0)
  })

  it('renders Work at /stories', () => {
    render(
      <MemoryRouter initialEntries={['/stories']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getAllByText(/Streamlining Amendments|Coverage without the extra steps/i).length).toBeGreaterThan(0)
  })

  it('renders Amendments case study at /stories/amendments', () => {
    render(
      <MemoryRouter initialEntries={['/stories/amendments']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1, name: /Streamlining Amendments/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Try interactive demo/i })).toBeInTheDocument()
  })

  it('renders Amendments demo at /stories/amendments/demo', () => {
    render(
      <MemoryRouter initialEntries={['/stories/amendments/demo']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('region', { name: /Amendments demo/i })).toBeInTheDocument()
  })

  it('renders Contact at /contact', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument()
  })

  it('renders About at /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Joel Hickey/i)).toBeInTheDocument()
  })
})
