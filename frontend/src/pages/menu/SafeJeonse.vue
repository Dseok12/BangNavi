<template>
  <div class="recommend-realty-wrap">
    <div class="recommend-realty--inner">
      <div class="recommend-realty-header">
        <h2 class="recommend-realty-title">안전전세</h2>
        <p class="recommend-realty-desc">
          이곳은 부동산업자와 집주인이 직접 검증된 매물을 게시하는 공간입니다.
        </p>
      </div>

      <div class="list-action-wrap">
        <router-link
          :to="{ name: 'PostWrite', query: { category: 'SafeJeonse' } }"
          class="write-btn"
        >
          매물 등록하기
        </router-link>
      </div>

      <div class="recommend-realty-table__wrap">
        <table class="recommend-realty-table">
          <thead>
            <tr>
              <th>매물 정보</th>
              <th>건물 유형</th>
              <th>등록자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
              <td class="td-post-title">
                <router-link
                  :to="{ name: 'PostDetail', params: { id: item.id } }"
                >
                  {{ item.title }}
                </router-link>
              </td>
              <td class="td-realty-name">{{ item.realtyName }}</td>
              <td>{{ item.author }}</td>
              <td>{{ item.views }}</td>
              <td>{{ item.date }}</td>
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
import "@css/pages/menu/recommendrealty.css"; // 스타일 공유
import { safeJeonseData } from "@dataes/SafeJeonseData.js"; // 전용 데이터
import Pagination from "@components/Pagination.vue";

export default {
  name: "SafeJeonse",
  components: { Pagination },
  data() {
    return {
      realtyList: [],
      currentPage: 1,
      itemsPerPage: 25,
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
    this.realtyList = safeJeonseData;
  },
};
</script>
