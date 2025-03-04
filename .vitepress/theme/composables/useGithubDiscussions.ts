import { ref, onMounted, computed } from "vue";
import type { GithubDiscussion } from "../types/github";
import { useGithubApi } from "./useGithubApi";
import { useDiscussionFilter } from "./useDiscussionFilter";
import { usePagination } from "./usePagination";
import { useSortableData } from "./useSortableData";

interface UseGithubDiscussionsOptions {
  perPage?: number;
}

export function useGithubDiscussions(
  owner: string,
  repo: string,
  options: UseGithubDiscussionsOptions = {}
) {
  const allDiscussions = ref<GithubDiscussion[]>([]);

  const { loading, error, fetchDiscussions } = useGithubApi({
    owner,
    repo,
    token: "_"
  });

  const {
    filteredDiscussions,
    categories,
    selectedCategory,
    selectedStatus,
    setCategory,
    setStatus
  } = useDiscussionFilter(allDiscussions);

  const {
    sortField,
    sortDirection,
    sortedData: sortedDiscussions,
    handleSort
  } = useSortableData<GithubDiscussion>(
    computed(() => filteredDiscussions.value),
    {
      defaultField: null,
      defaultDirection: "desc",
      sortFunctions: {
        upvotes: (a, b) => a.upvotes - b.upvotes
      }
    }
  );

  const {
    currentPage,
    perPage,
    paginatedData: paginatedDiscussions,
    totalCount,
    setPage
  } = usePagination(
    computed(() => sortedDiscussions.value),
    options?.perPage || 20
  );

  const fetchData = async () => {
    try {
      allDiscussions.value = await fetchDiscussions();
    } catch (e) {}
  };

  onMounted(() => {
    fetchData();
  });

  return {
    discussions: paginatedDiscussions,
    loading,
    error,
    totalCount,
    currentPage,
    categories,
    selectedCategory,
    selectedStatus,
    setPage,
    setCategory,
    setStatus,
    sortField,
    sortDirection,
    handleSort
  };
}
