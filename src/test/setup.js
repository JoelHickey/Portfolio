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

// Mock canvas 2d context for MatrixRain
HTMLCanvasElement.prototype.getContext = vi.fn(function (contextType) {
  if (contextType === '2d') {
    return {
      scale: vi.fn(),
      fillRect: vi.fn(),
      fillText: vi.fn(),
      fillStyle: '',
      font: '',
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
      putImageData: vi.fn(),
      canvas: { width: 100, height: 100, style: {} }
    }
  }
  return null
})
