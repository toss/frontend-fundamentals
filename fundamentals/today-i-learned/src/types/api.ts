// API 관련 타입 정의

// GitHub 사용자 정보
export interface GitHubUser {
  id: number;
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

// 인증된 사용자 (access_token 포함)
export interface AuthenticatedUser extends GitHubUser {
  access_token: string;
}

// API 응답 기본 구조
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
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