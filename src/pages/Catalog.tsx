import { useState, useEffect } from 'react';
import type { Movie } from '../types';
import { searchMovies } from '../api';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import { filterMedia, sortMedia } from '../utils/helpers';

export default function Catalog() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState<string>('Star');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await searchMovies(searchTerm || 'Star');
        setMovies(data);
      } catch (err) {
        setError('Не вдалося завантажити каталог фільмів. Спробуйте пізніше.');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let result = filterMedia(movies, typeFilter);
    result = sortMedia(result, sortBy);
    setDisplayedMovies(result);
  }, [movies, typeFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Каталог кіно</h1>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Пошук OMDb..."
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Очистити пошук"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Усі типи</option>
            <option value="movie">Фільми</option>
            <option value="series">Серіали</option>
            <option value="episode">Епізоди</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Сортування</option>
            <option value="year-desc">Спочатку нові</option>
            <option value="year-asc">Спочатку старі</option>
            <option value="alpha-asc">А-Я</option>
            <option value="alpha-desc">Я-А</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : displayedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">За вашим запитом нічого не знайдено.</p>
        </div>
      )}
    </div>
  );
}
