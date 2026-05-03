import axios from "axios";

const api = axios.create({
  // 백엔드(NestJS) 서버 주소
  baseURL: "http://localhost:3000",
  timeout: 5000, // 5초 안에 응답이 없으면 에러 처리
  headers: { "Content-Type": "application/json" },
});

export default api;
