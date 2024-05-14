import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
  @IsString({ message: 'Должен быть строкой' })
  @IsOptional()
  @ApiProperty({ example: '+79998000999' })
  value: string;

  @IsString({ message: 'Должен быть строкой' })
  @IsOptional()
  @ApiProperty({ example: 'Екатерина Мизулина' })
  name?: string;
}
