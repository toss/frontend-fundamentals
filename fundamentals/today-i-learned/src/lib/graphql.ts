import { fetchGithub, handleGraphQLResponse } from '../utils/github';

// GraphQL 쿼리 타입 정의
export interface GraphQLQueryOptions {
  query: string;
  variables?: Record<string, any>;
  accessToken?: string;
}

// GraphQL 요청 결과 타입
export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string; path?: string[] }>;
}

// 통합된 GraphQL 요청 함수
export async function executeGraphQLQuery<T = any>(
  options: GraphQLQueryOptions
): Promise<T> {
  const { query, variables, accessToken } = options;
  
  const response = await fetchGithub(query, variables, accessToken);
  const data = await handleGraphQLResponse(response, 'GraphQL query failed');
  
  return data.data as T;
}

// GraphQL 에러 처리 유틸리티
export function isGraphQLError(error: any): error is { errors: Array<{ message: string }> } {
  return error && Array.isArray(error.errors);
}

export function formatGraphQLError(error: any): string {
  if (isGraphQLError(error)) {
    return error.errors.map(e => e.message).join(', ');
  }
  return error instanceof Error ? error.message : 'Unknown GraphQL error';
}