import type { Movie } from '../types';

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    // Якщо дата невалідна (наприклад пустий рядок або "invalid"), Date вертає Invalid Date
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

export const filterMedia = (movies: Movie[], searchTerm: string, genre?: string): Movie[] => {
  if (!movies || movies.length === 0) return [];
  
  let result = movies;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(m => m.title.toLowerCase().includes(term));
  }

  if (genre) {
    result = result.filter(m => m.genre.includes(genre));
  }

  return result;
};
