import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coworking } from 'src/coworking/models/coworking.model';
import { CoworkingConveniences } from './coworking-conveniences.model';

class ConveniencesCreate {
  name: string;
}

@Table({
  tableName: 'conveniences',
  createdAt: false,
  updatedAt: false,
})
export class Conveniences extends Model<Conveniences, ConveniencesCreate> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Безлимитный кофе' })
  @Column({
    type: DataType.STRING(70),
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Coworking, () => CoworkingConveniences)
  coworkings: Coworking[];
}
