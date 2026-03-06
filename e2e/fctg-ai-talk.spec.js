import { test, expect } from '@playwright/test';

test.describe('FCTG AI Talk slides', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stories/fctg-ai-talk');
  });

  test('loads and shows title slide', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Invigoration, innovation and impact/i })).toBeVisible();
  });

  test('navigates forward through slides', async ({ page }) => {
    // First slide
    await expect(page.getByText(/Invigoration, innovation and impact/i)).toBeVisible();

    // Go to next slide
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('heading', { name: /Looking back to look ahead/i })).toBeVisible();

    // Go to next slide
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('heading', { name: /The fundamentals of design hold strong/i })).toBeVisible();
  });

  test('navigates back through slides', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('heading', { name: /The fundamentals of design hold strong/i })).toBeVisible();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('heading', { name: /Looking back to look ahead/i })).toBeVisible();
  });

  test('shows Prompt clarity slide content', async ({ page }) => {
    // Navigate to slide 16 (Prompt clarity) - 0-indexed, so 15 presses
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await expect(page.getByRole('heading', { name: /Prompt clarity/i })).toBeVisible();
    await expect(page.getByText(/Be specific so the agent delivers/i)).toBeVisible();
  });

  test('shows Iteration slide with flow', async ({ page }) => {
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await expect(page.getByRole('heading', { name: /Iteration/i })).toBeVisible();
    await expect(page.getByText(/Prompt/)).toBeVisible();
    await expect(page.getByText(/Review/)).toBeVisible();
    await expect(page.getByText(/Refine/)).toBeVisible();
  });
});
