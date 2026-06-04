import { test, expect } from '@playwright/test';

test.describe('UI Navigation and Features', () => {
  test.beforeEach(async ({ page }) => {
    
    await page.route(/.*omdbapi\.com.*[?&]s=.*/, async (route) => {
      const json = {
        Response: 'True',
        Search: [
          {
            Title: 'Mock Stalker',
            Year: '1979',
            imdbID: 'tt0079944',
            Type: 'movie',
            Poster: 'N/A',
          },
        ],
      };
      await route.fulfill({ json });
    });

    
    await page.route(/.*omdbapi\.com.*[?&]i=.*/, async (route, request) => {
      const url = new URL(request.url());
      const imdbID = url.searchParams.get('i') || 'tt5180504';
      const json = {
        Response: 'True',
        Title: 'Mock Witcher',
        Year: '2019–',
        imdbID: imdbID,
        Type: 'series',
        Poster: 'N/A',
        Genre: 'Action, Adventure, Drama',
        Director: 'N/A',
        Plot: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
        imdbRating: '8.0',
      };
      await route.fulfill({ json });
    });
  });

  test('Search in Catalog', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Каталог', exact: true }).click();

    await expect(page).toHaveURL(/.*catalog/);

    const searchInput = page.getByPlaceholder(/Пошук OMDb.../i);
    await searchInput.fill('Stalker');

    const movieCard = page.getByRole('heading', { name: 'Mock Stalker' });
    await expect(movieCard).toBeVisible({ timeout: 5000 });
  });

  test('Contacts Form Submission', async ({ page }) => {
    await page.goto('/#/contacts');

    await page.getByLabel(/Ім'я/i).fill('Олексій');
    await page.getByLabel(/Email/i).fill('oleksandr.p.khomenko@gmail.com');
    await page.getByLabel(/Повідомлення/i).fill('Тестове повідомлення для перевірки форми');

    const submitBtn = page.getByRole('button', { name: 'Відправити' });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    const successMsg = page.getByText('Ваше повідомлення успішно відправлено');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  });

  test('LocalStorage Comments Persistence and User Rating', async ({ page }) => {
    await page.goto('/#/register');
    await page.getByLabel('Нікнейм').fill('Коментатор');
    await page.getByLabel('Email').fill('commenter@test.com');
    await page.getByLabel('Пароль').fill('password123');
    await page.getByRole('button', { name: 'Зареєструватися' }).click();
    await expect(page.getByText('Вітаємо, Коментатор!')).toBeVisible();

    await page.goto('/#/movie/tt5180504');
    await expect(page.getByRole('heading', { name: 'Mock Witcher' })).toBeVisible({
      timeout: 5000,
    });

    await expect(page.getByText('IMDb: 8.0')).toBeVisible();

    await page.getByRole('button', { name: 'Оцінити на 5 з 5' }).click();

    await page.getByLabel(/Коментар/i).fill('Дуже крутий серіал, чекаю новий сезон!');
    await page.getByRole('button', { name: 'Залишити коментар' }).click();

    const commentText = page.getByText('Дуже крутий серіал, чекаю новий сезон!');
    await expect(commentText).toBeVisible();
    await expect(page.getByText('Коментатор', { exact: true })).toBeVisible();

    
    await page.reload();

    
    await expect(commentText).toBeVisible();
  });

  test('Blog CRUD (Create and Delete Post)', async ({ page }) => {
    
    await page.goto('/#/register');
    await page.getByLabel('Нікнейм').fill('Блогер');
    await page.getByLabel('Email').fill('blogger@test.com');
    await page.getByLabel('Пароль').fill('password123');
    await page.getByRole('button', { name: 'Зареєструватися' }).click();
    await expect(page.getByText('Вітаємо, Блогер!')).toBeVisible();

    await page.goto('/#/blog');

    
    await expect(page.getByText('Поки що немає постів')).toBeVisible();

    
    await page.getByLabel(/Назва/i).fill('Мій перший тест-пост');
    await page.getByLabel(/Текст/i).fill('Це текстовий контент для нового блог-поста');
    await page.getByRole('button', { name: 'Опублікувати' }).click();

    
    await expect(page.getByRole('heading', { name: 'Мій перший тест-пост' })).toBeVisible();
    await expect(page.getByText('Це текстовий контент для нового блог-поста')).toBeVisible();
    await expect(page.getByText('Блогер', { exact: true })).toBeVisible();

    
    await page.getByRole('button', { name: 'Видалити' }).click();

    
    await expect(page.getByRole('heading', { name: 'Мій перший тест-пост' })).toBeHidden();
    await expect(page.getByText('Поки що немає постів')).toBeVisible();
  });
});
