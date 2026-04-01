/**
 * Renders public/cv.html to public/joel-hickey-cv.pdf (A4, print CSS).
 * Run: npm run export-cv-pdf
 * After editing cv.html, re-run and commit the updated PDF.
 */
import { chromium } from '@playwright/test'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cvHtml = join(__dirname, '..', 'public', 'cv.html')
const outPdf = join(__dirname, '..', 'public', 'joel-hickey-cv.pdf')

async function main() {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    await page.goto(pathToFileURL(cvHtml).href, { waitUntil: 'load' })
    await page.pdf({
      path: outPdf,
      format: 'A4',
      printBackground: true,
      margin: { top: '14mm', right: '14mm', bottom: '14mm', left: '14mm' },
    })
    console.log('Wrote', outPdf)
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
