import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeDto {
  @IsString({ message: 'Должен быть строкой' })
  @IsOptional()
  title: string;
}
