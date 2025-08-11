import { useState, useEffect } from "react";
import { graphqlRequest } from "../lib/api";
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


// GraphQL API를 통해 현재 인증된 사용자 정보 가져오기
const fetchUserProfile = async (
  accessToken: string
): Promise<GitHubUser | null> => {
  try {
    const data = await graphqlRequest(GET_VIEWER_QUERY, {}, accessToken);
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
  } catch (error) {
    console.error(`Failed to fetch user profile:`, error);
    return null;
  }
};

// 현재 인증된 사용자 정보만 조회 (로그인한 사용자만)
export function useUserProfile() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.access_token) {
      setUserProfile(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profile = await fetchUserProfile(user.access_token);

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
  }, [user?.access_token]);

  return {
    userProfile,
    isLoading,
    error,
    refetch: () => {
      if (user?.access_token) {
        setUserProfile(null);
        setIsLoading(true);
        setError(null);
        fetchUserProfile(user.access_token).then(setUserProfile);
      }
    }
  };
}
