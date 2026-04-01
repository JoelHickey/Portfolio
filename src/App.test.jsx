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

    expect(screen.getAllByText(/Amendments|Invigoration/i).length).toBeGreaterThan(0)
  })

  it('renders Work at /stories', async () => {
    render(
      <MemoryRouter initialEntries={['/stories']}>
        <App />
      </MemoryRouter>
    )

    expect((await screen.findAllByText(/Amendments|Insurance/i)).length).toBeGreaterThan(0)
  })

  it('renders Amendments case study at /stories/amendments', async () => {
    render(
      <MemoryRouter initialEntries={['/stories/amendments']}>
        <App />
      </MemoryRouter>
    )

    expect(
      await screen.findByRole('heading', { level: 1, name: /Fewer steps, more presence/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Try the interactive demo/i })).toBeInTheDocument()
  })

  it('renders Amendments demo at /stories/amendments/demo', async () => {
    render(
      <MemoryRouter initialEntries={['/stories/amendments/demo']}>
        <App />
      </MemoryRouter>
    )

    expect(await screen.findByRole('region', { name: /Amendments demo/i })).toBeInTheDocument()
  })

  it('renders Contact at /contact', async () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: /Contact/i })).toBeInTheDocument()
  })

  it('renders About at /about', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    )

    expect(await screen.findByText(/Joel Hickey/i)).toBeInTheDocument()
  })
})
