import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getBookmarks, removeBookmark } from '../services/api';
import { DestinationCard, DishCard, RestaurantCard } from '../components/Cards';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('destinations');

  useEffect(() => {
    if (!user) return;
    getBookmarks()
      .then(res => setBookmarks(res.data.data))
      .catch(() => setBookmarks({ destinationIds: [], dishIds: [], restaurantIds: [] }))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" replace />;

  const handleRemove = async (id, type) => {
    await removeBookmark(id, type);
    setBookmarks(prev => ({
      ...prev,
      [`${type}Ids`]: prev[`${type}Ids`].filter(item => (item._id || item) !== id),
    }));
  };

  const tabs = [
    { key: 'destinations', label: 'Destinations', count: bookmarks?.destinationIds?.length || 0 },
    { key: 'dishes', label: 'Dishes', count: bookmarks?.dishIds?.length || 0 },
    { key: 'restaurants', label: 'Restaurants', count: bookmarks?.restaurantIds?.length || 0 },
  ];

  return (
    <main className="dashboard">
      {/* Profile header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="profile-row">
            <div className="profile-avatar">{user.username?.[0]?.toUpperCase()}</div>
            <div className="profile-info">
              <h1 className="display-heading profile-name">{user.username}</h1>
              <p className="profile-email">{user.email}</p>
              <div className="profile-stats">
                {tabs.map(t => (
                  <div key={t.key} className="profile-stat">
                    <strong>{t.count}</strong>
                    <span>Saved {t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container dashboard-body">
        <div className="dashboard-tabs">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`detail-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label} <span className="tab-count">{t.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner"></div></div>
        ) : (
          <>
            {activeTab === 'destinations' && (
              <div>
                {!bookmarks?.destinationIds?.length
                  ? <EmptyCollection label="destinations" link="/destinations" />
                  : <div className="dashboard-grid">
                      {bookmarks.destinationIds.map(d => (
                        <div key={d._id || d} className="saved-item-wrap">
                          <DestinationCard destination={d} />
                          <button className="remove-btn" onClick={() => handleRemove(d._id || d, 'destination')}>
                            Remove ✕
                          </button>
                        </div>
                      ))}
                    </div>
                }
              </div>
            )}

            {activeTab === 'dishes' && (
              <div>
                {!bookmarks?.dishIds?.length
                  ? <EmptyCollection label="dishes" link="/dishes" />
                  : <div className="dashboard-grid">
                      {bookmarks.dishIds.map(d => (
                        <div key={d._id || d} className="saved-item-wrap">
                          <DishCard dish={d} />
                          <button className="remove-btn" onClick={() => handleRemove(d._id || d, 'dish')}>
                            Remove ✕
                          </button>
                        </div>
                      ))}
                    </div>
                }
              </div>
            )}

            {activeTab === 'restaurants' && (
              <div>
                {!bookmarks?.restaurantIds?.length
                  ? <EmptyCollection label="restaurants" link="/destinations" />
                  : <div className="dashboard-grid">
                      {bookmarks.restaurantIds.map(r => (
                        <div key={r._id || r} className="saved-item-wrap">
                          <RestaurantCard restaurant={r} />
                          <button className="remove-btn" onClick={() => handleRemove(r._id || r, 'restaurant')}>
                            Remove ✕
                          </button>
                        </div>
                      ))}
                    </div>
                }
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function EmptyCollection({ label, link }) {
  return (
    <div className="empty-state">
      <div className="icon">📌</div>
      <h3>No saved {label} yet</h3>
      <p>Start exploring and bookmark your favorites.</p>
      <Link to={link} className="btn btn-saffron" style={{ marginTop: 'var(--sp-lg)', display: 'inline-flex' }}>
        Explore {label} →
      </Link>
    </div>
  );
}
