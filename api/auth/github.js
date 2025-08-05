export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    // GitHub OAuth 로그인 시작
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_REDIRECT_URI || `${req.headers.origin}/api/auth/github/callback`;
    
    if (!clientId) {
      return res.status(500).json({ error: 'GitHub client ID not configured' });
    }

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,user:email,repo`;
    
    return res.redirect(authUrl);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}