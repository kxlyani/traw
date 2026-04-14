import './Pagination.css';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >← Prev</button>
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
            acc.push(p);
            return acc;
          }, [])
          .map((p, i) =>
            p === '…'
              ? <span key={`ellipsis-${i}`} className="ellipsis">…</span>
              : <button
                  key={p}
                  className={`page-btn ${p === page ? 'active' : ''}`}
                  onClick={() => onPageChange(p)}
                >{p}</button>
          )
        }
      </div>
      <button
        className="page-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >Next →</button>
    </div>
  );
}
