import { ref, computed } from "vue";
import type { GithubDiscussion } from "../types/github";
import type { Ref } from "vue";

export function useDiscussionFilter(discussions: Ref<GithubDiscussion[]>) {
  const selectedCategory = ref<string | null>(null);
  const selectedStatus = ref<"all" | "open" | "closed" | "popular">("popular");

  const isPopular = (discussion: GithubDiscussion) => {
    return discussion.comments.totalCount >= 5 || discussion.upvotes >= 10;
  };

  const categories = computed(() => {
    const categorySet = new Set<string>();
    discussions.value.forEach((discussion) => {
      categorySet.add(discussion.category.name);
    });
    return Array.from(categorySet);
  });

  const filteredDiscussions = computed(() => {
    let filtered = discussions.value;

    if (selectedCategory.value) {
      filtered = filtered.filter(
        (discussion) => discussion.category.name === selectedCategory.value
      );
    }

    if (selectedStatus.value === "popular") {
      filtered = filtered.filter(isPopular);
    }

    if (selectedStatus.value !== "all") {
      filtered = filtered.filter(
        (discussion) =>
          (selectedStatus.value === "closed") === discussion.closed
      );
    }

    return filtered;
  });

  const setCategory = (category: string | null) => {
    selectedCategory.value = category;
  };

  const setStatus = (status: "all" | "open" | "closed" | "popular") => {
    selectedStatus.value = status;
  };

  return {
    filteredDiscussions,
    categories,
    selectedCategory,
    selectedStatus,
    setCategory,
    setStatus
  };
}
