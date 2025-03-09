<template>
  <div class="widget-container">
    <div class="header">내 계좌 잔액</div>
    <!-- 계좌 선택 리스트 박스 -->
    <select class="account-list" v-model="selectedAccount" @change="updateBalance">
      <option v-for="account in accounts" :key="account.accountNumber" :value="account">
        {{account.accountType}} 통장 :  {{ account.accountNumber }}
      </option>
    </select>
    <!-- 선택된 계좌 잔액 -->
    <div class="balance">{{formattedBalance }}</div>
    <button class="action-button" @click="showDetails">자세히</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Widget",
  data() {
    return {
      accounts: [], // 계좌 목록 데이터
      selectedAccount: null, // 선택된 계좌
      balance: 0, // 선택된 계좌의 잔액
    };
  },
  computed: {
    // 잔액을 '₩1,234,567' 형식으로 포맷
    formattedBalance() {
      return `${this.balance.toLocaleString()}원`;
    },
  },
  methods: {
    // '자세히' 버튼 클릭 시 알림
    showDetails() {
      if (this.selectedAccount) {
        alert(`계좌 상세 보기: ${this.selectedAccount.accountName}`);
      } else {
        alert("계좌를 선택하세요.");
      }
    },
    // 서버에서 계좌 목록 및 잔액 데이터 가져오기
    async fetchBalance() {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);
      const userNum = userData.userNum;

      try {
        const response = await axios.get(
            `http://localhost:8080/api/account/list?userNum=${userNum}`
        );
        if (response.status === 200) {
          this.accounts = response.data; // 서버에서 받은 계좌 목록
          if (this.accounts.length > 0) {
            this.selectedAccount = this.accounts[0]; // 기본으로 첫 번째 계좌 선택
            this.balance = this.selectedAccount.balance; // 첫 번째 계좌 잔액 설정
          }
        } else {
          console.error("데이터를 가져오는 데 실패했습니다.");
          alert("잔액 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류:", error);
        alert("API 호출 중 오류가 발생했습니다.");
      }
    },
    // 선택된 계좌의 잔액 업데이트
    updateBalance() {
      if (this.selectedAccount) {
        this.balance = this.selectedAccount.balance;
      } else {
        this.balance = 0;
      }
    },
  },
  mounted() {
    this.fetchBalance(); // 컴포넌트가 마운트될 때 API 호출
  },
};
</script>

<style scoped>
.widget-container {
  width: 360px;
  height: 196.25px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.header {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.account-list {
  font-size: 12px;
  padding: 4px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
}

.balance {
  font-size: 18px;
  color: #28a745; /* 잔액 표시 색상 */
  margin-bottom: 8px;
}

.action-button {
  font-size: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #0056b3; /* 버튼 hover 효과 */
}
</style>
