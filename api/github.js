export default async function handler(req, res) {
  const { query, variables } = req.body || {};

  if (!query) {
    return res.status(400).json({ error: 'Missing "query" in request body' });
  }

  const GITHUB_ACCESS_TOKEN = process.env.READ_GITHUB_DISCUSSION_ACCESS_TOKEN;

  if (!GITHUB_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Missing API Key" });
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
