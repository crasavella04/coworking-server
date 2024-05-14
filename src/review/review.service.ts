import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coworking } from 'src/coworking/models/coworking.model';
import { TokenService } from 'src/token/token.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './models/review.model';
import { IFilterReviews } from './types/IFilterReviews';
import { ReviewServiceImplement } from './types/implements/service.implement';

@Injectable()
export class ReviewService implements ReviewServiceImplement {
  constructor(
    @InjectModel(Review) private reviewRepository: typeof Review,
    private readonly tokenService: TokenService,
  ) {}

  async getPageReview(coworkingId: number, filter: IFilterReviews) {
    const { limit, page } = filter;

    const offset = (page - 1) * limit;

    const reviews = await this.reviewRepository.findAll({
      where: { coworkingId },
      limit,
      offset,
    });

    // На основе имеющихся данных определите общее количество страниц. В реальном случае вам нужно будет получить эту информацию из базы данных.
    const totalReviews = reviews.length; // Это должно быть реальное общее количество отзывов
    const countPage = Math.ceil(totalReviews / limit);

    // Определяем есть ли предыдущая и следующая страницы
    const hasNextPage = page * limit < totalReviews;
    const hasPrevPage = page > 1;

    const nextPageUrl = hasNextPage
      ? `/review/page/${coworkingId}?page=${page + 1}&limit=${limit}`
      : null;
    const prevPageUrl = hasPrevPage
      ? `/review/page/${coworkingId}?page=${page - 1}&limit=${limit}`
      : null;

    return {
      page,
      countPage,
      next: nextPageUrl,
      prev: prevPageUrl,
      reviews,
    };
  }

  async getReviewsByUserId(userId: number) {
    const reviews = await this.reviewRepository.findAll({
      where: { userId },
      include: { model: Coworking },
    });

    return reviews;
  }

  async getReviewById(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review)
      throw new HttpException('Review is not found', HttpStatus.NOT_FOUND);

    return review;
  }

  async findAllCoworkingReviews(coworkingId: number) {
    const reviews = await this.reviewRepository.findAll({
      where: { id: coworkingId },
    });

    const rate =
      reviews.reduce((acc, review) => (acc += review.rate), 0) / reviews.length;
    const countRate = reviews.length;

    return { rate: rate || 0, countRate };
  }

  async createReview(token: string, coworkingId: number, dto: CreateReviewDto) {
    const { id: userId } = this.tokenService.decodeAccessToken(
      token.split(' ')[1],
    );

    const currentReview = await this.reviewRepository.findOne({
      where: { userId, coworkingId },
    });

    if (currentReview)
      throw new HttpException('Review is already exist', HttpStatus.CONFLICT);

    const data = { ...dto, coworkingId, userId };

    const review = await this.reviewRepository.create(data);
    return review;
  }

  async removeReview(token: string, id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review)
      throw new HttpException('Review is not found', HttpStatus.NOT_FOUND);

    const { id: userId } = this.tokenService.decodeAccessToken(
      token.split(' ')[1],
    );

    if (review.userId !== userId)
      throw new HttpException('User is not owner review', HttpStatus.CONFLICT);

    await this.reviewRepository.destroy({ where: { id } });

    return;
  }

  async updateReview(token: string, id: number, dto: CreateReviewDto) {
    const { id: userId } = this.tokenService.decodeAccessToken(
      token.split(' ')[1],
    );
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review)
      throw new HttpException('Review is not found', HttpStatus.NOT_FOUND);

    if (review.userId !== userId)
      throw new HttpException('User is not owner review', HttpStatus.CONFLICT);

    await this.reviewRepository.update(dto, { where: { id } });

    const updatedReview = await this.reviewRepository.findOne({
      where: { id },
    });
    return updatedReview;
  }
}
