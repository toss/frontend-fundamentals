import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}
export function PageContainer({ children }: WrapperProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

export function ContentWrapper({ children }: WrapperProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {children}
      </div>
    </div>
  );
}

export function MainColumn({ children }: WrapperProps) {
  return (
    <div className="lg:col-span-8">
      <div className="bg-white rounded-2xl shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function SidebarColumn({ children }: WrapperProps) {
  return (
    <div className="lg:col-span-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function PostSection({ children }: WrapperProps) {
  return (
    <div className="p-8">
      {children}
    </div>
  );
}

export function CommentSection({ children }: WrapperProps) {
  return (
    <div className="border-t border-gray-100 p-8">
      {children}
    </div>
  );
}

export function CommentHeader({ count }: { count: number }) {
  return (
    <h3 className="text-xl font-bold text-black mb-4">
      댓글 {count}개
    </h3>
  );
}

export function ErrorContainer({ message }: { message: string }) {
  return (
    <PageContainer>
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">{message}</div>
      </div>
    </PageContainer>
  );
}

export function LoadingContainer({ children }: WrapperProps) {
  return (
    <PageContainer>
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </PageContainer>
  );
}