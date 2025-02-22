import { ref, onMounted } from "vue";
import type { GithubDiscussion } from "../types/github";
import { useGithubApi } from "./useGithubApi";
import { useDiscussionFilter } from "./useDiscussionFilter";
import { usePagination } from "./usePagination";

export function useGithubDiscussions(
  owner: string,
  repo: string,
  options?: {
    perPage?: number;
    page?: number;
  }
) {
  const allDiscussions = ref<GithubDiscussion[]>([]);

  const { loading, error, fetchDiscussions } = useGithubApi({
    owner,
    repo,
    token: "_"
  });

  const { filteredDiscussions, categories, selectedCategory, setCategory } =
    useDiscussionFilter(allDiscussions);

  const {
    currentPage,
    perPage,
    paginatedData: discussions,
    totalCount,
    setPage
  } = usePagination(filteredDiscussions, options?.perPage || 20);

  const fetchData = async () => {
    try {
      allDiscussions.value = await fetchDiscussions();
    } catch (e) {}
  };

  onMounted(() => {
    fetchData();
  });

  return {
    discussions,
    loading,
    error,
    totalCount,
    currentPage,
    categories,
    selectedCategory,
    setPage,
    setCategory,
    fetchDiscussions: fetchData
  };
}
