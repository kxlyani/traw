import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser    = (data) => api.post('/users/register', data);
export const loginUser       = (data) => api.post('/users/login', data);
export const logoutUser      = ()     => api.post('/users/logout');
export const getCurrentUser  = ()     => api.get('/users/current-user');
export const refreshToken    = ()     => api.post('/users/refresh-token');

// ── Destinations ──────────────────────────────────────────────────────────────
export const getDestinations    = (params) => api.get('/destinations', { params });
export const getDestination     = (slug)   => api.get(`/destinations/${slug}`);
export const createDestination  = (data)   => api.post('/destinations', data);
export const updateDestination  = (id, data) => api.patch(`/destinations/${id}`, data);
export const deleteDestination  = (id)     => api.delete(`/destinations/${id}`);

// ── Dishes ────────────────────────────────────────────────────────────────────
export const getDishes          = (params)  => api.get('/dishes', { params });
export const getDish            = (id)      => api.get(`/dishes/${id}`);
export const getDishesByCity    = (cityId, params) => api.get(`/dishes/city/${cityId}`, { params });
export const createDish         = (data)    => api.post('/dishes', data);
export const updateDish         = (id, data) => api.patch(`/dishes/${id}`, data);
export const deleteDish         = (id)      => api.delete(`/dishes/${id}`);

// ── Restaurants ───────────────────────────────────────────────────────────────
export const getRestaurants     = (params)  => api.get('/restaurants', { params });
export const getRestaurant      = (id)      => api.get(`/restaurants/${id}`);
export const getRestaurantsByCity = (cityId, params) => api.get(`/restaurants/city/${cityId}`, { params });
export const createRestaurant   = (data)    => api.post('/restaurants', data);
export const updateRestaurant   = (id, data) => api.patch(`/restaurants/${id}`, data);
export const deleteRestaurant   = (id)      => api.delete(`/restaurants/${id}`);

// ── Articles ──────────────────────────────────────────────────────────────────
export const getArticles        = (params)  => api.get('/articles', { params });
export const getArticle         = (slug)    => api.get(`/articles/${slug}`);
export const createArticle      = (data)    => api.post('/articles', data);
export const updateArticle      = (id, data) => api.patch(`/articles/${id}`, data);
export const deleteArticle      = (id)      => api.delete(`/articles/${id}`);

// ── Reviews ───────────────────────────────────────────────────────────────────
export const createReview       = (data)   => api.post('/reviews', data);
export const getReviewsByDestination = (id, params) => api.get(`/reviews/destination/${id}`, { params });
export const getReviewsByDish   = (id, params)  => api.get(`/reviews/dish/${id}`, { params });
export const getReviewsByRestaurant = (id, params) => api.get(`/reviews/restaurant/${id}`, { params });
export const deleteReview       = (id)     => api.delete(`/reviews/${id}`);

// ── Bookmarks ─────────────────────────────────────────────────────────────────
export const getBookmarks       = ()       => api.get('/bookmarks');
export const saveDestination    = (destinationId) => api.post('/bookmarks/save-destination', { destinationId });
export const saveDish           = (dishId)  => api.post('/bookmarks/save-dish', { dishId });
export const saveRestaurant     = (restaurantId) => api.post('/bookmarks/save-restaurant', { restaurantId });
export const removeBookmark     = (id, type) => api.delete(`/bookmarks/${id}`, { params: { type } });

export default api;
