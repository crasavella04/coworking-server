import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Metro } from 'src/metro/models/metro.model';

class CityCreate {
  name: string;
}

@Table({
  tableName: 'city',
  createdAt: false,
  updatedAt: false,
})
export class City extends Model<City, CityCreate> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Санкт-Петербург' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Metro)
  metro: Metro[];
}
