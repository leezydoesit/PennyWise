import { test, expect } from '@playwright/test'
import { baseUrl } from '@/lib/definitions'

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl + '/about')
  })

  test('test header visibility & appearance', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome to PennyWise')
    await expect(page.locator('body')).toContainText('Our Services')
    await expect(page.locator('body')).toContainText('Our Story')
    await expect(page.locator('body')).toContainText('Our Commitment')
    await expect(page.locator('body')).toContainText('Contact Us')
  })

  test('test content visibility & appearance', async ({ page }) => {
    await expect(page.getByText("At PennyWise, we're on a")).toBeVisible()
    await expect(page.getByText('Discover an AI Powered Tool')).toBeVisible()
    await page.getByText('PennyWise was born from a').click()
    await expect(page.getByText('Innovation')).toBeVisible()
    await page.getByText('Integrity').click()
    await expect(page.getByText('Excellence')).toBeVisible()
    await expect(page.getByText('Empowerment')).toBeVisible()
    await expect(page.getByText('Ready to embark on your')).toBeVisible()
  })

  test('test links visibility & appearance', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'info@pennywise.com' })
    ).toBeVisible()
    await expect(page.locator('body')).toContainText('info@pennywise.com')
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible()
  })
})
