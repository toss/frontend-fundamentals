import { ref, computed } from "vue";
import type { Ref } from "vue";

export function usePagination<T>(data: Ref<T[]>, itemsPerPage: number) {
  const currentPage = ref(1);
  const perPage = ref(itemsPerPage);

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return data.value.slice(start, end);
  });

  const totalCount = computed(() => data.value.length);

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  return {
    currentPage,
    perPage,
    paginatedData,
    totalCount,
    setPage
  };
}
