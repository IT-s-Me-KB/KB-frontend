<template>
  <div class="container">
    <br />
    <div class="conr">
      <h3><b>테마 스토어</b></h3>
      <button @click="openShareModal">내 커스텀 공유하기</button>
    </div>
    <br />
    <!-- 이번주 인기 커스텀 -->
    <div class="section">
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <h4 class="popular-title">이번주 인기 커스텀</h4>
      <br />
      <Swiper
        :modules="[Autoplay]"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        class="product-swiper"
        :slidesPerView="3"
      >
        <SwiperSlide
          v-for="custom in popularCustoms"
          :key="custom.sharedID"
          @click="navigateToDetailPage(custom.sharedID)"
        >
          <div class="content-item">
            <div class="image">
              <img
                class="photo"
                :src="getImageUrl(custom.imagePath)"
                alt="Custom Image"
              />
            </div>
            <div class="text">
              <h5 class="d-inline page-name">
                {{ truncatedPageName(custom.pageName) }}
              </h5>
              <p class="d-inline">❤️ {{ custom.heart }}</p>
              <!-- Heart 수 표시 -->
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 커스텀 목록 -->
    <div class="section">
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div class="section-header" @click="customList">
        <h4 class="popular-title">커스텀 목록</h4>
        <i class="bi bi-chevron-right"></i>
      </div>
      <br />
      <Swiper
        :modules="[Autoplay]"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        class="product-swiper"
        :slidesPerView="3"
      >
        <SwiperSlide
          v-for="custom in otherCustoms"
          :key="custom.sharedID"
          @click="navigateToDetailPage(custom.sharedID)"
          class="content-item"
        >
          <div class="image">
            <img
              class="photo"
              :src="getImageUrl(custom.imagePath)"
              alt="Custom Image"
            />
          </div>
          <div class="text">
            <h5 class="d-inline page-name">
              {{ truncatedPageName(custom.pageName) }}
            </h5>
            <p class="d-inline">❤️ {{ custom.heart }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <!-- 공유 모달 -->
  <div
    v-if="showShareModal"
    class="modal-overlay"
    @click.self="closeShareModal"
  >
    <div class="modal-content">
      <span class="close-button" @click="closeShareModal">&times;</span>
      <h3>커스텀 공유하기</h3>
      <p>아래 옵션을 통해 커스텀을 공유하세요</p>
      <div class="share-options">
        <input
          type="text"
          v-model="pageName"
          placeholder="제목을 입력하세요"
          @keyup.enter="fetchShare"
        />
        <button
          @click="fetchShare"
          :disabled="!pageName.trim()"
          class="share-button"
        >
          공유하기
        </button>
      </div>
      <div v-if="shareSuccess" class="share-success">
        공유가 완료되었습니다!
      </div>
      <div v-if="shareError" class="share-error">
        공유에 실패했습니다. 다시 시도해주세요.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';

// 라우터 인스턴스
const router = useRouter();

// 모달 상태
const shareSuccess = ref(false);
const shareError = ref(false);

// 공유 데이터
const pageName = ref('');

// 이미지 URL 생성 함수
const getImageUrl = (imagePath) => {
  const baseUrl = 'http://localhost:8080';
  return imagePath
    ? `${baseUrl}/${imagePath}`
    : `${baseUrl}/images/default-image.jpeg`;
};

// 상태 관리
const errorMessage = ref(''); // 에러 메시지
const isLoading = ref(false); // 로딩 상태
const customs = ref([]); // 커스텀 커뮤니티 데이터
const customDetail = ref([]);

// 모달 상태
const showShareModal = ref(false);

// 인기 커스텀 (heart 수 기준 내림차순 정렬 후 상위 3개)
const popularCustoms = computed(() => {
  return [...customs.value].sort((a, b) => b.heart - a.heart).slice(0, 3);
});

// 기타 커스텀 (상위 3개 제외)
const otherCustoms = computed(() => {
  return [...customDetail.value].sort((a, b) => b.heart - a.heart).slice(3);
});

// 데이터 불러오기
const fetchGetCustomPage = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.get('/api/community/pages');
    customs.value = response.data; // 응답 데이터가 배열이라고 가정
    console.log(customs.value);
    if (Array.isArray(response.data) && response.data.length > 0) {
      customDetail.value = response.data;
    } else {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('GET 요청 에러: ', error);
    errorMessage.value = '데이터를 불러오는 데 실패했습니다.';
  } finally {
    isLoading.value = false;
  }
};

