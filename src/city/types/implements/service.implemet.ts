import { CreateCityDto } from 'src/city/dto/create-city.dto';
import { City } from 'src/city/models/city.model';

export interface CityServiceImplements {
  getAllCities: () => Promise<City[]>;
  getCityById: (id: number) => Promise<City>;
  createCity: (dto: CreateCityDto) => Promise<City>;
  updateCity: (id: number, dto: CreateCityDto) => Promise<City>;
}
