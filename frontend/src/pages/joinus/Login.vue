<template>
  <div class="mainPage-login-widget">
    <p class="login-title">로그인해 주세요.</p>

    <form @submit.prevent="handleLogin" class="login-form-box">
      <input
        type="email"
        v-model="form.email"
        placeholder="이메일 주소"
        class="login-input"
        required
      />
      <input
        type="password"
        v-model="form.password"
        placeholder="비밀번호"
        class="login-input"
        required
      />
      <button type="submit" class="login-btn">로그인</button>
    </form>
  </div>
</template>

<script>
import "@css/pages/login.css";
// 🔌 백엔드(3001번 포트) 주소가 매핑된 Axios 인스턴스 임포트
import api from "@/api/index.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        // 🚪 백엔드의 로그인 우체통으로 데이터 전송
        const response = await api.post("/users/login", this.form);

        // 🎟️ 로그인 성공 시 백엔드가 발급한 JWT 토큰(출입증)을 받아옵니다.
        const token = response.data.accessToken;

        if (token) {
          // 브라우저 창고에 토큰을 저장하여 새로고침해도 로그인 상태가 유지되게 합니다.
          localStorage.setItem("token", token);
          alert(response.data.message || "방네비에 오신 것을 환영합니다!");

          // 메인 페이지로 새로고침(또는 라우터 이동)하여 상태 반영
          this.$router.push("/").then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        console.error("로그인 실패 오류:", error);
        // 백엔드가 보낸 에러 메시지("비밀번호가 틀렸습니다" 등)를 화면에 알림으로 표시
        alert(
          error.response?.data?.message ||
            "아이디 또는 비밀번호를 확인해 주세요.",
        );
      }
    },
  },
};
</script>

<style scoped>
/* 폼 배치를 위해 내부 박스 스타일만 살짝 추가합니다. */
.login-form-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>
