import { Link } from "react-router-dom";

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function UserDropdown({ isOpen, onClose, onLogout }: UserDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.08)] py-2 z-50">
      <Link
        to="/profile"
        className="flex items-center px-4 py-2.5 text-base font-semibold text-black/80 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={onClose}
      >
        내 프로필
      </Link>
      <button
        onClick={() => {
          onLogout();
          onClose();
        }}
        className="flex items-center px-4 py-2.5 text-base font-semibold text-black/80 hover:bg-gray-100 rounded-lg transition-colors w-full text-left"
      >
        로그아웃
      </button>
    </div>
  );
}