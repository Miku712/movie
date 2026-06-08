import { Link } from 'react-router-dom';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const typeLabels: Record<string, string> = {
  movie: 'Фільм',
  series: 'Серіал',
  anime: 'Аніме',
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block rounded-lg overflow-hidden bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-700">
        <img
          src={movie.coverUrl}
          alt={`Обкладинка ${movie.title}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {movie.rating && (
          <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 font-bold px-2 py-1 rounded text-sm backdrop-blur-sm">
            ★ {movie.rating}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold line-clamp-2 text-white group-hover:text-gray-200 transition-colors">
            {movie.title}
          </h2>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-300">
          <span className="font-medium">{movie.releaseYear}</span>
          <span className="bg-indigo-800 text-indigo-300 px-2 py-0.5 rounded-full text-xs">
            {typeLabels[movie.type] || movie.type}
          </span>
        </div>
      </div>
    </Link>
  );
}
// force update
