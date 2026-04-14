import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDestinations } from '../services/api';
import { DestinationCard } from '../components/Cards';
import './DestinationSection.css';

export default function DestinationSection() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDestinations({ page: 1, limit: 6 })
      .then(res => setDestinations(res.data.data.destinations || []))
      .catch(() => setDestinations(MOCK_DESTINATIONS))
      .finally(() => setLoading(false));
  }, []);

  const items = destinations.length > 0 ? destinations : MOCK_DESTINATIONS;

  return (
    <section className="dest-section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="section-label">Featured Cities</p>
            <h2 className="display-heading dest-section-heading">Destinations Worth<br /><em>Eating Through</em></h2>
          </div>
          <Link to="/destinations" className="btn btn-outline">View All →</Link>
        </div>
        {loading ? (
          <div className="dest-grid-skeleton">
            {[1,2,3].map(i => <div key={i} className="skeleton-card"></div>)}
          </div>
        ) : (
          <div className="dest-grid">
            {items.slice(0, 6).map(d => (
              <DestinationCard key={d._id || d.slug} destination={d} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const MOCK_DESTINATIONS = [
  { _id: '1', name: 'Tokyo', country: 'Japan', slug: 'tokyo', description: 'A city where ancient tradition and hyper-modernity collide in every bowl of ramen.', tags: ['Ramen', 'Sushi', 'Street Food'] },
  { _id: '2', name: 'Mexico City', country: 'Mexico', slug: 'mexico-city', description: 'The birthplace of modern Mexican cuisine with tacos on every corner.', tags: ['Tacos', 'Tamales', 'Mezcal'] },
  { _id: '3', name: 'Naples', country: 'Italy', slug: 'naples', description: 'Pizza was born here and the city refuses to let you forget it.', tags: ['Pizza', 'Pasta', 'Seafood'] },
  { _id: '4', name: 'Mumbai', country: 'India', slug: 'mumbai', description: 'A chaotic feast for the senses — vada pav, dabba meals, and chai on every street.', tags: ['Street Food', 'Biryani', 'Chai'] },
  { _id: '5', name: 'Istanbul', country: 'Turkey', slug: 'istanbul', description: 'Where two continents share a table laden with kebabs, baklava, and mezze.', tags: ['Kebabs', 'Baklava', 'Mezze'] },
  { _id: '6', name: 'Hanoi', country: 'Vietnam', slug: 'hanoi', description: 'Pho and bun cha at plastic stools — the most satisfying meals cost almost nothing.', tags: ['Pho', 'Street Food', 'Bun Cha'] },
];
