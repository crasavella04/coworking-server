import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { City } from 'src/city/models/city.model';
import { ConveniencesService } from 'src/conveniences/conveniences.service';
import { Conveniences } from 'src/conveniences/models/conveniences.model';
import { CoworkingPriceService } from 'src/coworking-price/coworking-price.service';
import { Metro } from 'src/metro/models/metro.model';
import { ReviewService } from 'src/review/review.service';
import { TokenService } from 'src/token/token.service';
import { CoworkingPrice } from '../coworking-price/models/coworking-price.model';
import { CoworkingItemWithRating } from './dto/CoworkingItemWithRating.dto';
import { CreateCoworkingDto } from './dto/create-coworking.dto';
import { GetCoworkingResponse } from './dto/get-coworkingResponse.dto';
import { CoworkingImages } from './models/coworking-images.model';
import { Coworking } from './models/coworking.model';
import { IFilter } from './types/IFilter';
import { MethodSort } from './types/MethodSort';
import { CoworkingImplement } from './types/implements/coworking.implements';

@Injectable()
export class CoworkingService implements CoworkingImplement {
  constructor(
    @InjectModel(Coworking) private coworkingRepository: typeof Coworking,
    private readonly reviewService: ReviewService,
    private readonly configService: ConfigService,
    private readonly coworkingPriceService: CoworkingPriceService,
    private readonly conveniencesService: ConveniencesService,
    private readonly tokenService: TokenService,
  ) {}
  updateCoworking: (
    id: number,
    userId: number,
    dto: any,
  ) => Promise<GetCoworkingResponse>;
  removeCoworking: (id: number, userId: number) => Promise<void>;

  async getCoworkingById(id: number) {
    const coworking = await this.coworkingRepository.findOne({
      where: { id },
      include: [City, Metro, CoworkingPrice, CoworkingImages, Conveniences],
      attributes: {
        exclude: ['ownerId'],
      },
    });

    if (!coworking)
      throw new HttpException('Coworking not found', HttpStatus.NOT_FOUND);

    const { rate, countRate } =
      await this.reviewService.findAllCoworkingReviews(id);

    return { ...coworking.get(), rate, countRate };
  }

  async getPageCoworkings(data: IFilter) {
    const { limit, page, cityId, metroId, text, conveniencesId, methodSort } =
      data;

    const where = {};
    if (cityId) where['cityId'] = cityId;
    if (metroId) where['metroId'] = metroId;

    let order = [];
    switch (methodSort) {
      case 'new-old':
        order.push(['createdAt', 'DESC']);
        break;
      case 'old-new':
        order.push(['createdAt', 'ASC']);
        break;
      default:
        order.push(['createdAt', 'DESC']);
        break;
    }

    const totalRecords = await this.coworkingRepository.count({ where });
    const countPages = Math.ceil(totalRecords / limit);

    let coworkings: Coworking[] | CoworkingItemWithRating[] = (
      await this.coworkingRepository.findAll({
        where,
        include: [City, Metro, CoworkingPrice, CoworkingImages, Conveniences],
        attributes: {
          exclude: ['ownerId'],
        },
        order,
      })
    ).map((el) => el.get({ plain: true }));

    if (conveniencesId) {
      coworkings = this.coworkingHasCurrentConveniences(
        conveniencesId,
        coworkings,
      );
    }

    if (text) {
      coworkings = this.coworkingHasCurrentText(text, coworkings);
    }

    if (
      methodSort === MethodSort.CHIP_EXPENSIVE ||
      methodSort === MethodSort.EXPENSIVE_CHIP
    ) {
      coworkings = this.priceSort(methodSort, coworkings);
    }

    coworkings = await this.getRatingCoworking(coworkings);

    if (
      methodSort === MethodSort.BAD_GOOD ||
      methodSort === MethodSort.GOOD_BAD
    ) {
      coworkings = this.reviewSort(methodSort, coworkings);
    }

    coworkings = coworkings.slice(limit * (page - 1), limit * page);

    const additionalParams = [];
    if (cityId) additionalParams.push(`cityId=${cityId}`);
    if (metroId) additionalParams.push(`metroId=${metroId}`);
    if (methodSort) additionalParams.push(`methodSort=${methodSort}`);
    if (limit) additionalParams.push(`limit=${limit}`);
    if (text) additionalParams.push(`text=${text}`);
    if (conveniencesId)
      additionalParams.push(`conveniencesId=${conveniencesId}`);

    const baseUrl = `${this.configService.get('BASE_URL')}/coworking?${additionalParams.join('&')}`;
    const next = page < countPages ? `${baseUrl}&page=${page + 1}` : null;
    const prev = page > 1 ? `${baseUrl}&page=${page - 1}` : null;

    const result = {
      next,
      prev,
      countPages,
      items: coworkings,
    };

    return result;
  }

