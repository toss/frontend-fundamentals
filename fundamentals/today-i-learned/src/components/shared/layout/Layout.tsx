import { LayoutNavigation } from "./LayoutNavigation";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <LayoutNavigation />
      <div className="relative flex min-h-screen flex-col pt-[120px]">
        <main className="flex-1">
          <div className="mx-auto min-w-3xl px-4 max-w-[1440px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
