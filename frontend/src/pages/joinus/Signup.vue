<template>
  <div class="signup-page-wrap">
    <div class="signup-container--inner">
      <h2 class="signup-title">방네비 회원가입</h2>

      <form @submit.prevent="handleSignup" class="signup-form">
        <div class="form-section">
          <label>이름 또는 닉네임</label>
          <input
            type="text"
            v-model="form.name"
            placeholder="이름 또는 닉네임을 입력하세요"
            required
          />

          <label>비밀번호</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="비밀번호(8자 이상)"
            required
          />

          <label>이메일</label>
          <div class="input-with-btn">
            <input
              type="email"
              v-model="form.email"
              placeholder="example@bangnavi.com"
              :disabled="isVerified"
              required
            />
            <button
              type="button"
              @click="sendVerificationEmail"
              class="inner-btn"
              :disabled="isEmailSent || isVerified"
            >
              {{ isEmailSent ? "재발송" : "인증요청" }}
            </button>
          </div>

          <div v-if="isEmailSent && !isVerified" class="verify-code-section">
            <div class="input-with-btn">
              <input
                type="text"
                v-model="verificationCode"
                placeholder="인증번호 6자리 입력"
                maxlength="6"
              />
              <button
                type="button"
                @click="confirmVerificationCode"
                class="inner-btn success"
              >
                확인
              </button>
            </div>
            <p class="timer-txt" v-if="timer > 0">
              남은 시간: {{ formattedTime }}
            </p>
            <p class="timer-txt expired" v-else>
              인증 시간이 만료되었습니다. 다시 시도해주세요.
            </p>
          </div>
          <p class="verify-success-txt" v-if="isVerified">
            ✅ 이메일 인증이 완료되었습니다.
          </p>
        </div>

        <div class="form-section">
          <label>회원 유형</label>
          <div class="radio-group">
            <label>
              <input type="radio" v-model="form.role" value="USER" />
              일반사용자
            </label>
            <label>
              <input type="radio" v-model="form.role" value="LESSOR" />
              집주인
            </label>
            <label>
              <input type="radio" v-model="form.role" value="REALTOR" />
              중개업자
            </label>
          </div>
        </div>

        <div class="form-section">
          <label>휴대전화 번호</label>
          <input
            type="tel"
            v-model="form.phone"
            placeholder="010-0000-0000"
            required
          />
          <label>주소</label>
          <input
            type="text"
            v-model="form.address"
            placeholder="기본 주소를 입력하세요"
          />
          <label>성별</label>
          <select v-model="form.gender">
            <option value="">선택 안함</option>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </div>

        <div class="agreement-section">
          <div class="agree-all">
            <label>
              <input type="checkbox" v-model="allAgreed" @change="toggleAll" />
              <strong>방네비 이용약관 전체 동의</strong>
            </label>
          </div>
          <hr />
          <div class="agree-item">
            <label>
              <input type="checkbox" v-model="agreements.terms" required />
              [필수] 이용약관 동의
            </label>
            <a href="#" class="view-detail">보기</a>
          </div>
          <div class="agree-item">
            <label>
              <input type="checkbox" v-model="agreements.privacy" required />
              [필수] 개인정보 수집 및 이용 동의
            </label>
            <a href="#" class="view-detail">보기</a>
          </div>
          <div class="agree-item">
            <label>
              <input type="checkbox" v-model="agreements.marketing" /> [선택]
              마케팅 정보 수신 동의
            </label>
          </div>
        </div>

        <button type="submit" class="signup-submit-btn" :disabled="!isVerified">
          가입하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import "@css/pages/signup.css";
// 🔌 공통 Axios 설정 임포트 완료
import api from "@/api/index.js";

export default {
  name: "Signup",
  data() {
    return {
      form: {
        name: "", // 백엔드 DTO 규격 일치화
        password: "",
        email: "",
        role: "USER", // USER, LESSOR, REALTOR
        phone: "",
        address: "",
        gender: "",
      },
      isEmailSent: false,
      isVerified: false,
      verificationCode: "",
      timer: 180,
      timerInterval: null,

      agreements: {
        terms: false,
        privacy: false,
        marketing: false,
      },
      allAgreed: false,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  methods: {
    // ✉️ 1. 우회 탑재된 백엔드 인증코드 메모리 적재 호출
    async sendVerificationEmail() {
      if (!this.form.email) {
        alert("이메일을 먼저 입력해주세요.");
        return;
      }
      try {
        const response = await api.post("/users/verify/send", {
          email: this.form.email,
        });
        // 우회 시스템 가동으로 백엔드에서 성공 메시지가 돌아옵니다.
        alert(response.data.message);
        this.isEmailSent = true;
        this.startTimer();
      } catch (error) {
        console.error("이메일 발송 에러:", error);
        alert(
          error.response?.data?.message || "인증 요청 중 오류가 발생했습니다.",
        );
      }
    },
    // ⏱ 타이머 시작
    startTimer() {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timer = 180;
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },
    // ✅ 2. 백엔드 메모리 맵 서고에 대조 검증 수행
    async confirmVerificationCode() {
      if (this.timer <= 0) {
        alert("인증 시간이 만료되었습니다. 다시 인증요청을 눌러주세요.");
        return;
      }
      try {
        const response = await api.post("/users/verify/check", {
          email: this.form.email,
          code: this.verificationCode, // 사용자가 터미널에서 확인하고 친 대소문자 문자열 전송
        });
        alert(response.data.message || "이메일 인증에 성공했습니다.");
        this.isVerified = true;
        clearInterval(this.timerInterval);
      } catch (error) {
        alert(error.response?.data?.message || "인증번호가 일치하지 않습니다.");
      }
    },
    toggleAll() {
      const state = this.allAgreed;
      this.agreements.terms = state;
      this.agreements.privacy = state;
      this.agreements.marketing = state;
    },
    // 🚀 3. 최종 회원가입 승인 및 DB 저장 연동
    async handleSignup() {
      if (!this.isVerified) {
        alert("이메일 인증을 완료해주세요.");
        return;
      }
      if (!this.agreements.terms || !this.agreements.privacy) {
        alert("필수 약관에 동의해주세요.");
        return;
      }

      try {
        const response = await api.post("/users/signup", this.form);
        alert(response.data.message || "방네비 회원가입이 완료되었습니다!");
        this.$router.push("/login"); // 성공 시 부드럽게 로그인 화면 이동
      } catch (error) {
        console.error("회원가입 최종 실패 에러:", error);
        alert(
          error.response?.data?.message ||
            "회원가입 서류 검증 실패. 필드를 다시 확인하세요.",
        );
      }
    },
  },
  beforeUnmount() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  },
  watch: {
    agreements: {
      deep: true,
      handler() {
        const { terms, privacy, marketing } = this.agreements;
        this.allAgreed = terms && privacy && marketing;
      },
    },
  },
};
</script>
