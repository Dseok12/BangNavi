import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Users 부서에서 User 테이블을 사용하도록 등록
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 추후 로그인(Auth)에서 쓸 수 있도록 수출 설정
})
export class UsersModule {}
