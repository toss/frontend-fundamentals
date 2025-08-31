import type { GitHubDiscussionDetail } from "@/api/remote/discussions";

interface PostContentProps {
  post: GitHubDiscussionDetail;
}

export function PostContent({ post }: PostContentProps) {
  const getTagStyle = (tagName: string) => {
    if (tagName.includes("성지"))
      return "bg-[rgba(188,233,233,0.4)] text-[#58C7C7]";
    if (tagName.includes("Ongoing"))
      return "bg-[rgba(237,204,248,0.4)] text-[#DA9BEF]";
    if (tagName.includes("가독성"))
      return "bg-[rgba(255,212,214,0.4)] text-[#FB8890]";
    if (tagName.includes("결합도")) return "bg-green-100 text-green-700";
    if (tagName.includes("기여") || tagName.includes("설계"))
      return "bg-orange-100 text-orange-700";
    if (tagName.includes("Changes")) return "bg-yellow-100 text-yellow-700";
    if (tagName.includes("조건부") || tagName.includes("렌더링"))
      return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="mb-8">
      {/* 태그들 */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <div className="inline-flex items-center justify-center px-4 py-2 bg-black/5 rounded-full">
          <span className="font-bold text-sm leading-normal tracking-tight text-black/40">
            {post.category.name}
          </span>
        </div>
        {(post.labels?.nodes?.map((label) => label.name) || []).map((tag) => (
          <div
            key={tag}
            className={`inline-flex items-center justify-center px-3 py-2 rounded-lg ${getTagStyle(tag)}`}
          >
            <span className="font-bold text-sm leading-tight tracking-tight">
              {tag}
            </span>
          </div>
        ))}
      </div>

      {/* 제목 */}
      <h1 className="font-bold text-3xl leading-tight tracking-tight text-[#0F0F0F] mb-6">
        {post.title}
      </h1>

      {/* 내용 */}
      <div className="prose prose-lg max-w-none">
        <p className="font-medium text-lg leading-relaxed tracking-tight text-black/80 whitespace-pre-wrap">
          {post.body}
        </p>
      </div>
    </div>
  );
}
