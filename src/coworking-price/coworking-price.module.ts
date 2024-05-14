import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoworkingPriceController } from './coworking-price.controller';
import { CoworkingPriceService } from './coworking-price.service';
import { CoworkingPrice } from './models/coworking-price.model';

@Module({
  imports: [SequelizeModule.forFeature([CoworkingPrice])],
  controllers: [CoworkingPriceController],
  providers: [CoworkingPriceService],
  exports: [CoworkingPriceService],
})
export class CoworkingPriceModule {}
