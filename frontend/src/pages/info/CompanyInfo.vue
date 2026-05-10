<template>
  <div class="company-info-wrap">
    <section class="info-hero">
      <div class="info-hero--inner">
        <h2 class="info-logo-txt">BangNavi</h2>
        <p class="info-slogan">
          "친절하고 정성스러운 부동산 중개업자를 찾아서"
        </p>
        <div class="info-divider"></div>
        <p class="info-mission">
          방네비는 투명한 데이터와 진심 어린 리뷰를 통해<br />
          사용자와 중개인이 함께 웃는 부동산 생태계를 구축합니다.
        </p>
      </div>
    </section>

    <section class="info-values">
      <div class="info-values--inner">
        <h3 class="info-section-title">Core Values</h3>
        <div class="value-card-container">
          <div class="value-card">
            <span class="value-number">01</span>
            <h4>자율성 (freedom)</h4>
            <p>
              직접 경험한 사용자의 리얼 후기로 허위 매물과 불친절한 중개사를
              필터링합니다.
            </p>
          </div>
          <div class="value-card">
            <span class="value-number">02</span>
            <h4>전문성 (Professional)</h4>
            <p>
              검증된 중개업자와 집주인 정보를 엄격하게 관리하여 정보의 무결성을
              유지합니다.
            </p>
          </div>
          <div class="value-card">
            <span class="value-number">03</span>
            <h4>단순함 (Simplicity)</h4>
            <p>
              복잡한 부동산 거래 과정을 직관적인 UI/UX로 풀어내어 누구나 쉽게
              이용하게 합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// 스타일 파일도 명칭에 맞춰 import 합니다.
import "@css/pages/info/companyInfo.css";

export default {
  name: "CompanyInfo",
};
</script>