  async createCoworking(token: string, dto: CreateCoworkingDto) {
    const { id } = this.tokenService.decodeAccessToken(token.split(' ')[1]);
    const { price, conveniences, ...createData } = dto;

    const coworking = await this.coworkingRepository.create({
      ...createData,
      ownerId: id,
    });

    if (price && price.length !== 0) {
      const pricePromises = price.map((el) =>
        this.coworkingPriceService.createCoworkingPrice({
          ...el,
          coworkingId: coworking.id,
        }),
      );

      await Promise.all(pricePromises);
    }

    if (conveniences && conveniences.length !== 0) {
      await this.conveniencesService.addCoworkingConvenience({
        coworkingId: coworking.id,
        conveniencesId: conveniences,
      });
    }

    return await this.getCoworkingById(coworking.id);
  }

  private async getRatingCoworking(
    coworkings: Coworking[],
  ): Promise<CoworkingItemWithRating[]> {
    const coworkingsWithRatingPromises = coworkings.map(async (el) => {
      const { rate, countRate } =
        await this.reviewService.findAllCoworkingReviews(el.id);

      return { ...el, rate, countRate };
    });

    const coworkingsWithRating = await Promise.all(
      coworkingsWithRatingPromises,
    );
    return coworkingsWithRating;
  }

  private coworkingHasCurrentConveniences(
    conveniencesId: number,
    coworkings: Coworking[],
  ): Coworking[] {
    return coworkings.filter((coworking) =>
      coworking.conveniences.some(
        (convenience) => convenience.id === conveniencesId,
      ),
    );
  }

  private coworkingHasCurrentText(
    text: string,
    coworkings: Coworking[],
  ): Coworking[] {
    return coworkings.filter(
      (coworking) =>
        coworking.title.toLowerCase().includes(text.trim().toLowerCase()) ||
        coworking.description.toLowerCase().includes(text.trim().toLowerCase()),
    );
  }

  private reviewSort(
    methodSort: MethodSort.BAD_GOOD | MethodSort.GOOD_BAD,
    coworkings: CoworkingItemWithRating[],
  ) {
    coworkings.sort((a, b) => {
      const avgRatingA = a.rate;
      const avgRatingB = b.rate;

      if (methodSort === MethodSort.BAD_GOOD) {
        return avgRatingA - avgRatingB;
      } else {
        return avgRatingB - avgRatingA;
      }
    });

    return coworkings;
  }

  private priceSort(
    methodSort: MethodSort.CHIP_EXPENSIVE | MethodSort.EXPENSIVE_CHIP,
    coworkings: Coworking[],
  ): Coworking[] {
    return coworkings.sort((a, b) => {
      const minPriceA = this.getMinPrice(a);
      const minPriceB = this.getMinPrice(b);

      if (methodSort === MethodSort.CHIP_EXPENSIVE) {
        return minPriceA - minPriceB;
      } else if (methodSort === MethodSort.EXPENSIVE_CHIP) {
        return minPriceB - minPriceA;
      }
    });
  }

  private getMinPrice(coworking: Coworking): number {
    if (!coworking.price || coworking.price.length === 0) {
      return Infinity;
    }
    return Math.min(...coworking.price.map((p) => p.rub));
  }
}
