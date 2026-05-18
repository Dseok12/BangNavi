import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'; // 임포트 추가

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('verify/send')
  async sendEmail(@Body('email') email: string) {
    return this.usersService.sendVerificationEmail(email);
  }

  @Post('verify/check')
  async checkCode(@Body('email') email: string, @Body('code') code: string) {
    return this.usersService.verifyCode(email, code);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signup(createUserDto);
  }

  // 🚪 🔐 [신규 추가] 로그인 엔드포인트 개설!
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }
}
