import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = ""
}: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-[#0F0F0F] mb-4 leading-[130%] tracking-[-0.4px]">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-[#0F0F0F] mb-3 leading-[130%] tracking-[-0.4px]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold text-[#0F0F0F] mb-2 leading-[130%] tracking-[-0.4px]">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 mb-4">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-black/80">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-black/80">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 mb-4 italic text-black/70">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");

            if (match) {
              // Code block
              return (
                <pre className="bg-gray-100 rounded-lg p-4 mb-4 overflow-x-auto">
                  <code className="text-sm font-mono text-gray-800" {...props}>
                    {children}
                  </code>
                </pre>
              );
            }

            // Inline code
            return (
              <code
                className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800"
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
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700">
              {children}
            </td>
          ),
          hr: () => <hr className="border-t border-gray-300 my-6" />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
