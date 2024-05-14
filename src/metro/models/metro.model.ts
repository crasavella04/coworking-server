import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { City } from 'src/city/models/city.model';
import { CreateMetroDto } from '../dto/create-metro.dto';

@Table({
  tableName: 'metro',
  createdAt: false,
  updatedAt: false,
})
export class Metro extends Model<Metro, CreateMetroDto> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'с. Московская' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
  })
  cityId: number;

  @BelongsTo(() => City)
  city: City;
}
