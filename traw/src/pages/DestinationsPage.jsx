import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDestinations, getBookmarks, saveDestination } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DestinationCard } from '../components/Cards';
import Pagination from '../components/Pagination';
import './ListPage.css';

export default function DestinationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [pagination, setPagination]     = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading]           = useState(true);
  const [country, setCountry]           = useState('');
  const [tag, setTag]                   = useState('');
  const [bookmarks, setBookmarks]       = useState({ destinationIds: [] });

  const normalizeId = (item) => typeof item === 'string' ? item : item?._id || item;

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getDestinations({ page, limit: 9, country, tag });
      const { destinations: data, pagination: pg } = res.data.data;
      setDestinations(data);
      setPagination({ page: pg.page, totalPages: pg.totalPages });
    } catch {
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    if (!user) {
      setBookmarks({ destinationIds: [] });
      return;
    }
    try {
      const res = await getBookmarks();
      setBookmarks(res.data.data);
    } catch {
      setBookmarks({ destinationIds: [] });
    }
  };

  const savedDestinationIds = new Set(
    (bookmarks.destinationIds || []).map(normalizeId).filter(Boolean),
  );

  const handleSaveDestination = async (id) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await saveDestination(id);
      setBookmarks(prev => ({
        ...prev,
        destinationIds: Array.from(new Set([...(prev.destinationIds || []).map(normalizeId), id])),
      }));
    } catch (err) {
      console.error('Save destination failed', err);
    }
  };

  useEffect(() => { fetchData(1); }, [country, tag]);
  useEffect(() => { fetchBookmarks(); }, [user]);

  return (
    <main className="list-page">
      <div className="list-page-hero ink-bg">
        <div className="container">
          <p className="section-label">Explore</p>
          <h1 className="display-heading page-hero-heading">
            All <em>Destinations</em>
          </h1>
          <p>120+ cities — every one worth eating through.</p>
        </div>
      </div>

      <div className="container">
        <div className="filter-bar">
          <input
            className="filter-input"
            placeholder="Filter by country…"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <input
            className="filter-input"
            placeholder="Filter by tag…"
            value={tag}
            onChange={e => setTag(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="grid-skeleton">
            {[...Array(9)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
          </div>
        ) : destinations.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🌍</div>
            <h3>No destinations found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="items-grid">
              {destinations.map(d => (
                <DestinationCard
                  key={d._id}
                  destination={d}
                  onSave={handleSaveDestination}
                  saved={savedDestinationIds.has(d._id)}
                />
              ))}
            </div>
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={fetchData}
            />
          </>
        )}
      </div>
    </main>
  );
}
