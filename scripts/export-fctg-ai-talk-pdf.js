/**
 * Export the FCTG AI Talk page as multiple images for Miro.
 * Miro limit: 8192×4096 px per image. This script splits into tiles.
 *
 * Run with: node scripts/export-fctg-ai-talk-pdf.js
 * Prerequisites: Start the dev server first (npm run dev)
 *
 * Output: fctg-ai-talk-1.jpg, fctg-ai-talk-2.jpg, ... — stack vertically in Miro.
 */
import { chromium } from '@playwright/test'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'
const TILE_HEIGHT = 4000 // under Miro's 4096 limit
const VIEWPORT_WIDTH = 1920

async function exportTiles() {
  console.log('Launching browser...')
  const browser = await chromium.launch()

  try {
    const page = await browser.newPage({
      viewport: { width: VIEWPORT_WIDTH, height: TILE_HEIGHT },
      deviceScaleFactor: 1,
    })

    const url = `${BASE_URL}/stories/fctg-ai-talk`
    console.log(`Navigating to ${url}...`)
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    const tileCount = Math.ceil(scrollHeight / TILE_HEIGHT)
    console.log(`Page height: ${scrollHeight}px → ${tileCount} tile(s)`)

    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: TILE_HEIGHT })

    for (let i = 0; i < tileCount; i++) {
      const y = i * TILE_HEIGHT
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
      await page.waitForTimeout(300)

      const path = join(__dirname, '..', `fctg-ai-talk-${i + 1}.jpg`)
      await page.screenshot({
        path,
        type: 'jpeg',
        quality: 85,
      })
      console.log(`Saved ${path}`)
    }
  } finally {
    await browser.close()
  }
}

exportTiles().catch((err) => {
  console.error('Export failed:', err.message)
  console.log('\nMake sure the dev server is running: npm run dev')
  process.exit(1)
})
