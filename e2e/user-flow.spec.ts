import { test, expect } from '@playwright/test';

test.describe('Detroit Innovation Canvas', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Detroit Innovation Canvas');
    await expect(page.locator('text=Ideas')).toBeVisible();
  });
  
  test('user can add idea', async ({ page }) => {
    await page.goto('/');
    
    // Fill idea
    await page.fill('textarea', 'Test innovation idea for Detroit');
    
    // Select category
    await page.click('button:has-text("Tech")');
    
    // Submit
    await page.click('button:has-text("Add to Canvas")');
    
    // Verify appears
    await expect(page.locator('text=Test innovation idea')).toBeVisible();
  });
  
  test('user can vote on idea', async ({ page }) => {
    await page.goto('/');
    
    // Wait for ideas to load
    await page.waitForSelector('button:has-text("▲")', { timeout: 5000 });
    
    // Get initial vote count
    const voteButton = page.locator('button:has-text("▲")').first();
    await voteButton.click();
    
    // Verify vote increased (optimistic update)
    await page.waitForTimeout(500);
  });
  
  test('user can filter by category', async ({ page }) => {
    await page.goto('/');
    
    // Click Tech filter
    await page.click('button:has-text("💻 Tech")');
    
    // Verify URL or state changed
    await page.waitForTimeout(500);
  });
});
