import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9~!@#$%^&*]*$/, {
    message: '10자 이상 30자 이하로 이메일 형식으로 다시 시도해주세요',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9`~!@#$%^&*()-_=+]*$/, {
    message:
      '8자 이상 20자 이하로 영문, 숫자, 특수문자의 조합으로 다시 시도해주세요.',
  })
  password: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9`~!@#$%^&*()-_=+]*$/)
  confirmPassword: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
