import { MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Button } from "@/components/shared/ui/Button";
import { formatTimeAgo } from "../utils/formatters";
import type { GitHubDiscussionDetail } from "@/api/remote/discussions";

interface PostHeaderProps {
  post: GitHubDiscussionDetail;
}

function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">{children}</div>
  );
}

function AuthorSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 min-w-0 flex-1">{children}</div>
  );
}

function AuthorInfo({
  name,
  username,
  createdAt
}: {
  name: string;
  username: string;
  createdAt: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2 flex-wrap">
        <h4 className="font-bold text-xl leading-tight tracking-tight text-black/80">
          {name}
        </h4>
        <span className="font-semibold text-base leading-tight tracking-tight text-black/40">
          @{username}
        </span>
        <span className="font-semibold text-base leading-tight tracking-tight text-black/40">
          ·
        </span>
        <span className="font-semibold text-base leading-tight tracking-tight text-black/40">
          {formatTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
}

function MoreMenu() {
  return (
    <Button variant="ghost" size="sm" className="shrink-0 p-2">
      <MoreHorizontal className="h-5 w-5 text-gray-400" />
    </Button>
  );
}

export function PostHeader({ post }: PostHeaderProps) {
  const { author, createdAt } = post;

  return (
    <HeaderContainer>
      <AuthorSection>
        <Avatar
          size="48"
          src={author.avatarUrl || "/api/placeholder/48/48"}
          alt={author.login}
          fallback={author.login}
          className="shrink-0"
        />
        <AuthorInfo
          name={author.login}
          username={author.login}
          createdAt={createdAt}
        />
      </AuthorSection>

      <MoreMenu />
    </HeaderContainer>
  );
}
