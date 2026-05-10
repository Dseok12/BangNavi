<template>
  <main class="mainPage-wrap">
    <div class="mainPage-container--inner">
      <main class="mainPage-content-left">
        <section class="mainPage-post-list-section">
          <h2 class="mainPage-recent-best-title">실시간 베스트</h2>
          <HomeRecentList :recentPosts="filteredPosts" />
        </section>
      </main>

      <aside class="mainPage-sidebar-right">
        <Login />
        <div class="mainPage-banner-widget">이벤트 배너 넣을 자리</div>
        <div class="mainPage-banner-widget">광고 배너 넣을 자리</div>
      </aside>
    </div>
  </main>
</template>

<script>
import HomeRecentList from "@components/HomeRecent/HomeRecentList.vue";
// 💡 데이터는 'named export'이므로 { }를 쓰는게 맞습니다.
import { homeRecentData } from "@dataes/HomeRecentData.js";

// 💡 수정된 부분: 컴포넌트는 'default export'이므로 { }를 제거해야 합니다.
import Login from "@pages/joinus/Login.vue";

import "@css/pages/home.css";

export default {
  name: "HomePage",
  components: { HomeRecentList, Login },
  data() {
    return {
      allPosts: [],
    };
  },
  computed: {
    // 📅 요청하신 '최신순 정렬' 로직은 아주 잘 작성되었습니다!
    filteredPosts() {
      return [...this.allPosts]
        .filter((post) => post.category !== "지역별 후기")
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신날짜가 위로 옴
        .slice(0, 30);
    },
  },
  mounted() {
    this.fetchRecentPosts();
  },
  methods: {
    fetchRecentPosts() {
      this.allPosts = homeRecentData;
      console.log("정상적으로 데이터를 로드했습니다.");
    },
  },
};
</script>
