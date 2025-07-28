import { useState, useEffect } from "react";
import { fetchGithub, handleGraphQLResponse } from "../utils/github";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
}

// 특정 사용자 정보 가져오기
const GET_USER_QUERY = `
  query GetUser($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      name
      bio
      repositories {
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`;

// GraphQL API를 통해 사용자 정보 가져오기
const fetchUserProfile = async (
  username: string = "al-bur"
): Promise<GitHubUser | null> => {
  try {
    const response = await fetchGithub(GET_USER_QUERY, { login: username });

    const data = await handleGraphQLResponse(
      response,
      `Failed to fetch user profile for ${username}`
    );

    const userData = data.data?.user;

    if (!userData) {
      return null;
    }

    // GraphQL 응답을 기존 REST API 구조로 변환
    return {
      login: userData.login,
      avatar_url: userData.avatarUrl,
      name: userData.name,
      bio: userData.bio,
      public_repos: userData.repositories?.totalCount || 0,
      followers: userData.followers?.totalCount || 0,
      following: userData.following?.totalCount || 0
    };
  } catch (error) {
    console.error(`Failed to fetch user profile for ${username}:`, error);
    return null;
  }
};

// username을 받아서 해당 사용자 정보 조회
export function useUserProfile(username?: string) {
  const [userProfile, setUserProfile] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profile = await fetchUserProfile(username);

        if (isMounted) {
          setUserProfile(profile);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load profile"
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return {
    userProfile,
    isLoading,
    error,
    refetch: () => {
      setUserProfile(null);
      setIsLoading(true);
      setError(null);
      fetchUserProfile(username).then(setUserProfile);
    }
  };
}
