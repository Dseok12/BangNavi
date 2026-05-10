import { createRouter, createWebHistory } from "vue-router";
// 향후 src/pages/ 폴더 안에 생성할 메인 페이지 컴포넌트를 불러옵니다.
import HomePage from "@pages/HomePage.vue";

/* 메뉴 부분 */
import RegionalReviewPage from "@pages/menu/RegionalReview.vue";
import RecommendRealtyPage from "@pages/menu/RecommendRealty.vue";
import SafeJeonsePage from "@pages/menu/SafeJeonse.vue";
import OwnerDirectPage from "@pages/menu/OwnerDirect.vue";

/* 📝 게시글 관련 (추가된 부분) */
import PostDetailPage from "@components/PostDetailPage.vue";
import PostWritePage from "@pages/PostWrite.vue"; // 💡 새로 만든 게시글 작성 페이지

/* 로그인 및 회원가입 */
import Login from "@pages/joinus/Login.vue";
import Signup from "@pages/joinus/Signup.vue";
import Mypage from "@pages/joinus/Mypage.vue";

/* 회사정보 및 소개 및 이용약관 */
import CompanyInfo from "@pages/info/CompanyInfo.vue";
import Terms from "@pages/info/Terms.vue";
import ServiceInfo from "@pages/info/ServiceInfo.vue";
import PrivacyPolicy from "@pages/info/PrivacyPolicy.vue";
import CsCenter from "@pages/info/CsCenter.vue";
import Announcement from "@pages/info/Announcement.vue";

/* 기타 */
import DefaultPage from "@pages/DefaultPage.vue";
import NotFound from "@pages/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },

  /* --- 메뉴 게시판 경로 --- */
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

  /* --- 📝 게시글 상세 및 작성 (핵심 수정) --- */
  { path: "/post/:id", name: "PostDetail", component: PostDetailPage },
  {
    path: "/write",
    name: "PostWrite",
    component: PostWritePage,
  },

  /* --- 로그인 및 회원가입 --- */
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/mypage", name: "Mypage", component: Mypage },

  /* --- 회사정보 및 소개 및 이용약관 --- */
  { path: "/companyinfo", name: "CompanyInfo", component: CompanyInfo },
  { path: "/terms", name: "Terms", component: Terms },
  { path: "/privacypolicy", name: "PrivacyPolicy", component: PrivacyPolicy },
  { path: "/serviceinfo", name: "ServiceInfo", component: ServiceInfo },
  { path: "/cscenter", name: "CsCenter", component: CsCenter },
  { path: "/announcement", name: "Announcement", component: Announcement },

  /* --- 예외 처리 --- */
  { path: "/default", name: "Default", component: DefaultPage },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
