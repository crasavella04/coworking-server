import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConveniencesController } from './conveniences.controller';
import { ConveniencesService } from './conveniences.service';
import { Conveniences } from './models/conveniences.model';
import { CoworkingConveniences } from './models/coworking-conveniences.model';

@Module({
  imports: [SequelizeModule.forFeature([Conveniences, CoworkingConveniences])],
  controllers: [ConveniencesController],
  providers: [ConveniencesService],
  exports: [ConveniencesService],
})
export class ConveniencesModule {}
