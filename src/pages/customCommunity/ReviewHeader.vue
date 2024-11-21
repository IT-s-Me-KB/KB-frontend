<script setup>
import { useRouter } from 'vue-router';

// Vue Router 인스턴스 가져오기
const router = useRouter();

// 뒤로 가기 함수
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="fixed-icon" @click="goBack">
    <i class="bi bi-chevron-left"></i>
  </div>
</template>

<style scoped>
.fixed-icon {
  font-family: Arial, sans-serif;
  position: fixed;
  font-size: 24px;
  color: #333;
  z-index: 1000;
  cursor: pointer;
}
</style>
