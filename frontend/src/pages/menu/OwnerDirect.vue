<template>
  <div class="recommend-realty-wrap">
    <div class="recommend-realty--inner">
      <div class="recommend-realty-header">
        <h2 class="recommend-realty-title">집주인과 직접 계약하기</h2>
        <p class="recommend-realty-desc">
          이곳은 집주인과 직접 계약을 하는 곳입니다.<br />
          이곳은 집주인으로 등록된 사용자만 매물을 등록할 수 있습니다.<br />
          집주인으로 등록된 사용자는 매물 등록 시 연락처와 주소를 입력해야 하며,
          이를 통해 세입자와 직접 소통할 수 있습니다.<br />
          중개수수료 없이 안전하고 투명한 거래가 이루어지길 바랍니다.
        </p>
      </div>

      <div class="list-action-wrap">
        <router-link
          :to="{ name: 'PostWrite', query: { category: 'OwnerDirect' } }"
          class="write-btn"
        >
          매물 등록하기
        </router-link>
      </div>

      <div class="recommend-realty-table__wrap">
        <table class="recommend-realty-table">
          <thead>
            <tr>
              <th>직거래 매물 정보</th>
              <th>매물 종류</th>
              <th>집주인(등록자)</th>
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
import "@css/pages/menu/recommendrealty.css";
import { ownerDirectData } from "@dataes/OwnerDirectData.js";
import Pagination from "@components/Pagination.vue";

export default {
  name: "OwnerDirect",
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
    this.realtyList = ownerDirectData;
  },
};
</script>
