export default async function handler(req, res) {
  const { query } = req.body;

  const token = process.env.READ_GITHUB_DISCUSSION_ACCESS_TOKEN;

  if (!token) {
    console.error("[Server] GitHub 토큰 누락");
    return res.status(500).json({ error: "GitHub token is not configured" });
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();

  return res.status(200).json(data);
}
