import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class CreateCoworkingPrice {
  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty({ example: 'Общая комната' })
  service: string;

  @IsNumber({}, { message: 'Должен быть числом' })
  @ApiProperty({ example: 100.23 })
  rub: number;
}

export class CreateCoworkingDto {
  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty({ example: 'Название' })
  title: string;

  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty({ example: 'Описание' })
  description: string;

  @IsString({ message: 'Должен быть строкой' })
  @IsOptional()
  @ApiProperty({ example: '#' })
  link?: string;

  @IsNumber({}, { message: 'Должен быть числом' })
  @ApiProperty({ example: 10.101 })
  longitude: number;

  @IsNumber({}, { message: 'Должен быть числом' })
  @ApiProperty({ example: 10.101 })
  latitude: number;

  @IsString({ message: 'Должен быть строкой' })
  @ApiProperty({ example: 'ул. Садовая, д.23' })
  address: string;

  @IsNumber({}, { message: 'Должен быть числом' })
  @ApiProperty({ example: 1 })
  cityId: number;

  @IsNumber({}, { message: 'Должен быть числом' })
  @IsOptional()
  @ApiProperty({ example: 1 })
  metroId?: number;

  @IsArray({ message: 'Должен быть массивом' })
  @IsOptional()
  @ApiProperty({ type: [CreateCoworkingPrice] })
  price?: CreateCoworkingPrice[];

  @IsArray({ message: 'Должен быть массивом' })
  @IsOptional()
  @IsInt({ each: true, message: 'Каждый элемент должен быть числом' })
  @ApiProperty({ example: [1, 2, 3] })
  conveniences?: number[];
}
