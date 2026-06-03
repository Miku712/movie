import { useState, useEffect } from 'react';
import { formatDate } from '../utils/helpers';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const STORAGE_KEY = 'blog_posts';

  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error('Failed to load posts', e);
      }
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Назва та текст поста не можуть бути порожніми');
      return;
    }

    const newPost: BlogPost = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    
    setTitle('');
    setContent('');
    setError('');
  };

  const handleDeletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    savePosts(updatedPosts);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Блог та рецензії</h1>
      
      {/* Форма створення поста */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-bold mb-4">Створити новий пост</h2>
        <form onSubmit={handleCreatePost} className="space-y-4">
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Назва
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Наприклад: Розбір кінцівки фільму Сталкер"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Текст
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Напишіть ваші думки тут..."
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Опублікувати
          </button>
        </form>
      </div>

      {/* Список постів */}
      <div className="space-y-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            Поки що немає постів. Будьте першим, хто напише рецензію!
          </p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {post.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.date)}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-50 dark:bg-red-900/20 rounded transition-colors"
                  aria-label="Видалити пост"
                >
                  Видалити
                </button>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {post.content}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
