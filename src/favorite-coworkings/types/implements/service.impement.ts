import { Coworking } from 'src/coworking/models/coworking.model';

export interface FavoriteCoworkingsImplements {
  addToFavorite: (token: string, coworkingId: number) => Promise<void>;
  removeAtFavorite: (token: string, coworkingId: number) => Promise<void>;
  getFavoriteCoworkings: (token: string) => Promise<Coworking[]>;
  isFavorite: (userId: number, coworkingId: number) => Promise<boolean>;
}
