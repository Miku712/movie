import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { Movie } from '../types';

interface WatchlistItem {
  movie: Movie;
  status: 'plan_to_watch' | 'watching' | 'watched';
  addedAt: string;
}

export default function Watchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [activeTab, setActiveTab] = useState<'plan_to_watch' | 'watching' | 'watched'>(
    'plan_to_watch'
  );

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`watchlist_${user.id}`);
      if (stored) {
        try {
          setWatchlist(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse watchlist', e);
        }
      }
    }
  }, [user]);

  const removeFromWatchlist = (movieId: string) => {
    if (!user) return;
    const updated = watchlist.filter((item) => item.movie.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updated));
  };

  const filteredList = watchlist.filter((item) => item.status === activeTab);

  const tabs = [
    { id: 'plan_to_watch', label: 'Планую подивитись' },
    { id: 'watching', label: 'Дивлюсь' },
    { id: 'watched', label: 'Переглянуто' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Мій список перегляду</h1>

      <div className="flex space-x-2 border-b border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredList.length === 0 ? (
        <div className="text-center py-12 text-gray-300">
          <p className="text-lg">Список порожній.</p>
          <Link to="/catalog" className="inline-block mt-4 text-indigo-400 hover:underline">
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredList.map(({ movie }) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden flex flex-col"
            >
              <Link
                to={`/movie/${movie.id}`}
                className="aspect-[2/3] block overflow-hidden relative"
              >
                <img
                  src={movie.coverUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </Link>
              <div className="p-4 flex flex-col flex-grow">
                <Link
                  to={`/movie/${movie.id}`}
                  className="font-bold text-lg leading-tight mb-2 hover:text-gray-200 line-clamp-2 text-white"
                >
                  {movie.title}
                </Link>
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-400">{movie.releaseYear}</span>
                  <button
                    onClick={() => removeFromWatchlist(movie.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-medium"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// force update
