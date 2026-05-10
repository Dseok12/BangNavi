<template>
  <div class="recommend-realty-wrap">
    <div class="recommend-realty--inner">
      <div class="recommend-realty-header">
        <h2 class="recommend-realty-title">추천부동산</h2>
        <p class="recommend-realty-desc">
          방네비 사용자들이 직접 경험하고 추천한 목록입니다.
        </p>
      </div>
      <div class="list-action-wrap">
        <router-link
          :to="{ name: 'PostWrite', query: { category: 'RecommendRealty' } }"
          class="write-btn"
        >
          글쓰기
        </router-link>
      </div>
      <div class="recommend-realty-table__wrap">
        <table class="recommend-realty-table">
          <thead>
            <tr>
              <th>추천 게시글 제목</th>
              <th>추천 대상(부동산)</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="realty in paginatedList" :key="realty.id">
              <td class="td-post-title">
                <router-link
                  :to="{ name: 'PostDetail', params: { id: realty.id } }"
                >
                  {{ realty.title }}
                </router-link>
              </td>
              <td class="td-realty-name">{{ realty.realtyName }}</td>
              <td>{{ realty.author }}</td>
              <td>{{ realty.views }}</td>
              <td>{{ realty.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        :currentPage="currentPage"
        :totalItems="realtyList.length"
        :itemsPerPage="itemsPerPage"
        @change-page="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import "@css/pages/menu/recommendrealty.css";
import { recommendRealtyData } from "@dataes/RecommendRealtyData.js";
import Pagination from "@components/Pagination.vue";

export default {
  name: "RecommendRealty",
  components: { Pagination },
  data() {
    return {
      realtyList: [],
      currentPage: 1,
      itemsPerPage: 25,
      // 추후 권한 체크를 위한 데이터 상태 예시
      // isLoggedIn: false,
      // userRole: '',
    };
  },
  computed: {
    paginatedList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.realtyList.slice(start, end);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    this.realtyList = recommendRealtyData;
  },
};
</script>
