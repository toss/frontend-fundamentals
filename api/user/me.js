export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authorization 헤더에서 토큰 추출
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // GitHub API를 통해 현재 사용자 정보 가져오기
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const userData = await userResponse.json();

    // 사용자 정보 반환
    return res.status(200).json({
      id: userData.id,
      login: userData.login,
      name: userData.name,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch user information' });
  }
}