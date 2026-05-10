import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // 본인의 MySQL 아이디 (보통 root)
      password: 'password', // 본인의 MySQL 비밀번호
      database: 'bangnavi', // 미리 생성한 DB 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발 중에만 사용: 코드를 쓰면 DB 표를 자동으로 만들어줌
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
