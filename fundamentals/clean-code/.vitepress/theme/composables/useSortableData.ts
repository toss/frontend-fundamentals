import { ref, computed, type ComputedRef } from "vue";

export type SortDirection = "asc" | "desc";

export interface SortableOptions<T> {
  defaultField?: string | null;
  defaultDirection?: SortDirection;
  sortFunctions?: {
    [K in keyof T]?: (a: T, b: T) => number;
  };
}

export function useSortableData<T>(
  data: ComputedRef<T[] | undefined>,
  options: SortableOptions<T> = {}
) {
  const sortField = ref<string | null>(options.defaultField ?? null);
  const sortDirection = ref<SortDirection>(options.defaultDirection ?? "desc");

  const sortedData = computed(() => {
    if (!data.value || !sortField.value) return data.value;

    return [...data.value].sort((a, b) => {
      const multiplier = sortDirection.value === "asc" ? 1 : -1;

      const sortFn = options.sortFunctions?.[sortField.value as keyof T];
      if (sortFn) {
        return sortFn(a, b) * multiplier;
      }

      const aValue = a[sortField.value as keyof T];
      const bValue = b[sortField.value as keyof T];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * multiplier;
      }

      return 0;
    });
  });

  const handleSort = (field: string) => {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortField.value = field;
      sortDirection.value = "desc";
    }
  };

  return {
    sortField,
    sortDirection,
    sortedData,
    handleSort
  };
}
