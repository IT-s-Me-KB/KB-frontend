<template>
  <div class="quiz-page">
    <!-- 닫기 버튼 -->
    <button class="close-button" @click="closePage">x</button>
    
    <!-- 게임 이미지 -->
    <img :src="quizImage" alt="quiz Image" class="quiz-image" />
  </div>
</template>

<script>
import quizImage from '/images/quizpage.png'; // 실제 이미지 파일 경로로 수정

export default {
  name: 'quizPage',
  data() {
    return {
      quizImage, // 불러온 이미지 경로를 사용
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
.quiz-page {
  
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

.quiz-image {

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

.quiz-image {
  margin-top:20px;
  width: 100%; /* 이미지를 양옆을 꽉 채우도록 설정 */
  height: auto; /* 이미지 비율을 유지하면서 높이 자동 조정 */
  object-fit: cover; /* 이미지가 컨테이너의 너비를 채우도록 설정 */
  max-height: 80%; /* 너무 큰 이미지의 경우 높이 제한 */
}
</style>
