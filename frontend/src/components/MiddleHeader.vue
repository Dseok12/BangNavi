<template>
  <header class="middle__header-wrap">
    <div class="middle__header--inner">
      <nav class="menu-wrap">
        <ul class="menu-box">
          <li>
            <router-link :to="{ name: 'RegionalReview' }"
              >지역별 후기</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'RecommendRealty' }"
              >추천부동산</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'SafeJeonse' }">안전전세</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'OwnerDirect' }">집주인직접</router-link>
          </li>
          <li><router-link :to="{ name: 'Signup' }">회원가입</router-link></li>
          <!--나중에 분기 처리 할 예정
          <li>
            <router-link :to="{ name: 'Mypage' }">마이페이지</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Logout' }">로그아웃</router-link>
          </li>
          -->
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import "@css/components/header.css";
export default {};
</script>
<style></style>
