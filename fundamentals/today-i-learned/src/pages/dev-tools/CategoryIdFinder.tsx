/**
 * 개발자 도구: 카테고리 ID 찾기
 *
 * 사용법:
 * 1. 개발 서버 실행: yarn dev
 * 2. 브라우저에서 /dev-tools/category-id 접속
 * 3. 카테고리 이름 입력 또는 전체 목록 확인
 * 4. categoryId를 복사해서 사용
 *
 * 주의: 이 페이지는 개발 전용이며, production 빌드에서는 제외되어야 합니다.
 */

import { useState } from "react";
import { useRepositoryInfo } from "@/api/hooks/useDiscussions";
import { ENV_CONFIG } from "@/utils/env";

export function CategoryIdFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: repoInfo, isLoading, error } = useRepositoryInfo();

  const filteredCategories = repoInfo?.categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        height: "100%",
        overflow: "auto"
      }}
    >
      <h1>🔍 GitHub Discussion Category ID Finder</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Repository: {ENV_CONFIG.GITHUB_OWNER}/{ENV_CONFIG.GITHUB_REPO}
      </p>

      {isLoading && <p>Loading categories...</p>}
      {error && (
        <div style={{ color: "red", padding: "1rem", background: "#fee" }}>
          Error: {error.message}
        </div>
      )}

      {repoInfo && (
        <>
          <div style={{ marginBottom: "2rem" }}>
            <input
              type="text"
              placeholder="Search category name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "2px solid #ddd",
                borderRadius: "8px"
              }}
            />
          </div>

          <div>
            <h2>Categories ({filteredCategories?.length || 0})</h2>
            {filteredCategories?.map((category) => (
              <div
                key={category.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  background: "#f9f9f9"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "0.5rem"
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 0.5rem 0" }}>{category.name}</h3>
                    {category.description && (
                      <p
                        style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}
                      >
                        {category.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(category.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#0066cc",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  >
                    Copy ID
                  </button>
                </div>
                <div
                  style={{
                    background: "#333",
                    color: "#0f0",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    wordBreak: "break-all"
                  }}
                >
                  {category.id}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "#ffe",
              border: "1px solid #ee6",
              borderRadius: "8px"
            }}
          >
            <h3>💡 사용 방법</h3>
            <ol style={{ marginBottom: 0 }}>
              <li>위에서 원하는 카테고리를 찾습니다</li>
              <li>"Copy ID" 버튼을 클릭해서 ID를 복사합니다</li>
              <li>코드에서 해당 ID를 사용합니다</li>
            </ol>
          </div>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#eef",
              border: "1px solid #99c",
              borderRadius: "8px"
            }}
          >
            <h4>📝 코드 예시</h4>
            <pre
              style={{
                background: "#333",
                color: "#0f0",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto"
              }}
            >
              {`// src/constants/categories.ts
export const DISCUSSION_CATEGORIES = {
  TODAY_I_LEARNED: {
    name: "Today I Learned",
    id: "${filteredCategories?.[0]?.id || "CATEGORY_ID_HERE"}"
  }
} as const;`}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
