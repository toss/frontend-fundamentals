// 사용자 관련 React Query 훅
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserProfile } from "@/api/remote/user";

// Query Keys
export const USER_QUERY_KEYS = {
  all: ["user"] as const,
  profile: () => [...USER_QUERY_KEYS.all, "profile"] as const
} as const;

// 현재 인증된 사용자 프로필 조회 (기존 버전)
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
    staleTime: 1000 * 60 * 30, // 30분
    gcTime: 1000 * 60 * 60, // 1시간
    retry: 1
  });
}

// Suspense를 사용하는 사용자 프로필 조회
export function useSuspendedUserProfile() {
  const { user } = useAuth();

  return useSuspenseQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: () => {
      if (!user?.accessToken) {
        throw new Error("User not authenticated");
      }
      return fetchUserProfile({ accessToken: user.accessToken });
    },
    staleTime: 1000 * 60 * 30, // 30분
    gcTime: 1000 * 60 * 60, // 1시간
    retry: 1
  });
}
