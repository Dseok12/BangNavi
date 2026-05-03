<template>
  <main class="mainPage-wrap">
    <div class="mainPage-container--inner">
      <main class="mainPage-content-left">
        <section class="mainPage-post-list-section">
          <h2>실시간 베스트</h2>
          <div class="mainPage-post-list__wrap">
            <div class="mainPage-post-list-title">
              <p class="mainPage-post-item__title">제목</p>
              <div class="mainPage-post-item__infoTxt">
                <p>작성자</p>
                <p>작성날짜</p>
              </div>
            </div>
            <ul class="mainPage-post-list">
              <li
                class="mainPage-post-item"
                v-for="post in recentPosts"
                :key="post.id"
              >
                <p class="mainPage-post-item__title">
                  <router-link
                    :to="{ name: 'PostDetail', params: { id: post.id } }"
                  >
                    [{{ post.category }}] {{ post.title }}
                  </router-link>
                </p>
                <div class="mainPage-post-item__infoTxt">
                  <p>{{ post.author }}</p>
                  <p>{{ post.date }}</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <aside class="mainPage-sidebar-right">
        <div class="mainPage-login-widget">
          <p>로그인해 주세요.</p>
          <button>로그인</button>
        </div>
        <div class="mainPage-banner-widget">광고 넣을 자리</div>
      </aside>
    </div>
  </main>
</template>

<script>
import "@css/pages/home.css";
// 앞서 구성했던 백엔드 통신용 axios 인스턴스를 불러옵니다.
import api from "@api/index.js";

export default {
  name: "HomePage",
  data() {
    return {
      // 화면에 보여줄 게시물 리스트 데이터를 담는 빈 배열
      recentPosts: [],
    };
  },
  // 컴포넌트가 화면에 나타날 때(마운트될 때) 자동으로 실행되는 훅
  mounted() {
    this.fetchRecentPosts();
  },
  methods: {
    async fetchRecentPosts() {
      try {
        // 실제 백엔드가 완성되면 아래 주석을 풀고 사용합니다.
        // const response = await api.get('/posts/recent');
        // this.recentPosts = response.data;

        // 🟢 백엔드 API가 완성되기 전이므로, 프론트엔드 테스트용 가짜(Mock) 데이터를 넣어둡니다.
        // 나중에 이 데이터들이 모든 메뉴에서 작성된 최신 글들로 대체될 것입니다.
        this.recentPosts = [
          {
            id: 101,
            category: "지역별 후기",
            title: "강남구 신축 투룸 투어 다녀왔습니다",
            author: "r***a",
            date: "2026-05-03",
          },
          {
            id: 102,
            category: "안전전세",
            title: "HUG 안심전세대출 승인 후기 공유해요",
            author: "s***e",
            date: "2026-05-03",
          },
          {
            id: 103,
            category: "추천부동산",
            title: "마포구 친절하고 정성스러운 중개사님 추천",
            author: "b***g",
            date: "2026-05-02",
          },
          {
            id: 104,
            category: "집주인직접",
            title: "관악구 수수료 없는 원룸 계약 꿀팁",
            author: "d***t",
            date: "2026-05-01",
          },
          {
            id: 105,
            category: "지역별 후기",
            title: "판교 직장인의 성남 분당구 거주 리얼 후기",
            author: "p***o",
            date: "2026-05-01",
          },
          {
            id: 106,
            category: "지역별 후기",
            title: "양평 직장인의 성남 분당구 거주 리얼 후기",
            author: "v**w",
            date: "2026-05-02",
          },
          {
            id: 107,
            category: "추천부동산",
            title: "판교 직장인의 성남 분당구 거주 리얼 후기",
            author: "t***g",
            date: "2026-03-01",
          },
        ];
      } catch (error) {
        console.error("최신 게시물을 불러오는 중 오류가 발생했습니다.", error);
      }
    },
  },
};
</script>
