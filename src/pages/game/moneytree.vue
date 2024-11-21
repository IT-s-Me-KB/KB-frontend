<template>
  <div class="moneytree-page">
    <!-- 닫기 버튼 -->
    <button class="close-button" @click="closePage">x</button>
    
    <!-- 게임 이미지 -->
    <img :src="moneytreeImage" alt="moneytree Image" class="moneytree-image" />
  </div>
</template>

<script>
import moneytreeImage from '/images/moneytreepage.png'; // 실제 이미지 파일 경로로 수정

export default {
  name: 'moneytreePage',
  data() {
    return {
      moneytreeImage, // 불러온 이미지 경로를 사용
    };
  },
  methods: {
    closePage() {
      // 이전 페이지로 이동
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.moneytree-page {
 
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer; /* Pointer cursor to indicate it's clickable */
  overflow: hidden; /* 컨테이너를 벗어나는 이미지 부분 숨기기 */
  padding: 0; /* 패딩 제거 */
  border: none; /* 경계선 제거 */
  background: none; /* 배경색 제거 */
}
.close-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.moneytree-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain; /* 이미지를 비율에 맞춰 표시하며 전체 영역을 채웁니다 */
}
</style>
