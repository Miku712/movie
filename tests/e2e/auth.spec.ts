import { test, expect } from '@playwright/test';

test.describe('Auth and Watchlist Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock OMDb Movie Details API to not rely on real network
    await page.route(/.*omdbapi\.com.*[?&]i=.*/, async (route) => {
      const json = {
        Response: 'True',
        Title: 'Mock Witcher',
        Year: '2019–',
        imdbID: 'tt5180504',
        Type: 'series',
        Poster: 'https://placehold.co/400x600',
        Genre: 'Action',
        Director: 'N/A',
        Plot: 'Test Plot',
        imdbRating: '8.0',
      };
      await route.fulfill({ json });
    });
  });

  test('Register, Add to Watchlist and Check Watchlist', async ({ page }) => {
    await page.goto('/');

    // 1. Go to register page
    await page.getByRole('link', { name: 'Реєстрація' }).click();
    await expect(page).toHaveURL(/.*register/);

    // 2. Fill form and submit
    await page.getByLabel('Нікнейм').fill('ТестЮзер');
    await page.getByLabel('Email').fill('testuser@example.com');
    await page.getByLabel('Пароль').fill('password123');
    await page.getByRole('button', { name: 'Зареєструватися' }).click();

    // 3. Check we are logged in (header shows nickname)
    await expect(page.getByText('Вітаємо, ТестЮзер!')).toBeVisible({ timeout: 5000 });

    // 4. Go to a movie details page
    await page.goto('/#/movie/tt5180504');
    await expect(page.getByRole('heading', { name: 'Mock Witcher' })).toBeVisible();

    // 5. Add to watchlist
    await page.getByLabel('Додати до списку:').selectOption('plan_to_watch');

    // 6. Go to watchlist page
    await page.getByRole('link', { name: 'Мій список' }).click();
    await expect(page).toHaveURL(/.*watchlist/);

    // 7. Check if movie is there
    await expect(page.getByRole('heading', { name: 'Мій список перегляду' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mock Witcher' }).first()).toBeVisible();

    // 8. Remove from watchlist
    await page.getByRole('button', { name: 'Видалити' }).click();
    await expect(page.getByRole('link', { name: 'Mock Witcher' }).first()).toBeHidden();
  });
});
