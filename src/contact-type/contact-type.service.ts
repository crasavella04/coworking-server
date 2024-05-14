import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImageService } from 'src/image/image.service';
import { ContactsTypeCreateDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ContactType } from './models/contact-type.model';
import { ContactTypeServiceImplements } from './types/implements/service.implements';

@Injectable()
export class ContactTypeService implements ContactTypeServiceImplements {
  constructor(
    @InjectModel(ContactType) private contactTypeRepository: typeof ContactType,
    private readonly imageService: ImageService,
  ) {}

  async getAllTypes() {
    const types = await this.contactTypeRepository.findAll();
    return types;
  }

  async createType(dto: ContactsTypeCreateDto, logo: Express.Multer.File) {
    const logoUrl = await this.imageService.addImg(logo);
    const { title } = dto;

    const type = await this.contactTypeRepository.create({
      title,
      logo: logoUrl,
    });
    return type;
  }

  async updateType(id: number, dto: UpdateTypeDto, logo?: Express.Multer.File) {
    const type = await this.contactTypeRepository.findOne({ where: { id } });

    if (!type)
      throw new HttpException('Type is not found', HttpStatus.NOT_FOUND);

    let logoUrl: string = null;
    if (logo) logoUrl = await this.imageService.addImg(logo);

    if (logoUrl)
      await this.contactTypeRepository.update(
        { ...dto, logo: logoUrl },
        { where: { id } },
      );
    else await this.contactTypeRepository.update(dto, { where: { id } });
    const newType = await this.contactTypeRepository.findOne({ where: { id } });
    return newType;
  }

  async removeType(id: number) {
    await this.contactTypeRepository.destroy({ where: { id } });
    return;
  }
}
