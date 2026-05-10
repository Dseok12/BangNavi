// 🟢 방네비 실시간 베스트 테스트를 위한 100개의 임시 데이터
const categories = ["안전전세", "추천부동산", "집주인직접", "지역별 후기"];
const titles = [
  "HUG 안심전세대출 승인 후기 공유합니다",
  "마포구 공덕역 인근 친절한 중개사님 추천",
  "집주인 직접 매물 - 수수료 없는 원룸이에요",
  "강남구 신축 빌라 투어 후기 (필터링 확인용)",
  "전세 사기 예방을 위한 등기부등본 확인법",
  "성동구 성수동 카페거리 근처 깔끔한 투룸 추천",
  "보증금 반환 보증보험 가입 절차 정리",
  "용산구 한남동 채광 좋은 집 다녀왔습니다",
];
const authors = ["r***a", "b***g", "j***g", "s***e", "k***y", "d***t"];

export const homeRecentData = Array.from({ length: 100 }, (_, i) => {
  const category = categories[i % categories.length];
  const dateDay = (10 - (i % 10)).toString().padStart(2, "0");

  return {
    id: i + 1,
    category: category,
    title: `${titles[i % titles.length]} #${i + 1}`,
    author: authors[i % authors.length],
    views: Math.floor(Math.random() * 500) + 10,
    likes: Math.floor(Math.random() * 100) + 1,
    date: `2026-05-${dateDay}`,
  };
});
