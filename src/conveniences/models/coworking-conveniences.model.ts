import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coworking } from 'src/coworking/models/coworking.model';
import { Conveniences } from './conveniences.model';

@Table({
  tableName: 'coworking-conveniences',
  createdAt: false,
  updatedAt: false,
})
export class CoworkingConveniences extends Model<CoworkingConveniences> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Conveniences)
  @Column({
    type: DataType.INTEGER,
  })
  conveniencesId: number;

  @BelongsTo(() => Conveniences)
  conveniences: Conveniences[];

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Coworking)
  @Column({
    type: DataType.INTEGER,
  })
  coworkingId: number;

  @BelongsTo(() => Coworking)
  coworkings: Coworking[];
}
