import { ApiProperty } from '@nestjs/swagger';
import { CoworkingItemWithRating } from './CoworkingItemWithRating.dto';

export class getPageCoworkingResponse {
  @ApiProperty({ example: 'Ссылка на следующую страницу', nullable: true })
  next: string | null;

  @ApiProperty({ example: 'Ссылка на предыдущую страницу', nullable: true })
  prev: string | null;

  @ApiProperty({ example: 'Количество страниц' })
  countPages: number;

  @ApiProperty({ type: [CoworkingItemWithRating] })
  items: CoworkingItemWithRating[];
}
