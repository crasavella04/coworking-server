import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coworking } from '../../coworking/models/coworking.model';

class CoworkingPriceCreate {
  service: string;
  rub: number;
  coworkingId: number;
}

@Table({
  tableName: 'coworking-price',
  createdAt: false,
  updatedAt: false,
})
export class CoworkingPrice extends Model<
  CoworkingPrice,
  CoworkingPriceCreate
> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Офис' })
  @Column({
    type: DataType.STRING(90),
    allowNull: false,
  })
  service: string;

  @ApiProperty({ example: 100.23 })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  rub: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Coworking)
  @Column({
    type: DataType.INTEGER,
  })
  coworkingId: number;

  @BelongsTo(() => Coworking)
  coworking: Coworking;
}
