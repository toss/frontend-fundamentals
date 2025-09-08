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
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  getErrorMessage = (error: Error): string => {
    if (error.message) {
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("fetch")
      ) {
        return "네트워크 연결을 확인해주세요.";
      }

      if (error.message.includes("500")) {
        return "서버에 문제가 발생했습니다.";
      }
      if (error.message.includes("502") || error.message.includes("503")) {
        return "서비스가 일시적으로 이용 불가능합니다.";
      }

      return error.message;
    }
    return "예상치 못한 오류가 발생했습니다.";
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      const errorMessage = this.getErrorMessage(this.state.error);

      return (
        <div className="min-h-screen bg-white font-sans antialiased">
          <LayoutNavigation />
          <div className="pt-[180px] flex items-center justify-center px-6 min-h-screen">
            <div className="max-w-[400px] w-full">
              <div className="flex flex-col items-center text-center">
                <img
                  src={constructionsImage}
                  alt="Error"
                  className="w-[200px] h-[200px] mb-8 object-contain"
                />

                <h1 className="text-[24px] font-[800] leading-[130%] tracking-[-0.4px] text-[#0F0F0F] mb-3">
                  예상치 못한 오류가 발생한 것 같아요!
                </h1>

                <p className="text-[16px] font-[600] leading-[130%] tracking-[-0.4px] text-black/60 mb-2">
                  연결 상태를 확인하거나, 잠시 후 다시 접속해 주세요.
                </p>

                <p className="text-[14px] font-[500] leading-[150%] text-black/40 mb-8">
                  {errorMessage}
                </p>

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
