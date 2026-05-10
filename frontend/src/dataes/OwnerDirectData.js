// 🟢 집주인 직접 계약(직거래) 가데이터 50개
const directRegions = [
  "강남구 논현동",
  "마포구 연남동",
  "성동구 옥수동",
  "관악구 신림동",
  "송파구 잠실동",
  "영등포구 당산동",
];
const directTypes = [
  "원룸(풀옵션)",
  "투룸/거실",
  "신축 오피스텔",
  "깨끗한 빌라",
  "역세권 아파트",
];
const landlords = [
  "이주인",
  "박건물",
  "최가옥",
  "정주택",
  "김직거래",
  "조빌딩",
];

export const ownerDirectData = Array.from({ length: 50 }, (_, i) => {
  const reg = directRegions[i % directRegions.length];
  const type = directTypes[i % directTypes.length];
  const name = landlords[i % landlords.length];
  const deposit = (Math.floor(Math.random() * 15) + 5) * 1000; // 5천 ~ 2억 사이
  const day = (31 - (i % 30)).toString().padStart(2, "0");

  return {
    id: 401 + i, // 집주인 직접은 401번대부터 시작
    title: `[직거래] ${reg} ${type} 수수료 없이 직접 계약해요. #${i + 1}`,
    realtyName: type,
    author: name,
    price: `전세 ${deposit.toLocaleString()}만원`,
    date: `2026-05-${day}`,
    views: Math.floor(Math.random() * 150) + 10,
    content: `
      <p>중개수수료 없이 <strong>집주인과 직접 계약</strong>하는 매물입니다.</p>
      <p>매물 위치: ${reg}</p>
      <p>특이사항: 관리비 저렴하고 집주인이 같은 건물에 살지 않아 터치 없습니다.</p>
      <img src="https://picsum.photos/id/${i + 100}/800/450" alt="직거래매물" />
      <p>융자 거의 없으며 보증보험 가입 협의 가능합니다. 연락주세요!</p>
    `,
  };
});

ownerDirectData.sort((a, b) => new Date(b.date) - new Date(a.date));

export const addOwnerPost = (newPost) => {
  ownerDirectData.unshift(newPost);
};
