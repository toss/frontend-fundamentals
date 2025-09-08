export default async function handler(req, res) {
  const { method, query } = req;

  if (method === "GET") {
    const clientId = process.env.GITHUB_CLIENT_ID;

    const redirectUri = query.redirect_uri || process.env.GITHUB_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      return res
        .status(500)
        .json({ error: "GitHub OAuth configuration not complete" });
    }

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,user:email,repo`;

    return res.redirect(authUrl);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
