import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {
  test('GET public API user post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Check status code
    expect(response.status()).toBe(200);

    // Parse response body
    const body = await response.json();

    // Check required fields
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
  });
});
