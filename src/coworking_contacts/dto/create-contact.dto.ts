import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsNumber({}, { message: 'Должен быть числом' })
  @ApiProperty({ example: 1 })
  typeId: number;

  @IsNumber({}, { message: 'Должен быть числом' })
  @ApiProperty({ example: 1 })
  coworkingId: number;

  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty({ example: '+79998000999' })
  value: string;

  @IsString({ message: 'Должен быть строкой' })
  @IsOptional()
  @ApiProperty({ example: 'Екатерина Мизулина' })
  name?: string;
}
