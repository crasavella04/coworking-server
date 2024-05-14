import { IsString } from 'class-validator';

export class ContactsTypeCreateDto {
  @IsString({ message: 'Должен быть строкой' })
  title: string;
}
