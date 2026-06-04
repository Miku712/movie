import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Movie } from '../types';
import { getMovieDetails } from '../api';
import CommentsSection from '../components/CommentsSection';
import { useAuth } from '../hooks/useAuth';

const typeLabels: Record<string, string> = {
  movie: 'Фільм',
  series: 'Серіал',
  episode: 'Епізод',
};

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);

  const { user } = useAuth();
  const [watchlistStatus, setWatchlistStatus] = useState<string>('');

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieDetails(id);
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

  useEffect(() => {
    if (id) {
      const savedRating = localStorage.getItem(`user_rating_${id}`);
      if (savedRating) {
        setUserRating(parseInt(savedRating, 10));
      }
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (user && id) {
      const stored = localStorage.getItem(`watchlist_${user.id}`);
      if (stored) {
        try {
          const watchlist = JSON.parse(stored);
          const existing = watchlist.find((item: any) => item.movie.id === id);
          if (existing) {
            setWatchlistStatus(existing.status);
          } else {
            setWatchlistStatus('');
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [user, id]);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    if (id) {
      localStorage.setItem(`user_rating_${id}`, rating.toString());
    }
  };

  const handleWatchlistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!user || !movie) return;
    const newStatus = e.target.value;
    setWatchlistStatus(newStatus);

    const stored = localStorage.getItem(`watchlist_${user.id}`);
    let watchlist = stored ? JSON.parse(stored) : [];

    watchlist = watchlist.filter((item: any) => item.movie.id !== movie.id);

    if (newStatus !== '') {
      watchlist.push({
        movie,
        status: newStatus,
        addedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(watchlist));
  };

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
        <div className="w-full md:w-1/3 shrink-0">
          <div className="rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800 aspect-[2/3] relative">
            <img
              src={movie.coverUrl}
              alt={`Обкладинка ${movie.title}`}
              className="w-full h-full object-cover"
            />
            {movie.rating && (
              <div className="absolute top-4 right-4 bg-black/80 text-yellow-400 font-bold px-3 py-1.5 rounded-lg text-lg backdrop-blur-sm shadow-md">
                IMDb: {movie.rating}
              </div>
            )}
          </div>

          {user && (
            <div className="mt-4">
              <label
                htmlFor="watchlist-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Додати до списку:
              </label>
              <select
                id="watchlist-select"
                value={watchlistStatus}
                onChange={handleWatchlistChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Не в списку --</option>
                <option value="plan_to_watch">Планую подивитись</option>
                <option value="watching">Дивлюсь</option>
                <option value="watched">Переглянуто</option>
              </select>
            </div>
          )}

          <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Ваша оцінка:</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-3xl transition-colors ${
                    star <= userRating
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600 hover:text-yellow-200'
                  }`}
                  aria-label={`Оцінити на ${star} з 5`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 dark:text-gray-400 text-sm">
            <span className="font-medium text-lg">{movie.releaseYear}</span>
            <span>•</span>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full font-medium capitalize">
              {typeLabels[movie.type.toLowerCase()] || movie.type}
            </span>
            <span>•</span>
            <span>
              Режисер:{' '}
              <span className="font-medium text-gray-900 dark:text-gray-200">{movie.director}</span>
            </span>
          </div>

          {movie.genre && movie.genre.length > 0 && (
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
          )}

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h3 className="text-xl font-semibold mb-2">Опис</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {movie.description}
            </p>
          </div>
        </div>
      </div>

      <CommentsSection movieId={movie.id} />
    </article>
  );
}
