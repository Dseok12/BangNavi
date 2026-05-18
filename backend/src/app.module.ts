import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Post],
        synchronize: true,
        logging: true,
      }),
    }),
    // 📬 메일 발송 전역 모듈 설정
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: 587,
          secure: false, // 587 포트는 false로 두고 대신 아래 tls 설정을 넣는 것이 안정적입니다.
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
          tls: {
            rejectUnauthorized: false, // 로컬 개발 환경에서 보안 인증서 에러로 발송이 막히는 것 방지
          },
        },
        defaults: {
          from: `"방네비" <${configService.get('MAIL_USER')}>`,
        },
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}
