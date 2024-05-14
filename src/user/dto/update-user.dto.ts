import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Никита',
    description: 'Новое имя пользователя',
    required: false,
  })
  name?: string;
}
