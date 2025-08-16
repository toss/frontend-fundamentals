import { User } from "lucide-react";
import type { GitHubUser, AuthenticatedUser } from "@/api/remote/user";

interface UserAvatarProps {
  user?: GitHubUser | AuthenticatedUser | null;
  isLoading?: boolean;
}

export function UserAvatar({ user, isLoading }: UserAvatarProps) {
  console.log({ user });
  if (user && !isLoading) {
    return (
      <img
        src={user.avatar_url}
        alt={`${user.login}님의 프로필`}
        className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-200/40 shadow-sm"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-gray-400 to-gray-500 shadow-sm">
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      ) : (
        <User className="h-5 w-5 text-white" aria-hidden="true" />
      )}
    </div>
  );
}
