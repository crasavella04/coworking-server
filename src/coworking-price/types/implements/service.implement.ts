import { CreateCoworkingPriceDto } from 'src/coworking-price/dto/create-price.dto';
import { UpdateCoworkingPriceDto } from 'src/coworking-price/dto/update-price.dto';
import { CoworkingPrice } from 'src/coworking-price/models/coworking-price.model';

export interface CoworkingPriceServiceImplements {
  getAllCoworkingPrices: (coworkingId: number) => Promise<CoworkingPrice[]>;
  getCoworkingPriceById: (id: number) => Promise<CoworkingPrice>;
  createCoworkingPrice: (
    dto: CreateCoworkingPriceDto,
  ) => Promise<CoworkingPrice>;
  updateCoworkingPrice: (
    id: number,
    dto: UpdateCoworkingPriceDto,
  ) => Promise<CoworkingPrice>;
  deleteCoworkingPrice: (id: number) => Promise<void>;
}
