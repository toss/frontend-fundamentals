import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (구 cacheTime)
      retry: (failureCount, error) => {
        // 404나 401 에러는 재시도하지 않음
        if (
          error instanceof Error &&
          (error.message.includes("404") || error.message.includes("401"))
        ) {
          return false;
        }
        return failureCount < 3;
      },
      // 네트워크 에러나 서버 에러(5xx)의 경우 Error Boundary로 전파
      throwOnError: (error) => {
        if (error instanceof Error) {
          // 네트워크 에러나 5xx 서버 에러만 Error Boundary로 전파
          return (
            error.message.includes("NetworkError") ||
            error.message.includes("500") ||
            error.message.includes("502") ||
            error.message.includes("503")
          );
        }
        return false;
      }
    },
    mutations: {
      // mutation의 경우 기본적으로 Error Boundary를 사용하지 않음
      throwOnError: false
    }
  }
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
