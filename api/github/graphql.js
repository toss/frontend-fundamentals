export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, variables } = req.body;

  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.replace('Bearer ', '');
  } else {
    token = process.env.READ_GITHUB_DISCUSSION_ACCESS_TOKEN;
    
    if (!token) {
      return res.status(500).json({ error: "GitHub server token is not configured" });
    }
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('GraphQL request error:', error);
    return res.status(500).json({ error: 'Failed to execute GraphQL query' });
  }
}
