<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useData } from "vitepress";
import { useGithubApi } from "../composables/useGithubApi";
import { convertMarkdownToHtml } from "../utils/markdown";

const { site } = useData();

const { loading, error, fetchDiscussionDetail } = useGithubApi({
  owner: "toss",
  repo: "frontend-fundamentals"
});

const discussion = ref<any>(null);

const getDiscussionIdFromUrl = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get("id");
};

watchEffect(async () => {
  const discussionId = getDiscussionIdFromUrl();

  if (!discussionId) {
    throw new Error("토론 ID가 제공되지 않았습니다.");
  }

  try {
    discussion.value = await fetchDiscussionDetail(Number(discussionId));
  } catch (e) {
    console.error("Discussion detail fetch error:", e);
  }
});
</script>

<template>
  <div class="discussion-detail">
    <div v-if="loading" class="loading">로딩 중...</div>

    <div v-else-if="error" class="error">
      {{ error.message }}
    </div>

    <div v-else-if="discussion" class="discussion-content">
      <h1>{{ discussion.title }}</h1>

      <div class="discussion-metadata">
        <span>작성자: {{ discussion.author.login }}</span>
        <span
          >작성일:
          {{ new Date(discussion.createdAt).toLocaleDateString("ko-KR") }}</span
        >
      </div>

      <div
        class="discussion-body vp-doc"
        v-html="convertMarkdownToHtml(discussion.body)"
      />

      <div class="comments" v-if="discussion.comments.nodes.length > 0">
        <h3>댓글 ({{ discussion.comments.totalCount }})</h3>
        <template
          v-for="comment in discussion.comments.nodes"
          :key="comment.id"
        >
          <!-- 대댓글이 아닌 최상위 댓글만 표시 -->
          <div v-if="!comment.replyTo" class="comment-thread">
            <!-- 메인 댓글 -->
            <div class="comment">
              <div class="comment-metadata">
                <span>{{ comment.author.login }}</span>
                <span>{{
                  new Date(comment.createdAt).toLocaleDateString("ko-KR")
                }}</span>
                <span v-if="comment.upvotes > 0" class="upvotes">
                  👍 {{ comment.upvotes }}
                </span>
              </div>
              <div
                class="comment-body vp-doc"
                v-html="convertMarkdownToHtml(comment.body)"
              ></div>
            </div>

            <!-- 대댓글 목록 -->
            <template v-if="comment.replies?.nodes.length > 0">
              <div
                v-for="reply in comment.replies.nodes"
                :key="reply.id"
                class="comment comment-reply"
              >
                <div class="comment-metadata">
                  <span>{{ reply.author.login }}</span>
                  <span>{{
                    new Date(reply.createdAt).toLocaleDateString("ko-KR")
                  }}</span>
                  <span v-if="reply.upvotes > 0" class="upvotes">
                    👍 {{ reply.upvotes }}
                  </span>
                  <span class="reply-to">
                    ↪️ {{ reply.replyTo.author.login }}님에게 답글
                  </span>
                </div>
                <div
                  class="comment-body vp-doc"
                  v-html="convertMarkdownToHtml(reply.body)"
                ></div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discussion-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 1.1em;
}

.error {
  color: var(--vp-c-danger);
}

.discussion-metadata {
  color: var(--vp-c-text-2);
  margin: 10px 0 20px;
}

.discussion-metadata span {
  margin-right: 15px;
}

.discussion-body {
  margin: 20px 0;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.comments {
  margin-top: 40px;
  border-top: 1px solid var(--vp-c-divider);
}

.comment-thread {
  margin: 20px 0;
  border: none;
}

.comment {
  margin: 20px 0;
  padding: 15px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.comment-metadata {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
}

.comment-metadata span {
  margin-right: 10px;
}

.comment-body {
  color: var(--vp-c-text-1);
}

/* VitePress 마크다운 스타일 오버라이드 */
:deep(.vp-doc) {
  /* 마크다운 컨테이너 내부의 첫 번째 요소의 상단 마진 제거 */
  > :first-child {
    margin-top: 0;
  }

  /* 마크다운 컨테이너 내부의 마지막 요소의 하단 마진 제거 */
  > :last-child {
    margin-bottom: 0;
  }

  /* 코드 블록 스타일 조정 */
  pre {
    border-radius: 6px;
    margin: 16px 0;
  }

  /* 인라인 코드 스타일 조정 */
  code {
    font-size: 0.9em;
    padding: 2px 6px;
    background: var(--vp-c-bg-mute);
    border-radius: 4px;
  }
}

.upvotes {
  color: var(--vp-c-green);
}

.comment-reply {
  position: relative;
  background: var(--vp-c-bg-alt);
  margin-left: 2rem;
  border-left: 2px solid var(--vp-c-divider);
  padding-left: 1rem;
}

.reply-to {
  font-size: 0.9em;
  color: var(--vp-c-text-3);
}

:deep(.code-block-wrapper) {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-code-block-bg);
}

:deep(.code-block-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--vp-code-block-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

:deep(.code-block-lang) {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
}

:deep(.code-block-wrapper pre) {
  margin: 0;
  padding: 1rem;
  background: var(--vp-code-block-bg);
}

:deep(.code-block-wrapper code) {
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
