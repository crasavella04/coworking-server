import { CreateCoworkingDto } from 'src/coworking/dto/create-coworking.dto';
import { GetCoworkingResponse } from 'src/coworking/dto/get-coworkingResponse.dto';
import { getPageCoworkingResponse } from 'src/coworking/dto/getPage-coworkingResponse.dto';
import { IFilter } from '../IFilter';

export interface CoworkingImplement {
  getCoworkingById: (id: number) => Promise<GetCoworkingResponse>;
  getPageCoworkings: (dto: IFilter) => Promise<getPageCoworkingResponse>;
  createCoworking: (
    token: string,
    dto: CreateCoworkingDto,
  ) => Promise<GetCoworkingResponse>;
  updateCoworking: (
    id: number,
    userId: number,
    dto: any,
  ) => Promise<GetCoworkingResponse>;
  removeCoworking: (id: number, userId: number) => Promise<void>;
}
