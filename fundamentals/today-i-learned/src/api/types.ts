// API 레이어 공통 타입 정의

// API 응답 기본 구조
export interface ApiResponse<T = unknown> {
  data?: T;
  status: number;
  message?: string;
  error?: string;
}

// GraphQL 페이지네이션 정보
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

// API 요청 옵션
export interface ApiRequestOptions extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}

// 인증이 필요한 API 요청 옵션
export interface AuthenticatedApiRequestOptions extends ApiRequestOptions {
  token: string;
}