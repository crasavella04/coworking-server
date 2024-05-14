import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateConvenienceDto {
  @ApiProperty({ example: 'Безлимитный кофе' })
  @IsString({ message: 'Должен быть строкой' })
  name: string;
}
