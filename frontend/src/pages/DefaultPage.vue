<template>
  <div class="default-page-wrap">
    <div class="default-page--inner">
      <h2 class="page-title">현재 페이지 경로: {{ currentPath }}</h2>
      <p class="page-desc">
        이곳은 본문 영역입니다.<br />
        추후 <b>{{ currentPath }}</b> 에 해당하는 전용 컴포넌트를 만들어
        router.js에 연결할 예정입니다.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultPage",
  computed: {
    // Vue Router에서 현재 경로 값을 가져옴
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #333;
}
.page-desc {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}
</style>
