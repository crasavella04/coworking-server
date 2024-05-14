import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponse {
  @ApiProperty({ example: 'access.jwt.token' })
  access: string;
}
