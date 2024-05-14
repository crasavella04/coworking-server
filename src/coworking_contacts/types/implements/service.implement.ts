import { CreateContactDto } from 'src/coworking_contacts/dto/create-contact.dto';
import { UpdateContactDto } from 'src/coworking_contacts/dto/update-contact.dto';
import { CoworkingContacts } from 'src/coworking_contacts/models/coworking-contact.model';

export interface CoworkingContactsServiceImplements {
  createContact: (dto: CreateContactDto) => Promise<CoworkingContacts>;
  getContactsByCoworkingId: (
    coworkingId: number,
  ) => Promise<CoworkingContacts[]>;
  getContactById: (id: number) => Promise<CoworkingContacts>;
  updateContact: (
    id: number,
    dto: UpdateContactDto,
  ) => Promise<CoworkingContacts>;
  removeContact: (id: number) => Promise<void>;
}
