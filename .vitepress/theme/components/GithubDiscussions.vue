<script setup lang="ts">
import { computed } from "vue";
import { useGithubDiscussions } from "../composables/useGithubDiscussions";
import { convertGithubEmoji } from "../utils/emoji";

const props = defineProps<{
  owner: string;
  repo: string;
  path?: string;
}>();

const perPage = 20;

const {
  discussions,
  loading,
  error,
  totalCount,
  currentPage,
  categories,
  selectedCategory,
  setPage,
  setCategory
} = useGithubDiscussions(props.owner, props.repo, {
  perPage
});

const totalPages = computed(() => {
  return totalCount.value ? Math.ceil(totalCount.value / perPage) : 0;
});

const handlePageChange = (page: number) => {
  setPage(page);
};

const handleCategoryChange = (category: string | null) => {
  setPage(1);
  setCategory(category);
};

const formatCategory = (category: { name: string; emoji: string }) => {
  const emoji = convertGithubEmoji(category.emoji);
  return `${emoji} ${category.name}`;
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
</script>

<template>
  <div v-if="loading" class="loading">로딩 중...</div>
  <div v-else-if="error" class="error">
    에러가 발생했습니다: {{ error.message }}
  </div>
  <div v-else>
    <div class="filters">
      <div class="category-filter">
        <span class="filter-label">카테고리:</span>
        <button
          class="filter-button"
          :class="{ active: selectedCategory === null }"
          @click="handleCategoryChange(null)"
        >
          전체
        </button>
        <button
          v-for="category in categories"
          :key="category"
          class="filter-button"
          :class="{ active: selectedCategory === category }"
          @click="handleCategoryChange(category)"
        >
          {{ category }}
        </button>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          이전
        </button>

        <span class="page-info"> {{ currentPage }} / {{ totalPages }} </span>

        <button
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          다음
        </button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>카테고리</th>
          <th>댓글</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="discussion in discussions"
          :key="discussion.id"
          class="discussion-item"
          :class="{ 'is-closed': discussion.closed }"
        >
          <td>
            <div class="title-container">
              <a :href="discussion.url" target="_blank">{{
                discussion.title
              }}</a>
              <span v-if="discussion.closed" class="closed-badge">닫힘</span>
              <span v-if="discussion.closed" class="closed-date">
                ({{ formatDate(discussion.closedAt) }})
              </span>
            </div>
          </td>
          <td>
            <a :href="discussion.author.url" target="_blank">{{
              discussion.author.login
            }}</a>
          </td>
          <td>
            <div class="category">
              {{ formatCategory(discussion.category) }}
            </div>
          </td>
          <td>{{ discussion.comments.totalCount }}</td>
          <td>{{ new Date(discussion.createdAt).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.github-discussions {
  margin: 2rem 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

th {
  background-color: var(--vp-c-bg-soft);
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
}

.error {
  color: var(--vp-c-danger);
}

.category {
  display: flex;
  align-items: center;
  gap: 4px;
}

.filters {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.filter-button {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  background-color: var(--vp-c-bg-mute);
}

.filter-button.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-info {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.discussion-item.is-closed {
  opacity: 0.8;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.closed-badge {
  background-color: #d73a49;
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.8em;
}

.closed-date {
  color: #666;
  font-size: 0.9em;
}
</style>
