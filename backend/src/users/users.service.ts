import {
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'; // DTO 추가
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt'; // JwtService 추가
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private authCodes = new Map<string, { code: string; expires: number }>();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService, // 주입 완료
  ) {}

  private generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // --- 이메일 인증 발송 로직 (우회 유지) ---
  async sendVerificationEmail(email: string): Promise<{ message: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const verificationCode = this.generateRandomCode();
    const expiryTime = Date.now() + 3 * 60 * 1000;

    this.authCodes.set(email, { code: verificationCode, expires: expiryTime });

    console.log('\n==================================================');
    console.log(`[방네비 인증 우회 시스템 가동]`);
    console.log(`요청 이메일: ${email}`);
    console.log(`입력할 인증번호: ${verificationCode}`);
    console.log('==================================================\n');

    this.mailerService
      .sendMail({
        to: email,
        subject: '[방네비] 회원가입 이메일 인증번호입니다.',
        html: `<p>${verificationCode}</p>`,
      })
      .catch(() => {
        console.log(`[안내] 로컬 테스트용 메모리 서고 적재 완료.`);
      });

    return {
      message:
        '인증요청이 접수되었습니다. 백엔드 콘솔 창에서 대소문자 6자리를 확인해 주세요!',
    };
  }

  // --- 인증 코드 검증 로직 ---
  async verifyCode(
    email: string,
    code: string,
  ): Promise<{ success: boolean; message: string }> {
    const record = this.authCodes.get(email);
    if (!record)
      throw new BadRequestException('인증 요청 기록이 없거나 만료되었습니다.');
    if (Date.now() > record.expires) {
      this.authCodes.delete(email);
      throw new BadRequestException(
        '인증 시간이 초과되었습니다. 다시 요청해 주세요.',
      );
    }
    if (record.code !== code)
      throw new BadRequestException('인증번호가 일치하지 않습니다.');

    this.authCodes.set(email, {
      code: 'VERIFIED',
      expires: Date.now() + 10 * 60 * 1000,
    });
    return { success: true, message: '이메일 인증이 완료되었습니다.' };
  }

  // --- 최종 회원가입 로직 ---
  async signup(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { email, password, name, role } = createUserDto;
    const record = this.authCodes.get(email);
    if (!record || record.code !== 'VERIFIED')
      throw new BadRequestException('이메일 인증이 완료되지 않았습니다.');

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) throw new ConflictException('이미 가입된 이메일입니다.');

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

  // 🔑 🔥 [신규 추가] 로그인 및 JWT 발급 핵심 로직
  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string; message: string }> {
    const { email, password } = loginUserDto;

    // 1. 유저 가입 여부 확인
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('가입되지 않은 이메일 주소입니다.');
    }

    // 2. 해싱된 비밀번호 대조 검증
    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password || '',
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    // 3. 검증 완료 시 토큰에 박아둘 유저 정보 패키지(Payload) 구성
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      name: user.name,
    };

    // 4. JWT 토큰 찍어내기
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      message: `${user.name}님, 로그인이 성공적으로 완료되었습니다.`,
    };
  }
}
