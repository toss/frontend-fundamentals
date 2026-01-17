// EVAL TASK: Cohesion - Magic Number Duplication
// Expected: Identify that same magic numbers appear in multiple places, should be centralized

// File: components/Pagination.tsx
function Pagination({ total }: { total: number }) {
  const pageSize = 20; // Magic number
  const pages = Math.ceil(total / pageSize);
  return <div>{/* ... */}</div>;
}

// File: hooks/useItems.ts
function useItems(page: number) {
  const offset = (page - 1) * 20; // Same magic number!
  return fetchItems({ offset, limit: 20 });
}

// File: api/items.ts
async function fetchItems(params: { offset: number; limit: number }) {
  // Default page size used here too
  const limit = params.limit || 20;
  return api.get(`/items?offset=${params.offset}&limit=${limit}`);
}

// File: constants.ts (should exist but doesn't)
// export const PAGE_SIZE = 20;
