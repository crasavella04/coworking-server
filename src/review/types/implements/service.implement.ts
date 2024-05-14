import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { GetPageReviewsDto } from 'src/review/dto/get-pageReview.dto';
import { Review } from 'src/review/models/review.model';
import { IFilterReviews } from '../IFilterReviews';

export interface ReviewServiceImplement {
  findAllCoworkingReviews: (coworkingId: number) => Promise<{
    rate: number;
    countRate: number;
  }>;
  getReviewsByUserId: (userId: number) => Promise<Review[]>;
  getReviewById: (id: number) => Promise<Review>;
  getPageReview: (
    coworkingId: number,
    filter: IFilterReviews,
  ) => Promise<GetPageReviewsDto>;
  createReview: (
    token: string,
    coworkingId: number,
    dto: CreateReviewDto,
  ) => void;
  removeReview: (token: string, id: number) => void;
  updateReview: (
    token: string,
    id: number,
    dto: CreateReviewDto,
  ) => Promise<Review>;
}
