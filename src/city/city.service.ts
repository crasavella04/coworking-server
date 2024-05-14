import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './models/city.model';
import { CityServiceImplements } from './types/implements/service.implemet';

@Injectable()
export class CityService implements CityServiceImplements {
  constructor(@InjectModel(City) private cityRepository: typeof City) {}

  async getAllCities() {
    const cities = await this.cityRepository.findAll();
    return cities;
  }

  async getCityById(id: number) {
    const city = await this.cityRepository.findOne({ where: { id } });
    return city;
  }

  async createCity(dto: CreateCityDto) {
    const { name } = dto;
    const city = await this.cityRepository.findOne({ where: { name } });

    if (city)
      throw new HttpException('City already exist', HttpStatus.CONFLICT);

    const newCity = await this.cityRepository.create(dto);
    return newCity;
  }

  async updateCity(id: number, dto: CreateCityDto) {
    const city = await this.cityRepository.findOne({ where: { id } });

    if (!city)
      throw new HttpException('City is not found', HttpStatus.NOT_FOUND);

    await this.cityRepository.update(dto, { where: { id } });
    const updatedCity = await this.cityRepository.findOne({ where: { id } });

    return updatedCity;
  }
}