const fetchShare = async () => {
  if (!pageName.value.trim()) {
    return;
  }
  const pageDataString = localStorage.getItem('customPageData');
  const pageData = JSON.parse(pageDataString);
  console.log(pageData);
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.post(
      `/api/community/pages/share?pageName=${encodeURIComponent(
        pageName.value
      )}`,
      pageData
    );
    if (response.status === 204) {
      shareSuccess.value = true;
      // 공유 성공 후 추가 동작 (예: 모달 닫기, 페이지 리프레시 등)
      closeShareModal();
    } else {
      throw new Error('공유에 실패했습니다.');
    }
  } catch (error) {
    console.error('POST 요청 에러: ', error);
    shareError.value = true;
  } finally {
    isLoading.value = false;
  }
};

// 모달 열기
const openShareModal = () => {
  showShareModal.value = true;
};

// 모달 닫기
const closeShareModal = () => {
  showShareModal.value = false;
  shareSuccess.value = false; // 성공 메시지 초기화
  shareError.value = false; // 에러 메시지 초기화
};

// 상세 페이지로 이동
const navigateToDetailPage = (id) => {
  if (id) {
    router.push(`/detailPage/${id}`);
  } else {
    alert('유효하지 않은 페이지 ID입니다.');
  }
};

// 커스텀 목록으로 이동
const customList = () => {
  router.push(`/customList`);
};
const truncatedPageName = (name) => {
  if (name.length > 4) {
    return name.substring(0, 4) + '..';
  }
  return name;
};

// 컴포넌트 마운트 시 데이터 불러오기
onMounted(() => {
  fetchGetCustomPage();
});
</script>

<style scoped>
.conr {
  display: flex;
  justify-content: space-between; /* 요소들을 양 끝으로 배치 */
  align-items: center; /* 요소들을 수직으로 중앙 정렬 */
}

button {
  font-size: 16px;
  border: none;
  background-color: #ffcc00;
  padding: 10px;
  cursor: pointer;
  border-radius: 20px;
  color: white;
}

.section-header {
  display: flex;
  justify-content: space-between; /* 좌우 공간을 균등 분배 */
  align-items: center; /* 수직 중앙 정렬 */
}

.section-header h4 {
  font-size: 1.2em;
  margin: 0; /* 기본 여백 제거 */
}

.section-header .bi {
  font-size: 1.5em; /* 아이콘 크기 조정 */
  cursor: pointer;
}

/* 컨테이너 스타일 */
.container {
  padding: 60px 20px 20px;
  font-family: Arial, sans-serif;
}

/* 텍스트 스타일 */
.popular-title {
  margin: 0;
  font-size: 1.2em;
}

/* 슬라이드 내용 아이템 스타일 */
.content-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.content-item .image {
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
}

.content-item .image img {
  width: 72px;
  height: 114px;
}

.photo {
  border: 2px solid #eaeaea; /* 하얀색 테두리 추가 */
  border-radius: 10px;
}

.content-item .text {
  text-align: center;
}

.page-name {
  max-width: 60px; /* 최대 너비 설정 */
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분을 ...으로 표시 */
  display: inline-block; /* 요소를 인라인 블록으로 설정 */
  vertical-align: middle; /* 수직 정렬 조정 */
}

.content-item .text h5 {
  margin: 0;
  font-size: 1em;
}

.content-item .text p {
  margin: 5px 0 0 0;
  color: #ff4d4f;
}

/* Swiper 슬라이드 스타일 */
.product-swiper {
  width: 100%;
  height: 180px; /* 원하는 높이로 조정 */
}

/* 커스텀 목록 스타일 */
.section {
}

.content-list .content-item {
  display: flex;
  padding: 10px;
  border-radius: 10px;
}

.content-list .content-item .image {
  width: 72px;
  height: 114px;
  border: 1px solid #eef4f9;
}

.content-list .content-item .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eef4f9;
}

.content-list .content-item .text h5 {
  margin: 0;
  font-size: 1.1em;
}

.content-list .content-item .text p {
  margin: 5px 0 0 0;
  color: #ff4d4f;
}

/* 로딩 오버레이 스타일 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ffcc00; /* 스피너 색상 변경 */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* 로딩 오버레이보다 위에 표시 */
}

.modal-content {
  background: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  position: relative;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5em;
  cursor: pointer;
}

.share-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.share-options input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.share-options .share-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffcc00; /* 버튼 배경색 변경 */
  color: #fff;
  font-size: 1em;
  transition: background-color 0.3s, opacity 0.3s;
}

.share-options .share-button:hover:not(:disabled) {
  background-color: #ffcc00; /* 호버 시 배경색 유지 */
}

.share-options .share-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.share-success {
  margin-top: 15px;
  color: green;
  font-weight: bold;
}

.share-error {
  margin-top: 15px;
  color: red;
  font-weight: bold;
}

@media (max-width: 600px) {
  .page-name {
    max-width: 40px;
  }
}

@media (min-width: 601px) {
  .page-name {
    max-width: 60px;
  }
}
</style>
