import { ref, computed } from "vue";
import type { GithubDiscussion } from "../types/github";
import type { Ref } from "vue";

export function useDiscussionFilter(discussions: Ref<GithubDiscussion[]>) {
  const selectedCategory = ref<string | null>(null);

  const categories = computed(() => {
    const uniqueCategories = new Set(
      discussions.value.map((discussion) => discussion.category.name)
    );
    return Array.from(uniqueCategories);
  });

  const filteredDiscussions = computed(() => {
    if (!selectedCategory.value) return discussions.value;
    return discussions.value.filter(
      (discussion) => discussion.category.name === selectedCategory.value
    );
  });

  const setCategory = (category: string | null) => {
    selectedCategory.value = category;
  };

  return {
    categories,
    selectedCategory,
    filteredDiscussions,
    setCategory
  };
}
