export function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";

  const codeBlocks = new Map<string, string>();
  let blockCounter = 0;

  return markdown
    .replace(/```([^\r\n]*)\r?\n([\s\S]*?)```\r?\n?/g, (match, lang, code) => {
      const lines = code.split("\n");
      const nonEmptyLines = lines.filter((line) => line.trim());
      const indentLevel =
        nonEmptyLines.length > 0
          ? (nonEmptyLines[0].match(/^\s*/) || [""])[0].length
          : 0;

      const processedCode = lines
        .map((line) => {
          const leadingSpaces = line.match(/^\s*/) || [""];
          const indentedLine = line.slice(
            Math.min(indentLevel, leadingSpaces[0].length)
          );
          return indentedLine || " ";
        })
        .join("\n")
        .trim();

      const escapedCode = escapeHtml(processedCode)
        .split("\n")
        .map((line) => {
          const leadingSpaces = line.match(/^\s*/) || [""];
          const content = line.slice(leadingSpaces[0].length);

          return (
            leadingSpaces[0].replace(/ /g, "&nbsp;") +
            content.replace(/ {2}/g, " &nbsp;")
          );
        })
        .join("<br>");

      const token = `___CODE_BLOCK_${blockCounter}___`;
      codeBlocks.set(
        token,
        `<div class="code-block-wrapper">
              <div class="code-block-header">
                <span class="code-block-lang">${
                  lang.trim() || "plaintext"
                }</span>
              </div>
              <pre class="language-${
                lang.trim() || "plaintext"
              }"><code>${escapedCode}</code></pre>
            </div>`
      );
      blockCounter++;
      return token;
    })

    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /$begin:math:display$([^$end:math:display$]+)\]$begin:math:text$([^)]+)$end:math:text$/g,
      "<a href='$2' target='_blank'>$1</a>"
    )
    .replace(
      /!$begin:math:display$([^$end:math:display$]*)\]$begin:math:text$([^)]+)$end:math:text$/g,
      "<img src='$2' alt='$1'>"
    )
    .replace(/^[\*\-] (.+)/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/^> (.+)/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, "<hr>")
    .replace(/\n\s*\n/g, "\n<br>\n")

    .replace(/(<\/(h[1-6]|ul|blockquote|pre)>)\s*<br>/g, "$1")
    .replace(/<br>\s*(<(h[1-6]|ul|blockquote|pre)>)/g, "$1")

    .replace(/\n(?![<])/g, " ")
    .replace(/\s+/g, " ")
    .replace(
      /___CODE_BLOCK_(\d+)___/g,
      (match) => codeBlocks.get(match) || match
    )
    .trim();
}

function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}
