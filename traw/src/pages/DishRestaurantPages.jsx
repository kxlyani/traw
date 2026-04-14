import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getDish,
  getReviewsByDish,
  getRestaurant,
  getReviewsByRestaurant,
  deleteReview,
  getDishes,
  getBookmarks,
  saveDish,
} from '../services/api';
import { DishCard, RestaurantCard, ReviewCard } from '../components/Cards';
import ReviewForm from '../components/ReviewForm';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';
import './DetailPage.css';
import './ListPage.css';

/* ── DishPage ─────────────────────────────────────────────────────────────── */
export function DishPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [dish, setDish]         = useState(null);
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [dishRes, revRes] = await Promise.all([
          getDish(id),
          getReviewsByDish(id, { limit: 20 }),
        ]);
        setDish(dishRes.data.data);
        setReviews(revRes.data.data.reviews || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (!dish) return <div className="empty-state"><div className="icon">🍽</div><h3>Dish not found</h3></div>;

  const img = dish.image || `https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80`;

  return (
    <main className="detail-page">
      <img src={img} alt={dish.name} className="dish-hero-img" />
      <div className="container detail-body">
        <div className="detail-layout">
          <div className="detail-main">
            <p className="section-label">{dish.city?.name} · {dish.category}</p>
            <h1 className="display-heading" style={{ fontSize: 'clamp(36px,5vw,60px)', marginBottom: 'var(--sp-lg)' }}>{dish.name}</h1>
            <p className="detail-description">{dish.description}</p>

            {dish.originStory && (
              <section className="detail-section" style={{ marginTop: 'var(--sp-xl)' }}>
                <h2 className="section-subheading">Origin Story</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'var(--ink)' }}>{dish.originStory}</p>
              </section>
            )}

            {dish.ingredients?.length > 0 && (
              <section className="detail-section">
                <h2 className="section-subheading">Ingredients</h2>
                <div className="ingredients-list">
                  {dish.ingredients.map((ing, i) => (
                    <span key={i} className="ingredient-tag">{ing}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section className="detail-section">
              <h2 className="section-subheading">Reviews</h2>
              {dish.averageRating > 0 && (
                <div className="avg-rating-display">
                  <span className="big-star">★</span>
                  <span className="big-number">{dish.averageRating.toFixed(1)}</span>
                  <span className="review-count">({reviews.length} reviews)</span>
                </div>
              )}
              {user
                ? <ReviewForm dishId={dish._id} onReviewAdded={r => setReviews(p => [r, ...p])} />
                : <p className="login-prompt"><Link to="/login">Sign in</Link> to review.</p>
              }
              <div className="reviews-list">
                {reviews.map(r => <ReviewCard key={r._id} review={r} currentUserId={user?._id} onDelete={async (id) => { await deleteReview(id); setReviews(p => p.filter(x => x._id !== id)); }} />)}
                {!reviews.length && <p className="no-content">No reviews yet. Be the first!</p>}
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h4>About this dish</h4>
              <div className="fact-row"><span>Category</span><strong>{dish.category}</strong></div>
              {dish.city && <div className="fact-row"><span>Origin City</span><strong>{dish.city.name}</strong></div>}
              {dish.averageRating > 0 && <div className="fact-row"><span>Rating</span><strong>★ {dish.averageRating.toFixed(1)}</strong></div>}
            </div>
            {dish.city && (
              <Link to={`/destinations/${dish.city.slug}`} className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                Explore {dish.city.name} →
              </Link>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ── RestaurantPage ───────────────────────────────────────────────────────── */
export function RestaurantPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews]       = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [rRes, revRes] = await Promise.all([
          getRestaurant(id),
          getReviewsByRestaurant(id, { limit: 20 }),
        ]);
        setRestaurant(rRes.data.data);
        setReviews(revRes.data.data.reviews || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (!restaurant) return <div className="empty-state"><div className="icon">🏪</div><h3>Restaurant not found</h3></div>;

  const img = restaurant.image || `https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80`;

  return (
    <main className="detail-page">
      <img src={img} alt={restaurant.name} className="dish-hero-img" />
      <div className="container detail-body">
        <div className="detail-layout">
          <div className="detail-main">
            <p className="section-label">{restaurant.city?.name} · {restaurant.type}</p>
            <h1 className="display-heading" style={{ fontSize: 'clamp(36px,5vw,60px)', marginBottom: 'var(--sp-lg)' }}>{restaurant.name}</h1>
            <p className="detail-description">{restaurant.description}</p>
            {restaurant.address && (
              <p style={{ marginTop: 'var(--sp-md)', fontSize: '15px', color: 'var(--muted)' }}>📍 {restaurant.address}</p>
            )}

            <section className="detail-section" style={{ marginTop: 'var(--sp-xl)' }}>
              <h2 className="section-subheading">Reviews</h2>
              {restaurant.averageRating > 0 && (
                <div className="avg-rating-display">
                  <span className="big-star">★</span>
                  <span className="big-number">{restaurant.averageRating.toFixed(1)}</span>
                  <span className="review-count">({reviews.length} reviews)</span>
                </div>
              )}
              {user
                ? <ReviewForm restaurantId={restaurant._id} onReviewAdded={r => setReviews(p => [r, ...p])} />
                : <p className="login-prompt"><Link to="/login">Sign in</Link> to review.</p>
              }
              <div className="reviews-list">
                {reviews.map(r => <ReviewCard key={r._id} review={r} currentUserId={user?._id} onDelete={async (id) => { await deleteReview(id); setReviews(p => p.filter(x => x._id !== id)); }} />)}
                {!reviews.length && <p className="no-content">No reviews yet.</p>}
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h4>Details</h4>
              <div className="fact-row"><span>Type</span><strong>{restaurant.type}</strong></div>
              {restaurant.city && <div className="fact-row"><span>City</span><strong>{restaurant.city.name}</strong></div>}
              {restaurant.averageRating > 0 && <div className="fact-row"><span>Rating</span><strong>★ {restaurant.averageRating.toFixed(1)}</strong></div>}
            </div>
            {restaurant.city && (
              <Link to={`/destinations/${restaurant.city.slug}`} className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--sp-sm)' }}>
                Explore {restaurant.city.name} →
              </Link>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ── DishesPage (list) ────────────────────────────────────────────────────── */
export function DishesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dishes, setDishes]       = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading]     = useState(true);
  const [category, setCategory]   = useState('');
  const [bookmarks, setBookmarks] = useState({ dishIds: [] });

  const normalizeId = (item) => typeof item === 'string' ? item : item?._id || item;

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getDishes({ page, limit: 9, category });
      const { dishes: data, pagination: pg } = res.data.data;
      setDishes(data);
      setPagination({ page: pg.page, totalPages: pg.totalPages });
    } catch { setDishes([]); }
    finally { setLoading(false); }
  };

  const fetchBookmarks = async () => {
    if (!user) {
      setBookmarks({ dishIds: [] });
      return;
    }
    try {
      const res = await getBookmarks();
      setBookmarks(res.data.data);
    } catch {
      setBookmarks({ dishIds: [] });
    }
  };

  const savedDishIds = new Set((bookmarks.dishIds || []).map(normalizeId).filter(Boolean));

  const handleSaveDish = async (id) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await saveDish(id);
      setBookmarks(prev => ({
        ...prev,
        dishIds: Array.from(new Set([...(prev.dishIds || []).map(normalizeId), id])),
      }));
    } catch (err) {
      console.error('Save dish failed', err);
    }
  };

  useEffect(() => { fetchData(1); }, [category]);
  useEffect(() => { fetchBookmarks(); }, [user]);

  const categories = ['', 'street food', 'dessert', 'traditional', 'beverage', 'snack', 'main course'];

  return (
    <main className="list-page">
      <div className="list-page-hero ink-bg">
        <div className="container">
          <p className="section-label">Discover</p>
          <h1 className="display-heading page-hero-heading">Iconic <em>Dishes</em></h1>
          <p>500+ dishes from around the world, with their stories.</p>
        </div>
      </div>
      <div className="container">
        <div className="filter-bar">
          <select className="filter-input" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
          </select>
        </div>
        {loading
          ? <div className="grid-skeleton">{[...Array(9)].map((_, i) => <div key={i} className="skeleton-card"></div>)}</div>
          : dishes.length === 0
            ? <div className="empty-state"><div className="icon">🍜</div><h3>No dishes found</h3></div>
            : <>
                <div className="items-grid">
              {dishes.map(d => (
                <DishCard
                  key={d._id}
                  dish={d}
                  onSave={handleSaveDish}
                  saved={savedDishIds.has(d._id)}
                />
              ))}
            </div>
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={fetchData} />
              </>
        }
      </div>
    </main>
  );
}
