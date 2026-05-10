<template>
  <div class="pagination-wrap" v-if="totalPages > 0">
    <button
      class="page-btn prev"
      :disabled="currentPage === 1"
      @click="emitPage(currentPage - 1)"
    >
      &lt;
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="page-btn"
      :class="{ active: currentPage === page }"
      @click="emitPage(page)"
    >
      {{ page }}
    </button>

    <span class="page-ellipsis" v-if="shouldShowEllipsis">...</span>

    <button
      class="page-btn last-page"
      v-if="shouldShowLastPage"
      @click="emitPage(totalPages)"
    >
      {{ totalPages }}
    </button>

    <button
      class="page-btn next"
      :disabled="currentPage === totalPages"
      @click="emitPage(currentPage + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<script>
import "@css/components/pagination.css";

export default {
  name: "Pagination",
  props: {
    currentPage: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, default: 25 },
    pageRange: { type: Number, default: 5 }, // 한 번에 보여줄 번호 개수
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    visiblePages() {
      const currentGroup = Math.floor((this.currentPage - 1) / this.pageRange);
      const start = currentGroup * this.pageRange + 1;
      const end = Math.min(start + this.pageRange - 1, this.totalPages);

      let pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    shouldShowEllipsis() {
      const lastVisiblePage = this.visiblePages[this.visiblePages.length - 1];
      return lastVisiblePage < this.totalPages - 1;
    },
    shouldShowLastPage() {
      const lastVisiblePage = this.visiblePages[this.visiblePages.length - 1];
      return lastVisiblePage < this.totalPages;
    },
  },
  methods: {
    emitPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        // 부모에게 페이지가 변경되었음을 알림
        this.$emit("change-page", page);
      }
    },
  },
};
</script>
