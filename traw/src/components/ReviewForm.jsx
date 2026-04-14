import { useState } from 'react';
import { createReview } from '../services/api';
import './ReviewForm.css';

export default function ReviewForm({ destinationId, dishId, restaurantId, onReviewAdded }) {
  const [rating, setRating]   = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) { setError('Please select a rating'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await createReview({ destinationId, dishId, restaurantId, rating, comment });
      setRating(0); setComment('');
      onReviewAdded?.(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4>Leave a Review</h4>
      <div className="star-picker">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            className={`star-btn ${n <= (hovered || rating) ? 'active' : ''}`}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(n)}
          >★</button>
        ))}
        {rating > 0 && <span className="rating-label">{['','Poor','Fair','Good','Great','Excellent'][rating]}</span>}
      </div>
      <textarea
        className="review-textarea"
        placeholder="Share your experience…"
        value={comment}
        onChange={e => setComment(e.target.value)}
        rows={4}
      />
      {error && <p className="form-error">{error}</p>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
}
