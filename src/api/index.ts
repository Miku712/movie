import type { Movie } from '../types';
import { movies } from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay between 800ms and 1200ms
const getRandomDelay = () => Math.floor(Math.random() * 400) + 800;

export const getMovies = async (): Promise<Movie[]> => {
  await delay(getRandomDelay());
  return movies;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  await delay(getRandomDelay());
  const movie = movies.find(m => m.id === id);
  if (!movie) {
    throw new Error('Not found');
  }
  return movie;
};

export const getMoviesByFilter = async (searchTerm: string, type?: string): Promise<Movie[]> => {
  await delay(getRandomDelay());
  let filtered = movies;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(m => m.title.toLowerCase().includes(term));
  }

  if (type) {
    filtered = filtered.filter(m => m.type === type);
  }

  return filtered;
};
