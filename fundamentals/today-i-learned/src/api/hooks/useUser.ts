// 사용자 관련 React Query 훅

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserProfile, fetchPublicUserProfile } from "@/api/remote/user";

// Query Keys
export const USER_QUERY_KEYS = {
  all: ["user"] as const,
  profile: () => [...USER_QUERY_KEYS.all, "profile"] as const,
  publicProfile: (username: string) =>
    [...USER_QUERY_KEYS.all, "public", username] as const
} as const;

const STALE_TIME = 1000 * 60 * 30; // 30분
const GC_TIME = 1000 * 60 * 60; // 1시간

// 현재 인증된 사용자 프로필 조회
export function useUserProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: () => {
      if (!user?.accessToken) {
        throw new Error("User not authenticated");
      }
      return fetchUserProfile({ accessToken: user.accessToken });
    },
    enabled: !!user?.accessToken,
    staleTime: STALE_TIME,
    gcTime: GC_TIME, // 1시간
    retry: 1
  });
}

// 특정 사용자의 공개 프로필 조회 (username으로)
export function usePublicUserProfile(username: string | undefined) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.publicProfile(username ?? ""),
    queryFn: () => {
      if (!username) {
        throw new Error("Username is required");
      }
      return fetchPublicUserProfile({ username });
    },
    enabled: !!username,
    staleTime: STALE_TIME, // 30분
    gcTime: GC_TIME, // 1시간
    retry: 1
  });
}
