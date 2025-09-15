interface SprintHeaderProps {
  title: string;
  message: string;
}

export function SprintHeader({ title, message }: SprintHeaderProps) {
  return (
    <div className="flex flex-row justify-center items-start px-6 pb-6 w-full">
      <div className="flex flex-col items-center pt-2">
        <div className="flex flex-row justify-center items-center gap-[16px]">
          <h2 className="text-[20px] font-[800] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
            {title}
          </h2>
        </div>
        <p className="text-[16px] font-[600] leading-[130%] tracking-[-0.4px] text-black/60">
          {message}
        </p>
      </div>
    </div>
  );
}
