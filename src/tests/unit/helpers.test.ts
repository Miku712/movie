import { validateEmail, formatDate, filterMedia, sortMedia } from '../../utils/helpers';
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
      expect(formatted).toMatch(/2026/);
      expect(formatted).toMatch(/червн/i);
    });

    it('should handle invalid date string gracefully', () => {
      expect(formatDate('invalid-date')).toBe('');
      expect(formatDate('')).toBe('');
    });
  });

  describe('filterMedia and sortMedia', () => {
    const mockMovies: Movie[] = [
      {
        id: '1',
        title: 'B Movie',
        type: 'movie',
        releaseYear: '2005',
        coverUrl: 'url1',
      },
      {
        id: '2',
        title: 'A Series',
        type: 'series',
        releaseYear: '2020',
        coverUrl: 'url2',
      },
      {
        id: '3',
        title: 'C Movie',
        type: 'movie',
        releaseYear: '1999',
        coverUrl: 'url3',
      },
    ];

    it('filterMedia should filter by type', () => {
      const result = filterMedia(mockMovies, 'series');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });

    it('filterMedia should return all if filter is all', () => {
      const result = filterMedia(mockMovies, 'all');
      expect(result.length).toBe(3);
    });

    it('sortMedia should sort by year-desc', () => {
      const result = sortMedia(mockMovies, 'year-desc');
      expect(result[0].releaseYear).toBe('2020');
      expect(result[2].releaseYear).toBe('1999');
    });

    it('sortMedia should sort by year-asc', () => {
      const result = sortMedia(mockMovies, 'year-asc');
      expect(result[0].releaseYear).toBe('1999');
      expect(result[2].releaseYear).toBe('2020');
    });

    it('sortMedia should sort by alpha-asc', () => {
      const result = sortMedia(mockMovies, 'alpha-asc');
      expect(result[0].title).toBe('A Series');
      expect(result[1].title).toBe('B Movie');
      expect(result[2].title).toBe('C Movie');
    });
  });
});
// force update
