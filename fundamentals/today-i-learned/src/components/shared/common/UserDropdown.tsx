import { Link } from "react-router-dom";
import { css } from "../../../../styled-system/css";

const dropdownContainer = {
  position: "absolute",
  right: "0",
  top: "100%",
  marginTop: "8px",
  width: "160px",
  backgroundColor: "white",
  borderRadius: "16px",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.08)",
  paddingY: "8px",
  zIndex: "50"
};

const dropdownItem = {
  display: "flex",
  alignItems: "center",
  paddingX: "16px",
  paddingY: "10px",
  fontSize: "16px",
  fontWeight: "600",
  color: "rgba(0, 0, 0, 0.8)",
  borderRadius: "8px",
  transition: "background-color 0.2s ease",
  cursor: "pointer",
  textDecoration: "none",
  _hover: {
    backgroundColor: "rgb(243, 244, 246)"
  }
};

const logoutButton = {
  ...dropdownItem,
  width: "100%",
  textAlign: "left",
  border: "none",
  backgroundColor: "transparent"
};

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function UserDropdown({ isOpen, onClose, onLogout }: UserDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className={css(dropdownContainer)}>
      <Link
        to="/profile"
        className={css(dropdownItem)}
        onClick={onClose}
      >
        내 프로필
      </Link>
      <button
        onClick={() => {
          onLogout();
          onClose();
        }}
        className={css(logoutButton)}
      >
        로그아웃
      </button>
    </div>
  );
}