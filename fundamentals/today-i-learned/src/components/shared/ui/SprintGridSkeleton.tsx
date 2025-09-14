export function SprintGridSkeleton() {
  return (
    <div className="flex flex-row justify-center items-start px-6 pb-2 gap-[10px] w-full">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center pb-2 gap-3 w-[60px]"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-black/5 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
