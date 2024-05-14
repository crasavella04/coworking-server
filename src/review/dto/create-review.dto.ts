import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumber({}, { message: 'Должен быть числом' })
  @Min(1, { message: 'Значение не может быть меньше 1' })
  @Max(5, { message: 'Значение не может быть больше 5' })
  @ApiProperty({ example: 5 })
  rate: number;

  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty({ example: '}{ороший коворкинг' })
  description: string;
}
