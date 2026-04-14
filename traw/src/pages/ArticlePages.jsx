import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticles, getArticle } from '../services/api';
import { ArticleCard } from '../components/Cards';
import Pagination from '../components/Pagination';
import './ListPage.css';
import './ArticlePage.css';

/* ── ArticlesPage ─────────────────────────────────────────────────────────── */
export function ArticlesPage() {
  const [articles, setArticles]   = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading]     = useState(true);
  const [tag, setTag]             = useState('');

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getArticles({ page, limit: 9, tag });
      const { articles: data, pagination: pg } = res.data.data;
      setArticles(data);
      setPagination({ page: pg.page, totalPages: pg.totalPages });
    } catch { setArticles([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(1); }, [tag]);

  return (
    <main className="list-page">
      <div className="list-page-hero ink-bg">
        <div className="container">
          <p className="section-label">Editorial</p>
          <h1 className="display-heading page-hero-heading">Food <em>Stories</em></h1>
          <p>Long-form travel writing about food culture around the world.</p>
        </div>
      </div>
      <div className="container">
        <div className="filter-bar">
          <input
            className="filter-input"
            placeholder="Filter by tag…"
            value={tag}
            onChange={e => setTag(e.target.value)}
          />
        </div>
        {loading
          ? <div className="grid-skeleton">{[...Array(9)].map((_, i) => <div key={i} className="skeleton-card"></div>)}</div>
          : articles.length === 0
            ? <div className="empty-state"><div className="icon">📖</div><h3>No articles found</h3></div>
            : <>
                <div className="items-grid">{articles.map(a => <ArticleCard key={a._id} article={a} />)}</div>
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={fetchData} />
              </>
        }
      </div>
    </main>
  );
}

/* ── ArticlePage (detail) ─────────────────────────────────────────────────── */
export function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticle(slug)
      .then(res => setArticle(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="spinner-wrap"><div className="spinner"></div></div>;
  if (!article) return <div className="empty-state"><div className="icon">📄</div><h3>Article not found</h3></div>;

  const img = article.coverImage || `https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80`;

  return (
    <main className="article-page">
      <div className="article-cover" style={{ backgroundImage: `url(${img})` }}>
        <div className="article-cover-overlay">
          <div className="container">
            {article.relatedCity && (
              <Link to={`/destinations/${article.relatedCity.slug}`} className="article-cover-city">
                {article.relatedCity.name}
              </Link>
            )}
            <h1 className="article-title display-heading">{article.title}</h1>
            <div className="article-byline">
              <span>By <strong>{article.author}</strong></span>
              <span className="byline-dot">·</span>
              <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            {article.tags?.length > 0 && (
              <div className="article-cover-tags">
                {article.tags.map(t => <span key={t} className="detail-tag">{t}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container article-body-wrap">
        <div className="article-body">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
          />
        </div>
        {article.relatedCity && (
          <div className="article-related">
            <p className="section-label">Related Destination</p>
            <Link to={`/destinations/${article.relatedCity.slug}`} className="related-dest-link">
              <strong>{article.relatedCity.name}</strong>, {article.relatedCity.country}
              <span>Explore →</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
