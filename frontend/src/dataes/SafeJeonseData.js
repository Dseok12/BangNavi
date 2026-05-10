// 🟢 안전전세(업자/집주인용) 가데이터 50개
const locations = [
  "강남역 도보 5분",
  "마포구 망원동 신축",
  "성수동 서울숲 인근",
  "관악구 대학동",
  "여의도 국회 인근",
  "용산구 한남동",
  "동작구 사당역",
];
const buildingTypes = ["원룸", "투룸", "오피스텔", "빌라", "아파트"];
const posters = [
  "방네비부동산",
  "김주인",
  "행복공인중개사",
  "박지주",
  "서울부동산",
  "이집주인",
];

export const safeJeonseData = Array.from({ length: 50 }, (_, i) => {
  const loc = locations[i % locations.length];
  const type = buildingTypes[i % buildingTypes.length];
  const poster = posters[i % posters.length];
  const deposit = (Math.floor(Math.random() * 20) + 10) * 1000; // 1억 ~ 3억 사이
  const day = (31 - (i % 30)).toString().padStart(2, "0");

  return {
    id: 301 + i, // 안전전세는 301번대부터 시작
    title: `[안전검증 완료] ${loc} ${type} 전세 매물입니다. #${i + 1}`,
    realtyName: type, // 여기서는 매물 종류로 표시
    author: poster,
    price: `${deposit.toLocaleString()}만원`, // 전세금 정보 추가
    date: `2026-05-${day}`,
    views: Math.floor(Math.random() * 200) + 5,
    content: `
      <p>본 매물은 <strong>방네비 안전인증</strong>을 통과한 매물입니다.</p>
      <p>위치: ${loc}</p>
      <p>가격: 전세 ${deposit.toLocaleString()}만원</p>
      <img src="https://picsum.photos/id/${i + 50}/800/450" alt="매물실사" />
      <p>융자금 없는 깨끗한 집이며, 즉시 입주 가능합니다. 보증보험 가입 가능합니다.</p>
    `,
  };
});

// 최신순 정렬
safeJeonseData.sort((a, b) => new Date(b.date) - new Date(a.date));

// 데이터 추가 함수
export const addSafePost = (newPost) => {
  safeJeonseData.unshift(newPost);
};
