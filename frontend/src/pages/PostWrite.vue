<template>
  <div class="post-write-wrap">
    <div class="post-write--inner">
      <div class="write-header">
        <h2 class="write-title">게시글 작성</h2>
        <div class="category-selector">
          <select v-model="post.category" class="common-select">
            <option value="">카테고리 선택</option>
            <option value="SafeJeonse">안전전세</option>
            <option value="RecommendRealty">추천부동산</option>
            <option value="OwnerDirect">집주인직접</option>
            <option value="RegionalReview">지역별후기</option>
          </select>
        </div>
      </div>

      <div class="write-body">
        <input
          type="text"
          v-model="post.title"
          placeholder="제목을 입력하세요"
          class="title-input"
        />

        <div
          v-if="post.category === 'RecommendRealty'"
          class="extra-fields-box"
        >
          <div class="input-row">
            <input
              type="text"
              v-model="post.realtyName"
              placeholder="부동산 이름 (예: 방네비 공인중개사)"
            />
            <input
              type="text"
              v-model="post.phone"
              placeholder="연락처 (02-000-0000)"
            />
          </div>
          <input
            type="text"
            v-model="post.address"
            placeholder="부동산 상세 주소를 입력하세요"
            class="full-input"
          />
        </div>

        <div v-if="post.category === 'SafeJeonse'" class="extra-fields-box">
          <div class="input-row">
            <select v-model="post.realtyName" class="sub-select">
              <option value="">건물 유형 선택</option>
              <option value="원룸">원룸</option>
              <option value="투룸">투룸</option>
              <option value="오피스텔">오피스텔</option>
              <option value="아파트">아파트</option>
            </select>
            <input
              type="text"
              v-model="post.price"
              placeholder="전세 보증금 (예: 25,000만원)"
            />
          </div>
          <input
            type="text"
            v-model="post.location"
            placeholder="매물 인근 지역 (예: 강남역 도보 5분)"
            class="full-input"
          />
        </div>

        <div v-if="post.category === 'OwnerDirect'" class="extra-fields-box">
          <div class="input-row">
            <input
              type="text"
              v-model="post.realtyName"
              placeholder="매물 종류 (예: 원룸, 오피스텔)"
            />
            <input
              type="text"
              v-model="post.price"
              placeholder="보증금/전세가 (예: 1억 2,000)"
            />
          </div>
          <div class="input-row">
            <input
              type="text"
              v-model="post.author"
              placeholder="집주인 성함/닉네임"
            />
            <input
              type="text"
              v-model="post.phone"
              placeholder="연락처 (세입자 노출용)"
            />
          </div>
          <input
            type="text"
            v-model="post.address"
            placeholder="매물 상세 주소 (동/호수 포함)"
            class="full-input"
          />
        </div>

        <TipTapEditor
          v-model="post.content"
          @upload-image="handleImageUpload"
        />
      </div>

      <div class="write-footer">
        <button class="cancel-btn" @click="$router.back()">취소</button>
        <button class="submit-btn" @click="submitPost">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import TipTapEditor from "@components/TipTapEditor.vue";
import "@css/pages/postWrite.css";

// 각 카테고리별 데이터 추가 함수 임포트
import { addPost } from "@dataes/RecommendRealtyData.js";
import { addSafePost } from "@dataes/SafeJeonseData.js";
import { addOwnerPost } from "@dataes/OwnerDirectData.js";

export default {
  name: "PostWrite",
  components: { TipTapEditor },
  data() {
    return {
      post: {
        category: "",
        title: "",
        content: "",
        // 추가 필드 통합 관리
        realtyName: "",
        address: "",
        phone: "",
        price: "",
        location: "",
        author: "",
      },
    };
  },
  mounted() {
    const initialCategory = this.$route.query.category;
    if (initialCategory) {
      this.post.category = initialCategory;
    }
  },
  methods: {
    handleImageUpload(file) {
      console.log("이미지 파일 감지:", file);
    },
    async submitPost() {
      if (!this.post.category) return alert("카테고리를 선택해주세요.");
      if (!this.post.title || !this.post.content)
        return alert("제목과 내용을 입력해주세요.");

      // 공통 데이터 구조 생성
      const newEntry = {
        id: Date.now(),
        title: this.post.title,
        content: this.post.content,
        views: 0,
        date: new Date().toISOString().split("T")[0],
        author: this.post.author || "사용자(나)", // 집주인직접은 입력받은 값 사용
      };

      // 💡 카테고리에 따른 데이터 분기 저장 로직
      if (this.post.category === "SafeJeonse") {
        newEntry.realtyName = this.post.realtyName;
        newEntry.price = this.post.price;
        newEntry.title = `[안전검증] ${this.post.location} - ${this.post.title}`;
        addSafePost(newEntry);
      } else if (this.post.category === "RecommendRealty") {
        newEntry.realtyName = this.post.realtyName;
        newEntry.address = this.post.address;
        newEntry.phone = this.post.phone;
        addPost(newEntry);
      } else if (this.post.category === "OwnerDirect") {
        newEntry.realtyName = this.post.realtyName;
        newEntry.price = this.post.price;
        newEntry.address = this.post.address;
        newEntry.phone = this.post.phone;
        newEntry.title = `[직거래] ${this.post.title}`;
        addOwnerPost(newEntry);
      } else {
        addPost(newEntry); // 기본값
      }

      alert("게시글이 성공적으로 등록되었습니다.");
      this.$router.push({ name: this.post.category });
    },
  },
};
</script>
