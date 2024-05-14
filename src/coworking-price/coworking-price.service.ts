import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCoworkingPriceDto } from './dto/create-price.dto';
import { UpdateCoworkingPriceDto } from './dto/update-price.dto';
import { CoworkingPrice } from './models/coworking-price.model';
import { CoworkingPriceServiceImplements } from './types/implements/service.implement';

@Injectable()
export class CoworkingPriceService implements CoworkingPriceServiceImplements {
  constructor(
    @InjectModel(CoworkingPrice)
    private coworkingPriceRepository: typeof CoworkingPrice,
  ) {}

  async getAllCoworkingPrices(coworkingId: number) {
    const prices = await this.coworkingPriceRepository.findAll({
      where: { coworkingId },
    });

    return prices;
  }

  async getCoworkingPriceById(id: number) {
    const price = await this.coworkingPriceRepository.findOne({
      where: { id },
    });

    return price;
  }

  async createCoworkingPrice(dto: CreateCoworkingPriceDto) {
    const price = await this.coworkingPriceRepository.create(dto);
    return price;
  }

  async updateCoworkingPrice(id: number, dto: UpdateCoworkingPriceDto) {
    const price = await this.coworkingPriceRepository.findOne({
      where: { id },
    });

    if (!price)
      throw new HttpException('Price is not found', HttpStatus.NOT_FOUND);

    await this.coworkingPriceRepository.update(dto, { where: { id } });
    const newPrice = await this.coworkingPriceRepository.findOne({
      where: { id },
    });
    return newPrice;
  }

  async deleteCoworkingPrice(id: number) {
    await this.coworkingPriceRepository.destroy({ where: { id } });
    return;
  }
}
