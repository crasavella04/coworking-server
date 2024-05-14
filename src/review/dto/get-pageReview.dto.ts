import { ApiProperty } from '@nestjs/swagger';
import { Review } from '../models/review.model';

export class GetPageReviewsDto {
  @ApiProperty({ example: 2 })
  page: number;
  @ApiProperty({ example: 10 })
  countPage: number;
  @ApiProperty({ example: '/review/page/2?page=3&limit=12' })
  next: string | null;
  @ApiProperty({ example: '/review/page/2?page=1&limit=12' })
  prev: string | null;
  @ApiProperty({ type: [Review] })
  reviews: Review[];
}
