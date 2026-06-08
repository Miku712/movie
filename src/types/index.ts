export interface Movie {
  id: string;
  title: string;
  type: string;
  releaseYear: string;
  coverUrl: string;
  genre?: string[];
  director?: string;
  description?: string;
  rating?: string;
}
// force update
