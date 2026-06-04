import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovieDetails } from '../api';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';

export default function Home() {
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      const ids = ['tt0120737', 'tt5180504', 'tt0079944', 'tt0133093'];
      try {
        const promises = ids.map((id) => getMovieDetails(id));
        const movies = await Promise.all(promises);
        setRecommended(movies);
      } catch (error) {
        console.error('Failed to fetch recommended movies', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div className="space-y-16">
      <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-8 md:p-16 text-center shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Шукай, оцінюй та зберігай улюблені фільми!
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Створіть свій ідеальний список перегляду, залишайте відгуки та читайте думки інших
          кіноманів у нашому блозі.
        </p>
        <Link
          to="/catalog"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Перейти до каталогу
        </Link>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Рекомендовані тайтли</h2>
          <Link to="/catalog" className="text-indigo-400 hover:underline font-medium">
            Дивитись усі &rarr;
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommended.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
