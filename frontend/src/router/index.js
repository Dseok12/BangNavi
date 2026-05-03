import { createRouter, createWebHistory } from "vue-router";
// 향후 src/pages/ 폴더 안에 생성할 메인 페이지 컴포넌트를 불러옵니다.
import HomePage from "../pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  // 나중에 로그인, 마이페이지 등을 여기에 추가합니다.
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
