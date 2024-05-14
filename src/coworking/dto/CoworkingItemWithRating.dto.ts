import { ApiProperty } from '@nestjs/swagger';
import { City } from 'src/city/models/city.model';
import { Conveniences } from 'src/conveniences/models/conveniences.model';
import { CoworkingPrice } from 'src/coworking-price/models/coworking-price.model';
import { Metro } from 'src/metro/models/metro.model';
import { CoworkingImages } from '../models/coworking-images.model';

export class CoworkingItemWithRating {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Пермь' })
  title: string;

  @ApiProperty({ example: 'Описание' })
  description: string;

  @ApiProperty({ example: '#' })
  link: string;

  @ApiProperty({ example: 90.909 })
  longitude: number;

  @ApiProperty({ example: 90.909 })
  latitude: number;

  @ApiProperty({ example: 'ул. Садовая, д.23' })
  address: string;

  @ApiProperty({ example: 1 })
  cityId: number;

  @ApiProperty({ example: 1 })
  metroId: number;
  createdAt?: Date;
  updatedAt?: Date;

  @ApiProperty({ type: City })
  city: City;

  @ApiProperty({ type: Metro })
  metro: Metro;

  @ApiProperty({ type: [CoworkingPrice] })
  price: CoworkingPrice[];

  @ApiProperty({ type: [CoworkingImages] })
  images: CoworkingImages[];

  @ApiProperty({ type: [Conveniences] })
  conveniences: any[];

  @ApiProperty({ example: 4.56 })
  rate: number;

  @ApiProperty({ example: 100 })
  countRate: number;
}
