import { test, expect } from '@playwright/test';
test.describe('Test playwright', () => {
  test('should see text on page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByText('Kia ora')).toBeVisible();
  });
});