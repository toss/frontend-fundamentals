import { useSearchParams } from "react-router-dom";
import { SearchContent } from "@/pages/search/SearchContent";
import { Suspense } from "react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <Suspense
      fallback={<div className="flex justify-center p-8">Loading...</div>}
    >
      <SearchContent query={query} />
    </Suspense>
  );
}
