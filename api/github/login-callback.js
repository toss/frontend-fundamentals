export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, error } = query;
  const homeUrl = process.env.TIL_HOME_URL;

  if (!homeUrl) {
    return res.status(500).json({ error: 'TIL_HOME_URL not configured' });
  }

  if (error) {
    console.error('GitHub OAuth error:', error);
    return res.redirect(`${homeUrl}?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
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
      return res.redirect(`${homeUrl}?error=${encodeURIComponent(tokenData.error)}`);
    }

    const { access_token } = tokenData;

    const redirectUrl = new URL(homeUrl);
    redirectUrl.searchParams.set('auth', 'success');
    redirectUrl.searchParams.set('token', btoa(access_token));

    return res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.redirect(`${homeUrl}?error=callback_failed`);
  }
}