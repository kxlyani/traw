import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getDestination,
  getDishesByCity,
  getRestaurantsByCity,
  getArticles,
  getReviewsByDestination,
  deleteReview,
  getBookmarks,
  saveDish,
  saveRestaurant,
} from '../services/api';
import { DishCard, RestaurantCard, ArticleCard, ReviewCard } from '../components/Cards';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../context/AuthContext';
import './DetailPage.css';

export default function DestinationPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dest, setDest]             = useState(null);
  const [dishes, setDishes]         = useState([]);
  const [restaurants, setRests]     = useState([]);
  const [articles, setArticles]     = useState([]);
  const [reviews, setReviews]       = useState([]);
  const [bookmarks, setBookmarks]   = useState({ dishIds: [], restaurantIds: [] });
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState('dishes');

  const normalizeId = (item) => typeof item === 'string' ? item : item?._id || item;
  const savedDishIds = new Set((bookmarks.dishIds || []).map(normalizeId).filter(Boolean));
  const savedRestaurantIds = new Set((bookmarks.restaurantIds || []).map(normalizeId).filter(Boolean));

  const fetchBookmarks = async () => {
    if (!user) {
      setBookmarks({ dishIds: [], restaurantIds: [] });
      return;
    }
    try {
      const res = await getBookmarks();
      setBookmarks(res.data.data);
    } catch {
      setBookmarks({ dishIds: [], restaurantIds: [] });
    }
  };

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

  const handleSaveRestaurant = async (id) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await saveRestaurant(id);
      setBookmarks(prev => ({
        ...prev,
        restaurantIds: Array.from(new Set([...(prev.restaurantIds || []).map(normalizeId), id])),
      }));
    } catch (err) {
      console.error('Save restaurant failed', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getDestination(slug);
        const d = res.data.data;
        setDest(d);
        const [dishRes, restRes, artRes, revRes] = await Promise.all([
          getDishesByCity(d._id, { limit: 6 }),
          getRestaurantsByCity(d._id, { limit: 6 }),
          getArticles({ cityId: d._id, limit: 4 }),
          getReviewsByDestination(d._id, { limit: 10 }),
        ]);
        setDishes(dishRes.data.data.dishes || []);
        setRests(restRes.data.data.restaurants || []);
        setArticles(artRes.data.data.articles || []);
        setReviews(revRes.data.data.reviews || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleDeleteReview = async (id) => {
    await deleteReview(id);
    setReviews(r => r.filter(x => x._id !== id));
  };

  if (loading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (!dest) return <div className="empty-state"><div className="icon">😔</div><h3>Destination not found</h3></div>;

  const heroImg = dest.heroImage || `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80`;

  return (
    <main className="detail-page">
      {/* Hero */}
      <div className="detail-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="detail-hero-overlay">
          <div className="container">
            <p className="section-label">{dest.country}</p>
            <h1 className="display-heading detail-heading">{dest.name}</h1>
            {dest.tags?.length > 0 && (
              <div className="detail-tags">
                {dest.tags.map(t => <span key={t} className="detail-tag">{t}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container detail-body">
        <div className="detail-layout">
          <div className="detail-main">
            {/* Description */}
            <section className="detail-section">
              <p className="detail-description">{dest.description}</p>
            </section>

            {/* Tabs */}
            <div className="detail-tabs">
              {['dishes', 'restaurants', 'markets', 'articles', 'reviews'].map(tab => (
                <button
                  key={tab}
                  className={`detail-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'dishes' && (
              <section className="detail-section">
                <h2 className="section-subheading">Signature Dishes</h2>
                {dishes.length === 0
                  ? <p className="no-content">No dishes yet for {dest.name}.</p>
                  : <div className="items-grid-sm">{dishes.map(d => <DishCard key={d._id} dish={d} />)}</div>
                }
              </section>
            )}

            {activeTab === 'restaurants' && (
              <section className="detail-section">
                <h2 className="section-subheading">Restaurants & Food Spots</h2>
                {restaurants.length === 0
                  ? <p className="no-content">No restaurants yet for {dest.name}.</p>
                  : <div className="items-grid-sm">{restaurants.map(r => <RestaurantCard key={r._id} restaurant={r} />)}</div>
                }
              </section>
            )}

            {activeTab === 'markets' && (
              <section className="detail-section">
                <h2 className="section-subheading">Food Markets</h2>
                {!dest.foodMarkets?.length
                  ? <p className="no-content">No food markets listed yet.</p>
                  : <div className="markets-list">
                    {dest.foodMarkets.map((m, i) => (
                      <div key={i} className="market-card">
                        <h3>{m.name}</h3>
                        {m.description && <p>{m.description}</p>}
                        {m.location && <p className="market-location">📍 {m.location}</p>}
                      </div>
                    ))}
                  </div>
                }
              </section>
            )}

            {activeTab === 'articles' && (
              <section className="detail-section">
                <h2 className="section-subheading">Stories from {dest.name}</h2>
                {articles.length === 0
                  ? <p className="no-content">No articles yet.</p>
                  : <div className="articles-grid">{articles.map(a => <ArticleCard key={a._id} article={a} />)}</div>
                }
              </section>
            )}

            {activeTab === 'reviews' && (
              <section className="detail-section">
                <h2 className="section-subheading">Community Reviews</h2>
                {user
                  ? <ReviewForm destinationId={dest._id} onReviewAdded={r => setReviews(prev => [r, ...prev])} />
                  : <p className="login-prompt"><Link to="/login">Sign in</Link> to leave a review.</p>
                }
                <div className="reviews-list">
                  {reviews.map(r => (
                    <ReviewCard key={r._id} review={r} currentUserId={user?._id} onDelete={handleDeleteReview} />
                  ))}
                  {reviews.length === 0 && <p className="no-content">Be the first to review {dest.name}!</p>}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h4>Quick Facts</h4>
              <div className="fact-row"><span>Country</span><strong>{dest.country}</strong></div>
              <div className="fact-row"><span>Dishes</span><strong>{dishes.length}</strong></div>
              <div className="fact-row"><span>Restaurants</span><strong>{restaurants.length}</strong></div>
              <div className="fact-row"><span>Markets</span><strong>{dest.foodMarkets?.length || 0}</strong></div>
            </div>
            {dest.galleryImages?.length > 0 && (
              <div className="sidebar-gallery">
                {dest.galleryImages.slice(0, 4).map((img, i) => (
                  <img key={i} src={img} alt="" className="gallery-thumb" />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
