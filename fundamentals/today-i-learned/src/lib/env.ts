// 환경 변수 타입 정의 및 검증
interface EnvConfig {
  API_BASE_URL: string;
  GITHUB_TOKEN?: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_CATEGORY: string;
  USE_MOCK_DATA: boolean;
}

// 환경 변수 파싱 및 기본값 설정
function parseEnvConfig(): EnvConfig {
  const isDev = import.meta.env.DEV;
  const isLocalhost = window.location.hostname === 'localhost';
  
  return {
    // 로컬 개발에서는 프록시 사용, 프로덕션에서는 실제 도메인 사용
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 
                  (isDev && isLocalhost ? '' : 'https://frontend-fundamentals.com'),
    GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
    GITHUB_OWNER: import.meta.env.VITE_GITHUB_OWNER || 'toss',
    GITHUB_REPO: import.meta.env.VITE_GITHUB_REPO || 'frontend-fundamentals',
    GITHUB_CATEGORY: import.meta.env.VITE_GITHUB_CATEGORY || 'Today I Learned',
    USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  };
}

// 환경 변수 검증
function validateEnvConfig(config: EnvConfig): void {
  const isLocalhost = window.location.hostname === 'localhost';
  
  if (isLocalhost && !config.USE_MOCK_DATA && !config.GITHUB_TOKEN) {
    console.warn('VITE_GITHUB_TOKEN is not set. Using mock data or may encounter API rate limits.');
  }
}

// 환경 설정 내보내기
export const ENV_CONFIG = parseEnvConfig();

// 초기화 시 검증
validateEnvConfig(ENV_CONFIG);

// 환경별 유틸리티
export const isDevelopment = () => import.meta.env.DEV;
export const isLocalhost = () => window.location.hostname === 'localhost';
export const shouldUseMockData = () => ENV_CONFIG.USE_MOCK_DATA;