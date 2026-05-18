import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  email: string;

  @IsString()
  // 🔒 기존 6자리에서 유저 기획안에 맞춰 8자리 이상으로 수정!
  @MinLength(8, { message: '비밀번호는 최소 8자리 이상이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '이름은 필수 입력 항목입니다.' })
  name: string;

  @IsEnum(['USER', 'LESSOR', 'REALTOR'], {
    message: '올바른 회원 유형이 아닙니다.',
  })
  @IsNotEmpty({ message: '회원 유형은 필수 선택 항목입니다.' })
  role: 'USER' | 'LESSOR' | 'REALTOR';
}
