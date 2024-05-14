import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from 'src/city/models/city.model';
import { Conveniences } from 'src/conveniences/models/conveniences.model';
import { CoworkingPrice } from 'src/coworking-price/models/coworking-price.model';
import { CoworkingImages } from 'src/coworking/models/coworking-images.model';
import { Coworking } from 'src/coworking/models/coworking.model';
import { Metro } from 'src/metro/models/metro.model';
import { TokenService } from 'src/token/token.service';
import { FavoriteCoworkings } from './models/favoriteCoworkings.model';
import { FavoriteCoworkingsImplements } from './types/implements/service.impement';

@Injectable()
export class FavoriteCoworkingsService implements FavoriteCoworkingsImplements {
  constructor(
    @InjectModel(FavoriteCoworkings)
    private favoriteCoworkingsRepository: typeof FavoriteCoworkings,
    private readonly tokenService: TokenService,
  ) {}

  async getFavoriteCoworkings(token: string) {
    const { id: userId } = this.tokenService.decodeAccessToken(
      token.split(' ')[1],
    );
    const favoritesList = await this.favoriteCoworkingsRepository.findAll({
      where: { userId },
      include: {
        model: Coworking,
        attributes: {
          exclude: ['ownerId'],
        },
        include: [City, Metro, CoworkingPrice, CoworkingImages, Conveniences],
      },
    });

    const coworkings = favoritesList.map((el) => el.coworking);
    return coworkings;
  }

  async isFavorite(userId: number, coworkingId: number) {
    const isFavorite = await this.favoriteCoworkingsRepository.findOne({
      where: { userId, coworkingId },
    });
    return !!isFavorite;
  }

  async addToFavorite(token: string, coworkingId: number) {
    const { id: userId } = this.tokenService.decodeAccessToken(
      token.split(' ')[1],
    );
    const isFavorite = await this.isFavorite(userId, coworkingId);

    if (isFavorite) return;

    await this.favoriteCoworkingsRepository.create({ userId, coworkingId });
    return;
  }

  async removeAtFavorite(token: string, coworkingId: number) {
    const { id: userId } = this.tokenService.decodeAccessToken(
      token.split(' ')[1],
    );
    const isFavorite = await this.isFavorite(userId, coworkingId);

    if (!isFavorite) return;

    await this.favoriteCoworkingsRepository.destroy({
      where: { userId, coworkingId },
    });
    return;
  }
}
