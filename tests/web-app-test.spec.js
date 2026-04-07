const { test, expect } = require('@playwright/test');

test.describe('DilliBites Web App Tests', () => {
  test('Page loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });

  test('Validate HTML structure', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check if main elements exist
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('#momos')).toBeVisible();
    await expect(page.locator('#snacks')).toBeVisible();
    await expect(page.locator('#pizza')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('#payment')).toBeVisible();
    await expect(page.locator('.hero .payment-panel')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Test internal links', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Test nav links
    const links = ['#momos', '#snacks', '#pizza', '#extras', '#contact'];
    for (const link of links) {
      const locator = page.locator(`a[href="${link}"]`).first();
      await expect(locator).toBeVisible();
      await locator.click();
      await expect(page.locator(link)).toBeInViewport();
    }
  });

  test('Test hero buttons', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.hero .payment-panel')).toBeInViewport();

    // Test Explore Menu button
    await page.locator('a[href="#momos"]').first().click();
    await expect(page.locator('#momos')).toBeInViewport();

    // Test Find Us button
    await page.locator('a[href="#contact"]').first().click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('Payment links include hard-coded UPI details', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const paymentApps = [
      { selector: '[data-payment-app="phonepe"]', scheme: 'phonepe://pay' },
      { selector: '[data-payment-app="paytm"]', scheme: 'paytmmp://pay' },
      { selector: '[data-payment-app="googlepay"]', scheme: 'tez://upi/pay' },
    ];

    for (const paymentApp of paymentApps) {
      const locator = page.locator(paymentApp.selector);
      await expect(locator).toBeVisible();

      const href = await locator.getAttribute('href');
      expect(href).toContain('9971648606@ptsbi');
      expect(href).toContain(paymentApp.scheme);
    }
  });

  test('Check images load', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      // Check if image loaded (naturalWidth > 0)
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('Basic performance check', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Expect load time under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('Accessibility check - basic', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check for alt text on images
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for lang attribute
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('en');
  });
});