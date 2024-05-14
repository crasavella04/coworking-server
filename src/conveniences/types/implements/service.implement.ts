import { CreateConvenienceDto } from 'src/conveniences/dto/create-convenience.dto';
import { UpdateCoworkingConveniencesDto } from 'src/conveniences/dto/update-coworkingConvenience.dto';
import { Conveniences } from 'src/conveniences/models/conveniences.model';

export interface ConveniencesServiceImplements {
  getAllConvenience: () => Promise<Conveniences[]>;
  getAllCoworkingConvenience: (coworkingId: number) => Promise<Conveniences[]>;
  createConvenience: (dto: CreateConvenienceDto) => Promise<Conveniences>;
  updateConvenience: (
    id: number,
    dto: CreateConvenienceDto,
  ) => Promise<Conveniences>;

  addCoworkingConvenience: (
    dto: UpdateCoworkingConveniencesDto,
  ) => Promise<void>;
  removeCoworkingConvenience: (
    dto: UpdateCoworkingConveniencesDto,
  ) => Promise<void>;
}
