import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Головна - Веб-додаток для кіноманів',
  '/catalog': 'Каталог - Веб-додаток для кіноманів',
  '/blog': 'Блог - Веб-додаток для кіноманів',
  '/contacts': 'Контакти - Веб-додаток для кіноманів',
};

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Dynamic title logic
    if (location.pathname.startsWith('/movie/')) {
      document.title = 'Деталі фільму - Веб-додаток для кіноманів';
    } else {
      document.title = pageTitles[location.pathname] || 'Веб-додаток для кіноманів';
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="bg-gray-100 dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            🎬 MovieLibrary
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Головна</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Каталог</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Блог</Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Контакти</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Веб-додаток для кіноманів. Усі права захищені.</p>
      </footer>
    </div>
  );
}
