import { Logo } from "@/components/shared/layout/Logo";
import { SearchBar } from "@/components/shared/ui/SearchBar";
import { UserProfile } from "@/components/shared/common/UserProfile";

export function NavigationBar() {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-200/50 bg-white z-30">
      <div className="mx-auto flex h-[120px] items-center justify-between px-6 lg:px-[222px]">
        <Logo />
        <SearchBar />
        <UserProfile />
      </div>
    </header>
  );
}
