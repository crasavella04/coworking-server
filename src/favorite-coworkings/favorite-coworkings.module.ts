import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenModule } from 'src/token/token.module';
import { FavoriteCoworkingsController } from './favorite-coworkings.controller';
import { FavoriteCoworkingsService } from './favorite-coworkings.service';
import { FavoriteCoworkings } from './models/favoriteCoworkings.model';

@Module({
  imports: [SequelizeModule.forFeature([FavoriteCoworkings]), TokenModule],
  controllers: [FavoriteCoworkingsController],
  providers: [FavoriteCoworkingsService],
})
export class FavoriteCoworkingsModule {}
