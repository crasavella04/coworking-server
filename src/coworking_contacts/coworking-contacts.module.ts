import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoworkingContactsController } from './coworking-contacts.controller';
import { CoworkingContactsService } from './coworking-contacts.service';
import { CoworkingContacts } from './models/coworking-contact.model';

@Module({
  imports: [SequelizeModule.forFeature([CoworkingContacts])],
  controllers: [CoworkingContactsController],
  providers: [CoworkingContactsService],
})
export class CoworkingContactsModule {}
