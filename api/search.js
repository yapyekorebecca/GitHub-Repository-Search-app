import fetch from "node-fetch";

const GITHUB_BASE = "https://api.github.com";

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const q = req.query.q || "";
    const page = req.query.page || "1";
    const per_page = req.query.per_page || "10";
    const sort = req.query.sort || "";
    const language = req.query.language || "";
    const stars_gte = req.query.stars_gte || "";
    const license = req.query.license || "";

    if (!q.trim()) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    let qualifier = "";
    if (language) qualifier += ` language:${language}`;
    if (stars_gte) qualifier += ` stars:>=${stars_gte}`;
    if (license) qualifier += ` license:${license}`;

    let searchQ = encodeURIComponent(q + qualifier);
    let url = `${GITHUB_BASE}/search/repositories?q=${searchQ}&page=${page}&per_page=${per_page}`;
    if (sort) url += `&sort=${encodeURIComponent(sort)}&order=desc`;

    const headers = {
      Accept: "application/vnd.github.v3+json",
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
    const items = data.items.map((it) => ({
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
        html_url: it.owner.html_url,
      },
    }));

    res.json({ total_count: data.total_count, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
}
