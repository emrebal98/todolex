import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '12345678' })
  password: string;
}

export class AccessToken {
  @ApiProperty({ type: 'string' })
  access_token: string;
}
