import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateConvenienceDto } from './dto/create-convenience.dto';
import { UpdateCoworkingConveniencesDto } from './dto/update-coworkingConvenience.dto';
import { Conveniences } from './models/conveniences.model';
import { CoworkingConveniences } from './models/coworking-conveniences.model';
import { ConveniencesServiceImplements } from './types/implements/service.implement';

@Injectable()
export class ConveniencesService implements ConveniencesServiceImplements {
  constructor(
    @InjectModel(Conveniences)
    private conveniencesRepository: typeof Conveniences,
    @InjectModel(CoworkingConveniences)
    private coworkingConveniencesRepository: typeof CoworkingConveniences,
  ) {}

  async getAllConvenience() {
    const conveniences = await this.conveniencesRepository.findAll();

    return conveniences;
  }

  async getAllCoworkingConvenience(coworkingId: number) {
    const coworkingWithConvenience =
      await this.coworkingConveniencesRepository.findAll({
        where: { coworkingId },
      });
    const coworkingWithConvenienceId = coworkingWithConvenience.map(
      (el) => el.conveniencesId,
    );

    const conveniences = await this.conveniencesRepository.findAll({
      where: { id: coworkingWithConvenienceId },
    });

    return conveniences;
  }

  async createConvenience(dto: CreateConvenienceDto) {
    const hasConvenience = await this.conveniencesRepository.findOne({
      where: { name: dto.name },
    });

    if (hasConvenience)
      throw new HttpException(
        'Convenience is already exist',
        HttpStatus.CONFLICT,
      );

    const convenience = await this.conveniencesRepository.create(dto);
    return convenience;
  }

  async updateConvenience(id: number, dto: CreateConvenienceDto) {
    const hasConvenience = await this.conveniencesRepository.findOne({
      where: { id },
    });

    if (!hasConvenience)
      throw new HttpException('Convenience is not found', HttpStatus.NOT_FOUND);

    const hasConvenienceByCurrentName =
      await this.conveniencesRepository.findOne({
        where: { name: dto.name },
      });

    if (hasConvenienceByCurrentName && hasConvenienceByCurrentName.id !== id)
      throw new HttpException(
        'Convenience is already exist',
        HttpStatus.CONFLICT,
      );

    await this.conveniencesRepository.update(dto, {
      where: { id },
    });

    const convenience = await this.conveniencesRepository.findOne({
      where: { id },
    });
    return convenience;
  }

  async addCoworkingConvenience(dto: UpdateCoworkingConveniencesDto) {
    const { coworkingId, conveniencesId } = dto;

    const convenience = (
      await this.getAllCoworkingConvenience(coworkingId)
    ).map((el) => el.id);

    const uniqueConveniencesId = conveniencesId.filter((el) => {
      return !convenience.includes(el);
    });

    const createsArray = [];

    uniqueConveniencesId.forEach((element) => {
      createsArray.push(
        this.coworkingConveniencesRepository.create({
          coworkingId,
          conveniencesId: element,
        }),
      );
    });

    await Promise.all(createsArray);

    return;
  }

  async removeCoworkingConvenience(dto: UpdateCoworkingConveniencesDto) {
    const { coworkingId, conveniencesId } = dto;

    const destroyArray = [];

    conveniencesId.forEach((element) => {
      destroyArray.push(
        this.coworkingConveniencesRepository.destroy({
          where: { coworkingId, conveniencesId: element },
        }),
      );
    });

    await Promise.all(destroyArray);

    return;
  }
}
