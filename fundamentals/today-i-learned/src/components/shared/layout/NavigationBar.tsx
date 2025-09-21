import { Logo } from "@/components/shared/layout/Logo";
import { SearchBar } from "@/components/shared/ui/SearchBar";
import { UserProfile } from "@/components/shared/common/UserProfile";
import { css } from "@styled-system/css";

export function NavigationBar() {
  return (
    <header className={navigationHeader}>
      <Logo />
      <SearchBar />
      <UserProfile />
    </header>
  );
}

// Semantic style definitions
const navigationHeader = css({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
  backgroundColor: 'white',
  zIndex: '30',
  display: 'flex',
  padding: '16px',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media (min-width: 1024px)': {
    marginLeft: '50px'
  }
});
