import { CreateMetroDto } from 'src/metro/dto/create-metro.dto';
import { UpdateMetroDto } from 'src/metro/dto/update-metro.dto';
import { Metro } from 'src/metro/models/metro.model';

export interface MetroServiceImplements {
  createMetro: (dto: CreateMetroDto) => Promise<Metro>;
  getAllMetro: () => Promise<Metro[]>;
  getAllMetroByCityId: (cityId: number) => Promise<Metro[]>;
  getMetroById: (id: number) => Promise<Metro>;
  updateMetro: (id: number, dto: UpdateMetroDto) => Promise<Metro>;
}
