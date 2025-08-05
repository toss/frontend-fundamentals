export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, error } = query;

  if (error) {
    console.error('GitHub OAuth error:', error);
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    // GitHub OAuth 토큰 교환
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub token exchange error:', tokenData.error);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?error=${encodeURIComponent(tokenData.error)}`);
    }

    const { access_token } = tokenData;

    // 사용자 정보 가져오기
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error('GitHub user fetch error:', userData);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?error=user_fetch_failed`);
    }

    // JWT 토큰 생성 (여기서는 간단히 사용자 정보와 액세스 토큰을 함께 전달)
    const userInfo = {
      id: userData.id,
      login: userData.login,
      name: userData.name,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      access_token,
    };

    // 프론트엔드로 리다이렉트 (사용자 정보를 쿼리 파라미터로 전달)
    const redirectUrl = new URL(process.env.FRONTEND_URL || 'http://localhost:5173');
    redirectUrl.searchParams.set('auth', 'success');
    redirectUrl.searchParams.set('user', btoa(JSON.stringify(userInfo)));

    return res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?error=callback_failed`);
  }
}