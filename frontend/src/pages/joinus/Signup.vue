<template>
  <div class="signup-page-wrap">
    <div class="signup-container--inner">
      <h2 class="signup-title">방네비 회원가입</h2>

      <form @submit.prevent="handleSignup" class="signup-form">
        <div class="form-section">
          <label>아이디</label>
          <input
            type="text"
            v-model="form.userId"
            placeholder="아이디를 입력하세요"
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
            <label
              ><input type="radio" v-model="form.role" value="USER" />
              일반사용자</label
            >
            <label
              ><input type="radio" v-model="form.role" value="OWNER" />
              집주인</label
            >
            <label
              ><input type="radio" v-model="form.role" value="AGENT" />
              중개업자</label
            >
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
            <label
              ><input type="checkbox" v-model="agreements.terms" required />
              [필수] 이용약관 동의</label
            >
            <a href="#" class="view-detail">보기</a>
          </div>
          <div class="agree-item">
            <label
              ><input type="checkbox" v-model="agreements.privacy" required />
              [필수] 개인정보 수집 및 이용 동의</label
            >
            <a href="#" class="view-detail">보기</a>
          </div>
          <div class="agree-item">
            <label
              ><input type="checkbox" v-model="agreements.marketing" /> [선택]
              마케팅 정보 수신 동의</label
            >
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

export default {
  name: "Signup",
  data() {
    return {
      form: {
        userId: "",
        password: "",
        email: "",
        role: "USER",
        phone: "",
        address: "",
        gender: "",
      },
      // 💡 인증 관련 데이터 추가
      isEmailSent: false,
      isVerified: false,
      verificationCode: "",
      timer: 180, // 3분 (180초)
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
    // ⏰ 초 단위를 분:초 형식으로 변환
    formattedTime() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  methods: {
    // ✉️ 인증 이메일 발송 요청
    sendVerificationEmail() {
      if (!this.form.email) {
        alert("이메일을 먼저 입력해주세요.");
        return;
      }
      // 실제 구현 시: await axios.post('/auth/email-send', { email: this.form.email });
      alert("인증번호가 발송되었습니다. 메일함을 확인해주세요.");
      this.isEmailSent = true;
      this.startTimer();
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
    // ✅ 인증번호 확인
    confirmVerificationCode() {
      if (this.timer <= 0) {
        alert("인증 시간이 만료되었습니다.");
        return;
      }
      // 실제 구현 시: 백엔드와 번호 대조
      // 지금은 테스트용으로 '123456' 입력 시 성공 처리
      if (this.verificationCode === "123456") {
        alert("인증에 성공했습니다.");
        this.isVerified = true;
        clearInterval(this.timerInterval);
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    },
    toggleAll() {
      const state = this.allAgreed;
      this.agreements.terms = state;
      this.agreements.privacy = state;
      this.agreements.marketing = state;
    },
    handleSignup() {
      if (!this.isVerified) {
        alert("이메일 인증을 완료해주세요.");
        return;
      }
      if (!this.agreements.terms || !this.agreements.privacy) {
        alert("필수 약관에 동의해주세요.");
        return;
      }
      console.log("회원가입 데이터 전송:", this.form);
    },
  },
  beforeUnmount() {
    // 컴포넌트 파괴 시 타이머 정리
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
