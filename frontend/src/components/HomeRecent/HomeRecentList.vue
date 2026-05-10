<template>
  <div class="home-recent-list-wrap">
    <p class="home-recent-list-info">* 지역별 후기는 제외합니다.</p>
    <table class="home-recent-table">
      <thead>
        <tr>
          <th class="th-category">카테고리</th>
          <th class="th-title">제목</th>
          <th class="th-author">작성자</th>
          <th class="th-views">조회</th>
          <th class="th-likes">추천</th>
          <th class="th-date">작성날짜</th>
        </tr>
      </thead>
      <tbody>
        <HomeRecentItem
          v-for="post in recentPosts"
          :key="post.id"
          :post="post"
        />
      </tbody>
    </table>

    <div class="pagination-placeholder" v-if="recentPosts.length >= 30"></div>
  </div>
</template>

<script>
import HomeRecentItem from "./HomeRecentItem.vue";

export default {
  name: "HomeRecentList",
  components: { HomeRecentItem },
  props: {
    recentPosts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
