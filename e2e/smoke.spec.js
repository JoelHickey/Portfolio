import { test, expect } from '@playwright/test';

test.describe('App smoke', () => {
  test('home page loads and shows site content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Joel Hickey');
    await expect(page.getByRole('link', { name: /view case study/i }).first()).toBeVisible();
  });
});
