// 🟢 방네비 추천부동산 테스트를 위한 가데이터 50개
const regions = [
  "강남구",
  "마포구",
  "성동구",
  "관악구",
  "서초구",
  "송파구",
  "영등포구",
  "용산구",
  "동대문구",
  "동작구",
];
const adjectives = [
  "정직한",
  "친절한",
  "꼼꼼한",
  "발 빠른",
  "믿음직한",
  "상세한 설명의",
  "진심을 다하는",
  "허위매물 없는",
  "정성스러운",
  "신뢰할 수 있는",
];
const nicknames = [
  "자취방요정",
  "복덕방달인",
  "전세탈출기",
  "월세만렙",
  "집찾는나그네",
  "방네비러버",
  "이사전문가",
  "행복한하우스",
  "서울살이",
  "부동산초보",
];

export const recommendRealtyData = Array.from({ length: 50 }, (_, i) => {
  const region = regions[i % regions.length];
  const adjective = adjectives[i % adjectives.length];
  const nickname = nicknames[i % nicknames.length];
  const day = (31 - (i % 30)).toString().padStart(2, "0");

  return {
    id: 201 + i,
    title: `${region}에서 만난 가장 ${adjective} 중개사님 추천합니다! #${i + 1}`,
    realtyName: `${region} ${adjective} 부동산`,
    author: nickname,
    address: `서울특별시 ${region} ${region === "강남구" ? "테헤란로" : "중앙로"} ${100 + i}길`,
    phone: `02-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: `2026-05-${day}`,
    views: Math.floor(Math.random() * 300) + 10,
    // 💡 블로그 형식의 상세 본문 추가
    content: `
      <p>안녕하세요! 이번에 <strong>${region}</strong> 근처로 이사하게 되면서 방문한 곳인데 너무 만족스러워서 후기 남깁니다.</p>
      <p>중개사님이 정말 <strong>${adjective}</strong> 태도로 상담해주셨어요. 제가 조건이 좀 까다로웠는데도 끝까지 웃으면서 찾아주시더라구요.</p>
      <img src="https://picsum.photos/id/${i + 10}/800/450" alt="매물사진" />
      <blockquote>"방네비 덕분에 이런 좋은 부동산을 알게 되어 다행입니다. 여러분도 꼭 가보세요!"</blockquote>
      <p>위치도 좋고 내부 상태도 사진이랑 똑같았습니다. 추천합니다!</p>
    `,
  };
});

// 최신순 정렬
recommendRealtyData.sort((a, b) => new Date(b.date) - new Date(a.date));

// 💡 새로운 글을 가데이터 배열 맨 앞에 추가하는 함수
export const addPost = (newPost) => {
  recommendRealtyData.unshift(newPost);
};
