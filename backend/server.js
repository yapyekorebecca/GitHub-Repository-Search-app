import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_BASE = "https://api.github.com";

app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.q || "";
    const page = req.query.page || "1";
    const per_page = req.query.per_page || "10";
    const sort = req.query.sort || ""; // "stars" or empty
    const language = req.query.language || "";
    const stars_gte = req.query.stars_gte || ""; // minimum stars
    const license = req.query.license || ""; // SPDX id e.g., mit, apache-2.0

    if (!q.trim()) return res.status(400).json({ error: "Query parameter 'q' is required" });

    let qualifier = "";
    if (language) qualifier += ` language:${language}`;
    if (stars_gte) qualifier += ` stars:>=${stars_gte}`;
    if (license) qualifier += ` license:${license}`;

    let searchQ = encodeURIComponent(q + qualifier);
    let url = `${GITHUB_BASE}/search/repositories?q=${searchQ}&page=${page}&per_page=${per_page}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}&order=desc`;

    const headers = {
      "Accept": "application/vnd.github.v3+json"
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const r = await fetch(url, { headers });
    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: "GitHub API error", details: text });
    }
    const data = await r.json();
    // light transform: only send needed fields
    const items = data.items.map(it => ({
      id: it.id,
      name: it.name,
      full_name: it.full_name,
      html_url: it.html_url,
      description: it.description,
      stargazers_count: it.stargazers_count,
      language: it.language,
      owner: {
        login: it.owner.login,
        avatar_url: it.owner.avatar_url,
        html_url: it.owner.html_url
      }
    }));
    res.json({ total_count: data.total_count, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server listening on port ${PORT}`));
