<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청하신 주소가 잘못되었거나 삭제되었습니다.</p>
    <router-link to="/" class="home-btn">메인으로 돌아가기</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 100px 0;
}
.not-found h1 {
  font-size: 80px;
  color: #4b6eed;
  margin-bottom: 20px;
}
.not-found h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
.not-found p {
  color: #666;
  margin-bottom: 30px;
}
.home-btn {
  display: inline-block;
  padding: 10px 24px;
  background-color: #111;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
}
</style>
