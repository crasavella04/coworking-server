import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMetroDto } from './dto/create-metro.dto';
import { UpdateMetroDto } from './dto/update-metro.dto';
import { Metro } from './models/metro.model';
import { MetroServiceImplements } from './types/implements/service.implement';

@Injectable()
export class MetroService implements MetroServiceImplements {
  constructor(@InjectModel(Metro) private metroRepository: typeof Metro) {}

  async getAllMetro() {
    const metros = await this.metroRepository.findAll();

    return metros;
  }

  async getAllMetroByCityId(cityId: number) {
    const metros = await this.metroRepository.findAll({ where: { cityId } });

    return metros;
  }

  async getMetroById(id: number) {
    const metro = await this.metroRepository.findOne({ where: { id } });

    return metro;
  }

  async createMetro(dto: CreateMetroDto) {
    const metro = await this.metroRepository.create(dto);

    return metro;
  }

  async updateMetro(id: number, dto: UpdateMetroDto) {
    await this.metroRepository.update(dto, { where: { id } });

    const metro = await this.metroRepository.findOne({ where: { id } });
    return metro;
  }
}
