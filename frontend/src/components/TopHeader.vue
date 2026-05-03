<template>
  <header class="header-wrap">
    <div class="header--inner">
      <h1 class="BangNaviLogo">
        <router-link :to="{ name: 'Home' }">BangNavi</router-link>
      </h1>
      <p><strong>"친절하고 정성스러운 부동산 중개업자를 찾아서"</strong></p>
    </div>
  </header>
</template>
<script>
import "@css/components/header.css";
export default {};
</script>
<style></style>
