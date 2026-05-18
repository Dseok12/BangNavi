import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 데이터 유효성 검사 파이프 전역 설정 (DTO 데코레이터 작동 유도)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 엉뚱한 데이터는 아예 걸러버림
      transform: true, // 요청 데이터를 DTO 타입에 맞게 자동 변환
    }),
  );

  // 프론트엔드(Vue.js)와의 통신 허용 설정(CORS)
  app.enableCors({
    origin: 'http://localhost:3000', // Vite 기본 포트 주소 허용
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
