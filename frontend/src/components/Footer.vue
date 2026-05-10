<template>
  <footer class="footer--wrap">
    <div class="footer--inner">
      <div class="footer-content">
        <div class="footer-brand">
          <h2 class="footer-logo-txt">BangNavi</h2>
          <p class="footer-copy">
            &copy; 2026 방네비(BangNavi) | 친절한 부동산 중개업자 찾기 플랫폼<br />
            All rights reserved.
          </p>
        </div>

        <nav class="footer-nav">
          <ul class="footer-nav-list">
            <li>
              <router-link :to="{ name: 'CompanyInfo' }">회사소개</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Terms' }">이용약관</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'PrivacyPolicy' }" class="highlight"
                >개인정보처리방침</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'ServiceInfo' }" class="highlight"
                >서비스소개</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'CsCenter' }">고객센터</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Announcement' }">공지사항</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
// 기존에 작성된 footer.css를 그대로 활용합니다.
import "@css/components/footer.css";

export default {
  name: "Footer",
};
</script>
