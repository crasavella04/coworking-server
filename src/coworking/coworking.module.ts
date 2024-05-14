import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConveniencesModule } from 'src/conveniences/conveniences.module';
import { CoworkingPriceModule } from 'src/coworking-price/coworking-price.module';
import { ReviewModule } from 'src/review/review.module';
import { TokenModule } from 'src/token/token.module';
import { CoworkingController } from './coworking.controller';
import { CoworkingService } from './coworking.service';
import { CoworkingImages } from './models/coworking-images.model';
import { Coworking } from './models/coworking.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Coworking, CoworkingImages]),
    ReviewModule,
    CoworkingPriceModule,
    ConveniencesModule,
    TokenModule,
  ],
  controllers: [CoworkingController],
  providers: [CoworkingService],
})
export class CoworkingModule {}
