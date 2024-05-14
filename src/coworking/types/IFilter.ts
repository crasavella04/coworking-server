export interface IFilter {
  limit: number;
  page: number;
  cityId?: number;
  metroId?: number;
  text?: string;
  conveniencesId?: number;
  methodSort?: string;
}
