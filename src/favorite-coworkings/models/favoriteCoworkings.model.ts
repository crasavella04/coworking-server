import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { Coworking } from '../../coworking/models/coworking.model';

@Table({
  tableName: 'favorite-coworkings',
  createdAt: false,
  updatedAt: false,
})
export class FavoriteCoworkings extends Model<FavoriteCoworkings> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => Coworking)
  @Column({
    type: DataType.INTEGER,
  })
  coworkingId: number;

  @BelongsTo(() => Coworking)
  coworking: Coworking;
}
