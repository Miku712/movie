import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Movie } from '../types';
import { getMovieById } from '../api';
import CommentsSection from '../components/CommentsSection';

const typeLabels: Record<string, string> = {
  movie: 'Фільм',
  series: 'Серіал',
  anime: 'Аніме',
};

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err: any) {
        if (err.message === 'Not found') {
          setError('Фільм не знайдено.');
        } else {
          setError('Сталася помилка при завантаженні.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          {error || 'Фільм не знайдено.'}
        </h2>
        <Link 
          to="/catalog" 
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-5xl mx-auto">
      <Link 
        to="/catalog" 
        className="inline-block mb-6 text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Назад до каталогу
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Обкладинка */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800 aspect-[2/3] relative">
            <img 
              src={movie.coverUrl} 
              alt={`Обкладинка ${movie.title}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/80 text-yellow-400 font-bold px-3 py-1.5 rounded-lg text-lg backdrop-blur-sm shadow-md">
              ★ {movie.rating}
            </div>
          </div>
        </div>

        {/* Інформація */}
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 dark:text-gray-400 text-sm">
            <span className="font-medium text-lg">{movie.releaseYear}</span>
            <span>•</span>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
              {typeLabels[movie.type] || movie.type}
            </span>
            <span>•</span>
            <span>Режисер: <span className="font-medium text-gray-900 dark:text-gray-200">{movie.director}</span></span>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {movie.genre.map((g) => (
              <span 
                key={g} 
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded text-sm"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h3 className="text-xl font-semibold mb-2">Опис</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {movie.description}
            </p>
          </div>
        </div>
      </div>

      {/* Секція коментарів */}
      <CommentsSection movieId={movie.id} />
    </article>
  );
}
