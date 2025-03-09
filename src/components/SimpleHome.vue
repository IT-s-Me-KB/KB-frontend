<template>
  <button class="toggle-btn">간편홈</button>
  <label class="switch">
    <input type="checkbox" v-model="isChecked" @change="navigatePage"/>
    <span class="slider"></span>
  </label>
</template>

<script>
export default {
  name: 'SimpleHome',
  data() {
    return {
      isChecked: false, // 스위치의 체크 상태를 저장하는 데이터 속성
    };
  },
  methods: {
    navigatePage() {
      if (this.isChecked) {
        // 스위치가 체크된 상태일 때 /uiux로 이동
        this.$router.push('/uiux');
      } else {
        // 스위치가 체크 해제된 상태일 때 기본 화면으로 이동
        this.$router.push('/');
      }
    },
  },
  created() {
    // 컴포넌트가 생성될 때 현재 라우터 경로를 기반으로 스위치 상태 초기화
    this.isChecked = this.$route.path === '/uiux';
  },
  watch: {
    // 라우터 경로가 변경될 때마다 스위치 상태를 업데이트
    '$route.path'(newPath) {
      this.isChecked = newPath === '/uiux';
    },
  },
};
</script>

<style>

/* 토글 버튼 */
.toggle-btn {
  background-color: transparent;
  color: #333;
  padding: 10px 3px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  margin-left: 10px;
}

/* 스위치 스타일 */
.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 50px;
  width: 45px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12px;
  width: 12px;
  border-radius: 50px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #fc0;
}

input:checked + .slider:before {
  transform: translateX(25px);
}



</style>