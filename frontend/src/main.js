import { createApp } from "vue";
import App from "./App.vue";

/*
 * 기본 설정 CSS 파일을 import
 * @cssBase는 vite.config.js에서 설정한 alias로, src/css/base 폴더를 가리킵니다.
 */
import "@cssBase/reset.css";
import "@cssBase/base.css";
import "@cssBase/common.css";

import router from "./router"; // 방금 만든 라우터 불러오기

const app = createApp(App);

app.use(router); // 앱에 라우터 장착

app.mount("#app");
