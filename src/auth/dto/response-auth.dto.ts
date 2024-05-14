import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user.model';

export class AuthResponseDto {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({
    example: 'string',
    description: 'Токен для проверки пользователя',
  })
  access: string;
}
