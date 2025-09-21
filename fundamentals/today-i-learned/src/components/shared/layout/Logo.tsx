import { Link } from "react-router-dom";
import ffSymbol from "@/assets/ff-symbol2.svg";
import { css } from "@styled-system/css";

export function Logo() {
  return (
    <div className={logoContainer}>
      <Link to="/" className={logoLink}>
        <img
          src={ffSymbol}
          alt="Frontend Fundamentals Logo"
          className={logoImage}
        />
        <span className={logoText}>Today I Learned</span>
      </Link>
    </div>
  );
}

// Semantic style definitions
const logoContainer = css({
  flexShrink: "0"
});

const logoLink = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem"
});

const logoImage = css({
  width: "2rem",
  height: "2rem"
});

const logoText = css({
  fontSize: "20px",
  fontWeight: "700",
  color: "#0F0F0F",
  letterSpacing: "-0.025em",
  lineHeight: "1.5"
});
