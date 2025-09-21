export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  }
  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  }
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) {
    return text;
  }
  const truncateLength = maxLength - suffix.length;
  return text.substring(0, truncateLength) + suffix;
}

export function cleanMarkdown(text: string): string {
  return text.replace(/[#*`\n]/g, " ").trim();
}

export const generateTitle = (
  content: string,
  maxLength: number = 50
): string => {
  return truncateText(content, maxLength);
};

export const extractTags = (content: string): string[] => {
  const tagRegex = /#[\w가-힣]+/g;
  return content.match(tagRegex)?.map((tag) => tag.slice(1)) || [];
};

export const highlightTags = (content: string): string => {
  return content.replace(
    /#([\w가-힣]+)/g,
    '<span style="color: #3b82f6; font-weight: 500">#$1</span>'
  );
};
