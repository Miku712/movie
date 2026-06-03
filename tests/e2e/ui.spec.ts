import { test, expect } from '@playwright/test';

test.describe('UI Navigation and Features', () => {
  test('Search in Catalog', async ({ page }) => {
    // Navigate from Home to Catalog
    await page.goto('/');
    await page.getByRole('link', { name: 'Каталог' }).click();
    
    // Check URL
    await expect(page).toHaveURL(/.*catalog/);
    
    // Type in search
    const searchInput = page.getByPlaceholder(/Шукати фільм/i);
    await searchInput.fill('Сталкер');
    
    // Check if correct movie card is visible
    const movieCard = page.getByRole('heading', { name: 'Сталкер' });
    await expect(movieCard).toBeVisible({ timeout: 5000 });
  });

  test('Contacts Form Submission', async ({ page }) => {
    await page.goto('/#/contacts');
    
    // Fill the form
    await page.getByLabel(/Ім'я/i).fill('Олексій');
    await page.getByLabel(/Email/i).fill('oleksandr.p.khomenko@gmail.com');
    await page.getByLabel(/Повідомлення/i).fill('Тестове повідомлення для перевірки форми');
    
    // Submit
    const submitBtn = page.getByRole('button', { name: 'Відправити' });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();
    
    // Check success message
    const successMsg = page.getByText('Ваше повідомлення успішно відправлено');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  });

  test('LocalStorage Comments Persistence', async ({ page }) => {
    await page.goto('/#/movie/witcher-1');
    
    // Wait for the movie page to render
    await expect(page.getByRole('heading', { name: 'Відьмак' })).toBeVisible({ timeout: 5000 });
    
    // Leave a comment
    await page.getByLabel(/Ваше ім'я/i).fill('Тестувальник Playwright');
    await page.getByLabel(/Коментар/i).fill('Дуже крутий серіал, чекаю новий сезон!');
    await page.getByRole('button', { name: 'Залишити коментар' }).click();
    
    // Check comment exists
    const commentText = page.getByText('Дуже крутий серіал, чекаю новий сезон!');
    await expect(commentText).toBeVisible();
    
    // Reload page
    await page.reload();
    
    // Check comment persists after reload
    await expect(commentText).toBeVisible();
  });
});
