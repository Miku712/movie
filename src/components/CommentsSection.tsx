import { useState, useEffect } from 'react';
import { formatDate } from '../utils/helpers';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

interface CommentsSectionProps {
  movieId: string;
}

export default function CommentsSection({ movieId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const storageKey = `comments_${movieId}`;

  // Зчитування коментарів з localStorage при монтуванні
  useEffect(() => {
    const storedComments = localStorage.getItem(storageKey);
    if (storedComments) {
      try {
        setComments(JSON.parse(storedComments));
      } catch (e) {
        console.error('Failed to parse comments from localStorage', e);
      }
    }
  }, [storageKey]);

  // Запис коментаря
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedAuthor = author.trim();
    const trimmedText = text.trim();

    if (!trimmedAuthor || !trimmedText) {
      setError('Будь ласка, заповніть усі поля.');
      return;
    }

    const newComment: Comment = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      author: trimmedAuthor,
      text: trimmedText,
      date: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));

    // Очищення форми
    setAuthor('');
    setText('');
    setError('');
  };

  return (
    <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Коментарі</h3>

      {/* Форма додавання коментаря */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ваше ім'я
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введіть ваше ім'я"
          />
        </div>
        
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Коментар
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Напишіть ваш коментар тут..."
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Залишити коментар
        </button>
      </form>

      {/* Список коментарів */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Поки що немає коментарів. Будьте першим!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-900 dark:text-gray-100">{comment.author}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(comment.date)}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
