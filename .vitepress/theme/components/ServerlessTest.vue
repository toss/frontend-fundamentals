<template>
  <div class="serverless-test">
    <h2>Todo 목록</h2>
    <p v-if="loading">로딩 중...</p>
    <p v-else-if="error">오류 발생: {{ error }}</p>
    <ol v-else-if="data.length > 0">
      <li v-for="item in data" :key="item.id">{{ item.title }}</li>
    </ol>
    <p v-else>데이터가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const data = ref([]);
const loading = ref(true);
const error = ref(null);

// 현재 환경이 개발 환경인지 프로덕션 환경인지 확인하는 함수
const isDevelopment = () => {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

onMounted(async () => {
  try {
    console.log("데이터 로딩 시작");

    const apiUrl = isDevelopment()
      ? "https://jsonplaceholder.typicode.com/todos"
      : "/api/get";

    console.log("API 요청 URL:", apiUrl);

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    };

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const result = await response.json();
    console.log("원본 응답 데이터:", result);

    if (Array.isArray(result)) {
      data.value = result;
    } else {
      data.value = Array.isArray(result) ? result : [];
    }

    console.log("처리된 데이터:", data.value);
  } catch (err) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

watch(data, (newData) => {
  console.log("데이터 변경됨:", newData);
});
</script>

<style scoped>
.serverless-test {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style>
