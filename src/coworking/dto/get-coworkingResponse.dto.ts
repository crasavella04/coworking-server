import { ApiProperty } from '@nestjs/swagger';
import { CoworkingPrice } from '../../coworking-price/models/coworking-price.model';

export class GetCoworkingResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Название коворкинга' })
  title: string;

  @ApiProperty({ example: 'Описание', nullable: true })
  description: string;

  @ApiProperty({ type: [CoworkingPrice] })
  price: CoworkingPrice[];

  @ApiProperty({ example: 'https://app.aijora.ru', nullable: true })
  link: string;

  @ApiProperty({ example: 90.909 })
  longitude: number;

  @ApiProperty({ example: 90.909 })
  latitude: number;

  @ApiProperty({ example: 'ул. Пушкина, д. 13, кв. 54' })
  address: string;

  @ApiProperty({ example: 4.56 })
  rate: number;

  @ApiProperty({ example: 65 })
  countRate: number;
}
