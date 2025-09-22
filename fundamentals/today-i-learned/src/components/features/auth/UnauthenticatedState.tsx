import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/shared/ui/Button";

export function UnauthenticatedState() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 gap-4 w-full rounded-2xl bg-white">
      {/* 메인 텍스트 */}
      <h1 className="text-xl font-bold text-center text-black/80 tracking-tight leading-[130%]">
        매일 한 줄, 오늘 배운 내용을 기록해봐요!
      </h1>

      {/* 버튼 */}
      <Button
        onClick={login}
        variant="primary"
        size="lg"
        className="px-8 py-3 text-base font-bold"
      >
        로그인하기
      </Button>
    </div>
  );
}
