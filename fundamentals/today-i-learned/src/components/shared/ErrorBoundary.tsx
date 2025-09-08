import { Component, ErrorInfo, ReactNode } from "react";
import constructionsImage from "@/assets/constructions.png";
import { LayoutNavigation } from "./layout/LayoutNavigation";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅 서비스로 에러 전송 (예: Sentry)
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
    // 홈으로 리다이렉트
    window.location.href = "/";
  };

  getErrorMessage = (error: Error): string => {
    // 에러 메시지 파싱
    if (error.message) {
      // 네트워크 에러
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("fetch")
      ) {
        return "네트워크 연결을 확인해주세요.";
      }
      // 서버 에러
      if (error.message.includes("500")) {
        return "서버에 문제가 발생했습니다.";
      }
      if (error.message.includes("502") || error.message.includes("503")) {
        return "서비스가 일시적으로 이용 불가능합니다.";
      }
      // 기타 에러 메시지가 있는 경우
      return error.message;
    }
    // 기본 메시지
    return "예상치 못한 오류가 발생했습니다.";
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // 커스텀 fallback이 제공된 경우
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      const errorMessage = this.getErrorMessage(this.state.error);

      // 기본 에러 UI (네비게이션 포함)
      return (
        <div className="min-h-screen bg-white font-sans antialiased">
          <LayoutNavigation />
          <div className="pt-[180px] flex items-center justify-center px-6 min-h-screen">
            <div className="max-w-[400px] w-full">
              <div className="flex flex-col items-center text-center">
                {/* 공사 중 이미지 */}
                <img
                  src={constructionsImage}
                  alt="Error"
                  className="w-[200px] h-[200px] mb-8 object-contain"
                />

                {/* 에러 제목 */}
                <h1 className="text-[24px] font-[800] leading-[130%] tracking-[-0.4px] text-[#0F0F0F] mb-3">
                  예상치 못한 오류가 발생한 것 같아요!
                </h1>

                {/* 에러 설명 */}
                <p className="text-[16px] font-[600] leading-[130%] tracking-[-0.4px] text-black/60 mb-2">
                  연결 상태를 확인하거나, 잠시 후 다시 접속해 주세요.
                </p>

                {/* 상세 에러 메시지 */}
                <p className="text-[14px] font-[500] leading-[150%] text-black/40 mb-8">
                  {errorMessage}
                </p>

                {/* 에러 상세 (개발 환경에서만) */}
                {process.env.NODE_ENV === "development" && (
                  <details className="mb-6 text-left w-full">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      에러 스택 트레이스 (개발자용)
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs text-gray-800 overflow-auto max-h-[200px]">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}

                {/* 홈으로 돌아가기 버튼 */}
                <button
                  onClick={this.resetError}
                  className="px-8 py-3 bg-black text-white rounded-full font-bold text-[16px] hover:bg-gray-800 transition-colors"
                >
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
