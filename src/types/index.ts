export interface Movie {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'anime';
  genre: string[];
  releaseYear: number;
  director: string;
  description: string;
  rating: number;
  coverUrl: string;
}
