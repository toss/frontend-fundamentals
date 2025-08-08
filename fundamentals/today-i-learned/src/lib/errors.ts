// 에러 타입 정의
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class GraphQLError extends Error {
  constructor(
    message: string,
    public errors?: Array<{ message: string; path?: string[] }>
  ) {
    super(message);
    this.name = 'GraphQLError';
  }
}

// 에러 처리 유틸리티
export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  
  if (error instanceof Response) {
    return new ApiError(
      `API request failed: ${error.status}`,
      error.status,
      error.statusText
    );
  }
  
  if (error instanceof Error) {
    return new ApiError(error.message);
  }
  
  return new ApiError('An unknown error occurred');
}

// 로깅 유틸리티
export function logError(error: Error, context?: string): void {
  const prefix = context ? `[${context}]` : '[Error]';
  console.error(prefix, error.message, error);
}

// 사용자 친화적 에러 메시지 변환
export function getUserFriendlyErrorMessage(error: Error): string {
  if (error instanceof AuthError) {
    return '로그인이 필요합니다. 다시 로그인해주세요.';
  }
  
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return '인증이 만료되었습니다. 다시 로그인해주세요.';
    }
    if (error.status === 403) {
      return '권한이 없습니다.';
    }
    if (error.status === 404) {
      return '요청하신 정보를 찾을 수 없습니다.';
    }
    if (error.status && error.status >= 500) {
      return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
  }
  
  return '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
}