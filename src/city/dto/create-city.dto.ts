import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({ example: 'Санкт-Петербург' })
  @IsString({ message: 'Должно быть строкой' })
  name: string;
}
