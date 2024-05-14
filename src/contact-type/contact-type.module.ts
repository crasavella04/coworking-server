import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageModule } from 'src/image/image.module';
import { ContactTypeController } from './contact-type.controller';
import { ContactTypeService } from './contact-type.service';
import { ContactType } from './models/contact-type.model';

@Module({
  imports: [SequelizeModule.forFeature([ContactType]), ImageModule],
  controllers: [ContactTypeController],
  providers: [ContactTypeService],
})
export class ContactTypeModule {}
