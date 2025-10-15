import React from "react";
import RepoCard from "./RepoCard";

export default function RepoList({ results, loading, total, page, perPage, setPage }) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="results">
      <div className="results-header">
        <h2>Results {total ? `(${total.toLocaleString()})` : ""}</h2>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {!loading && results.length === 0 && <div className="empty">No results. Try a different query.</div>}

      <div className="cards">
        {results.map(r => <RepoCard key={r.id} repo={r} />)}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Previous</button>
          <span>Page {page} / {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}
