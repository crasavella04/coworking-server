import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCoworkingPriceDto {
  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty({ example: 'Общая комната' })
  service: string;

  @IsNumber({}, { message: 'Должен быть числом' })
  @ApiProperty({ example: 100.23 })
  rub: number;
}
