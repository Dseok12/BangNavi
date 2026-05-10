<template>
  <div class="privacy-page-wrap">
    <div class="privacy-container--inner">
      <h2 class="privacy-main-title">개인정보 처리방침</h2>
      <p class="privacy-update-date">시행일자: 2026년 5월 10일</p>

      <div class="privacy-content-box">
        <section class="privacy-section">
          <h3>1. 수집하는 개인정보 항목</h3>
          <p>
            "회사"는 회원가입, 원활한 고객 상담, 각종 서비스의 제공을 위해
            아래와 같은 개인정보를 수집하고 있습니다.
          </p>
          <table class="privacy-table">
            <thead>
              <tr>
                <th>수집 시점</th>
                <th>수집 항목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>회원가입 시</td>
                <td>
                  아이디, 비밀번호, 이메일 주소, 회원 유형(일반/집주인/중개인)
                </td>
              </tr>
              <tr>
                <td>본인 인증 시</td>
                <td>성명, 휴대전화 번호, 성별, 주소</td>
              </tr>
              <tr>
                <td>서비스 이용 과정</td>
                <td>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="privacy-section">
          <h3>2. 개인정보의 수집 및 이용 목적</h3>
          <p>"회사"는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
          <ul>
            <li>
              <strong>서비스 제공 및 계약 이행</strong>: 부동산 정보 공유 서비스
              제공, 특정 콘텐츠 제공
            </li>
            <li>
              <strong>회원 관리</strong>: 회원제 서비스 이용에 따른 본인확인,
              개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입
              의사 확인
            </li>
            <li>
              <strong>마케팅 및 광고에 활용</strong>: 신규 서비스 개발 및 특화,
              이벤트 등 광고성 정보 전달 (동의 시)
            </li>
          </ul>
        </section>

        <section class="privacy-section">
          <h3>3. 개인정보의 보유 및 이용기간</h3>
          <div class="highlight-box">
            <p>
              원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를
              지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가
              있는 경우 "회사"는 아래와 같이 관계법령에서 정한 일정한 기간 동안
              회원정보를 보관합니다.
            </p>
            <ul>
              <li>보존 항목: 로그인 ID, 서비스 이용 기록</li>
              <li>보존 근거: 통신비밀보호법 (웹사이트 방문 기록: 3개월)</li>
              <li>보존 기간: <strong>회원 탈퇴 시까지</strong></li>
            </ul>
          </div>
        </section>

        <section class="privacy-section">
          <h3>4. 이용자의 권리 및 그 행사방법</h3>
          <p>
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할
            수 있으며 가입해지(탈퇴)를 요청할 수 있습니다. 개인정보
            보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이
            조치하겠습니다.
          </p>
        </section>

        <section class="privacy-section">
          <h3>5. 개인정보 보호책임자 연락처</h3>
          <p>
            귀하의 개인정보를 보호하고 관련한 불만을 처리하기 위하여 아래와 같이
            관련 부서를 지정하고 있습니다.
          </p>
          <ul class="contact-info">
            <li>성명: 관리자</li>
            <li>이메일: wkqxhd2020@naver.com</li>
            <li>전화번호: 02-1234-5678</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import "@css/pages/info/privacypolicy.css";

export default {
  name: "PrivacyPolicy",
};
</script>
