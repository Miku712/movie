import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MovieDetails from './pages/MovieDetails';
import Blog from './pages/Blog';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import Watchlist from './pages/Watchlist';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
