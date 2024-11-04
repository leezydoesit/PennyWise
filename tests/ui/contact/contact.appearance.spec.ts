import { test, expect } from '@playwright/test'
import { baseUrl } from '@/lib/definitions'

test.setTimeout(60000)

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/contact`)
    await page.waitForLoadState('networkidle')
  })

  test('should display the contact form correctly', async ({ page }) => {
    await expect(page.getByText('Contact Support')).toBeVisible()
    await expect(
      page.getByText(
        'Fill out the form below and we will get back to you as soon as possible.'
      )
    ).toBeVisible()
    await expect(page.getByLabel('First name')).toBeVisible()
    await expect(page.getByLabel('Last name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Message')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Send message' })
    ).toBeVisible()

    // Check for placeholder texts
    await expect(page.getByPlaceholder('Enter your first name')).toBeVisible()
    await expect(page.getByPlaceholder('Enter your last name')).toBeVisible()
    await expect(page.getByPlaceholder('Enter your email')).toBeVisible()
    await expect(page.getByPlaceholder('Enter your message')).toBeVisible()
  })

  test('should show specific validation errors', async ({ page }) => {
    await page.getByLabel('First name').fill('J')
    await page.getByLabel('Last name').fill('D')
    await page.getByLabel('Email').fill('invalid-email')
    await page.getByLabel('Message').fill('Short')
    await page.getByRole('button', { name: 'Send message' }).click()
  })

  test('should not show errors with valid input', async ({ page }) => {
    await page.getByLabel('First name').fill('John')
    await page.getByLabel('Last name').fill('Doe')
    await page.getByLabel('Email').fill('john.doe@example.com')
    await page.getByLabel('Message').fill('This is a valid test message.')

    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(
      page.getByText('First name must be at least 2 characters')
    ).not.toBeVisible()
    await expect(
      page.getByText('Last name must be at least 2 characters')
    ).not.toBeVisible()
    await expect(page.getByText('Invalid email address')).not.toBeVisible()
    await expect(
      page.getByText('Message must be at least 10 characters')
    ).not.toBeVisible()
  })

  test('should show success popup after valid submission and redirect to home page', async ({
    page,
  }) => {
    await page.getByPlaceholder('Enter your first name').click()
    await page.getByPlaceholder('Enter your first name').fill('Test')
    await page.getByPlaceholder('Enter your last name').click()
    await page.getByPlaceholder('Enter your last name').fill('User')
    await page.getByPlaceholder('Enter your email').click()
    await page.getByPlaceholder('Enter your email').fill('testuser@gmail.com')
    await page.getByPlaceholder('Enter your message').click()
    await page
      .getByPlaceholder('Enter your message')
      .fill('Omg your app rocks!')

    await page.getByRole('button', { name: 'Send message' }).click()
  })
})
