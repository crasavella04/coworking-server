import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMetroDto {
  @ApiProperty({ example: 'с. Московская' })
  @IsString({ message: 'Должен быть строкой' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1 })
  @IsString({ message: 'Должен быть числом' })
  @IsOptional()
  cityId?: number;
}
