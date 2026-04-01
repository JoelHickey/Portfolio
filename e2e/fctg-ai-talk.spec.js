import { test, expect } from '@playwright/test'

test.describe('FCTG AI Talk case study page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stories/fctg-ai-talk')
  })

  test('loads case study hero and metadata', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 1, name: /Built with the tools it teaches/i })
    ).toBeVisible()
    await expect(page.getByText(/Senior Product Designer/i).first()).toBeVisible()
    await expect(page.getByText(/Cursor Agent/i).first()).toBeVisible()
  })

  test('has major sections and presentation link', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^Opportunity$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Strategy$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Design$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Where I had to steer/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Delivery$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Outcome$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Reflection$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^How it was built$/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /How I'm reading results/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Using AI to plan and run the session/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /View the full presentation/i })).toBeVisible()
  })

  test('time-shift chart region is present', async ({ page }) => {
    await expect(page.getByRole('region', { name: /How time shifted/i })).toBeVisible()
  })
})
