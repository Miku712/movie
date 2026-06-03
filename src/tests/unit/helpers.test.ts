import { validateEmail, formatDate, filterMedia } from '../../utils/helpers';
import type { Movie } from '../../types';

describe('Helpers', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('test@email.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('test@.com')).toBe(false);
      expect(validateEmail('plainaddress')).toBe(false);
      expect(validateEmail('@missinguser.com')).toBe(false);
      expect(validateEmail('spaces in@email.com')).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string correctly', () => {
      const dateString = '2026-06-03T15:30:00.000Z';
      const formatted = formatDate(dateString);
      // Примітка: точний результат може залежати від часового поясу середовища тестування.
      // Але він точно повинен містити "червн" (або "червня") та "2026"
      expect(formatted).toMatch(/2026/);
      expect(formatted).toMatch(/червн/i);
    });

    it('should handle invalid date string gracefully', () => {
      expect(formatDate('invalid-date')).toBe('');
      expect(formatDate('')).toBe('');
    });
  });

  describe('filterMedia', () => {
    const mockMovies: Movie[] = [
      {
        id: '1',
        title: 'Володар перснів',
        type: 'movie',
        genre: ['Фентезі', 'Пригоди'],
        releaseYear: 2001,
        director: 'Пітер Джексон',
        description: 'Опис',
        rating: 9,
        coverUrl: 'url1',
      },
      {
        id: '2',
        title: 'Зошит смерті',
        type: 'anime',
        genre: ['Сай-фай', 'Трилер'],
        releaseYear: 2006,
        director: 'Тецуро Аракі',
        description: 'Опис 2',
        rating: 8.9,
        coverUrl: 'url2',
      },
    ];

    it('should return empty array if input array is empty', () => {
      expect(filterMedia([], 'test')).toEqual([]);
    });

    it('should filter by title case-insensitive', () => {
      const result = filterMedia(mockMovies, 'вОлОДар');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter by genre', () => {
      const result = filterMedia(mockMovies, '', 'Трилер');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });

    it('should filter by both title and genre', () => {
      const result = filterMedia(mockMovies, 'зошит', 'Трилер');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });

    it('should return empty array if no match is found', () => {
      const result = filterMedia(mockMovies, 'Матриця');
      expect(result.length).toBe(0);
    });
  });
});
