import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactType } from '../contact-type/models/contact-type.model';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CoworkingContacts } from './models/coworking-contact.model';
import { CoworkingContactsServiceImplements } from './types/implements/service.implement';

@Injectable()
export class CoworkingContactsService
  implements CoworkingContactsServiceImplements
{
  constructor(
    @InjectModel(CoworkingContacts)
    private coworkingContactsRepository: typeof CoworkingContacts,
  ) {}

  async createContact(dto: CreateContactDto) {
    const contact = await this.coworkingContactsRepository.create(dto, {
      include: { all: true },
    });
    return contact;
  }

  async getContactsByCoworkingId(coworkingId: number) {
    const contacts = await this.coworkingContactsRepository.findAll({
      where: { coworkingId },
      include: [ContactType],
    });
    return contacts;
  }

  async getContactById(id: number) {
    const contact = await this.coworkingContactsRepository.findOne({
      where: { id },
      include: [ContactType],
    });

    if (!contact)
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);

    return contact;
  }

  async updateContact(id: number, dto: UpdateContactDto) {
    await this.coworkingContactsRepository.update(dto, { where: { id } });
    return await this.getContactById(id);
  }

  async removeContact(id: number) {
    await this.coworkingContactsRepository.destroy({ where: { id } });
    return;
  }
}
