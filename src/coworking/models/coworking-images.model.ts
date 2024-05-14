import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coworking } from './coworking.model';

@Table({
  tableName: 'coworking-images',
  createdAt: false,
  updatedAt: false,
})
export class CoworkingImages extends Model<CoworkingImages> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'https://example.com/static/img.jpg' })
  @Column({
    type: DataType.STRING,
  })
  img: string;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Coworking)
  @Column({
    type: DataType.INTEGER,
  })
  coworkingId: number;

  @BelongsTo(() => Coworking)
  coworking: Coworking;
}
