import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('canvas-confetti', () => ({
  default: Object.assign(vi.fn(), {
    shapeFromText: () => ({}),
    create: () => vi.fn(),
  }),
}))

global.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

global.IntersectionObserver = class IntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  root = null
  rootMargin = ''
  thresholds = []
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

function createCanvas2dMock() {
  return {
    scale: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    fillStyle: '',
    font: '',
    clearRect: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
    putImageData: vi.fn(),
    canvas: { width: 100, height: 100, style: {} },
  }
}

// Mock canvas 2d context (ParticleBackground, BatteryParticleFill, MatrixRain)
HTMLCanvasElement.prototype.getContext = vi.fn(function (contextType) {
  if (contextType === '2d') return createCanvas2dMock()
  return null
})

// Avoid animation loops scheduling unbounded frames in jsdom
global.requestAnimationFrame = vi.fn(() => 0)
global.cancelAnimationFrame = vi.fn()
