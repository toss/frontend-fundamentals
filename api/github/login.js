export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    // GitHub App Client ID 사용 (없으면 기존 OAuth App ID 사용)
    const clientId = process.env.GITHUB_APP_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
    
    const redirectUri = query.redirect_uri || process.env.GITHUB_REDIRECT_URI;
    
    if (!clientId || !redirectUri) {
      return res.status(500).json({ error: 'GitHub OAuth configuration not complete' });
    }

    // GitHub App의 경우 repo 스코프가 필요없음 (앱 권한으로 처리)
    const scope = process.env.GITHUB_APP_CLIENT_ID ? 'read:user,user:email' : 'read:user,user:email,repo';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    
    return res.redirect(authUrl);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}