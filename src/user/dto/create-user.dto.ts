import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru' })
  @IsString({ message: 'Должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: 'Password1!' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(8, 32, { message: 'Должен быть от 8 до 32 символов' })
  password: string;
}
