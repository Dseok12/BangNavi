<template>
  <div class="post-detail-wrap" v-if="post">
    <div class="post-detail--inner">
      <div class="detail-header">
        <p class="detail-category">{{ post.realtyName }}</p>
        <h2 class="detail-title">{{ post.title }}</h2>
        <div class="detail-info">
          <span class="author">{{ post.author }}</span>
          <span class="date">{{ post.date }}</span>
          <span class="views">조회수 {{ post.views }}</span>
        </div>
      </div>

      <div class="detail-content ProseMirror" v-html="post.content"></div>

      <div class="detail-navigation">
        <div class="nav-item prev">
          <span class="nav-label">이전글</span>
          <router-link
            v-if="prevPost"
            :to="{ name: 'PostDetail', params: { id: prevPost.id } }"
          >
            {{ prevPost.title }}
          </router-link>
          <span v-else class="no-nav">이전 글이 없습니다.</span>
        </div>
        <div class="nav-item next">
          <span class="nav-label">다음글</span>
          <router-link
            v-if="nextPost"
            :to="{ name: 'PostDetail', params: { id: nextPost.id } }"
          >
            {{ nextPost.title }}
          </router-link>
          <span v-else class="no-nav">다음 글이 없습니다.</span>
        </div>
      </div>

      <div class="detail-footer">
        <button
          class="list-btn"
          @click="$router.push({ name: 'RecommendRealty' })"
        >
          목록으로
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "@css/components/postDetail.css";
import { recommendRealtyData } from "@dataes/RecommendRealtyData.js";

export default {
  name: "PostDetailPage",
  data() {
    return {
      post: null,
      prevPost: null,
      nextPost: null,
    };
  },
  watch: {
    // 💡 URL 파라미터(ID)가 바뀔 때마다 데이터를 새로 불러옵니다 (이전/다음글 클릭 대응)
    "$route.params.id": {
      immediate: true,
      handler() {
        this.loadPostData();
      },
    },
  },
  methods: {
    loadPostData() {
      const id = parseInt(this.$route.params.id);
      const data = recommendRealtyData;

      // 현재 글 찾기
      const index = data.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.post = data[index];
        // 이전글, 다음글 계산 (배열 기준)
        this.prevPost = index < data.length - 1 ? data[index + 1] : null;
        this.nextPost = index > 0 ? data[index - 1] : null;
        window.scrollTo(0, 0);
      }
    },
  },
};
</script>
