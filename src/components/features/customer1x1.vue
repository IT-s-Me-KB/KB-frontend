<template>
  <div class="widget-container" @click="showDetails">
    <img :src="customerImage" alt="customer icon" class="customer-icon" />
  </div>
</template>

<script>
import customerImage from '/images/customer.png'; 

export default {
  name: 'Widget',
  data() {
    return {
      customerImage, // Imported image
    };
  },
  methods: {
    showDetails() {
      
      this.$router.push('/customer'); 
    },
  },
};

</script>

<style scoped>
.widget-container {
  width: 90px;
  height: 98.125px;
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

.customer-icon {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 꽉 차도록 조정하며 비율 유지 */
}
</style>
