import type { Movie } from '../types';

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    return '';
  }
};

export const filterMedia = (movies: Movie[], typeFilter?: string): Movie[] => {
  if (!movies || movies.length === 0) return [];

  let result = movies;

  if (typeFilter && typeFilter !== 'all') {
    result = result.filter((m) => m.type.toLowerCase() === typeFilter.toLowerCase());
  }

  return result;
};

export const sortMedia = (movies: Movie[], sortBy: string): Movie[] => {
  if (!movies || movies.length === 0) return [];

  const result = [...movies];

  result.sort((a, b) => {
    if (sortBy === 'year-desc' || sortBy === 'year-asc') {
      const yearA = parseInt(a.releaseYear) || 0;
      const yearB = parseInt(b.releaseYear) || 0;
      return sortBy === 'year-desc' ? yearB - yearA : yearA - yearB;
    }

    if (sortBy === 'alpha-asc') {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === 'alpha-desc') {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  return result;
};
