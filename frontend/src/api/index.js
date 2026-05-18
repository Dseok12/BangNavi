import axios from "axios";

const api = axios.create({
  // 백엔드(NestJS)의 새 주소인 3001번으로 조준!
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
