export default async function handler(req, res) {
  const { query, variables } = req.body || {};

  if (!query) {
    return res.status(400).json({ error: 'Missing "query" in request body' });
  }

  const GITHUB_ACCESS_TOKEN = process.env.READ_GITHUB_DISCUSSION_ACCESS_TOKEN;

  if (!GITHUB_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Missing API Key" });
  }

  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ query })
  });
}
