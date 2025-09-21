import { Component, ErrorInfo, ReactNode } from "react";
import constructionsImage from "@/assets/constructions.png";
import { LayoutNavigation } from "./layout/LayoutNavigation";
import { css } from "../../../styled-system/css";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const pageContainer = {
  minHeight: "100vh",
  backgroundColor: "white",
  fontFamily: "system-ui, sans-serif",
  fontSmoothing: "antialiased"
};

const contentWrapper = {
  paddingTop: "180px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingX: "24px",
  minHeight: "100vh"
};

const errorContainer = {
  maxWidth: "400px",
  width: "100%"
};

const errorContent = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center"
};

const errorImage = {
  width: "200px",
  height: "200px",
  marginBottom: "32px",
  objectFit: "contain"
};

const errorTitle = {
  fontSize: "24px",
  fontWeight: "800",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F",
  marginBottom: "12px"
};

const errorDescription = {
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.6)",
  marginBottom: "8px"
};

const errorMessageContainer = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "150%",
  color: "rgba(0, 0, 0, 0.4)",
  marginBottom: "32px"
};

const homeButton = {
  paddingX: "32px",
  paddingY: "12px",
  backgroundColor: "black",
  color: "white",
  borderRadius: "9999px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  _hover: {
    backgroundColor: "rgb(31, 41, 55)"
  }
};

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
        <div className={css(pageContainer)}>
          <LayoutNavigation />
          <div className={css(contentWrapper)}>
            <div className={css(errorContainer)}>
              <div className={css(errorContent)}>
                <img
                  src={constructionsImage}
                  alt="Error"
                  className={css(errorImage)}
                />

                <h1 className={css(errorTitle)}>
                  예상치 못한 오류가 발생한 것 같아요!
                </h1>

                <p className={css(errorDescription)}>
                  연결 상태를 확인하거나, 잠시 후 다시 접속해 주세요.
                </p>

                <p className={css(errorMessageContainer)}>{errorMessage}</p>

                <button onClick={this.resetError} className={css(homeButton)}>
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
