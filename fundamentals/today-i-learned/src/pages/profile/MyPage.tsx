import { ProfileHeader } from "./components/ProfileHeader";
import { MonthlyActivitySection } from "./components/MonthlyActivitySection";
import { HallOfFameSection } from "./components/HallOfFameSection";
import { ActivitySection } from "./components/ActivitySection";

export function MyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto lg:px-8">
        {/* 메인 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-8">
          {/* 왼쪽 컬럼: 메인 컨텐츠 */}
          <div className="flex flex-col lg:border-l lg:border-r border-[rgba(201,201,201,0.4)] lg:min-w-[820px]">
            {/* 프로필 헤더 */}
            <div className="lg:px-6 pt-6 pb-6">
              <ProfileHeader />
            </div>

            {/* 구분선 */}
            <div className="flex flex-col items-start py-4 px-0">
              <div className="w-full h-0 border-b border-[rgba(201,201,201,0.4)]" />
            </div>

            {/* 명예의 전당 섹션 */}
            <div className="lg:px-6 pb-8">
              <HallOfFameSection />
            </div>

            {/* 활동 섹션 */}
            <div className="lg:px-6 pb-8">
              <ActivitySection />
            </div>
          </div>

          {/* 오른쪽 컬럼: 사이드바 (1024px 이상에서만 표시) */}
          <div className="hidden lg:block mt-[24px] lg:min-w-[490px]">
            <div className="sticky top-4">
              <MonthlyActivitySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}