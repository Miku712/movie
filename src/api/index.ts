import type { Movie } from '../types';

const API_KEY = 'a29f913e';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === 'True' && data.Search) {
      return data.Search.map((item: Record<string, string>) => ({
        id: item.imdbID,
        title: item.Title,
        type: item.Type,
        releaseYear: item.Year,
        coverUrl:
          item.Poster !== 'N/A'
            ? item.Poster
            : 'https://placehold.co/400x600/1e293b/ffffff?text=No+Poster',
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies', { cause: error });
  }
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
  try {
    const response = await fetch(`${BASE_URL}?i=${encodeURIComponent(id)}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === 'True') {
      return {
        id: data.imdbID,
        title: data.Title,
        type: data.Type,
        releaseYear: data.Year,
        coverUrl:
          data.Poster !== 'N/A'
            ? data.Poster
            : 'https://placehold.co/400x600/1e293b/ffffff?text=No+Poster',
        genre: data.Genre && data.Genre !== 'N/A' ? data.Genre.split(', ') : [],
        director: data.Director !== 'N/A' ? data.Director : 'Невідомо',
        description: data.Plot !== 'N/A' ? data.Plot : 'Опис відсутній',
        rating: data.imdbRating !== 'N/A' ? data.imdbRating : undefined,
      };
    }
    throw new Error('Not found');
  } catch (error: unknown) {
    console.error('Error fetching movie details:', error);
    if (error instanceof Error && error.message === 'Not found') throw error;
    throw new Error('Failed to fetch movie details', { cause: error });
  }
};
// force update
