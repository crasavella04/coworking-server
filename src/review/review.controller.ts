import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetPageReviewsDto } from './dto/get-pageReview.dto';
import { Review } from './models/review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({
    summary: 'Получение страниц отзывов',
    tags: ['Review'],
  })
  @ApiParam({ name: 'coworkingId', example: 1 })
  @ApiQuery({ name: 'limit', example: 1, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiResponse({ status: 200, type: GetPageReviewsDto })
  @Get('page/:coworkingId')
  async getPageReview(
    @Param('coworkingId', ParseIntPipe) coworkingId: number,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    const filter = {
      limit: Number(limit) || 10,
      page: Number(page) || 1,
    };

    return await this.reviewService.getPageReview(coworkingId, filter);
  }

  @ApiOperation({
    summary: 'Получение отзывов по id пользователя',
    tags: ['Review'],
  })
  @ApiParam({ name: 'userId', example: 1 })
  @ApiResponse({ status: 200, type: [Review] })
  @Get('user/:userId')
  async getReviewsByUserId(@Param('userId', ParseIntPipe) id: number) {
    return await this.reviewService.getReviewsByUserId(id);
  }

  @ApiOperation({ summary: 'Получение отзыва по id', tags: ['Review'] })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: Review })
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getReviewById(@Param('id', ParseIntPipe) id: number) {
    return await this.reviewService.getReviewById(id);
  }

  @ApiOperation({ summary: 'Создание отзыва', tags: ['Review'] })
  @ApiParam({ name: 'coworkingId', example: 1 })
  @ApiResponse({ status: 201, type: Review })
  // @UseGuards(JwtAuthGuard)
  @Post(':coworkingId')
  async createReview(
    @Headers('authorization') token: string,
    @Body() dto: CreateReviewDto,
    @Param('coworkingId', ParseIntPipe) coworkingId: number,
  ) {
    return await this.reviewService.createReview(token, coworkingId, dto);
  }

  @ApiOperation({ summary: 'Редактирование отзыва', tags: ['Review'] })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: Review })
  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateReview(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateReviewDto,
  ) {
    return await this.reviewService.updateReview(token, id, dto);
  }

  @ApiOperation({ summary: 'Удаление отзыва', tags: ['Review'] })
  @ApiParam({ name: 'id', example: 1 })
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeReview(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.reviewService.removeReview(token, id);
  }
}
