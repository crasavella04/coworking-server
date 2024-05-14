import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MetroController } from './metro.controller';
import { MetroService } from './metro.service';
import { Metro } from './models/metro.model';

@Module({
  imports: [SequelizeModule.forFeature([Metro])],
  controllers: [MetroController],
  providers: [MetroService],
})
export class MetroModule {}
