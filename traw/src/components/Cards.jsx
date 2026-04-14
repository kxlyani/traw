import { Link } from 'react-router-dom';
import './Cards.css';

/* ── DestinationCard ──────────────────────────────────────────────────────── */
export function DestinationCard({ destination, onSave, saved }) {
  const img = destination.heroImage || `https://picsum.photos/seed/${destination.slug}/600/400`;
  return (
    <Link to={`/destinations/${destination.slug}`} className="dest-card">
      <div className="dest-card-img-wrap">
        <img src={img} alt={destination.name} className="dest-card-img" />
        <div className="dest-card-country">{destination.country}</div>
      </div>
      <div className="dest-card-body">
        <h3 className="dest-card-name">{destination.name}</h3>
        <p className="dest-card-desc">{destination.description?.slice(0, 90)}…</p>
        {destination.tags?.length > 0 && (
          <div className="card-tags">
            {destination.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      {onSave && (
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={e => { e.preventDefault(); onSave(destination._id); }}
          aria-label="Save destination"
        >
          {saved ? '★' : '☆'}
        </button>
      )}
    </Link>
  );
}

/* ── DishCard ─────────────────────────────────────────────────────────────── */
export function DishCard({ dish, onSave, saved }) {
  const img = dish.image || `https://picsum.photos/seed/${dish._id}/400/300`;
  return (
    <Link to={`/dishes/${dish._id}`} className="dish-card">
      <div className="dish-card-img-wrap">
        <img src={img} alt={dish.name} />
        <span className="dish-category">{dish.category}</span>
      </div>
      <div className="dish-card-body">
        <h3>{dish.name}</h3>
        <p className="dish-city">{dish.city?.name || '—'}</p>
        <p className="dish-desc">{dish.description?.slice(0, 80)}…</p>
        {dish.averageRating > 0 && (
          <div className="rating-row">
            <span className="star">★</span>
            <span>{dish.averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
      {onSave && (
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={e => { e.preventDefault(); onSave(dish._id); }}
        >
          {saved ? '★' : '☆'}
        </button>
      )}
    </Link>
  );
}

/* ── RestaurantCard ───────────────────────────────────────────────────────── */
export function RestaurantCard({ restaurant, onSave, saved }) {
  const img = restaurant.image || `https://picsum.photos/seed/r${restaurant._id}/400/300`;
  return (
    <Link to={`/restaurants/${restaurant._id}`} className="restaurant-card">
      <div className="restaurant-img-wrap">
        <img src={img} alt={restaurant.name} />
        <span className="restaurant-type-badge">{restaurant.type}</span>
      </div>
      <div className="restaurant-body">
        <h3>{restaurant.name}</h3>
        <p className="restaurant-city">{restaurant.city?.name || '—'}</p>
        <p className="restaurant-desc">{restaurant.description?.slice(0, 80)}…</p>
        {restaurant.address && <p className="restaurant-address">📍 {restaurant.address}</p>}
        {restaurant.averageRating > 0 && (
          <div className="rating-row">
            <span className="star">★</span>
            <span>{restaurant.averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
      {onSave && (
        <button
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={e => { e.preventDefault(); onSave(restaurant._id); }}
        >
          {saved ? '★' : '☆'}
        </button>
      )}
    </Link>
  );
}

/* ── ArticleCard ──────────────────────────────────────────────────────────── */
export function ArticleCard({ article }) {
  const img = article.coverImage || `https://picsum.photos/seed/a${article._id}/600/350`;
  return (
    <Link to={`/articles/${article.slug}`} className="article-card">
      <div className="article-img-wrap">
        <img src={img} alt={article.title} />
      </div>
      <div className="article-body">
        {article.relatedCity && (
          <span className="article-city-tag">{article.relatedCity.name}</span>
        )}
        <h3>{article.title}</h3>
        <p className="article-meta">
          By <strong>{article.author}</strong> ·{' '}
          {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        {article.tags?.length > 0 && (
          <div className="card-tags">
            {article.tags.slice(0, 2).map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        )}
      </div>
    </Link>
  );
}

/* ── ReviewCard ───────────────────────────────────────────────────────────── */
export function ReviewCard({ review, onDelete, currentUserId }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating ? '★' : '☆');
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-avatar">
          {review.userId?.username?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <strong>{review.userId?.username || 'Anonymous'}</strong>
          <div className="review-stars">{stars.join('')}</div>
        </div>
        <span className="review-date">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
        {onDelete && currentUserId === review.userId?._id && (
          <button className="delete-review-btn" onClick={() => onDelete(review._id)}>✕</button>
        )}
      </div>
      {review.comment && <p className="review-comment">{review.comment}</p>}
    </div>
  );
}
