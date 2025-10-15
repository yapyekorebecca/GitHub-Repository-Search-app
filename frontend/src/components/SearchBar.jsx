import React, { useState } from "react";

export default function SearchBar({ query, setQuery, language, setLanguage, sort, setSort, perPage, setPerPage, starsGte, setStarsGte, license, setLicense }) {
  const [local, setLocal] = useState(query || "");

  const submit = (e) => {
    e.preventDefault();
    setQuery(local.trim());
  };

  return (
    <form className="searchbar" onSubmit={submit}>
      <div className="row">
        <input
          aria-label="Search"
          value={local}
          onChange={e => setLocal(e.target.value)}
          placeholder="Search GitHub repositories (e.g., react, vite, machine learning)"
        />
        <button type="submit">Search</button>
      </div>

      <div className="controls">
        <label>
          Language
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="">Any</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Go">Go</option>
            <option value="C#">C#</option>
            <option value="PHP">PHP</option>
            <option value="Ruby">Ruby</option>
            <option value="Rust">Rust</option>
            <option value="Kotlin">Kotlin</option>
          </select>
        </label>

        <label>
          Sort
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Best match</option>
            <option value="stars">Most stars</option>
          </select>
        </label>

        <label>
          Per page
          <select value={perPage} onChange={e => setPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>

        <label>
          Stars ≥
          <select value={starsGte} onChange={e => setStarsGte(e.target.value)}>
            <option value="">Any</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="5000">5000</option>
          </select>
        </label>

        <label>
          License
          <select value={license} onChange={e => setLicense(e.target.value)}>
            <option value="">Any</option>
            <option value="mit">MIT</option>
            <option value="apache-2.0">Apache-2.0</option>
            <option value="gpl-3.0">GPL-3.0</option>
            <option value="bsd-3-clause">BSD-3-Clause</option>
            <option value="mpl-2.0">MPL-2.0</option>
            <option value="unlicense">Unlicense</option>
          </select>
        </label>
      </div>
    </form>
  );
}
