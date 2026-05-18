import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 📬 이 주소가 정확히 등록되어 있어야 터미널에 로그가 찍힙니다!
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
}
