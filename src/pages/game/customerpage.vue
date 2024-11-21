<template>
  <div class="customer-page">
    <!-- 닫기 버튼 -->
    <button class="close-button" @click="closePage">x</button>

    <!-- 게임 이미지 -->
    <img :src="customerImage" alt="customer Image" class="customer-image" />
  </div>
</template>

<script>
import customerImage from '/images/customerpage.png'; // 실제 이미지 파일 경로로 수정

export default {
  name: 'customerPage',
  data() {
    return {
      customerImage, // 불러온 이미지 경로를 사용
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
.customer-page {
  position: relative; /* 닫기 버튼과 이미지 배치를 위해 relative로 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  padding-top: 50px; /* 이미지가 화면 위쪽에 더 가까워지도록 여백 줄이기 */
  border: none;
  background: none;
  height: 110vh; /* 전체 화면 높이 설정 */
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

.customer-image {
  margin-top: 10px;
  width: 100%; /* 이미지를 양옆을 꽉 채우도록 설정 */
  height: auto; /* 이미지 비율을 유지하면서 높이 자동 조정 */
  object-fit: cover; /* 이미지가 컨테이너의 너비를 채우도록 설정 */
  max-height: 80%; /* 너무 큰 이미지의 경우 높이 제한 */
}
</style>
