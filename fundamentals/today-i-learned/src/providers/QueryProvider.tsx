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
      }
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
