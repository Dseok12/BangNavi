import { createRouter, createWebHistory } from "vue-router";
// 향후 src/pages/ 폴더 안에 생성할 메인 페이지 컴포넌트를 불러옵니다.
import HomePage from "@pages/HomePage.vue";

/* 메뉴 부분 */
import RegionalReviewPage from "@pages/menu/RegionalReview.vue";
import RecommendRealtyPage from "@pages/menu/RecommendRealty.vue";
import SafeJeonsePage from "@pages/menu/SafeJeonse.vue";
import OwnerDirectPage from "@pages/menu/OwnerDirect.vue";

import PostDetailPage from "@components/PostDetailPage.vue";

import DefaultPage from "@pages/DefaultPage.vue";
import NotFound from "@pages/NotFound.vue";

/* 로그인 및 회원가입 */
import Login from "@pages/joinus/Login.vue";
import Signup from "@pages/joinus/Signup.vue";
import Mypage from "@pages/joinus/Mypage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  /* 메뉴 부분 */
  {
    path: "/regionalreview",
    name: "RegionalReview",
    component: RegionalReviewPage,
  },
  {
    path: "/recommendrealty",
    name: "RecommendRealty",
    component: RecommendRealtyPage,
  },
  { path: "/safejeonse", name: "SafeJeonse", component: SafeJeonsePage },
  { path: "/ownerdirect", name: "OwnerDirect", component: OwnerDirectPage },
  { path: "/post/:id", name: "PostDetail", component: PostDetailPage },

  /* 로그인 및 회원가입 */
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/mypage", name: "Mypage", component: Mypage },

  { path: "/default", name: "Default", component: DefaultPage },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
