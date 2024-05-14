import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { ConveniencesModule } from './conveniences/conveniences.module';
import { CoworkingModule } from './coworking/coworking.module';
import { CoworkingContactsModule } from './coworking_contacts/coworking-contacts.module';
import { FavoriteCoworkingsModule } from './favorite-coworkings/favorite-coworkings.module';
import { MetroModule } from './metro/metro.module';
import { ReviewModule } from './review/review.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { ContactTypeModule } from './contact-type/contact-type.module';
import { CoworkingPriceModule } from './coworking-price/coworking-price.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT, 10),
      models: [],
      autoLoadModels: true,
    }),
    UserModule,
    AuthModule,
    TokenModule,
    CoworkingModule,
    ReviewModule,
    FavoriteCoworkingsModule,
    ConveniencesModule,
    CoworkingContactsModule,
    CityModule,
    MetroModule,
    ImageModule,
    ContactTypeModule,
    CoworkingPriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
