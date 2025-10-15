import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [query, setQuery] = useState(localStorage.getItem("lastQuery") || "");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "");
  const [sort, setSort] = useState(localStorage.getItem("sort") || "");
  const [perPage, setPerPage] = useState(Number(localStorage.getItem("perPage")) || 10);
  const [starsGte, setStarsGte] = useState(localStorage.getItem("starsGte") || "");
  const [license, setLicense] = useState(localStorage.getItem("license") || "");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("lastQuery", query);
  }, [query]);
  useEffect(() => { localStorage.setItem("lang", language); }, [language]);
  useEffect(() => { localStorage.setItem("sort", sort); }, [sort]);
  useEffect(() => { localStorage.setItem("perPage", String(perPage)); }, [perPage]);
  useEffect(() => { localStorage.setItem("starsGte", String(starsGte)); }, [starsGte]);
  useEffect(() => { localStorage.setItem("license", license); }, [license]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setTotal(0);
      return;
    }
    const controller = new AbortController();
    async function fetchResults() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          q: query,
          page: String(page),
          per_page: String(perPage),
          sort: sort,
          language: language,
          stars_gte: starsGte || "",
          license: license || ""
        });
        const res = await fetch(`http://localhost:5000/api/search?${params.toString()}`, { signal: controller.signal });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Failed to fetch");
        }
        const data = await res.json();
        setResults(data.items || []);
        setTotal(data.total_count || 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
    return () => controller.abort();
  }, [query, page, perPage, sort, language, starsGte, license]);

  return (
    <div className="app">
      <ThemeToggle />
      <header className="header">
        <h1>GitHub Repository Search</h1>
      </header>

      <main className="container">
        <SearchBar
          query={query}
          setQuery={q => { setPage(1); setQuery(q); }}
          language={language}
          setLanguage={l => { setPage(1); setLanguage(l); }}
          sort={sort}
          setSort={s => { setPage(1); setSort(s); }}
          perPage={perPage}
          setPerPage={p => { setPage(1); setPerPage(p); }}
          starsGte={starsGte}
          setStarsGte={v => { setPage(1); setStarsGte(v); }}
          license={license}
          setLicense={v => { setPage(1); setLicense(v); }}
        />

        <section>
          {error && <div className="error">Error: {error}</div>}
          <RepoList
            results={results}
            loading={loading}
            total={total}
            page={page}
            perPage={perPage}
            setPage={setPage}
          />
        </section>
      </main>

      <footer className="footer">
      </footer>
    </div>
  );
}
