const emojiMap: Record<string, string> = {
  ":earth_americas:": "🌎",
  ":speech_balloon:": "💬",
  ":nose:": "👃",
  ":thinking:": "🤔",
  ":announce:": "📣"
};

export function convertGithubEmoji(text: string): string {
  if (!text) return "";

  return text.replace(/:([\w_+-]+):/g, (match) => {
    return emojiMap[match] || match;
  });
}
