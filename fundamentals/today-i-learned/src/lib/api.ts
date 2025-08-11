import { ENV_CONFIG } from './env';

// API 설정 중앙화
export const API_CONFIG = {
  BASE_URL: ENV_CONFIG.API_BASE_URL || '', // 빈 문자열이면 상대 경로 사용 (프록시)
  ENDPOINTS: {
    AUTH: '/api/auth/github',
    GRAPHQL: '/api/graphql/github',
    GITHUB: '/api/github',
    USER_ME: '/api/user/me',
  }
} as const;

// API URL 생성 헬퍼
export function getApiUrl(endpoint: keyof typeof API_CONFIG.ENDPOINTS): string {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
}

// API 요청 헬퍼 (기본 설정)
export function createApiRequest(endpoint: keyof typeof API_CONFIG.ENDPOINTS, options: RequestInit = {}): Promise<Response> {
  return fetch(getApiUrl(endpoint), {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
}

// 인증이 필요한 API 요청 헬퍼
export function createAuthenticatedApiRequest(
  endpoint: keyof typeof API_CONFIG.ENDPOINTS,
  token: string,
  options: RequestInit = {}
): Promise<Response> {
  return createApiRequest(endpoint, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
}