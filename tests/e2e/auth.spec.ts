import { test, expect } from '@playwright/test';

test.describe('Auth and Watchlist Flow', () => {
  test.beforeEach(async ({ page }) => {
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

    await page.getByRole('link', { name: 'Реєстрація' }).click();
    await expect(page).toHaveURL(/.*register/);

    await page.getByLabel('Нікнейм').fill('ТестЮзер');
    await page.getByLabel('Email').fill('testuser@example.com');
    await page.getByLabel('Пароль').fill('password123');
    await page.getByRole('button', { name: 'Зареєструватися' }).click();

    await expect(page.getByText('Вітаємо, ТестЮзер!')).toBeVisible({ timeout: 5000 });

    await page.goto('/#/movie/tt5180504');
    await expect(page.getByRole('heading', { name: 'Mock Witcher' })).toBeVisible();

    await page.getByLabel('Додати до списку:').selectOption('plan_to_watch');

    await page.getByRole('link', { name: 'Мій список' }).click();
    await expect(page).toHaveURL(/.*watchlist/);

    await expect(page.getByRole('heading', { name: 'Мій список перегляду' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mock Witcher' }).first()).toBeVisible();

    await page.getByRole('button', { name: 'Видалити' }).click();
    await expect(page.getByRole('link', { name: 'Mock Witcher' }).first()).toBeHidden();
  });
});
