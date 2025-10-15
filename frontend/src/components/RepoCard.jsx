import React from "react";

export default function RepoCard({ repo }) {
  return (
    <article className="card">
      <div className="card-left">
        <img src={repo.owner.avatar_url} alt={repo.owner.login} className="avatar" />
      </div>
      <div className="card-body">
        <h3><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.full_name}</a></h3>
        <p className="desc">{repo.description || "No description"}</p>
        <div className="meta">
          <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
          <span>{repo.language || "—"}</span>
          <a href={repo.owner.html_url} target="_blank" rel="noreferrer">@{repo.owner.login}</a>
        </div>
      </div>
    </article>
  );
}
