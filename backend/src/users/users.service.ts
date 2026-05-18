import {
  ConflictException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private authCodes = new Map<string, { code: string; expires: number }>();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  // 🔠 영문 대소문자 혼합 6자리 무작위 문자열 생성 로직
  private generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async sendVerificationEmail(email: string): Promise<{ message: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const verificationCode = this.generateRandomCode();
    const expiryTime = Date.now() + 3 * 60 * 1000; // 3분 유효

    this.authCodes.set(email, { code: verificationCode, expires: expiryTime });

    // 🔥 [꿀팁] 메일 발송 전 터미널 콘솔에 미리 대소문자 6자리 찍어두기 (테스트용)
    console.log(
      `[방네비 발송 알림] 이메일: ${email} | 인증번호: ${verificationCode}`,
    );

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '[방네비] 회원가입 이메일 인증번호입니다.',
        html: `
          <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #eee;">
            <h2 style="color: #003366;">방네비 회원가입 인증</h2>
            <p>안녕하세요. 안전한 방 찾기의 길잡이, 방네비입니다.</p>
            <p>아래의 6자리 영문 인증번호를 가입 화면에 대소문자를 구분하여 정확히 입력해 주세요. (3분 내 유효)</p>
            <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 26px; font-weight: bold; letter-spacing: 3px; color: #003366;">
              ${verificationCode}
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error('메일 발송 에러 로그:', error);
      throw new BadRequestException(
        '이메일 발송 중 오류가 발생했습니다. .env 설정을 확인해 주세요.',
      );
    }

    return { message: '인증 이메일이 발송되었습니다.' };
  }

  async verifyCode(
    email: string,
    code: string,
  ): Promise<{ success: boolean; message: string }> {
    const record = this.authCodes.get(email);

    if (!record) {
      throw new BadRequestException('인증 요청 기록이 없거나 만료되었습니다.');
    }

    if (Date.now() > record.expires) {
      this.authCodes.delete(email);
      throw new BadRequestException(
        '인증 시간이 초과되었습니다. 다시 요청해 주세요.',
      );
    }

    // 대소문자 틀리면 통과 안 됨!
    if (record.code !== code) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    this.authCodes.set(email, {
      code: 'VERIFIED',
      expires: Date.now() + 10 * 60 * 1000,
    });
    return { success: true, message: '이메일 인증이 완료되었습니다.' };
  }

  async signup(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { email, password, name, role } = createUserDto;

    const record = this.authCodes.get(email);
    if (!record || record.code !== 'VERIFIED') {
      throw new BadRequestException('이메일 인증이 완료되지 않았습니다.');
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    await this.usersRepository.save(newUser);
    this.authCodes.delete(email);

    return { message: '회원가입이 성공적으로 완료되었습니다.' };
  }
}
