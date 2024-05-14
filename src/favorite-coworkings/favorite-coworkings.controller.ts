import { Controller, Get, Headers, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Coworking } from 'src/coworking/models/coworking.model';
import { FavoriteCoworkingsService } from './favorite-coworkings.service';

@Controller('favorite-coworkings')
export class FavoriteCoworkingsController {
  constructor(
    private readonly favoriteCoworkingsService: FavoriteCoworkingsService,
  ) {}

  @ApiOperation({
    summary: 'Получение всех избранных пользователем коворкингов',
    tags: ['Favorite Coworkings'],
  })
  @ApiResponse({ status: 200, type: [Coworking] })
  @Get()
  async getAllUserFavorites(@Headers('authorization') token: string) {
    return await this.favoriteCoworkingsService.getFavoriteCoworkings(token);
  }

  @ApiOperation({
    summary: 'Добавление коворкинга в избранное',
    tags: ['Favorite Coworkings'],
  })
  @ApiResponse({ status: 200 })
  @Get('add/:coworkingId')
  async addToFavorite(
    @Headers('authorization') token: string,
    @Param('coworkingId', ParseIntPipe) coworkingId: number,
  ) {
    return await this.favoriteCoworkingsService.addToFavorite(
      token,
      coworkingId,
    );
  }

  @ApiOperation({
    summary: 'Удаление избранного коворкинга',
    tags: ['Favorite Coworkings'],
  })
  @ApiResponse({ status: 200 })
  @Get('remove/:coworkingId')
  async removeToFavorite(
    @Headers('authorization') token: string,
    @Param('coworkingId', ParseIntPipe) coworkingId: number,
  ) {
    return await this.favoriteCoworkingsService.removeAtFavorite(
      token,
      coworkingId,
    );
  }
}
