export interface GitHubUser {
  id: number;
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

// 인증된 사용자 (accessToken 포함)
export interface AuthenticatedUser extends GitHubUser {
  accessToken: string;
}

export interface FetchUserProfileParams {
  accessToken: string;
}

// /api/github/me를 통해 현재 인증된 사용자 정보 가져오기
export async function fetchUserProfile({
  accessToken
}: FetchUserProfileParams): Promise<GitHubUser | null> {
  try {
    const response = await fetch("/api/github/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(`Failed to fetch user profile:`, error);
    return null;
  }
}
