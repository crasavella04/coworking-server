import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { City } from 'src/city/models/city.model';
import { Conveniences } from 'src/conveniences/models/conveniences.model';
import { CoworkingConveniences } from 'src/conveniences/models/coworking-conveniences.model';
import { Metro } from 'src/metro/models/metro.model';
import { User } from 'src/user/models/user.model';
import { CoworkingPrice } from '../../coworking-price/models/coworking-price.model';
import { FavoriteCoworkings } from '../../favorite-coworkings/models/favoriteCoworkings.model';
import { Review } from '../../review/models/review.model';
import { CoworkingImages } from './coworking-images.model';

class CreateCoworking {
  title: string;
  description: string;
  longitude: number;
  latitude: number;
  address: string;
  cityId: number;
  ownerId: number;
}

@Table({
  tableName: 'coworking',
})
export class Coworking extends Model<Coworking, CreateCoworking> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Пермь' })
  @Column({
    type: DataType.STRING(90),
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'Описание' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '#' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  link: string;

  @ApiProperty({ example: 90.909 })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  longitude: number;

  @ApiProperty({ example: 90.909 })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  latitude: number;

  @ApiProperty({ example: 'ул. Садовая, д.23' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
  })
  cityId: number;

  @ApiProperty({ type: City })
  @BelongsTo(() => City)
  city: City;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Metro)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  metroId: number;

  @ApiProperty({ type: Metro })
  @BelongsTo(() => Metro)
  metro: Metro;

  @ApiProperty({ type: [CoworkingPrice] })
  @HasMany(() => CoworkingPrice)
  price: CoworkingPrice[];

  @HasMany(() => Review)
  reviews: Review[];

  @ApiProperty({ type: [CoworkingImages] })
  @HasMany(() => CoworkingImages)
  images: CoworkingImages[];

  @BelongsToMany(() => User, () => FavoriteCoworkings)
  users: User[];

  @ApiProperty({ type: [Conveniences] })
  @BelongsToMany(() => Conveniences, () => CoworkingConveniences)
  conveniences: Conveniences[];
}
