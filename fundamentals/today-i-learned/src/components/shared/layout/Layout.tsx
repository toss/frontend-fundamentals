import { LayoutNavigation } from "./LayoutNavigation";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <LayoutNavigation />
      <main className="pt-[81px] mx-auto min-w-3xl max-w-[1440px] lg:pl-[50px]">
        {children}
      </main>
    </div>
  );
};
