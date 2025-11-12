import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/shared/ui/Button";
import { css } from "@styled-system/css";

export function GoToLogin() {
  const { login } = useAuth();

  return (
    <div className={container}>
      <span className={title}>오늘 배운 내용을 기록하려면 로그인 해주세요</span>

      <Button onClick={login} variant="primary" size="lg" className={button}>
        로그인하기
      </Button>
    </div>
  );
}

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingX: "2rem",
  paddingY: "3rem",
  gap: "1.5rem"
});

const title = css({
  fontFamily: "Toss Product Sans OTF",
  fontSize: "1.125rem",
  fontWeight: "700",
  fontStyle: "bold",
  lineHeight: "130%",
  letterSpacing: "-0.025em"
});

const button = css({
  maxHeight: "2.5rem",
  paddingX: "1rem",

  fontFamily: "Toss Product Sans OTF",
  fontSize: "1rem",
  fontWeight: "700",
  fontStyle: "bold",
  lineHeight: "130%",
  letterSpacing: "-0.025em"
});
