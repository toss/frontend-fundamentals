import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { css } from "@styled-system/css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = ""
}: MarkdownRendererProps) {
  return (
    <div className={`${markdownContainer} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className={heading1Style}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={heading2Style}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={heading3Style}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className={paragraphStyle}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className={strongStyle}>{children}</strong>
          ),
          em: ({ children }) => (
            <em className={emphasisStyle}>{children}</em>
          ),
          ul: ({ children }) => (
            <ul className={unorderedListStyle}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className={orderedListStyle}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={listItemStyle}>
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className={blockquoteStyle}>
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
              // Code block
              return (
                <pre className={codeBlockStyle}>
                  <code className={codeTextStyle} {...props}>
                    {children}
                  </code>
                </pre>
              );
            }

            // Inline code
            return (
              <code
                className={inlineCodeStyle}
                {...props}
              >
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className={tableWrapperStyle}>
              <table className={tableStyle}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className={tableHeadStyle}>{children}</thead>
          ),
          th: ({ children }) => (
            <th className={tableHeaderStyle}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className={tableCellStyle}>
              {children}
            </td>
          ),
          hr: () => <hr className={horizontalRuleStyle} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Container Styles
const markdownContainer = css({
  maxWidth: "none",
  fontSize: "14px",
  lineHeight: "1.6"
});

// Heading Styles
const heading1Style = css({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#0F0F0F",
  marginBottom: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px"
});

const heading2Style = css({
  fontSize: "20px",
  fontWeight: "bold",
  color: "#0F0F0F",
  marginBottom: "12px",
  lineHeight: "130%",
  letterSpacing: "-0.4px"
});

const heading3Style = css({
  fontSize: "16px",
  fontWeight: "bold",
  color: "#0F0F0F",
  marginBottom: "8px",
  lineHeight: "130%",
  letterSpacing: "-0.4px"
});

// Text Styles
const paragraphStyle = css({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "160%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)",
  marginBottom: "16px"
});

const strongStyle = css({
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.8)"
});

const emphasisStyle = css({
  fontStyle: "italic",
  color: "rgba(0, 0, 0, 0.8)"
});

// List Styles
const unorderedListStyle = css({
  listStyleType: "disc",
  listStylePosition: "inside",
  marginBottom: "16px",
  "& > li": {
    marginTop: "4px",
    marginBottom: "4px"
  }
});

const orderedListStyle = css({
  listStyleType: "decimal",
  listStylePosition: "inside",
  marginBottom: "16px",
  "& > li": {
    marginTop: "4px",
    marginBottom: "4px"
  }
});

const listItemStyle = css({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "160%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)"
});

// Quote Styles
const blockquoteStyle = css({
  borderLeftWidth: "4px",
  borderLeftColor: "#D3D3D3",
  paddingLeft: "16px",
  marginBottom: "16px",
  fontStyle: "italic",
  color: "rgba(0, 0, 0, 0.7)"
});

// Code Styles
const codeBlockStyle = css({
  backgroundColor: "#F5F5F5",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  overflowX: "auto"
});

const codeTextStyle = css({
  fontSize: "14px",
  fontFamily: "monospace",
  color: "#333333"
});

const inlineCodeStyle = css({
  backgroundColor: "#F5F5F5",
  paddingX: "8px",
  paddingY: "4px",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: "monospace",
  color: "#333333"
});

// Link Styles
const linkStyle = css({
  color: "#2563EB",
  textDecoration: "underline",
  _hover: {
    color: "#1E40AF"
  }
});

// Table Styles
const tableWrapperStyle = css({
  overflowX: "auto",
  marginBottom: "16px"
});

const tableStyle = css({
  minWidth: "100%",
  borderCollapse: "collapse",
  border: "1px solid #D3D3D3"
});

const tableHeadStyle = css({
  backgroundColor: "#F9F9F9"
});

const tableHeaderStyle = css({
  border: "1px solid #D3D3D3",
  paddingX: "16px",
  paddingY: "8px",
  textAlign: "left",
  fontWeight: "600",
  color: "#333333"
});

const tableCellStyle = css({
  border: "1px solid #D3D3D3",
  paddingX: "16px",
  paddingY: "8px",
  color: "#555555"
});

// Other Styles
const horizontalRuleStyle = css({
  borderTop: "1px solid #D3D3D3",
  marginY: "24px"
});
