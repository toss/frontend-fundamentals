interface SprintDay {
  day: number;
  label: string;
  isToday?: boolean;
  isActive?: boolean;
}

const sprintDays: SprintDay[] = [
  { day: 17, label: "오늘", isToday: true, isActive: false },
  { day: 18, label: "2일차", isToday: false, isActive: false },
  { day: 19, label: "3일차", isToday: false, isActive: false }
];

export function SprintChallenge() {
  return (
    <div className="flex flex-col items-start px-6 gap-[10px] w-full">
      <div className="flex flex-col items-start p-6 gap-2 w-full bg-white border border-[rgba(201,201,201,0.5)] rounded-2xl">
        {/* 헤더 섹션 */}
        <div className="flex flex-row justify-center items-start px-6 pb-6 w-full">
          <div className="flex flex-col items-center pt-2">
            <div className="flex flex-row justify-center items-center pb-5 gap-[10px]">
              <h2 className="text-[24px] font-[800] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
                3일 스프린트
              </h2>
            </div>
            <p className="text-[16px] font-[600] leading-[130%] tracking-[-0.4px] text-black/60">
              오늘 글을 쓰면 3일 도전이 시작돼요
            </p>
          </div>
        </div>

        {/* 날짜 섹션 */}
        <div className="flex flex-row justify-center items-start px-6 pb-2 gap-[10px] w-full">
          <div className="flex flex-row items-center gap-4">
            {sprintDays.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center pb-2 gap-3 w-[60px]"
              >
                <div
                  className={`
                    flex flex-col justify-center items-center w-[60px] h-[60px] rounded-full
                    ${day.isToday ? "bg-black/20" : "bg-black/10"}
                  `}
                >
                  <span className="text-[14px] font-bold leading-[160%] tracking-[-0.4px] text-[#FCFCFC]">
                    {day.label}
                  </span>
                </div>
                <span className="text-[14px] font-[600] leading-[160%] tracking-[-0.4px] text-black/20">
                  {day.day}일
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
