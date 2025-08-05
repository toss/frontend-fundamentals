import { useState, useEffect } from "react";
import { fetchGithub, handleGraphQLResponse } from "../utils/github";
import { useAuth } from "../contexts/AuthContext";
import type { GitHubUser } from "../types/api";

// 현재 인증된 사용자 정보 가져오기 (OAuth)
const GET_VIEWER_QUERY = `
  query GetViewer {
    viewer {
      id
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

// 특정 사용자 정보 가져오기
const GET_USER_QUERY = `
  query GetUser($login: String!) {
    user(login: $login) {
      id
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
  username?: string,
  accessToken?: string
): Promise<GitHubUser | null> => {
  try {
    let response: Response;
    let data: any;

    if (!username && accessToken) {
      // 현재 인증된 사용자 정보 가져오기
      response = await fetchGithub(GET_VIEWER_QUERY, {}, accessToken);
      data = await handleGraphQLResponse(
        response,
        "Failed to fetch current user profile"
      );
      const userData = data.data?.viewer;

      if (!userData) {
        return null;
      }

      return {
        id: userData.id,
        login: userData.login,
        avatar_url: userData.avatarUrl,
        name: userData.name,
        bio: userData.bio,
        public_repos: userData.repositories?.totalCount || 0,
        followers: userData.followers?.totalCount || 0,
        following: userData.following?.totalCount || 0
      };
    } else {
      // 특정 사용자 정보 가져오기 (fallback to al-bur)
      const targetUsername = username || "al-bur";
      response = await fetchGithub(GET_USER_QUERY, { login: targetUsername }, accessToken);
      data = await handleGraphQLResponse(
        response,
        `Failed to fetch user profile for ${targetUsername}`
      );
      const userData = data.data?.user;

      if (!userData) {
        return null;
      }

      return {
        id: userData.id,
        login: userData.login,
        avatar_url: userData.avatarUrl,
        name: userData.name,
        bio: userData.bio,
        public_repos: userData.repositories?.totalCount || 0,
        followers: userData.followers?.totalCount || 0,
        following: userData.following?.totalCount || 0
      };
    }
  } catch (error) {
    console.error(`Failed to fetch user profile:`, error);
    return null;
  }
};

// username을 받아서 해당 사용자 정보 조회, username이 없으면 현재 인증된 사용자 정보 조회
export function useUserProfile(username?: string) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profile = await fetchUserProfile(username, user?.access_token);

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
  }, [username, user?.access_token]);

  return {
    userProfile,
    isLoading,
    error,
    refetch: () => {
      setUserProfile(null);
      setIsLoading(true);
      setError(null);
      fetchUserProfile(username, user?.access_token).then(setUserProfile);
    }
  };
}
