import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // 🔌 3000번 포트를 쓰는 프론트엔드(Vue)의 접근을 정식 허용합니다!
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // 🚪 백엔드는 충돌을 피해 3001번 포트로 문을 엽니다!
  await app.listen(3001);
}
bootstrap();
