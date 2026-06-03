import { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const pageTitles: Record<string, string> = {
  '/': 'Головна - Веб-Додаток для Кінофанів',
  '/catalog': 'Каталог - Веб-Додаток для Кінофанів',
  '/blog': 'Блог - Веб-Додаток для Кінофанів',
  '/contacts': 'Контакти - Веб-Додаток для Кінофанів',
  '/watchlist': 'Мій список - Веб-Додаток для Кінофанів',
  '/login': 'Вхід - Веб-Додаток для Кінофанів',
  '/register': 'Реєстрація - Веб-Додаток для Кінофанів',
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Dynamic title logic
    if (location.pathname.startsWith('/movie/')) {
      document.title = 'Деталі фільму - Веб-Додаток для Кінофанів';
    } else {
      document.title = pageTitles[location.pathname] || 'Веб-Додаток для Кінофанів';
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="bg-gray-100 dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            🎬 MovieLibrary
          </Link>
          <nav>
            <ul className="flex flex-wrap items-center space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Головна</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Каталог</Link>
              </li>
              {user && (
                <li>
                  <Link to="/watchlist" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Мій список</Link>
                </li>
              )}
              <li>
                <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Блог</Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Контакти</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="font-medium text-gray-700 dark:text-gray-300">Вітаємо, {user.nickname}!</span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                >
                  Вийти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:underline">Вхід</Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Реєстрація</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Веб-Додаток для Кінофанів. Усі права захищені.</p>
      </footer>
    </div>
  );
}
