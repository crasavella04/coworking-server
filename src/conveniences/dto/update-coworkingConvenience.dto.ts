import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber } from 'class-validator';

export class UpdateCoworkingConveniencesDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray({ message: 'Должен быть массивом' })
  @IsInt({ each: true, message: 'Каждый элемент должен быть числом' })
  conveniencesId: number[];

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Должен быть числом' })
  coworkingId: number;
}
