import { useSearchParams } from "react-router-dom";
import { SearchContent } from "@/pages/search/SearchContent";
import { Suspense } from "react";
import { css } from "@styled-system/css";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <Suspense
      fallback={<div className={loadingFallback}>Loading...</div>}
    >
      <SearchContent query={query} />
    </Suspense>
  );
}

// Semantic style definitions
const loadingFallback = css({
  display: 'flex',
  justifyContent: 'center',
  padding: '2rem'
});
