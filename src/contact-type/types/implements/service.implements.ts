import { ContactsTypeCreateDto } from 'src/contact-type/dto/create-type.dto';
import { ContactType } from 'src/contact-type/models/contact-type.model';

export interface ContactTypeServiceImplements {
  getAllTypes: () => Promise<ContactType[]>;
  createType: (
    dto: ContactsTypeCreateDto,
    logo: Express.Multer.File,
  ) => Promise<ContactType>;
  updateType: (
    id: number,
    dto: ContactsTypeCreateDto,
    logo?: Express.Multer.File,
  ) => Promise<ContactType>;
  removeType: (id: number) => Promise<void>;
}
