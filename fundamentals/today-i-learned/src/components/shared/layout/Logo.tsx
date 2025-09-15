import { Link } from "react-router-dom";
import ffSymbol from "@/assets/ff-symbol2.svg";

export function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={ffSymbol}
          alt="Frontend Fundamentals Logo"
          className="w-8 h-8"
        />
        <span className="text-[20px] font-bold text-[#0F0F0F] tracking-tight leading-6">
          Today I Learned
        </span>
      </Link>
    </div>
  );
}
