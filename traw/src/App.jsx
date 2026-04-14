import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationPage from './pages/DestinationPage';
import { DishPage, RestaurantPage, DishesPage } from './pages/DishRestaurantPages';
import { ArticlesPage, ArticlePage } from './pages/ArticlePages';
import UserDashboard from './pages/UserDashboard';
import { LoginPage, RegisterPage } from './pages/AuthPages';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/"                      element={<HomePage />} />
          <Route path="/destinations"          element={<DestinationsPage />} />
          <Route path="/destinations/:slug"    element={<DestinationPage />} />
          <Route path="/dishes"                element={<DishesPage />} />
          <Route path="/dishes/:id"            element={<DishPage />} />
          <Route path="/restaurants/:id"       element={<RestaurantPage />} />
          <Route path="/articles"              element={<ArticlesPage />} />
          <Route path="/articles/:slug"        element={<ArticlePage />} />
          <Route path="/dashboard"             element={<UserDashboard />} />
          <Route path="/login"                 element={<LoginPage />} />
          <Route path="/register"              element={<RegisterPage />} />
          <Route path="*"                      element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="empty-state" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="icon">🗺</div>
      <h3>Page Not Found</h3>
      <p>Looks like this destination is off the map.</p>
      <a href="/" className="btn btn-saffron" style={{ marginTop: '24px', display: 'inline-flex' }}>Back to Home →</a>
    </div>
  );
}
